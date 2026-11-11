/**
 * useNotifications.ts
 * Custom hook untuk mengelola izin, pengiriman, dan listener interaksi notifikasi (Lifecycle Hook).
 * Menangani navigasi otomatis saat pengguna menekan notifikasi yang masuk.
 */

import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  initializeNotificationChannels,
  requestNotificationPermission,
  scheduleRentReminder,
  sendInstantNotification,
} from '../services/notificationService';

export function useNotifications() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [notificationLog, setNotificationLog] = useState<string | null>(null);

  const notificationListenerRef = useRef<any>(null);
  const responseListenerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Inisialisasi Channel & Cek Izin
    initializeNotificationChannels();
    requestNotificationPermission().then((granted) => {
      setHasPermission(granted);
    });

    // 2. Listener: Menerima notifikasi saat aplikasi berada di Foreground
    notificationListenerRef.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        const title = notification.request.content.title;
        setNotificationLog(`Notifikasi Diterima: ${title}`);
      });

    // 3. Listener: Interaksi pengguna menekan notifikasi (Background / Foreground)
    responseListenerRef.current =
      Notifications.addNotificationResponseReceivedListener((response: any) => {
        const data = response.notification.request.content.data;
        if (data?.route) {
          router.push(data.route as any);
        }
      });

    // 4. LIFECYCLE CLEANUP: Membersihkan listener saat unmount
    return () => {
      if (notificationListenerRef.current) {
        notificationListenerRef.current.remove();
      }
      if (responseListenerRef.current) {
        responseListenerRef.current.remove();
      }
    };
  }, []);

  const triggerInstantAlert = useCallback(async () => {
    try {
      await sendInstantNotification(
        '🚨 Peringatan Darurat Fasilitas Kos',
        'Laporan darurat Anda telah dicatat oleh sistem KosSobat dan dikirimkan ke Pengelola.',
        { route: '/complaint' }
      );
      Alert.alert('Sukses', 'Notifikasi darurat berhasil dikirim.');
    } catch (err: any) {
      Alert.alert('Gagal Mengirim', err?.message);
    }
  }, []);

  const triggerScheduledRentReminder = useCallback(
    async (seconds = 5) => {
      try {
        await scheduleRentReminder(seconds, 'Oktober 2026', 'Rp 1.150.000');
        Alert.alert(
          'Pengingat Terjadwal',
          `Notifikasi pengingat sewa kos akan muncul dalam ${seconds} detik.\n(Anda dapat mencoba meminimalkan aplikasi untuk melihat banner notifikasi).`
        );
      } catch (err: any) {
        Alert.alert('Gagal Menjadwalkan', err?.message);
      }
    },
    []
  );

  return {
    hasPermission,
    notificationLog,
    triggerInstantAlert,
    triggerScheduledRentReminder,
  };
}

