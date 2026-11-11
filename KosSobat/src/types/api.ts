export interface PenghuniProfile {
  id: string;
  nama: string;
  kamar: string;
  namaKos: string;
  avatarUrl?: string;
}

export interface Tagihan {
  id: string;
  periode: string;
  total: number;
  jatuhTempo: string;
  sisaHari: number;
  status: 'lunas' | 'belum_bayar' | 'menunggu_verifikasi';
  keterangan: string;
}

export interface Pengumuman {
  id: string;
  kategori: 'penting' | 'agenda' | 'info';
  judul: string;
  konten: string;
  tanggal: string;
  catatanPengelola?: string;
}

export interface DashboardData {
  penghuni: PenghuniProfile;
  tagihanTerkini: Tagihan;
  pengumuman: Pengumuman[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

