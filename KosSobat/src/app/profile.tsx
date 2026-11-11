import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Copy,
  DoorOpen,
  Edit2,
  Eye,
  EyeOff,
  HelpCircle,
  Home,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  User,
  Zap,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [showPinModal, setShowPinModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [digitalPin, setDigitalPin] = useState('#9182*');

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar dari akun penghuni KosKu?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  const handleCopyPin = () => {
    Alert.alert('PIN Disalin', 'PIN Pintu Digital #9182* berhasil disalin.');
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
          <Text style={styles.headerTitle}>Profil</Text>
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
            onPress={() => Alert.alert('Profil', 'Akun aktif: Rifa Fauziah (Kamar A12)')}>
            <User size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* 1. Main Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>RF</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={14} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.profileNameMeta}>
              <Text style={styles.profileName}>Rifa Fauziah</Text>
              <View style={styles.subMetaRow}>
                <ShieldCheck size={13} color="#2563EB" />
                <Text style={styles.subMetaText}>Penghuni sejak Jan 2025</Text>
              </View>
              <View style={styles.contactItemRow}>
                <Phone size={12} color="#64748B" />
                <Text style={styles.contactItemText}>+62 812-3456-7890</Text>
              </View>
              <View style={styles.contactItemRow}>
                <Mail size={12} color="#64748B" />
                <Text style={styles.contactItemText}>rifa.fauziah@email.com</Text>
              </View>
            </View>

            <View style={styles.aktifPill}>
              <Text style={styles.aktifPillText}>Aktif</Text>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.profileActionRow}>
            <TouchableOpacity
              style={styles.editProfileBtn}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Edit Profil',
                  'Perbarui data kontak dan nomor darurat Anda.'
                )
              }>
              <Edit2 size={14} color="#FFFFFF" />
              <Text style={styles.editProfileBtnText}>Edit Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.qrBtn}
              activeOpacity={0.8}
              onPress={() => setShowQrModal(true)}>
              <QrCode size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Detail Kamar & Sewa Card */}
        <View style={styles.roomDetailCard}>
          <View style={styles.roomDetailHeader}>
            <View style={styles.roomIconBox}>
              <DoorOpen size={19} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.roomDetailTitle}>Detail Kamar & Sewa</Text>
              <Text style={styles.roomDetailSub}>Data unit hunian Anda</Text>
            </View>
            <View style={styles.floorPill}>
              <Text style={styles.floorPillText}>Lantai 2</Text>
            </View>
          </View>

          {/* Room Number Highlight Box */}
          <View style={styles.roomNumberHighlight}>
            <Text style={styles.roomHighlightText}>Kamar A12</Text>
          </View>

          {/* 2 Columns: Periode Sewa & Akses Kunci */}
          <View style={styles.metaTwoCol}>
            <View style={styles.metaColBox}>
              <View style={styles.metaColHeader}>
                <Calendar size={13} color="#2563EB" />
                <Text style={styles.metaColTitle}>Periode Sewa</Text>
              </View>
              <Text style={styles.metaColVal}>15 Jan 2025 – 15 Jan 2027</Text>
              <Text style={styles.metaColBlue}>Jatuh tempo tgl 15/bln</Text>
            </View>

            <View style={styles.metaColBox}>
              <View style={styles.metaColHeader}>
                <Lock size={13} color="#2563EB" />
                <Text style={styles.metaColTitle}>Akses Kunci</Text>
              </View>
              <Text style={styles.metaColVal}>Smart Lock + Fisik</Text>
              <TouchableOpacity
                onPress={() => setShowPinModal(true)}
                activeOpacity={0.7}>
                <Text style={styles.metaColLink}>Lihat PIN Digital ➔</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Facilities List */}
          <View style={styles.facilitySection}>
            <Text style={styles.facilityHeading}>Fasilitas Kamar:</Text>
            <View style={styles.facilityTagsWrap}>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>❄️ AC 1 PK</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>🛏️ Springbed Single</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>🚪 Lemari 2 Pintu</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>🪑 Meja Belajar</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>⚡ Token Mandiri</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>🚿 Kamar Mandi Dalam</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3. Settings & Account Menu Items */}
        <View style={styles.menuContainer}>
          {/* Ganti Password */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Ganti Password',
                'Instruksi ganti kata sandi telah dikirimkan ke email rifa.fauziah@email.com'
              )
            }>
            <View style={styles.menuIconBox}>
              <KeyRound size={17} color="#2563EB" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Ganti Password</Text>
              <Text style={styles.menuSub}>Perbarui kata sandi akun portal</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Bantuan & FAQ */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Bantuan & FAQ',
                '1. Jam Malam: Gerbang dikunci pkl 22.00.\n2. Pembayaran sewa paling lambat tgl 15 tiap bulan.\n3. Kendala fasilitas laporkan via menu Lapor Kerusakan.'
              )
            }>
            <View style={styles.menuIconBox}>
              <HelpCircle size={17} color="#2563EB" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>Bantuan & FAQ</Text>
              <Text style={styles.menuSub}>Tata tertib kos & panduan kendala</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Keluar (Logout) */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={handleLogout}>
            <View style={styles.logoutIconBox}>
              <LogOut size={17} color="#DC2626" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.logoutTitle}>Keluar (Logout)</Text>
              <Text style={styles.menuSub}>Akhiri sesi di perangkat ini</Text>
            </View>
            <ChevronRight size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Modal PIN Kunci Digital */}
      <Modal
        visible={showPinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPinModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Lock size={20} color="#2563EB" />
              <Text style={styles.modalTitle}>PIN Kunci Digital Kamar</Text>
            </View>

            <Text style={styles.modalDesc}>
              Gunakan kombinasi kode ini pada Smart Door Lock Kamar A12:
            </Text>

            <View style={styles.pinCodeBox}>
              <Text style={styles.pinCodeText}>{digitalPin}</Text>
              <TouchableOpacity onPress={handleCopyPin}>
                <Copy size={18} color="#2563EB" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubInfo}>
              PIN ini terenkripsi dan otomatis tersinkronisasi dengan master IoT
              gerbang utama.
            </Text>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowPinModal(false)}>
              <Text style={styles.closeModalBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal QR Code Akses */}
      <Modal
        visible={showQrModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQrModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <QrCode size={20} color="#2563EB" />
              <Text style={styles.modalTitle}>QR ID Penghuni</Text>
            </View>

            <Text style={styles.modalDesc}>
              Scan QR code ini di pemindai pos gerbang utama atau saat presensi:
            </Text>

            <View style={styles.qrDisplayBox}>
              <QrCode size={130} color="#0F172A" />
              <Text style={styles.qrIdText}>ID: KSK-2024-A12</Text>
            </View>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowQrModal(false)}>
              <Text style={styles.closeModalBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/home')}>
          <Home size={21} color="#64748B" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/forum')}>
          <View style={{ position: 'relative' }}>
            <MessageSquare size={21} color="#64748B" />
            <View style={styles.navChatDot} />
          </View>
          <Text style={styles.navLabel}>Forum</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <User size={21} color="#2563EB" />
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
    paddingVertical: 14,
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
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
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

  // 1. Profile Card
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1E40AF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#2563EB',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileNameMeta: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  subMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  subMetaText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactItemText: {
    fontSize: 11,
    color: '#64748B',
  },
  aktifPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aktifPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },
  profileActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  editProfileBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  qrBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 2. Room Detail Card
  roomDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  roomDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roomIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomDetailTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  roomDetailSub: {
    fontSize: 11,
    color: '#64748B',
  },
  floorPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  floorPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  roomNumberHighlight: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  roomHighlightText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1E40AF',
  },
  metaTwoCol: {
    flexDirection: 'row',
    gap: 10,
  },
  metaColBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  metaColHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaColTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  metaColVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  metaColBlue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  metaColLink: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },

  // Facility tags
  facilitySection: {
    gap: 8,
    marginTop: 4,
  },
  facilityHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  facilityTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E40AF',
  },

  // 3. Menu items
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  logoutTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  menuSub: {
    fontSize: 11,
    color: '#64748B',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 64,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    gap: 14,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  pinCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  pinCodeText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E40AF',
    letterSpacing: 4,
  },
  modalSubInfo: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  qrDisplayBox: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    gap: 8,
  },
  qrIdText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  closeModalBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  closeModalBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
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

