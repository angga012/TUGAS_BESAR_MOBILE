import { router } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  DoorOpen,
  Download,
  Edit2,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck2,
  FileDown,
  Flame,
  Home,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Moon,
  Phone,
  Plus,
  QrCode,
  RefreshCw,
  Send,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
import { KOST_CONTACT, makePhoneCall } from '../services/telephonyService';

export default function OwnerProfileScreen() {
  const [roomPin, setRoomPin] = useState('#9182*');
  const [gatePin, setGatePin] = useState('#4829*');
  const [isFrozen, setIsFrozen] = useState(false);

  const handleGenerateRoomPin = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newPin = `#${randomCode}*`;
    setRoomPin(newPin);
    Alert.alert(
      'PIN Kamar Baru Digenerate',
      `PIN baru Kamar A12: ${newPin}\nOtomatis tersinkronisasi ke aplikasi Rifa Fauziah.`
    );
  };

  const handleRandomizeGatePin = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newPin = `#${randomCode}*`;
    setGatePin(newPin);
    Alert.alert(
      'Master PIN Gerbang Diacak',
      `Master PIN Gerbang Baru: ${newPin}\nBroadcast pembaruan telah dikirimkan ke seluruh 14 penghuni aktif.`
    );
  };

  const handleToggleFreeze = () => {
    setIsFrozen(!isFrozen);
    Alert.alert(
      !isFrozen ? 'Kunci Dibekukan' : 'Kunci Diaktifkan Kembali',
      !isFrozen
        ? 'Akses Smart Lock Kamar A12 sementara dibekukan oleh Pengelola.'
        : 'Akses Smart Lock Kamar A12 telah diaktifkan kembali secara normal.'
    );
  };

  const handleSendWanotif = () => {
    Alert.alert(
      'Kirim Notifikasi Jatuh Tempo',
      'Pesan WhatsApp ramah & kuitansi tagihan periode depan telah dikirimkan ke WhatsApp Rifa Fauziah.'
    );
  };

  const handleExtendContract = () => {
    Alert.alert(
      'Perpanjang Kontrak',
      'Form digital perpanjangan masa sewa Kamar A12 untuk tahun 2027 – 2028.'
    );
  };

  const handleDownloadSPK = () => {
    Alert.alert(
      'Unduh SPK PDF',
      'Dokumen Surat Perjanjian Kontrak Sewa (SPK) Kamar A12 berhasil diunduh dalam format PDF resmi bermaterai digital.'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Keluar dari portal pengelola KosKu Admin Suite?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive', onPress: () => router.replace('/') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.circleBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}>
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          <View>
            <View style={styles.headerTitleRow}>
              <Building2 size={16} color="#1E40AF" />
              <Text style={styles.headerTitle}>KosKu Admin Suite</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Live</Text>
              </View>
            </View>
            <Text style={styles.headerSub}>
              Pak Hendra (Pemilik & Pengelola) • <Text style={{ color: '#2563EB' }}>Profil Admin</Text>
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
            onPress={handleLogout}>
            <LogOut size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* 1. Property Overview Card */}
        <View style={styles.propertyCard}>
          <View style={styles.propertyTopRow}>
            <View style={styles.propertyIconBox}>
              <Building2 size={22} color="#1E40AF" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.propertyNameRow}>
                <Text style={styles.propertyName}>Graha Harmoni Living</Text>
                <View style={styles.campurBadge}>
                  <Text style={styles.campurText}>Campur</Text>
                </View>
              </View>
              <Text style={styles.propertyAddress}>
                Lowokwaru, Kota Malang • Pengelola
              </Text>
            </View>
            <TouchableOpacity
              style={styles.refreshIconBtn}
              onPress={() => Alert.alert('Sinkronisasi', 'Data properti disinkronkan.')}>
              <RefreshCw size={15} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Occupancy Stats */}
          <View style={styles.occupancyBox}>
            <View style={styles.occupancyLabelRow}>
              <Text style={styles.occupancyLabel}>Tingkat Okupansi Real</Text>
              <Text style={styles.occupancyPercent}>83.3%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '83.3%' }]} />
            </View>
            <View style={styles.legendRow}>
              <Text style={styles.legendText}>● 10 Terisi</Text>
              <Text style={styles.legendText}>● 2 Siap Huni (Kosong)</Text>
              <Text style={[styles.legendText, { color: '#0F172A', fontWeight: '700' }]}>
                Total 12 Kamar
              </Text>
            </View>
          </View>

          {/* Vacant Rooms Preview */}
          <Text style={styles.vacantHeading}>Kamar Kosong Siap Huni:</Text>
          <View style={styles.vacantRow}>
            <View style={styles.vacantCol}>
              <View style={styles.vacantTop}>
                <Text style={styles.vacantRoomName}>Kamar 04</Text>
                <View style={styles.ltBadge}>
                  <Text style={styles.ltBadgeText}>Lt. 1</Text>
                </View>
              </View>
              <Text style={styles.vacantPos}>Belakang</Text>
              <Text style={styles.vacantPrice}>Rp 1.100.000 <Text style={styles.perBln}>/bln</Text></Text>
            </View>

            <View style={styles.vacantCol}>
              <View style={styles.vacantTop}>
                <Text style={styles.vacantRoomName}>Kamar 09</Text>
                <View style={styles.ltBadge}>
                  <Text style={styles.ltBadgeText}>Lt. 2</Text>
                </View>
              </View>
              <Text style={styles.vacantPos}>Ujung Balkon</Text>
              <Text style={styles.vacantPrice}>Rp 1.100.000 <Text style={styles.perBln}>/bln</Text></Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewMasterBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/owner-rooms')}>
            <DoorOpen size={16} color="#2563EB" />
            <Text style={styles.viewMasterBtnText}>
              Lihat Master Data 12 Kamar
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Section: Sinkronisasi Langsung Penghuni */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.blueDot} />
              <Text style={styles.sectionTitle}>
                Sinkronisasi Langsung Penghuni
              </Text>
            </View>
            <View style={styles.roomBadgeHeader}>
              <Text style={styles.roomBadgeHeaderText}>Kamar A12</Text>
            </View>
          </View>

          {/* Tenant Detail Card */}
          <View style={styles.tenantCard}>
            <View style={styles.tenantHeaderRow}>
              <View style={styles.tenantAvatar}>
                <Text style={styles.tenantAvatarText}>RF</Text>
              </View>

              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.tenantNameTitleRow}>
                  <Text style={styles.tenantNameTitle}>Rifa Fauziah</Text>
                  <View style={styles.teladanBadge}>
                    <Text style={styles.teladanText}>🏆 Teladan 100/100</Text>
                  </View>
                </View>
                <Text style={styles.tenantEdu}>
                  Mahasiswi Desain Grafis UMM
                </Text>
                <View style={styles.ktpVerifiedRow}>
                  <ShieldCheck size={12} color="#16A34A" />
                  <Text style={styles.ktpVerifiedText}>
                    KTP Sah Terverifikasi
                  </Text>
                </View>
                <Text style={styles.tenantIdCode}>ID: KSK-2024-A12</Text>
              </View>
            </View>

            {/* 2 Metric Boxes */}
            <View style={styles.metricTwoCol}>
              <View style={styles.metricCardBox}>
                <Text style={styles.metricCardTitle}>Masa Sewa Digital</Text>
                <Text style={styles.metricCardBig}>Tahun Ke-2</Text>
                <Text style={styles.metricCardSub}>15 Jan '25 – 15 Jan '27</Text>
              </View>
              <View style={styles.metricCardBox}>
                <Text style={styles.metricCardTitle}>Sisa Masa Aktif</Text>
                <Text style={[styles.metricCardBig, { color: '#2563EB' }]}>
                  328 <Text style={{ fontSize: 13, fontWeight: '700' }}>Hari</Text>
                </Text>
                <Text style={styles.metricCardSub}>Jatuh Tempo: Tgl 15</Text>
              </View>
            </View>

            {/* Monthly Fee row */}
            <View style={styles.feeRow}>
              <View style={styles.feeLeft}>
                <CreditCard size={15} color="#2563EB" />
                <View>
                  <Text style={styles.feeLabel}>Tarif Sewa Bulanan</Text>
                  <Text style={styles.feeAmount}>
                    Rp 1.150.000 <Text style={styles.perBln}>/bln</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.lunasBadge}>
                <Text style={styles.lunasBadgeText}>Lunas Bulan Ini</Text>
              </View>
            </View>

            {/* Actions for this resident */}
            <TouchableOpacity
              style={styles.waNotifBtn}
              activeOpacity={0.8}
              onPress={handleSendWanotif}>
              <MessageSquare size={15} color="#FFFFFF" />
              <Text style={styles.waNotifBtnText}>
                Kirim Notifikasi Jatuh Tempo WA
              </Text>
            </TouchableOpacity>

            <View style={styles.docActionRow}>
              <TouchableOpacity
                style={styles.docBtn}
                activeOpacity={0.8}
                onPress={handleExtendContract}>
                <Edit2 size={13} color="#2563EB" />
                <Text style={styles.docBtnText}>Perpanjang Kontrak</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.docBtn}
                activeOpacity={0.8}
                onPress={handleDownloadSPK}>
                <FileDown size={13} color="#2563EB" />
                <Text style={styles.docBtnText}>Unduh SPK PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 3. Section: Pusat Kendali IoT */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLeft}>
              <Lock size={16} color="#2563EB" />
              <Text style={styles.sectionTitle}>Pusat Kendali IoT</Text>
            </View>
            <View style={styles.gatewayBadge}>
              <View style={styles.blueDot} />
              <Text style={styles.gatewayText}>Gateway v2.4 Online</Text>
            </View>
          </View>
          <Text style={styles.iotSubHeading}>
            Sinkron Terkini ke HP Penghuni
          </Text>

          {/* PIN Kamar A12 */}
          <View style={styles.iotCard}>
            <View style={styles.iotHeaderRow}>
              <View style={styles.iotLabelRow}>
                <DoorOpen size={14} color="#2563EB" />
                <Text style={styles.iotCardTitle}>PIN Pintu Kamar A12</Text>
              </View>
              <View style={styles.activeHpPill}>
                <Text style={styles.activeHpText}>Aktif di HP Rifa</Text>
              </View>
            </View>

            <View style={styles.pinDisplayRow}>
              <View style={styles.pinCodeWrap}>
                <KeyRound size={16} color="#2563EB" />
                <Text style={styles.pinCodeBig}>{roomPin}</Text>
              </View>
              <TouchableOpacity
                style={styles.copyPinBtn}
                onPress={() =>
                  Alert.alert('Disalin', `PIN Kamar ${roomPin} disalin.`)
                }>
                <Copy size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.generatePinBtn}
              activeOpacity={0.8}
              onPress={handleGenerateRoomPin}>
              <RefreshCw size={13} color="#2563EB" />
              <Text style={styles.generatePinBtnText}>
                Generate PIN Kamar Baru
              </Text>
            </TouchableOpacity>
          </View>

          {/* Master PIN Gerbang Utama */}
          <View style={styles.iotCard}>
            <View style={styles.iotHeaderRow}>
              <View style={styles.iotLabelRow}>
                <Building2 size={14} color="#2563EB" />
                <Text style={styles.iotCardTitle}>Master PIN Gerbang Utama</Text>
              </View>
              <View style={styles.activeHpPill}>
                <Text style={styles.activeHpText}>14 Penghuni Aktif</Text>
              </View>
            </View>

            <View style={styles.pinDisplayRow}>
              <View style={styles.pinCodeWrap}>
                <ShieldCheck size={16} color="#16A34A" />
                <Text style={styles.pinCodeBig}>{gatePin}</Text>
              </View>
              <Text style={styles.routineText}>Rutin ganti tiap tgl 1</Text>
            </View>

            <TouchableOpacity
              style={styles.generatePinBtn}
              activeOpacity={0.8}
              onPress={handleRandomizeGatePin}>
              <RefreshCw size={13} color="#2563EB" />
              <Text style={styles.generatePinBtnText}>
                Acak PIN Gerbang Baru (Sinkron ke Semua)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bekukan Kunci Kamar */}
          <TouchableOpacity
            style={[
              styles.freezeBtn,
              isFrozen && { backgroundColor: '#FEE2E2', borderColor: '#DC2626' },
            ]}
            activeOpacity={0.8}
            onPress={handleToggleFreeze}>
            <Lock size={15} color="#DC2626" />
            <Text style={styles.freezeBtnText}>
              {isFrozen
                ? 'Buka Bekuan Kunci Kamar (Aktifkan Normal)'
                : 'Bekukan Kunci Kamar Sementara'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. Section: Master Tata Tertib Kos */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLeft}>
              <ShieldAlert size={16} color="#2563EB" />
              <Text style={styles.sectionTitle}>Master Tata Tertib Kos</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Edit Aturan',
                  'Perbarui ketentuan tata tertib jam malam dan denda pelanggaran.'
                )
              }>
              <Text style={styles.seeAllLink}>✏️ Edit Aturan</Text>
            </TouchableOpacity>
          </View>

          {/* Aturan 1: Jam Malam */}
          <View style={styles.ruleCard}>
            <View style={styles.ruleIconBox}>
              <Moon size={18} color="#2563EB" />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.ruleTitle}>Jam Malam & Kunci Otomatis</Text>
              <Text style={styles.ruleBody}>
                Maksimal pukul <Text style={{ fontWeight: '800' }}>22.00 WIB</Text>.
                Gerbang otomatis terkunci rapat IoT & wajib menggunakan PIN
                rahasia.
              </Text>
            </View>
          </View>

          {/* Aturan 2: Tamu */}
          <View style={styles.ruleCard}>
            <View style={styles.ruleIconBox}>
              <Users size={18} color="#2563EB" />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.ruleTitle}>Tamu & Ketentuan Menginap</Text>
              <Text style={styles.ruleBody}>
                Izin tamu menginap wajib 1x24 jam lapor Pak Hendra. Tamu lawan
                jenis dilarang keras masuk ke dalam kamar pribadi.
              </Text>
            </View>
          </View>

          {/* Aturan 3: Bebas Rokok */}
          <View style={styles.ruleCard}>
            <View style={[styles.ruleIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Flame size={18} color="#DC2626" />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.ruleTitle}>
                Bebas Asap Rokok (No Smoking)
              </Text>
              <Text style={styles.ruleBody}>
                Area kamar dan koridor ber-AC 100% bebas asap rokok/vape.
                Pelanggaran dikenakan sanksi denda{' '}
                <Text style={{ fontWeight: '800', color: '#DC2626' }}>
                  Rp 100.000/insiden
                </Text>.
              </Text>
            </View>
          </View>

          {/* Kontak Darurat Pemilik */}
          <TouchableOpacity
            style={styles.emergencyContactCard}
            activeOpacity={0.8}
            onPress={() => makePhoneCall(KOST_CONTACT.phone)}>
            <View style={styles.emergencyPhoneBox}>
              <Phone size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.emergencyLabel}>
                Kontak Darurat Pemilik (24 Jam)
              </Text>
              <Text style={styles.emergencyValue}>
                +62 812-3456-7890 (Pak Hendra)
              </Text>
            </View>
            <Phone size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/owner-home')}>
          <Home size={21} color="#64748B" />
          <Text style={styles.navLabel}>Beranda</Text>
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

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Building2 size={21} color="#2563EB" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profil</Text>
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
    gap: 12,
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    gap: 3,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#16A34A',
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
  },
  headerSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // Property Overview Card
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  propertyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  propertyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  propertyName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  campurBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  campurText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  propertyAddress: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  refreshIconBtn: {
    padding: 6,
  },
  occupancyBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  occupancyLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occupancyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  occupancyPercent: {
    fontSize: 13,
    fontWeight: '900',
    color: '#2563EB',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  legendText: {
    fontSize: 10,
    color: '#64748B',
  },
  vacantHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  vacantRow: {
    flexDirection: 'row',
    gap: 10,
  },
  vacantCol: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    gap: 2,
  },
  vacantTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vacantRoomName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  ltBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  ltBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2563EB',
  },
  vacantPos: {
    fontSize: 10,
    color: '#64748B',
  },
  vacantPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
    marginTop: 2,
  },
  perBln: {
    fontSize: 9,
    fontWeight: '500',
    color: '#64748B',
  },
  viewMasterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  viewMasterBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
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
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  roomBadgeHeader: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roomBadgeHeaderText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  gatewayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  gatewayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  iotSubHeading: {
    fontSize: 11,
    color: '#64748B',
    marginTop: -4,
  },
  seeAllLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Tenant Card
  tenantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  tenantHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tenantAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tenantAvatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1E40AF',
  },
  tenantNameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tenantNameTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  teladanBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  teladanText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E40AF',
  },
  tenantEdu: {
    fontSize: 11,
    color: '#475569',
  },
  ktpVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ktpVerifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  tenantIdCode: {
    fontSize: 10,
    color: '#94A3B8',
  },
  metricTwoCol: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCardBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    gap: 2,
  },
  metricCardTitle: {
    fontSize: 10,
    color: '#64748B',
  },
  metricCardBig: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricCardSub: {
    fontSize: 10,
    color: '#94A3B8',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
  },
  feeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feeLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  feeAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  lunasBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  lunasBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  waNotifBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  waNotifBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  docActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  docBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  docBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // IoT Cards
  iotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  iotHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iotLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iotCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  activeHpPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeHpText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2563EB',
  },
  pinDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pinCodeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pinCodeBig: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2,
  },
  copyPinBtn: {
    padding: 4,
  },
  routineText: {
    fontSize: 10,
    color: '#64748B',
  },
  generatePinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  generatePinBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  freezeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  freezeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#DC2626',
  },

  // House Rules
  ruleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  ruleIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  ruleBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  emergencyContactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  emergencyPhoneBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  emergencyValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E40AF',
    marginTop: 2,
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

