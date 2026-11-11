import { router } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  Clock,
  Edit2,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  PlusCircle,
  ShieldAlert,
  Star,
  Wrench,
  X,
} from 'lucide-react-native';
import { useState } from 'react';
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
import { KOST_CONTACT, makePhoneCall } from '../services/telephonyService';

type FilterTab = 'semua' | 'dikerjakan' | 'verifikasi' | 'selesai';

export default function ComplaintScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab>('semua');

  const handleHubungiSegera = () => {
    Alert.alert(
      'Hubungi Pengelola',
      `HOTLINE 24 JAM\n${KOST_CONTACT.phone}\n\n${KOST_CONTACT.name}\n\nHubungi sekarang untuk keadaan darurat?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: '📞 Hubungi', onPress: () => makePhoneCall(KOST_CONTACT.phone) },
      ]
    );
  };

  const handleEditLaporan = () => {
    Alert.alert('Edit Laporan', 'Fitur edit laporan #LPR-1090 (AC Kamar Kurang Dingin & Menetes)');
  };

  const handleBatalkanLaporan = () => {
    Alert.alert(
      'Batalkan Laporan',
      'Apakah Anda yakin ingin membatalkan laporan #LPR-1090?',
      [
        { text: 'Tidak', style: 'cancel' },
        { text: 'Ya, Batalkan', style: 'destructive', onPress: () => Alert.alert('Laporan dibatalkan') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.circleBtn} activeOpacity={0.7} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Lapor Kerusakan & Keluhan Fasil</Text>
        <TouchableOpacity style={styles.circleBtn} activeOpacity={0.7}>
          <HelpCircle size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Banner Pusat Bantuan */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerIconBox}>
            <Wrench size={24} color="#FFFFFF" />
          </View>
          <View style={styles.bannerTextBox}>
            <Text style={styles.bannerTitle}>Pusat Bantuan Fasilitas</Text>
            <Text style={styles.bannerDesc}>
              Pusat Pengaduan Fasilitas Kos. Laporkan kendala kamar atau area bersama, teknisi akan
              segera menindaklanjuti.
            </Text>
          </View>
        </View>

        {/* Tombol Buat Laporan Baru */}
        <TouchableOpacity
          style={styles.newReportBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert('Buat Laporan Baru', 'Form buat laporan kerusakan baru akan ditampilkan.')}>
          <PlusCircle size={20} color="#FFFFFF" />
          <Text style={styles.newReportBtnText}>+ Buat Laporan Kerusakan Baru</Text>
        </TouchableOpacity>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {(
            [
              { key: 'semua', label: 'Semua (3)' },
              { key: 'dikerjakan', label: 'Sedang Dikerjakan (1)' },
              { key: 'verifikasi', label: 'Menunggu Verifikasi' },
              { key: 'selesai', label: 'Selesai' },
            ] as { key: FilterTab; label: string }[]
          ).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.filterTab, activeTab === tab.key && styles.filterTabActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.key)}>
              <Text style={[styles.filterTabText, activeTab === tab.key && styles.filterTabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ==================== LAPORAN #1: SEDANG DIPERBAIKI ==================== */}
        <View style={styles.reportCard}>
          {/* Header Card */}
          <View style={styles.reportCardHeader}>
            <View style={styles.reportMeta}>
              <Text style={styles.reportId}>#LPR-1082</Text>
              <View style={styles.dotSep} />
              <Clock size={12} color="#64748B" />
              <Text style={styles.reportTime}>Kemarin, 16.20 WIB</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: '#DBEAFE' }]}>
              <View style={[styles.statusDot, { backgroundColor: '#2563EB' }]} />
              <Text style={[styles.statusText, { color: '#1D4ED8' }]}>Sedang Diperbaiki</Text>
            </View>
          </View>

          <Text style={styles.reportTitle}>Keran Air Kamar Mandi Bocor</Text>

          <View style={styles.reportLocationRow}>
            <MapPin size={12} color="#64748B" />
            <Text style={styles.reportLocation}>Kamar A12 (Lantai 1)</Text>
          </View>

          {/* Foto Placeholder */}
          <View style={styles.reportPhotoBox}>
            <View style={styles.reportPhotoInner}>
              <Wrench size={28} color="#93C5FD" />
            </View>
            <View style={styles.photoLabelBadge}>
              <Text style={styles.photoLabelText}>📷 Foto Terlampir</Text>
            </View>
          </View>

          {/* Progress Stepper */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Progres Penanganan</Text>
              <Text style={styles.progressPercent}>Tahap 3 dari 4 (75%)</Text>
            </View>

            <View style={styles.stepperRow}>
              {/* Step 1: Diterima */}
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, styles.stepDone]}>
                  <CheckCircle2 size={18} color="#FFFFFF" />
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelDone]}>Diterima</Text>
              </View>
              <View style={[styles.stepLine, styles.stepLineDone]} />

              {/* Step 2: Verifikasi */}
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, styles.stepDone]}>
                  <CheckCircle2 size={18} color="#FFFFFF" />
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelDone]}>Verifikasi</Text>
              </View>
              <View style={[styles.stepLine, styles.stepLineDone]} />

              {/* Step 3: Teknisi Aktif - CURRENT */}
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, styles.stepActive]}>
                  <Wrench size={16} color="#FFFFFF" />
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Teknisi Aktif</Text>
              </View>
              <View style={[styles.stepLine, styles.stepLinePending]} />

              {/* Step 4: Selesai */}
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, styles.stepPending]}>
                  <CircleDashed size={18} color="#CBD5E1" />
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelPending]}>Selesai</Text>
              </View>
            </View>
          </View>

          {/* Teknisi Card */}
          <View style={styles.technicianCard}>
            <View style={styles.technicianAvatar}>
              <Text style={styles.technicianInitial}>PJ</Text>
            </View>
            <View style={styles.technicianInfo}>
              <Text style={styles.technicianName}>Pak Joko</Text>
              <Text style={styles.technicianRole}>Teknisi Sanitasi & Plumbing</Text>
            </View>
            <TouchableOpacity
              style={styles.techActionBtn}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Hubungi Teknisi', 'Menghubungi Pak Joko...')}>
              <Phone size={16} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.techActionBtn}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Chat Teknisi', 'Membuka chat dengan Pak Joko...')}>
              <MessageCircle size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Catatan Teknisi */}
          <View style={styles.techNoteBox}>
            <Edit2 size={12} color="#64748B" />
            <Text style={styles.techNoteText}>
              Catatan Teknisi: "Membawa seal karet baru pengganti keran kuningan. Pengerjaan
              perkiraan 25 menit."
            </Text>
          </View>
        </View>

        {/* ==================== LAPORAN #2: MENUNGGU JADWAL ==================== */}
        <View style={styles.reportCard}>
          <View style={styles.reportCardHeader}>
            <View style={styles.reportMeta}>
              <Text style={styles.reportId}>#LPR-1090</Text>
              <View style={styles.dotSep} />
              <Clock size={12} color="#64748B" />
              <Text style={styles.reportTime}>Hari ini, 08.15 WIB</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: '#FEF9C3' }]}>
              <View style={[styles.statusDot, { backgroundColor: '#CA8A04' }]} />
              <Text style={[styles.statusText, { color: '#92400E' }]}>Menunggu Jadwal</Text>
            </View>
          </View>

          <Text style={styles.reportTitle}>AC Kamar Kurang Dingin & Menetes</Text>

          <View style={styles.reportLocationRow}>
            <MapPin size={12} color="#64748B" />
            <Text style={styles.reportLocation}>Kamar A12 (Lantai 1)</Text>
          </View>

          <Text style={styles.reportDesc}>
            Suhu AC disetel 18°C tapi tetap terasa gerah dan ada tetesan air di bawah unit indoor
            menetes ke meja belajar.
          </Text>

          {/* Action Buttons */}
          <View style={styles.reportActionRow}>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.8}
              onPress={handleEditLaporan}>
              <Edit2 size={14} color="#374151" />
              <Text style={styles.editBtnText}>Edit Laporan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.8}
              onPress={handleBatalkanLaporan}>
              <X size={14} color="#DC2626" />
              <Text style={styles.cancelBtnText}>Batalkan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ==================== LAPORAN #3: SELESAI ==================== */}
        <View style={[styles.reportCard, styles.reportCardDone]}>
          <View style={styles.reportCardHeader}>
            <View style={styles.reportMeta}>
              <Text style={styles.reportId}>#LPR-1079</Text>
              <View style={styles.dotSep} />
              <Text style={styles.reportTime}>Tuntas 08 Okt 2026</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: '#DCFCE7' }]}>
              <CheckCircle2 size={12} color="#16A34A" />
              <Text style={[styles.statusText, { color: '#15803D' }]}>Selesai</Text>
            </View>
          </View>

          <Text style={styles.reportTitle}>Lampu Koridor Depan Kamar Mati</Text>

          <View style={styles.reportLocationRow}>
            <MapPin size={12} color="#64748B" />
            <Text style={styles.reportLocation}>Area Bersama - Koridor Lt 1</Text>
          </View>

          <View style={styles.resolvedNoteBox}>
            <Text style={styles.resolvedNoteText}>
              "Bohlam LED Philips 14W telah diganti baru. Jalur kelistrikan dites aman."
            </Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Kepuasan Pelayanan:</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} color="#F59E0B" fill="#F59E0B" />
              ))}
              <Text style={styles.ratingScore}>5.0</Text>
            </View>
          </View>
        </View>

        {/* ==================== KERUSAKAN DARURAT 24 JAM ==================== */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <View style={styles.emergencyIconBox}>
              <ShieldAlert size={22} color="#DC2626" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.emergencyTitle}>Kerusakan Darurat 24 Jam</Text>
              <Text style={styles.emergencyDesc}>
                Pipa air utama pecah, banjir, korsleting listrik, atau bau gas.
              </Text>
            </View>
          </View>

          <View style={styles.emergencyBottom}>
            <View>
              <Text style={styles.hotlineLabel}>HOTLINE PENGELOLA KOS</Text>
              <Text style={styles.hotlineNumber}>0811-9988-2424</Text>
            </View>
            <TouchableOpacity
              style={styles.hubungiBtn}
              activeOpacity={0.85}
              onPress={handleHubungiSegera}>
              <Phone size={15} color="#FFFFFF" />
              <Text style={styles.hubungiBtnText}>Hubungi Segera</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => router.push('/home')}>
          <View style={styles.navItemInner}>
            <Wrench size={22} color="#2563EB" />
            <Text style={[styles.navLabel, { color: '#2563EB' }]}>Laporan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => router.push('/home')}>
          <View style={styles.navItemInner}>
            <AlertTriangle size={22} color="#94A3B8" />
            <Text style={styles.navLabel}>Beranda</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <View style={styles.navItemInner}>
            <MessageCircle size={22} color="#94A3B8" />
            <Text style={styles.navLabel}>Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  topBarTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', flex: 1, textAlign: 'center', marginHorizontal: 8 },

  // Banner
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 14,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextBox: { flex: 1 },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  bannerDesc: { fontSize: 12, color: '#BFDBFE', lineHeight: 18 },

  // New Report Button
  newReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  newReportBtnText: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },

  // Filter Tabs
  tabScroll: { marginBottom: 14 },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  filterTabText: { fontSize: 13, fontWeight: '600', color: '#475569' },
  filterTabTextActive: { color: '#FFFFFF' },

  // Report Card
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    gap: 10,
  },
  reportCardDone: { borderLeftWidth: 3, borderLeftColor: '#16A34A' },

  reportCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reportMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  reportId: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  dotSep: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CBD5E1' },
  reportTime: { fontSize: 11, color: '#64748B' },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700' },

  reportTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', lineHeight: 23 },
  reportLocationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reportLocation: { fontSize: 12, color: '#64748B' },
  reportDesc: { fontSize: 13, color: '#475569', lineHeight: 19 },

  // Photo Box
  reportPhotoBox: {
    height: 140,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  reportPhotoInner: { alignItems: 'center', justifyContent: 'center' },
  photoLabelBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  photoLabelText: { fontSize: 11, color: '#FFFFFF', fontWeight: '600' },

  // Progress Stepper
  progressSection: { gap: 10 },
  progressLabelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressLabel: { fontSize: 12, fontWeight: '600', color: '#374151' },
  progressPercent: { fontSize: 12, fontWeight: '700', color: '#2563EB' },

  stepperRow: { flexDirection: 'row', alignItems: 'center' },
  stepItem: { alignItems: 'center', gap: 4 },
  stepLine: { flex: 1, height: 2, marginBottom: 14 },
  stepLineDone: { backgroundColor: '#2563EB' },
  stepLinePending: { backgroundColor: '#E2E8F0' },

  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDone: { backgroundColor: '#2563EB' },
  stepActive: { backgroundColor: '#0F172A' },
  stepPending: { backgroundColor: '#F1F5F9', borderWidth: 1.5, borderColor: '#E2E8F0' },

  stepLabel: { fontSize: 10, fontWeight: '600', textAlign: 'center', maxWidth: 60 },
  stepLabelDone: { color: '#2563EB' },
  stepLabelActive: { color: '#0F172A' },
  stepLabelPending: { color: '#94A3B8' },

  // Technician Card
  technicianCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  technicianAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  technicianInitial: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  technicianInfo: { flex: 1 },
  technicianName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  technicianRole: { fontSize: 11, color: '#64748B', marginTop: 1 },
  techActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  // Tech Note
  techNoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F9FF',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  techNoteText: { flex: 1, fontSize: 12, color: '#0369A1', lineHeight: 17, fontStyle: 'italic' },

  // Report Action Buttons
  reportActionRow: { flexDirection: 'row', gap: 10 },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  editBtnText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  cancelBtnText: { fontSize: 13, fontWeight: '600', color: '#DC2626' },

  // Resolved Note
  resolvedNoteBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  resolvedNoteText: { fontSize: 12, color: '#15803D', lineHeight: 17, fontStyle: 'italic' },

  // Rating
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingLabel: { fontSize: 12, color: '#475569' },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingScore: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginLeft: 4 },

  // Emergency Card
  emergencyCard: {
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    marginBottom: 4,
  },
  emergencyHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  emergencyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: { fontSize: 16, fontWeight: '800', color: '#DC2626', marginBottom: 4 },
  emergencyDesc: { fontSize: 12, color: '#B91C1C', lineHeight: 17 },
  emergencyBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hotlineLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', letterSpacing: 0.5 },
  hotlineNumber: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  hubungiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
    gap: 6,
    elevation: 3,
    shadowColor: '#DC2626',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  hubungiBtnText: { fontSize: 13, fontWeight: '800', color: '#FFFFFF' },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 4,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  navItemInner: { alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 11, fontWeight: '600', color: '#94A3B8' },
});

