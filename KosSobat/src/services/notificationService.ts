/**
 * notificationService.ts
 * Service untuk mengelola notifikasi lokal menggunakan expo-notifications:
 * - Handler notifikasi saat aplikasi berada di foreground
 * - Konfigurasi Notification Channel untuk Android
 * - Permintaan izin notifikasi
 * - Pengiriman notifikasi instan & terjadwal
 */

import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Konfigurasi bagaimana notifikasi ditampilkan saat aplikasi aktif (Foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Inisialisasi Android Notification Channel (Wajib untuk Android 8.0+)
 */
export async function initializeNotificationChannels(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('kossobat-channel', {
      name: 'Notifikasi KosSobat',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2563EB',
      sound: 'default',
    });
  }
}

/**
 * Meminta izin notifikasi kepada pengguna
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Mengirim notifikasi lokal instan (Langsung muncul)
 */
export async function sendInstantNotification(
  title: string,
  body: string,
  data: Record<string, any> = {}
): Promise<string> {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    Alert.alert('Izin Notifikasi', 'Harap izinkan notifikasi untuk menerima peringatan dari KosSobat.');
    throw new Error('Izin notifikasi tidak diberikan');
  }

  await initializeNotificationChannels();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null, // null berarti langsung dikirim saat ini
  });

  return id;
}

/**
 * Menjadwalkan pengingat jatuh tempo sewa kos (Scheduled Notification)
 * @param secondsDelay Jeda waktu dalam detik sebelum notifikasi muncul
 */
export async function scheduleRentReminder(
  secondsDelay: number = 5,
  period = 'Oktober 2026',
  amount = 'Rp 1.150.000'
): Promise<string> {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    Alert.alert('Izin Notifikasi', 'Harap izinkan notifikasi untuk mengaktifkan pengingat sewa otomatis.');
    throw new Error('Izin notifikasi tidak diberikan');
  }

  await initializeNotificationChannels();

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '📅 Pengingat Jatuh Tempo Sewa Kos',
      body: `Tagihan periode ${period} (${amount}) jatuh tempo segera. Segera bayar untuk menghindari denda sewa.`,
      data: { route: '/payment', invoicePeriod: period },
      sound: true,
    },
    trigger: {
      seconds: secondsDelay,
    },
  });

  return id;
}

/**
 * Membatalkan semua notifikasi yang sedang terjadwal
 */
export async function cancelAllScheduledNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
