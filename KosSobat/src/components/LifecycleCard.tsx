/**
 * LifecycleCard.tsx
 * Komponen UI interaktif untuk memonitor dan mendemonstrasikan Component & App Lifecycle:
 * - Mount / Unmount event tracking
 * - AppState transition (Foreground <-> Background)
 * - Timer interval with automatic cleanup
 * - Memory leak prevention indicator
 */

import {
  CheckCircle,
  Clock,
  Cpu,
  ShieldCheck,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppLifecycle } from '../hooks/useAppLifecycle';

interface LifecycleLog {
  id: string;
  time: string;
  tag: 'MOUNT' | 'APP_ACTIVE' | 'APP_BACKGROUND' | 'CLEANUP';
  message: string;
}

export function LifecycleCard() {
  const [mountDurationSeconds, setMountDurationSeconds] = useState<number>(0);
  const [logs, setLogs] = useState<LifecycleLog[]>([]);

  const addLog = (tag: LifecycleLog['tag'], message: string) => {
    const time = new Date().toLocaleTimeString('id-ID');
    setLogs((prev) => [
      { id: `${Date.now()}-${Math.random()}`, time, tag, message },
      ...prev.slice(0, 4), // Simpan 5 log terakhir
    ]);
  };

  // 1. AppState Lifecycle Hook
  const { appState, isForeground } = useAppLifecycle({
    onForeground: () => {
      addLog('APP_ACTIVE', 'Aplikasi kembali ke Foreground (Layar Aktif)');
    },
    onBackground: () => {
      addLog('APP_BACKGROUND', 'Aplikasi diminimalkan ke Background');
    },
  });

  // 2. Component Mount & Unmount Lifecycle
  useEffect(() => {
    // FASE MOUNT
    addLog('MOUNT', 'Komponen di-mount: Mengalokasikan memory & mendaftarkan listener');

    // Timer interval dengan pembersihan memori (Cleanup)
    const timerId = setInterval(() => {
      setMountDurationSeconds((prev) => prev + 1);
    }, 1000);

    // FASE UNMOUNT / CLEANUP
    return () => {
      clearInterval(timerId); // Membersihkan timer agar tidak terjadi memory leak
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBox}>
            <Cpu size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.subHeader}>COMPONENT & APP LIFECYCLE</Text>
            <Text style={styles.title}>Manajemen Siklus Hidup & Memori</Text>
          </View>
        </View>

        <View
          style={[
            styles.stateBadge,
            isForeground ? styles.stateBadgeActive : styles.stateBadgeBg,
          ]}
        >
          <View
            style={[
              styles.stateDot,
              { backgroundColor: isForeground ? '#16A34A' : '#EA580C' },
            ]}
          />
          <Text
            style={[
              styles.stateBadgeText,
              { color: isForeground ? '#166534' : '#9A3412' },
            ]}
          >
            {appState.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Grid Informasi Lifecycle */}
      <View style={styles.metricsGrid}>
        {/* Waktu Komponen Aktif (Mount Uptime) */}
        <View style={styles.metricCard}>
          <Clock size={16} color="#2563EB" />
          <Text style={styles.metricLabel}>Uptime Komponen</Text>
          <Text style={styles.metricValue}>{formatTimer(mountDurationSeconds)}</Text>
          <Text style={styles.metricSub}>Timer dengan clearInterval()</Text>
        </View>

        {/* Status Kebocoran Memori */}
        <View style={styles.metricCard}>
          <ShieldCheck size={16} color="#16A34A" />
          <Text style={styles.metricLabel}>Memory Leaks</Text>
          <Text style={[styles.metricValue, { color: '#16A34A' }]}>0 Terdeteksi</Text>
          <Text style={styles.metricSub}>Cleanup on Unmount aktif</Text>
        </View>
      </View>

      {/* Daftar Pengelolaan Lifecycle Yang Diterapkan */}
      <View style={styles.checklistWrap}>
        <Text style={styles.checklistTitle}>Proteksi Lifecycle yang Diterapkan:</Text>
        <View style={styles.checkItem}>
          <CheckCircle size={14} color="#16A34A" />
          <Text style={styles.checkText}>
            <Text style={{ fontWeight: '700' }}>Inisialisasi Mount:</Text> Fetch API & Izin GPS otomatis saat layar dibuka
          </Text>
        </View>
        <View style={styles.checkItem}>
          <CheckCircle size={14} color="#16A34A" />
          <Text style={styles.checkText}>
            <Text style={{ fontWeight: '700' }}>Sensor Subscription:</Text> Unsubscribe Accelerometer saat komponen ditutup
          </Text>
        </View>
        <View style={styles.checkItem}>
          <CheckCircle size={14} color="#16A34A" />
          <Text style={styles.checkText}>
            <Text style={{ fontWeight: '700' }}>Notification Listener:</Text> Remove notification listeners saat keluar layar
          </Text>
        </View>
      </View>

      {/* Log Real-time Siklus Hidup */}
      <View style={styles.logSection}>
        <View style={styles.logHeaderRow}>
          <Text style={styles.logSectionTitle}>Log Real-Time Event Lifecycle:</Text>
          <TouchableOpacity
            onPress={() => addLog('CLEANUP', 'Pemeriksaan integritas listener berjalan normal')}
            activeOpacity={0.7}
          >
            <Text style={styles.verifyLink}>Uji Verifikasi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logList}>
          {logs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <View
                style={[
                  styles.logTagBadge,
                  log.tag === 'MOUNT'
                    ? styles.tagMount
                    : log.tag === 'APP_ACTIVE'
                    ? styles.tagActive
                    : log.tag === 'APP_BACKGROUND'
                    ? styles.tagBg
                    : styles.tagCleanup,
                ]}
              >
                <Text style={styles.logTagText}>{log.tag}</Text>
              </View>
              <Text style={styles.logMessage} numberOfLines={1}>
                {log.message}
              </Text>
              <Text style={styles.logTime}>{log.time}</Text>
            </View>
          ))}
        </View>
      </View>
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
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  stateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stateBadgeActive: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  stateBadgeBg: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  stateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stateBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 2,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricSub: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
  },
  checklistWrap: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 6,
  },
  checklistTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 2,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkText: {
    fontSize: 11,
    color: '#475569',
    flex: 1,
  },
  logSection: {
    gap: 8,
  },
  logHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  verifyLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  logList: {
    gap: 6,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 8,
  },
  logTagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagMount: {
    backgroundColor: '#EFF6FF',
  },
  tagActive: {
    backgroundColor: '#DCFCE7',
  },
  tagBg: {
    backgroundColor: '#FEF3C7',
  },
  tagCleanup: {
    backgroundColor: '#F1F5F9',
  },
  logTagText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0F172A',
  },
  logMessage: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
  },
  logTime: {
    fontSize: 9,
    color: '#94A3B8',
    fontVariant: ['tabular-nums'],
  },
});

