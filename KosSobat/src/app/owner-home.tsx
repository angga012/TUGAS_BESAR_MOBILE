import { router } from 'expo-router';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  DoorOpen,
  Eye,
  FileCheck2,
  Home,
  Image as ImageIcon,
  Layers,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Send,
  Share2,
  ShieldCheck,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OwnerHomeScreen() {
  const [selectedTechnician, setSelectedTechnician] = useState<'joko' | 'slamet'>('joko');
  const [isJokoAssigned, setIsJokoAssigned] = useState(false);
  const [isLpr1082Done, setIsLpr1082Done] = useState(false);

  const handleAssignTechnician = () => {
    setIsJokoAssigned(true);
    Alert.alert(
      'Teknisi Ditugaskan',
      'Pak Joko (Spesialis AC) telah ditugaskan ke Kamar A12 (Rifa Fauziah).\nNotifikasi otomatis terkirim ke WhatsApp & aplikasi penghuni.'
    );
  };

  const handleFinishLpr1082 = () => {
    setIsLpr1082Done(true);
    Alert.alert(
      'Tiket Selesai',
      'Laporan #LPR-1082 telah ditandai selesai.\nBiaya penggantian seal keran Rp 85.000 dicatat ke Buku Kas Pengeluaran.'
    );
  };

  const handleBroadcastWA = () => {
    Alert.alert(
      'Broadcast WhatsApp',
      'Pesan pengingat pemadaman air telah dikirim ulang ke 2 warga yang belum membaca (Kamar B04 & B09).'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.miniLogoBox}>
            <Building2 size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>KostSobat</Text>
            <Text style={styles.headerSub}>
              Pak Hendra <Text style={styles.adminRole}>Admin</Text>
            </Text>
          </View>
        </View>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.circleBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/announcements')}>
            <Bell size={18} color="#0F172A" />
            <View style={styles.notifBadgeDot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/owner-profile')}>
            <User size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Banner Anggota Aktif */}
        <View style={styles.activeBanner}>
          <View style={styles.activeDotRow}>
            <View style={styles.blueDot} />
            <Text style={styles.activeBannerTitle}>ANGGOTA AKTIF</Text>
          </View>
          <View style={styles.activeCountRow}>
            <Users size={15} color="#2563EB" />
            <Text style={styles.activeCountText}>14/16 Penghuni Online</Text>
          </View>
        </View>

        {/* 2 Stat Cards: Okupansi & Kas Masuk */}
        <View style={styles.statsTwoCol}>
          {/* Kamar Terisi */}
          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.8}
            onPress={() => router.push('/owner-rooms')}>
            <View style={styles.statHeaderRow}>
              <DoorOpen size={16} color="#2563EB" />
              <Text style={styles.statCardTitle}>Kamar Terisi</Text>
            </View>
            <View style={styles.statValueRow}>
              <Text style={styles.statBigValue}>83.3%</Text>
              <Text style={styles.statRatioText}>10/12{'\n'}Terisi</Text>
            </View>
            <View style={styles.statProgressTrack}>
              <View style={[styles.statProgressFill, { width: '83.3%' }]} />
            </View>
            <Text style={styles.statFooterText}>
              Kosong: <Text style={{ fontWeight: '800' }}>Kmr 04 & 09</Text>
            </Text>
          </TouchableOpacity>

          {/* Kas Masuk */}
          <View style={styles.statCard}>
            <View style={styles.statHeaderRow}>
              <Wallet size={16} color="#2563EB" />
              <Text style={styles.statCardTitle}>Kas Masuk (Bln Ini)</Text>
            </View>
            <View style={styles.statValueCol}>
              <Text style={styles.statBigCash}>Rp 16.100.000</Text>
              <Text style={styles.statCashTarget}>Target: Rp 18.400.000</Text>
            </View>
            <View style={styles.statProgressTrack}>
              <View style={[styles.statProgressFill, { width: '87.5%' }]} />
            </View>
            <View style={styles.tersisaBadge}>
              <CheckCircle2 size={11} color="#059669" />
              <Text style={styles.tersisaText}>Tersisa Rp 2.300.000</Text>
            </View>
          </View>
        </View>

        {/* Section: Pembayaran Masuk */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.sectionTitle}>Pembayaran Masuk</Text>
            <TouchableOpacity onPress={() => router.push('/payment')}>
              <Text style={styles.seeAllLink}>Riwayat &gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.paymentCardTop}>
              <View style={styles.receiptIconBox}>
                <CreditCard size={18} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.tenantNameRow}>
                  <Text style={styles.tenantName}>Rifa Fauziah</Text>
                  <View style={styles.roomBadge}>
                    <Text style={styles.roomBadgeText}>Kamar A12</Text>
                  </View>
                </View>
                <Text style={styles.paymentSub}>
                  Sewa Oktober 2026 • BCA Transfer
                </Text>
              </View>
              <View style={styles.cashPill}>
                <Text style={styles.cashPillText}>Rp 1.150.000</Text>
              </View>
            </View>

            {/* Struk Valid Verification Callout */}
            <View style={styles.strukValidBox}>
              <View style={styles.strukThumbBox}>
                <ImageIcon size={22} color="#2563EB" />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.strukValidRow}>
                  <CheckCircle2 size={13} color="#16A34A" />
                  <Text style={styles.strukValidTitle}>
                    Struk Valid: Cocok 100%
                  </Text>
                </View>
                <Text style={styles.strukFileName}>TRF-BCA-88392104.jpg</Text>
                <Text style={styles.strukTime}>
                  Masuk 14 menit lalu via Portal User
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section: Disposisi Tiket & Teknisi */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.blueDot} />
              <Text style={styles.sectionTitle}>Disposisi Tiket & Teknisi</Text>
            </View>
            <Text style={styles.subCaption}>Lapor Kerusakan Aktif</Text>
          </View>

          {/* Ticket 1: AC Kamar Menetes */}
          <View style={styles.ticketCard}>
            <View style={styles.ticketHeaderRow}>
              <View style={styles.ticketIdBadge}>
                <Text style={styles.ticketIdText}>#LPR-1090</Text>
              </View>
              <Text style={styles.ticketTimeText}>28 menit lalu</Text>
              <View style={styles.priorityHighBadge}>
                <Text style={styles.priorityHighText}>Prioritas Tinggi</Text>
              </View>
            </View>

            <Text style={styles.ticketTitle}>AC Kamar Menetes & Berisik</Text>
            <Text style={styles.ticketReporter}>
              Dilaporkan oleh: <Text style={{ fontWeight: '800' }}>Rifa Fauziah (Kamar A12)</Text>
            </Text>

            {/* Attachment note */}
            <View style={styles.photoAttachedBox}>
              <View style={styles.photoThumbPlaceholder}>
                <Wrench size={20} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.photoAttachedHeading}>
                  Foto Lampiran Penghuni
                </Text>
                <Text style={styles.photoAttachedDesc}>
                  Bocoran air mengenai meja belajar samping ranjang. Diperlukan
                  tindakan cepat sebelum malam.
                </Text>
              </View>
            </View>

            {/* Technician selection */}
            <Text style={styles.selectTechHeading}>
              Pilih Teknisi Siaga Terdekat:
            </Text>

            {/* Option 1: Pak Joko */}
            <TouchableOpacity
              style={[
                styles.techOptionCard,
                selectedTechnician === 'joko' && styles.techOptionActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedTechnician('joko')}>
              <View
                style={[
                  styles.radioCircle,
                  selectedTechnician === 'joko' && styles.radioCircleActive,
                ]}>
                {selectedTechnician === 'joko' && <View style={styles.radioInnerDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.techName}>Pak Joko (Spesialis AC)</Text>
                <Text style={styles.techMeta}>
                  Siaga: 14:00 WIB • ⭐ 4.9 (42 servis)
                </Text>
              </View>
              <View style={styles.rekomendasiBadge}>
                <Text style={styles.rekomendasiText}>Rekomendasi</Text>
              </View>
            </TouchableOpacity>

            {/* Option 2: Mas Slamet */}
            <TouchableOpacity
              style={[
                styles.techOptionCard,
                selectedTechnician === 'slamet' && styles.techOptionActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedTechnician('slamet')}>
              <View
                style={[
                  styles.radioCircle,
                  selectedTechnician === 'slamet' && styles.radioCircleActive,
                ]}>
                {selectedTechnician === 'slamet' && (
                  <View style={styles.radioInnerDot} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.techName}>Mas Slamet (Listrik/Pipa)</Text>
                <Text style={styles.techMeta}>
                  Siaga: 15:30 WIB • ⭐ 4.7 (28 servis)
                </Text>
              </View>
              <View style={styles.standbyBadge}>
                <Text style={styles.standbyText}>Standby</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.assignBtn,
                isJokoAssigned && styles.assignBtnDone,
              ]}
              activeOpacity={0.8}
              onPress={handleAssignTechnician}>
              <UserCheck size={16} color="#FFFFFF" />
              <Text style={styles.assignBtnText}>
                {isJokoAssigned
                  ? '✓ Teknisi Berhasil Ditugaskan'
                  : 'Tugaskan Pak Joko Sekarang'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.assignSubNote}>
              Aplikasi Rifa langsung beralih ke 'Tahap 3: Teknisi Menuju Kamar'
            </Text>
          </View>

          {/* Ticket 2: Keran Air Wastafel Bocor */}
          {!isLpr1082Done && (
            <View style={styles.ticketCard}>
              <View style={styles.ticketHeaderRow}>
                <View style={styles.ticketIdBadge}>
                  <Text style={styles.ticketIdText}>#LPR-1082</Text>
                </View>
                <Text style={styles.ticketTimeText}>Kamar B03 (Andi)</Text>
                <View style={styles.tahapBadge}>
                  <Text style={styles.tahapBadgeText}>Tahap 3 (75% Selesai)</Text>
                </View>
              </View>

              <View style={styles.ticketTitleRow}>
                <Text style={styles.ticketTitle}>Keran Air Wastafel Bocor</Text>
                <Text style={styles.techAssignee}>Oleh: Pak Joko</Text>
              </View>

              <View style={styles.statProgressTrack}>
                <View style={[styles.statProgressFill, { width: '75%' }]} />
              </View>

              <View style={styles.ticketCostRow}>
                <Text style={styles.costItem}>Penggantian Seal Keran</Text>
                <Text style={styles.costVal}>Biaya Part: Rp 85.000</Text>
              </View>

              <TouchableOpacity
                style={styles.finishBtn}
                activeOpacity={0.8}
                onPress={handleFinishLpr1082}>
                <CheckCircle2 size={15} color="#1E40AF" />
                <Text style={styles.finishBtnText}>
                  Tandai Selesai & Catat Kas Keluar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Section: Siaran Warga & Kalender Agenda */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.blueDot} />
              <Text style={styles.sectionTitle}>
                Siaran Warga & Kalender Agenda
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Buat Siaran Baru',
                  'Ketik judul pengumuman dan lampiran untuk disiarkan ke seluruh penghuni kos.'
                )
              }>
              <Text style={styles.seeAllLink}>+ Buat Baru</Text>
            </TouchableOpacity>
          </View>

          {/* Siaran 1 */}
          <View style={styles.broadcastCard}>
            <View style={styles.broadcastHeaderRow}>
              <View style={styles.broadcastIconBox}>
                <Megaphone size={16} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.terkirimTag}>
                  <Text style={styles.terkirimTagText}>PENGUMUMAN TERKIRIM</Text>
                </View>
                <Text style={styles.broadcastTitle}>
                  Pemadaman Air & Kuras Tandon Sentral
                </Text>
              </View>
            </View>

            <View style={styles.broadcastDateBox}>
              <Calendar size={13} color="#64748B" />
              <Text style={styles.broadcastDateText}>
                10 Oktober 2026 • 14.00 - 16.00 WIB
              </Text>
            </View>
            <Text style={styles.broadcastBody}>
              Pembersihan berkala tandon atas. Mohon tampung air cadangan
              secukupnya di ember masing-masing kamar mandi.
            </Text>

            <View style={styles.broadcastFooterRow}>
              <View style={styles.readStatsRow}>
                <CheckCircle2 size={13} color="#2563EB" />
                <Text style={styles.readStatsText}>
                  Dibaca: <Text style={{ fontWeight: '800' }}>14 dari 16 Warga</Text>{' '}
                  (2 Belum: B04, B09)
                </Text>
              </View>

              <TouchableOpacity
                style={styles.broadcastBtn}
                activeOpacity={0.8}
                onPress={handleBroadcastWA}>
                <Send size={12} color="#2563EB" />
                <Text style={styles.broadcastBtnText}>Broadcast Ulang WA</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Agenda Komunitas */}
          <View style={styles.broadcastCard}>
            <View style={styles.broadcastHeaderRow}>
              <View style={styles.broadcastIconBox}>
                <Calendar size={16} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.komunitasTag}>
                  <Text style={styles.komunitasTagText}>
                    AGENDA KOMUNITAS KOS
                  </Text>
                </View>
                <Text style={styles.broadcastTitle}>
                  Kerja Bakti & Sanitasi Bersama
                </Text>
              </View>
              <View style={styles.agendaDatePill}>
                <Text style={styles.agendaDatePillText}>Minggu, 18 Okt</Text>
              </View>
            </View>

            <View style={styles.agendaStatsThreeCol}>
              <View style={styles.statColMini}>
                <Text style={styles.statColMiniLabel}>Konfirmasi Hadir</Text>
                <Text style={[styles.statColMiniVal, { color: '#2563EB' }]}>
                  14 Warga
                </Text>
              </View>
              <View style={styles.statColMini}>
                <Text style={styles.statColMiniLabel}>Izin Berhalangan</Text>
                <Text style={[styles.statColMiniVal, { color: '#DC2626' }]}>
                  1 (Bayau K07)
                </Text>
              </View>
              <View style={styles.statColMini}>
                <Text style={styles.statColMiniLabel}>Tanpa Respon</Text>
                <Text style={[styles.statColMiniVal, { color: '#64748B' }]}>
                  1 Kamar
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.newAgendaBtn}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Buat Agenda Baru',
                  'Jadwalkan kegiatan baru seperti iuran kas, fogging, atau rapat penghuni.'
                )
              }>
              <Plus size={15} color="#FFFFFF" />
              <Text style={styles.newAgendaBtnText}>
                + Buat Agenda / Siaran Baru
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Home size={21} color="#2563EB" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/owner-forum')}>
          <View style={{ position: 'relative' }}>
            <MessageSquare size={21} color="#64748B" />
            <View style={styles.navChatDot} />
          </View>
          <Text style={styles.navLabel}>Forum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/owner-profile')}>
          <Building2 size={21} color="#64748B" />
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniLogoBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  adminRole: {
    color: '#2563EB',
    fontWeight: '800',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // Active Member Banner
  activeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  activeDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blueDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2563EB',
  },
  activeBannerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
    letterSpacing: 0.5,
  },
  activeCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },

  // 2 Stat Cards
  statsTwoCol: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  statHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  statValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBigValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2563EB',
  },
  statRatioText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'right',
  },
  statValueCol: {
    gap: 2,
  },
  statBigCash: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  statCashTarget: {
    fontSize: 10,
    color: '#64748B',
  },
  statProgressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statProgressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  statFooterText: {
    fontSize: 10,
    color: '#64748B',
  },
  tersisaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  tersisaText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },

  // Sections
  sectionWrap: {
    gap: 10,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  seeAllLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  subCaption: {
    fontSize: 11,
    color: '#64748B',
  },

  // Payment Card
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  paymentCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  receiptIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tenantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tenantName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  roomBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roomBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  paymentSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  cashPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cashPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  strukValidBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    alignItems: 'center',
  },
  strukThumbBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  strukValidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  strukValidTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  strukFileName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
  },
  strukTime: {
    fontSize: 9,
    color: '#94A3B8',
  },

  // Tickets
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  ticketHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketIdBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ticketIdText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  ticketTimeText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
  },
  priorityHighBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  priorityHighText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  ticketReporter: {
    fontSize: 11,
    color: '#64748B',
  },
  photoAttachedBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  photoThumbPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoAttachedHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  photoAttachedDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  selectTechHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
  techOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  techOptionActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#2563EB',
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  techName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  techMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  rekomendasiBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  rekomendasiText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E40AF',
  },
  standbyBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  standbyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  assignBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 4,
  },
  assignBtnDone: {
    backgroundColor: '#16A34A',
  },
  assignBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  assignSubNote: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },

  // Ticket 2
  tahapBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tahapBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  ticketTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techAssignee: {
    fontSize: 11,
    color: '#64748B',
  },
  ticketCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costItem: {
    fontSize: 11,
    color: '#64748B',
  },
  costVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginTop: 4,
  },
  finishBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E40AF',
  },

  // Broadcasts
  broadcastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  broadcastHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  broadcastIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  terkirimTag: {
    alignSelf: 'flex-start',
  },
  terkirimTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  broadcastTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  broadcastDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  broadcastDateText: {
    fontSize: 11,
    color: '#64748B',
  },
  broadcastBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  broadcastFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  readStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  readStatsText: {
    fontSize: 10,
    color: '#64748B',
  },
  broadcastBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  broadcastBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  komunitasTag: {
    alignSelf: 'flex-start',
  },
  komunitasTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  agendaDatePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  agendaDatePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  agendaStatsThreeCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  statColMini: {
    alignItems: 'center',
    gap: 2,
  },
  statColMiniLabel: {
    fontSize: 9,
    color: '#64748B',
  },
  statColMiniVal: {
    fontSize: 12,
    fontWeight: '800',
  },
  newAgendaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  newAgendaBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 10,
    paddingBottom: 20,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minWidth: 60,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  navLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
  navChatDot: {
    position: 'absolute',
    top: -1,
    right: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
});

