/**
 * useDeviceSensors.ts
 * Custom hook untuk mengakses sensor perangkat keras smartphone (Akselerometer via expo-sensors).
 * Mendeteksi 3 sumbu orientasi (X, Y, Z), menghitung sudut kemiringan (Pitch & Roll),
 * serta mendeteksi getaran/goyangan (Shake Detection).
 *
 * Mengimplementasikan pembersihan memori (unsubscribe listener) pada lifecycle unmount.
 * Catatan: expo-sensors hanya didukung pada perangkat native (Android/iOS),
 * tidak tersedia di platform Web.
 */

import { Accelerometer } from 'expo-sensors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

export interface SensorOrientation {
  roll: number;  // Kemiringan ke kiri/kanan (-90° s/d 90°)
  pitch: number; // Kemiringan ke atas/bawah (-90° s/d 90°)
  totalG: number; // Total gaya gravitasi (G-force)
}

interface UseDeviceSensorsOptions {
  onShake?: () => void;
  shakeThreshold?: number; // Ambang batas percepatan shake (default: 2.2G)
  updateIntervalMs?: number; // Frekuensi pembaruan sensor (default: 100ms)
}

export function useDeviceSensors(options: UseDeviceSensorsOptions = {}) {
  const {
    onShake,
    shakeThreshold = 2.2,
    updateIntervalMs = 100,
  } = options;

  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [data, setData] = useState<AccelerometerData>({ x: 0, y: 0, z: 0 });
  const [orientation, setOrientation] = useState<SensorOrientation>({
    roll: 0,
    pitch: 0,
    totalG: 1,
  });
  const [shakeCount, setShakeCount] = useState<number>(0);
  // Platform web tidak mendukung sensor native — langsung set isAvailable=false
  const [isAvailable, setIsAvailable] = useState<boolean>(Platform.OS !== 'web');

  const lastShakeTimeRef = useRef<number>(0);

  // Cek ketersediaan sensor pada perangkat (hanya di native)
  useEffect(() => {
    // Sensor hanya tersedia di Android/iOS, bukan di Web
    if (Platform.OS === 'web') {
      setIsAvailable(false);
      return;
    }
    let isMounted = true;
    Accelerometer.isAvailableAsync().then((available) => {
      if (isMounted) setIsAvailable(available);
    }).catch(() => {
      if (isMounted) setIsAvailable(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Lifecycle Listener Sensor: Start & Cleanup
  useEffect(() => {
    // Jangan subscribe di Web atau jika sensor tidak tersedia
    if (!isEnabled || Platform.OS === 'web' || !isAvailable) return;

    // Atur interval pembaruan agar responsif namun efisien daya
    Accelerometer.setUpdateInterval(updateIntervalMs);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      setData({ x, y, z });

      // Hitung Total G-Force: sqrt(x^2 + y^2 + z^2)
      const totalG = Math.sqrt(x * x + y * y + z * z);

      // Hitung sudut kemiringan dalam derajat
      // Roll (kemiringan sumbu X terhadap Y-Z)
      const rollDeg = Math.round(
        Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI)
      );
      // Pitch (kemiringan sumbu Y terhadap X-Z)
      const pitchDeg = Math.round(
        Math.atan2(-y, Math.sqrt(x * x + z * z)) * (180 / Math.PI)
      );

      setOrientation({
        roll: rollDeg,
        pitch: pitchDeg,
        totalG: parseFloat(totalG.toFixed(2)),
      });

      // Deteksi Goyangan / Shake
      const now = Date.now();
      if (totalG > shakeThreshold && now - lastShakeTimeRef.current > 1200) {
        lastShakeTimeRef.current = now;
        setShakeCount((prev) => prev + 1);
        if (onShake) {
          onShake();
        }
      }
    });

    // PENTING: Membersihkan listener saat unmount atau sensor dimatikan
    return () => {
      subscription && subscription.remove();
    };
  }, [isEnabled, isAvailable, updateIntervalMs, shakeThreshold, onShake]);

  const toggleSensor = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);

  return {
    data,
    orientation,
    isEnabled,
    isAvailable,
    shakeCount,
    toggleSensor,
  };
}

