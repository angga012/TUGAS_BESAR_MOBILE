/**
 * LocationCard.tsx
 * Komponen kartu UI untuk menampilkan data Location-Based Services (LBS):
 * - Status Geofencing Presensi Kos
 * - Koordinat GPS (Latitude, Longitude, Akurasi)
 * - Hasil Reverse Geocoding Alamat
 * - Tombol Refresh & Navigasi Peta
 */

import {
  Compass,
  ExternalLink,
  MapPin,
  Navigation,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUserLocation } from '../hooks/useUserLocation';
import { formatDistance, openKostInMaps } from '../services/locationService';

export function LocationCard() {
  const {
    locationData,
    isLoading,
    errorMessage,
    permissionDenied,
    refreshLocation,
  } = useUserLocation();

  return (
    <View style={styles.cardContainer}>
      {/* Header Kartu */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBox}>
            <Compass size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.subHeader}>LOCATION-BASED SERVICES (LBS)</Text>
            <Text style={styles.title}>Presensi & Lokasi Kos</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={refreshLocation}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <RefreshCw size={15} color="#2563EB" />
          )}
        </TouchableOpacity>
      </View>

      {/* Konten Utama */}
      {isLoading && !locationData ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loadingText}>Mendeteksi koordinat GPS satelit...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.errorBox}>
          <ShieldAlert size={20} color="#DC2626" />
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={refreshLocation}
            activeOpacity={0.8}
          >
            <Text style={styles.retryBtnText}>
              {permissionDenied ? 'Minta Izin Ulang' : 'Coba Lagi'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : locationData ? (
        <View style={styles.contentWrap}>
          {/* Status Geofence Presensi */}
          <View
            style={[
              styles.statusBanner,
              locationData.isInsideKostArea
                ? styles.statusInArea
                : styles.statusOutArea,
            ]}
          >
            {locationData.isInsideKostArea ? (
              <ShieldCheck size={18} color="#166534" />
            ) : (
              <Navigation size={18} color="#9A3412" />
            )}
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.statusTitle,
                  locationData.isInsideKostArea
                    ? styles.statusTitleIn
                    : styles.statusTitleOut,
                ]}
              >
                {locationData.isInsideKostArea
                  ? 'Terverifikasi di Area Kos'
                  : 'Berada di Luar Area Kos'}
              </Text>
              <Text style={styles.statusSub}>
                Jarak ke Kost: {formatDistance(locationData.distanceToKostMeters)}
                {locationData.isInsideKostArea ? ' (Radius < 200m)' : ''}
              </Text>
            </View>
          </View>

          {/* Grid Koordinat GPS */}
          <View style={styles.coordsGrid}>
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>LATITUDE</Text>
              <Text style={styles.coordValue}>
                {locationData.latitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.coordDivider} />
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>LONGITUDE</Text>
              <Text style={styles.coordValue}>
                {locationData.longitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.coordDivider} />
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>AKURASI</Text>
              <Text style={styles.coordValue}>
                ±{Math.round(locationData.accuracy ?? 0)} m
              </Text>
            </View>
          </View>

          {/* Alamat Reverse Geocoding */}
          <View style={styles.addressBox}>
            <MapPin size={16} color="#64748B" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.addressLabel}>Alamat Terdeteksi (Reverse Geocoding):</Text>
              <Text style={styles.addressValue} numberOfLines={2}>
                {locationData.addressText}
              </Text>
            </View>
          </View>

          {/* Tombol Aksi Buka Google Maps */}
          <TouchableOpacity
            style={styles.mapBtn}
            onPress={() => openKostInMaps()}
            activeOpacity={0.8}
          >
            <ExternalLink size={15} color="#2563EB" />
            <Text style={styles.mapBtnText}>Petunjuk Arah ke Kost Harmony Living</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  refreshBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: '#64748B',
  },
  errorBox: {
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    paddingHorizontal: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#991B1B',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contentWrap: {
    gap: 12,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
  },
  statusInArea: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  statusOutArea: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  statusTitleIn: {
    color: '#166534',
  },
  statusTitleOut: {
    color: '#9A3412',
  },
  statusSub: {
    fontSize: 11,
    color: '#475569',
    marginTop: 1,
  },
  coordsGrid: {
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
  coordCol: {
    alignItems: 'center',
    flex: 1,
  },
  coordLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  coordValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  coordDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  addressBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  addressLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  addressValue: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 16,
  },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  mapBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});

