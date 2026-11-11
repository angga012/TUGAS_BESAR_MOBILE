/**
 * telephonyService.ts
 * Service untuk menangani fitur Telephony perangkat:
 * - Panggilan telepon langsung (tel: protocol)
 * - Pengiriman pesan SMS langsung (sms: protocol)
 * - Pengiriman pesan WhatsApp (wa.me)
 * Menggunakan React Native Linking dengan validasi canOpenURL.
 */

import { Alert, Linking, Platform } from 'react-native';

export const KOST_CONTACT = {
  name: 'Pak Hendra (Pengelola)',
  role: 'Pengelola Kost Harmony Living',
  phone: '081199882424',
  cleanPhone: '081199882424',
  whatsappNumber: '6281199882424',
  email: 'hendra.pengelola@kosku.id',
};

/**
 * Membuka dialer smartphone untuk melakukan panggilan telepon langsung
 */
export async function makePhoneCall(phoneNumber: string = KOST_CONTACT.phone): Promise<void> {
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
  const url = `tel:${cleanNumber}`;

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen && Platform.OS !== 'android') {
      Alert.alert(
        'Panggilan Tidak Didukung',
        `Perangkat ini tidak mendukung panggilan suara langsung.\nNomor pengelola: ${phoneNumber}`
      );
      return;
    }
    await Linking.openURL(url);
  } catch (error: any) {
    Alert.alert('Gagal Melakukan Panggilan', error?.message || 'Tidak dapat membuka aplikasi telepon.');
  }
}

/**
 * Membuka aplikasi SMS dengan nomor tujuan dan draf pesan template
 */
export async function sendSMS(
  phoneNumber: string = KOST_CONTACT.phone,
  message: string = 'Halo Pak Hendra, saya penghuni Kamar A12 ingin menanyakan perihal kos.'
): Promise<void> {
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
  const separator = Platform.OS === 'ios' ? '&' : '?';
  const encodedBody = encodeURIComponent(message);
  const url = `sms:${cleanNumber}${separator}body=${encodedBody}`;

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen && Platform.OS !== 'android') {
      Alert.alert(
        'SMS Tidak Didukung',
        `Perangkat ini tidak mendukung pengiriman SMS otomatis.\nSilakan hubungi: ${phoneNumber}`
      );
      return;
    }
    await Linking.openURL(url);
  } catch (error: any) {
    Alert.alert('Gagal Membuka SMS', error?.message || 'Tidak dapat membuka aplikasi pesan SMS.');
  }
}

/**
 * Membuka chat WhatsApp dengan nomor tujuan dan pesan terformat
 */
export async function sendWhatsApp(
  whatsappNumber: string = KOST_CONTACT.whatsappNumber,
  message: string = 'Halo Pak Hendra, saya penghuni Kamar A12 Kos Harmony Living.'
): Promise<void> {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'WhatsApp Tidak Tersedia',
        `Aplikasi WhatsApp tidak terpasang. Anda dapat menghubungi via nomor biasa: ${KOST_CONTACT.phone}`
      );
    }
  } catch (error: any) {
    Alert.alert('Gagal Membuka WhatsApp', error?.message || 'Terjadi kesalahan saat membuka WhatsApp.');
  }
}

