import { router } from 'expo-router';
import {
  Bell,
  Building2,
  Calendar,
  ChevronRight,
  CreditCard,
  DoorOpen,
  Edit2,
  Home,
  Info,
  Megaphone,
  MessageSquare,
  Receipt,
  User,
  Wallet,
  Wrench,
} from 'lucide-react-native';
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

export default function BerandaPenghuniScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.miniLogoBox}>
            <Text style={styles.miniLogoText}>K</Text>
          </View>
          <View>
            <Text style={styles.headerSub}>KOST HARMONY LIVING</Text>
            <Text style={styles.headerTitle}>Beranda</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
          <Bell size={20} color="#0F172A" />
          <View style={styles.notifBadgeDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* 1. Hero Card Sapaan */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTopRow}>
            <View style={styles.brandPill}>
              <Text style={styles.brandPillText}>KOSSOBAT</Text>
            </View>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
              <Edit2 size={13} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.greetingTitle}>Selamat datang, Marshell!</Text>
          <View style={styles.roomPill}>
            <DoorOpen size={14} color="#BFDBFE" />
            <Text style={styles.roomText}>Penghuni Kamar A12</Text>
          </View>
        </View>

        {/* 2. Card Tagihan Kos (Keuangan) */}
        <View style={styles.billCard}>
          <View style={styles.billHeaderRow}>
            <View style={styles.billHeaderLeft}>
              <View style={styles.billIconBox}>
                <Wallet size={19} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.billCategory}>KEUANGAN</Text>
                <Text style={styles.billTitle}>Tagihan Kos</Text>
              </View>
            </View>

            <View style={styles.dueDateBadge}>
              <Text style={styles.dueDateText}>Jatuh Tempo 5 Hari</Text>
            </View>
          </View>

          <View style={styles.billBottomRow}>
            <View>
              <Text style={styles.billAmountLabel}>Total Perlu Dibayar</Text>
              <Text style={styles.billAmountValue}>Rp 1.150.000</Text>
            </View>

            <TouchableOpacity
              style={styles.detailBtn}
              activeOpacity={0.8}
              onPress={() => router.push('/payment')}>
              <Text style={styles.detailBtnText}>Lihat Detail ➔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Section Menu Cepat (Grid 2x2) */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.sectionTitle}>Menu Cepat</Text>
            <Text style={styles.sectionCaption}>Layanan Utama</Text>
          </View>

          <View style={styles.quickGrid}>
            {/* Pembayaran */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => router.push('/payment')}>
              <View style={[styles.gridIconBox, { backgroundColor: '#EFF6FF' }]}>
                <CreditCard size={20} color="#2563EB" />
              </View>
              <Text style={styles.gridTitle}>Pembayaran</Text>
              <Text style={styles.gridDesc}>Tagihan & Riwayat Sewa</Text>
            </TouchableOpacity>

            {/* Lapor Kerusakan */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Menu', 'Lapor Kerusakan Fasilitas')}>
              <View style={[styles.gridIconBox, { backgroundColor: '#FEE2E2' }]}>
                <Wrench size={20} color="#DC2626" />
              </View>
              <Text style={styles.gridTitle}>Lapor Kerusakan</Text>
              <Text style={[styles.gridDesc, { color: '#DC2626' }]}>
                Komplain Cepat 24 Jam
              </Text>
            </TouchableOpacity>

            {/* Pengumuman */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Menu', 'Pengumuman & Agenda')}>
              <View style={[styles.gridIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Megaphone size={20} color="#2563EB" />
              </View>
              <Text style={styles.gridTitle}>Pengumuman</Text>
              <Text style={styles.gridDesc}>& Agenda Kegiatan</Text>
            </TouchableOpacity>

            {/* Kamar & Penghuni */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Menu', 'Kamar & Penghuni')}>
              <View style={[styles.gridIconBox, { backgroundColor: '#EEF2FF' }]}>
                <Building2 size={20} color="#4F46E5" />
              </View>
              <Text style={styles.gridTitle}>Kamar & Penghuni</Text>
              <Text style={styles.gridDesc}>Data Unit & Profil Warga</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Section Pengumuman & Agenda */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.headerIconRow}>
              <Calendar size={17} color="#2563EB" />
              <Text style={styles.sectionTitle}>Pengumuman & Agenda</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllLink}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          {/* Pengumuman Penting */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeTopRow}>
              <View style={styles.urgentBadge}>
                <View style={styles.redDot} />
                <Text style={styles.urgentText}>Penting</Text>
              </View>
              <Text style={styles.noticeDate}>10 Oktober 2026</Text>
            </View>
            <Text style={styles.noticeTitle}>Pemadaman Air Sementara</Text>
            <Text style={styles.noticeBody}>
              Jadwal: 14.00 – 16.00 WIB untuk pembersihan berkala tandon utama lantai 3.
            </Text>
            <View style={styles.noticeAlertBox}>
              <Info size={15} color="#64748B" />
              <Text style={styles.noticeAlertText}>
                Catatan Pengelola: Harap menampung air secukupnya sebelum pukul 13.30 WIB.
              </Text>
            </View>
          </View>

          {/* Agenda Kerja Bakti */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeTopRow}>
              <View style={styles.agendaBadge}>
                <Text style={styles.agendaText}>Agenda</Text>
              </View>
              <Text style={styles.noticeDate}>18 Oktober 2026</Text>
            </View>
            <Text style={styles.noticeTitle}>Kerja Bakti Bersama Kos</Text>
            <Text style={styles.noticeBody}>
              Pukul 07.30 WIB • Halaman & Dapur Bersama
            </Text>
          </View>
        </View>

        {/* 5. Section Status Pembayaran Terkini */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.sectionTitle}>Status Pembayaran Terkini</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllLink}>Riwayat</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.paymentStatusCard}
            activeOpacity={0.8}
            onPress={() => router.push('/payment')}>
            <View style={styles.paymentIconBox}>
              <Receipt size={20} color="#DC2626" />
            </View>
            <View style={styles.paymentDetailBox}>
              <Text style={styles.paymentPeriod}>Bulan Oktober 2026</Text>
              <Text style={styles.paymentAmount}>Rp 1.150.000</Text>
              <Text style={styles.paymentSub}>Termasuk Wi-Fi & Sampah</Text>
            </View>
            <View style={styles.unpaidPill}>
              <Text style={styles.unpaidText}>Belum Bayar</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* 6. Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {/* Tab Beranda */}
        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Home size={21} color="#2563EB" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Beranda</Text>
        </TouchableOpacity>

        {/* Tab Chat */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Chat', 'Menuju Forum & Chat')}>
          <View style={{ position: 'relative' }}>
            <MessageSquare size={21} color="#64748B" />
            <View style={styles.navChatDot} />
          </View>
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>

        {/* Tab Profil */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Profil', 'Menuju Profil & Kamar')}>
          <User size={21} color="#64748B" />
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  miniLogoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },

  // 1. Welcome Card
  welcomeCard: {
    backgroundColor: '#1E40AF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#1E40AF',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  brandPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1E40AF',
    letterSpacing: 0.5,
  },
  editBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  roomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomText: {
    fontSize: 13,
    color: '#DBEAFE',
    fontWeight: '600',
  },

  // 2. Bill Card
  billCard: {
    backgroundColor: '#EEF4FF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CFE0FC',
    gap: 14,
  },
  billHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  billIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  dueDateBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dueDateText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  billBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  billAmountLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  billAmountValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  detailBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  detailBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // 3. Quick Grid
  sectionWrap: {
    gap: 10,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionCaption: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  seeAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  gridIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  gridDesc: {
    fontSize: 11,
    color: '#64748B',
  },

  // 4. Notice
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  noticeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  urgentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  agendaBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  agendaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  noticeDate: {
    fontSize: 11,
    color: '#64748B',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  noticeBody: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  noticeAlertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 10,
    gap: 6,
    marginTop: 2,
  },
  noticeAlertText: {
    flex: 1,
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },

  // 5. Payment status
  paymentStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  paymentIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentDetailBox: {
    flex: 1,
  },
  paymentPeriod: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  paymentAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginVertical: 1,
  },
  paymentSub: {
    fontSize: 11,
    color: '#64748B',
  },
  unpaidPill: {
    backgroundColor: '#991B1B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  unpaidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // 6. Bottom Navigation Bar
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
