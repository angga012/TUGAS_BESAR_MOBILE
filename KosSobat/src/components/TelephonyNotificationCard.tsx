/**
 * TelephonyNotificationCard.tsx
 * Komponen UI untuk Telephony & Notifications:
 * - Aksi Panggilan Telepon (tel:)
 * - Kirim SMS Cepat (sms:)
 * - Chat WhatsApp Pengelola (wa.me)
 * - Pemicu Notifikasi Instan & Terjadwal (expo-notifications)
 */

import {
  Bell,
  Clock,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../hooks/useNotifications';
import {
  KOST_CONTACT,
  makePhoneCall,
  sendSMS,
  sendWhatsApp,
} from '../services/telephonyService';

export function TelephonyNotificationCard() {
  const {
    hasPermission,
    notificationLog,
    triggerInstantAlert,
    triggerScheduledRentReminder,
  } = useNotifications();

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBox}>
            <PhoneCall size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.subHeader}>TELEPHONY & NOTIFICATIONS</Text>
            <Text style={styles.title}>Hotline & Peringatan Cepat</Text>
          </View>
        </View>

        <View
          style={[
            styles.permBadge,
            hasPermission ? styles.permBadgeActive : styles.permBadgeInactive,
          ]}
        >
          {hasPermission ? (
            <ShieldCheck size={12} color="#166534" />
          ) : (
            <ShieldAlert size={12} color="#9A3412" />
          )}
          <Text
            style={[
              styles.permBadgeText,
              hasPermission ? styles.permTextActive : styles.permTextInactive,
            ]}
          >
            {hasPermission ? 'Notif Aktif' : 'Izin Notif Diperlukan'}
          </Text>
        </View>
      </View>

      {/* Bagian 1: Tombol Telephony Cepat */}
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}>
          Hubungi Hotline Pengelola ({KOST_CONTACT.phone})
        </Text>
        <View style={styles.telephonyGrid}>
          {/* Panggilan Telepon */}
          <TouchableOpacity
            style={[styles.telBtn, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}
            onPress={() => makePhoneCall()}
            activeOpacity={0.8}
          >
            <View style={[styles.telIconCircle, { backgroundColor: '#DBEAFE' }]}>
              <Phone size={16} color="#2563EB" />
            </View>
            <Text style={[styles.telBtnText, { color: '#1E40AF' }]}>Telepon</Text>
          </TouchableOpacity>

          {/* Kirim SMS */}
          <TouchableOpacity
            style={[styles.telBtn, { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}
            onPress={() =>
              sendSMS(
                KOST_CONTACT.phone,
                'Halo Pak Hendra, saya Marshell dari Kamar A12 ingin menanyakan perihal kos.'
              )
            }
            activeOpacity={0.8}
          >
            <View style={[styles.telIconCircle, { backgroundColor: '#F1F5F9' }]}>
              <MessageSquare size={16} color="#475569" />
            </View>
            <Text style={[styles.telBtnText, { color: '#334155' }]}>Kirim SMS</Text>
          </TouchableOpacity>

          {/* Chat WhatsApp */}
          <TouchableOpacity
            style={[styles.telBtn, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}
            onPress={() =>
              sendWhatsApp(
                KOST_CONTACT.whatsappNumber,
                'Halo Pak Hendra, saya penghuni Kamar A12 Kost Harmony Living.'
              )
            }
            activeOpacity={0.8}
          >
            <View style={[styles.telIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MessageCircle size={16} color="#16A34A" />
            </View>
            <Text style={[styles.telBtnText, { color: '#15803D' }]}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bagian 2: Tombol Uji Notifikasi */}
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}>Sistem Notifikasi Lokal (Pengingat & Peringatan)</Text>
        <View style={styles.notifActionRow}>
          {/* Jadwalkan Notifikasi Sewa */}
          <TouchableOpacity
            style={styles.notifBtnSchedule}
            onPress={() => triggerScheduledRentReminder(5)}
            activeOpacity={0.85}
          >
            <Clock size={16} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.notifBtnTitle}>Jadwalkan Pengingat Sewa</Text>
              <Text style={styles.notifBtnSub}>Muncul otomatis dalam 5 detik</Text>
            </View>
          </TouchableOpacity>

          {/* Notifikasi Instan Darurat */}
          <TouchableOpacity
            style={styles.notifBtnInstant}
            onPress={triggerInstantAlert}
            activeOpacity={0.85}
          >
            <Zap size={16} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.notifBtnTitle}>Notifikasi Darurat Instan</Text>
              <Text style={styles.notifBtnSub}>Peringatan perbaikan fasilitas</Text>
            </View>
          </TouchableOpacity>
        </View>

        {notificationLog && (
          <View style={styles.logBox}>
            <Bell size={12} color="#2563EB" />
            <Text style={styles.logText} numberOfLines={1}>
              {notificationLog}
            </Text>
          </View>
        )}
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
  permBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  permBadgeActive: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  permBadgeInactive: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  permBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  permTextActive: {
    color: '#166534',
  },
  permTextInactive: {
    color: '#9A3412',
  },
  sectionWrap: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  telephonyGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  telBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  telIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  notifActionRow: {
    gap: 8,
  },
  notifBtnSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  notifBtnInstant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#DC2626',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  notifBtnTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  notifBtnSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 1,
  },
  logBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logText: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '600',
  },
});

