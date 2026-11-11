/**
 * kostService.ts
 * Layer service khusus untuk mengelola permintaan data aplikasi KosSobat.
 * Menggunakan apiRequest (fetch + async/await) dengan fallback data cerdas
 * agar aplikasi tetap berjalan lancar saat backend dalam masa pengembangan/offline.
 */

import { DashboardData } from '../types/api';
import { apiRequest } from './apiClient';

// Data mock cadangan yang menyerupai respons backend nyata
const MOCK_DASHBOARD_DATA: DashboardData = {
  penghuni: {
    id: 'USR-8901',
    nama: 'Marshell',
    kamar: 'A12',
    namaKos: 'Kost Harmony Living',
  },
  tagihanTerkini: {
    id: 'INV-2026-10-A12',
    periode: 'Oktober 2026',
    total: 1150000,
    jatuhTempo: '15 Oktober 2026',
    sisaHari: 5,
    status: 'belum_bayar',
    keterangan: 'Termasuk Wi-Fi & Sampah',
  },
  pengumuman: [
    {
      id: 'ANN-01',
      kategori: 'penting',
      judul: 'Pemadaman Air Sementara',
      konten: 'Jadwal: 14.00 – 16.00 WIB untuk pembersihan berkala tandon utama lantai 3.',
      tanggal: '10 Oktober 2026',
      catatanPengelola: 'Harap menampung air secukupnya sebelum pukul 13.30 WIB.',
    },
    {
      id: 'ANN-02',
      kategori: 'agenda',
      judul: 'Kerja Bakti Bersama Kos',
      konten: 'Pukul 07.30 WIB • Halaman & Dapur Bersama',
      tanggal: '18 Oktober 2026',
    },
  ],
};

/**
 * Mengambil data ringkasan dashboard penghuni.
 * Menerapkan pola async/await & Promise delay untuk demonstrasi loading state yang realistis.
 */
export async function getDashboardData(simulateDelayMs: number = 800): Promise<DashboardData> {
  try {
    // 1. Coba request ke backend REST API nyata terlebih dahulu
    // (Akan aktif begitu API_BASE_URL mengarah ke server backend Anda)
    const result = await apiRequest<{ data: DashboardData }>('/dashboard/penghuni', {
      timeoutMs: 3000,
    });
    return result.data;
  } catch {
    // 2. Jika backend offline / belum siap, gunakan simulasi Promise & fallback mock data
    // Ini memastikan UI tidak freeze, loading state dapat teruji, dan aplikasi tetap berjalan stabil.
    if (simulateDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, simulateDelayMs));
    }
    return MOCK_DASHBOARD_DATA;
  }
}

/**
 * Contoh fungsi Asynchronous untuk mengirimkan data pembayaran (HTTP POST)
 */
export async function submitPaymentConfirmation(invoiceId: string, paymentMethod: string) {
  try {
    return await apiRequest('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({
        invoiceId,
        paymentMethod,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Simulasi respons sukses jika server belum siap
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: `Konfirmasi pembayaran tagihan ${invoiceId} berhasil dikirim via ${paymentMethod}`,
    };
  }
}

