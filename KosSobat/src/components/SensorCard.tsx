/**
 * SensorCard.tsx
 * Komponen kartu UI untuk menampilkan pembacaan sensor hardware smartphone:
 * - Pembacaan sumbu 3D (X, Y, Z) Akselerometer
 * - Kalkulasi sudut kemiringan (Roll & Pitch)
 * - Fitur deteksi goyangan (Shake to Action / Lapor Darurat)
 * - Switch on/off sensor hemat baterai
 */

import { router } from 'expo-router';
import {
  Activity,
  AlertTriangle,
  Compass,
  Power,
  RotateCw,
  Smartphone,
  Sparkles,
  Vibrate,
} from 'lucide-react-native';
import React, { useCallback } from 'react';
import {
  Alert,
  DimensionValue,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDeviceSensors } from '../hooks/useDeviceSensors';

export function SensorCard() {
  const handleShakeAction = useCallback(() => {
    Alert.alert(
      '🚨 Goyangan Darurat Terdeteksi!',
      'Sensor Akselerometer mendeteksi goyangan cepat pada smartphone Anda.\n\nApakah Anda memerlukan bantuan segera atau ingin melaporkan kendala kamar?',
      [
        { text: 'Abaikan', style: 'cancel' },
        {
          text: 'Buat Laporan',
          onPress: () => router.push('/complaint'),
        },
      ]
    );
  }, []);

  const {
    data,
    orientation,
    isEnabled,
    isAvailable,
    shakeCount,
    toggleSensor,
  } = useDeviceSensors({
    onShake: handleShakeAction,
    shakeThreshold: 2.2,
    updateIntervalMs: 120,
  });

  // Helper untuk persentase visual meter (-1 s/d +1)
  const calculateMeterWidth = (val: number): DimensionValue => {
    const clamped = Math.min(Math.max(val, -1), 1);
    const percent = Math.abs(clamped) * 100;
    return `${Math.round(percent)}%` as DimensionValue;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header Kartu Sensor */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBox}>
            <Activity size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.subHeader}>DEVICE SENSORS (HARDWARE)</Text>
            <Text style={styles.title}>Akselerometer & Orientasi</Text>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>{isEnabled ? 'Aktif' : 'Mati'}</Text>
          <Switch
            value={isEnabled}
            onValueChange={toggleSensor}
            trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
            thumbColor={isEnabled ? '#2563EB' : '#F1F5F9'}
          />
        </View>
      </View>

      {Platform.OS === 'web' ? (
        // Tampilan fallback khusus Web — sensor hardware tidak tersedia di browser
        <View style={styles.warningBox}>
          <Smartphone size={18} color="#D97706" />
          <Text style={styles.warningText}>
            Sensor akselerometer hanya tersedia di perangkat native (Android/iOS).
            Buka aplikasi melalui <Text style={{ fontWeight: '800' }}>Expo Go</Text> pada smartphone untuk mengakses fitur ini.
          </Text>
        </View>
      ) : !isAvailable ? (
        <View style={styles.warningBox}>
          <AlertTriangle size={18} color="#D97706" />
          <Text style={styles.warningText}>
            Sensor akselerometer tidak didukung pada simulator/perangkat ini.
          </Text>
        </View>
      ) : isEnabled ? (
        <View style={styles.contentWrap}>
          {/* Banner Shake to Emergency */}
          <View style={styles.shakeBanner}>
            <View style={styles.shakeLeft}>
              <View style={styles.vibrateIconCircle}>
                <Vibrate size={16} color="#DC2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.shakeTitle}>Fitur Shake to Emergency</Text>
                <Text style={styles.shakeDesc}>
                  Goyangkan smartphone untuk memicu respons lapor darurat cepat.
                </Text>
              </View>
            </View>
            <View style={styles.shakeBadge}>
              <Text style={styles.shakeBadgeText}>{shakeCount}x Shake</Text>
            </View>
          </View>

          {/* Grid Pembacaan 3 Sumbu (X, Y, Z) */}
          <View style={styles.axesGrid}>
            {/* Sumbu X */}
            <View style={styles.axisItem}>
              <View style={styles.axisHeader}>
                <Text style={styles.axisName}>Sumbu X (Kiri/Kanan)</Text>
                <Text style={styles.axisValue}>{data.x.toFixed(2)} G</Text>
              </View>
              <View style={styles.meterTrack}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      width: calculateMeterWidth(data.x),
                      backgroundColor: data.x >= 0 ? '#2563EB' : '#0284C7',
                    },
                  ]}
                />
              </View>
            </View>

            {/* Sumbu Y */}
            <View style={styles.axisItem}>
              <View style={styles.axisHeader}>
                <Text style={styles.axisName}>Sumbu Y (Atas/Bawah)</Text>
                <Text style={styles.axisValue}>{data.y.toFixed(2)} G</Text>
              </View>
              <View style={styles.meterTrack}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      width: calculateMeterWidth(data.y),
                      backgroundColor: data.y >= 0 ? '#10B981' : '#059669',
                    },
                  ]}
                />
              </View>
            </View>

            {/* Sumbu Z */}
            <View style={styles.axisItem}>
              <View style={styles.axisHeader}>
                <Text style={styles.axisName}>Sumbu Z (Depan/Belakang)</Text>
                <Text style={styles.axisValue}>{data.z.toFixed(2)} G</Text>
              </View>
              <View style={styles.meterTrack}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      width: calculateMeterWidth(data.z),
                      backgroundColor: data.z >= 0 ? '#8B5CF6' : '#6D28D9',
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Kotak Derajat Kemiringan (Tilt Roll & Pitch) */}
          <View style={styles.tiltBox}>
            <View style={styles.tiltCol}>
              <RotateCw size={14} color="#64748B" />
              <Text style={styles.tiltLabel}>Roll (Kemiringan)</Text>
              <Text style={styles.tiltValue}>{orientation.roll}°</Text>
            </View>
            <View style={styles.tiltDivider} />
            <View style={styles.tiltCol}>
              <Compass size={14} color="#64748B" />
              <Text style={styles.tiltLabel}>Pitch (Elevasi)</Text>
              <Text style={styles.tiltValue}>{orientation.pitch}°</Text>
            </View>
            <View style={styles.tiltDivider} />
            <View style={styles.tiltCol}>
              <Sparkles size={14} color="#64748B" />
              <Text style={styles.tiltLabel}>Total Gaya G</Text>
              <Text style={styles.tiltValue}>{orientation.totalG} G</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.disabledBox}>
          <Power size={20} color="#94A3B8" />
          <Text style={styles.disabledText}>
            Sensor akselerometer sedang dinonaktifkan untuk menghemat daya baterai.
          </Text>
          <TouchableOpacity
            style={styles.enableBtn}
            onPress={toggleSensor}
            activeOpacity={0.8}
          >
            <Text style={styles.enableBtnText}>Aktifkan Sensor</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
  },
  warningText: {
    fontSize: 12,
    color: '#B45309',
    flex: 1,
  },
  contentWrap: {
    gap: 12,
  },
  shakeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  shakeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  vibrateIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shakeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#991B1B',
  },
  shakeDesc: {
    fontSize: 10,
    color: '#B91C1C',
    marginTop: 1,
    lineHeight: 14,
  },
  shakeBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  shakeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  axesGrid: {
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  axisItem: {
    gap: 4,
  },
  axisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  axisName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  axisValue: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  meterTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 3,
  },
  tiltBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tiltCol: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
  },
  tiltLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  tiltValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  tiltDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  disabledBox: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 8,
  },
  disabledText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  enableBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  enableBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
