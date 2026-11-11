/**
 * locationService.ts
 * Service untuk Location-Based Services (LBS):
 * - Izin GPS (Permissions)
 * - Pengambilan koordinat presisi (Latitude, Longitude, Altitude, Accuracy)
 * - Reverse Geocoding (Alamat manusiawi dari GPS)
 * - Perhitungan jarak dengan Haversine Formula
 * - Geofencing verifikasi radius kos
 */

import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

// Titik Koordinat Resmi Kost Harmony Living (Contoh: Area Jakarta Pusat)
export const KOST_LOCATION = {
  name: 'Kost Harmony Living',
  latitude: -6.208763,
  longitude: 106.845599,
  address: 'Jl. Salemba Raya No. 12, Senen, Jakarta Pusat',
  geofenceRadiusMeters: 200, // Radius toleransi check-in: 200 meter
};

export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  addressText: string;
  distanceToKostMeters: number;
  isInsideKostArea: boolean;
}

/**
 * Menghitung jarak antara dua koordinat GPS menggunakan Rumus Haversine (Great-circle distance).
 * Menghasilkan jarak dalam satuan meter.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (angle: number) => (angle * Math.PI) / 180;
  const R = 6371000; // Radius rata-rata bumi dalam meter

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Format jarak yang mudah dibaca pengguna (meter atau kilometer)
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters} meter`;
  }
  const km = (meters / 1000).toFixed(1);
  return `${km} km`;
}

/**
 * Meminta izin akses lokasi ke perangkat pengguna
 */
export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

/**
 * Mendapatkan koordinat GPS real-time beserta alamat (Reverse Geocoding)
 */
export async function fetchCurrentLBS(): Promise<LocationResult> {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error('Izin lokasi ditolak. Harap izinkan akses lokasi untuk fitur LBS ini.');
  }

  // Ambil posisi akurat menggunakan GPS hardware
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });

  const { latitude, longitude, accuracy, altitude } = position.coords;

  // Hitung jarak pengguna ke Kost Harmony Living
  const distance = calculateHaversineDistance(
    latitude,
    longitude,
    KOST_LOCATION.latitude,
    KOST_LOCATION.longitude
  );

  const isInside = distance <= KOST_LOCATION.geofenceRadiusMeters;

  // Reverse Geocoding: Ubah lat & lon jadi nama jalan/alamat lengkap
  let addressText = 'Alamat tidak ditemukan';
  try {
    const reverseGeocoded = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocoded && reverseGeocoded.length > 0) {
      const item = reverseGeocoded[0];
      const parts = [
        item.street,
        item.district || item.subregion,
        item.city,
        item.region,
      ].filter(Boolean);
      addressText = parts.length > 0 ? parts.join(', ') : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }
  } catch {
    addressText = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  }

  return {
    latitude,
    longitude,
    accuracy,
    altitude,
    addressText,
    distanceToKostMeters: distance,
    isInsideKostArea: isInside,
  };
}

/**
 * Membuka aplikasi Google Maps / Apple Maps menuju titik Kost Harmony Living
 */
export function openKostInMaps(lat = KOST_LOCATION.latitude, lon = KOST_LOCATION.longitude, label = KOST_LOCATION.name) {
  const scheme = Platform.select({
    ios: `maps:0,0?q=${label}@${lat},${lon}`,
    android: `geo:0,0?q=${lat},${lon}(${label})`,
    default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
  });

  Linking.openURL(scheme).catch(() => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
  });
}

