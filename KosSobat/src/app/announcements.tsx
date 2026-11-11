import { router } from 'expo-router';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  Copy,
  ExternalLink,
  Flame,
  HelpCircle,
  Home,
  Info,
  Layers,
  MapPin,
  Megaphone,
  MessageSquare,
  Plus,
  RefreshCw,
  Share2,
  ShieldAlert,
  Sparkles,
  User,
  Users,
  Wifi,
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

type ActiveTab = 'pengumuman' | 'agenda';

export default function AnnouncementsScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pengumuman');
  const [selectedDate, setSelectedDate] = useState<number>(18);
  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [isReminderSet, setIsReminderSet] = useState<boolean>(false);
  const [savedSchedules, setSavedSchedules] = useState<string[]>([]);

  const handleCopyNotice = (text: string) => {
    Alert.alert('Tersalin', 'Teks pengumuman telah disalin ke papan klip.');
  };

  const handleSyncCalendar = () => {
    Alert.alert(
      'Sinkronisasi Kalender',
      'Jadwal agenda kos (Kerja Bakti, Iuran Kas, Fogging) berhasil disinkronkan ke kalender perangkat Anda (Google Calendar / iCal).'
    );
  };

  const handleProposeActivity = () => {
    Alert.alert(
      'Usulkan Kegiatan Warga',
      'Punya ide kegiatan bersama warga kos seperti BBQ, Futsal, atau Nobar? Masukkan usulan di forum warga.',
      [
        { text: 'Nanti', style: 'cancel' },
        { text: 'Buka Forum Chat', onPress: () => router.push('/forum') },
      ]
    );
  };

  const handleToggleSchedule = (name: string) => {
    if (savedSchedules.includes(name)) {
      setSavedSchedules(savedSchedules.filter((s) => s !== name));
      Alert.alert('Info', `Jadwal ${name} dihapus dari pengingat.`);
    } else {
      setSavedSchedules([...savedSchedules, name]);
      Alert.alert('Sukses', `Jadwal ${name} tersimpan di pengingat Anda.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.circleBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {activeTab === 'pengumuman'
            ? 'Pengumuman & Agenda Kos'
            : 'Agenda & Kalender Kos'}
        </Text>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.circleBtn}
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Informasi',
                'Pantau seluruh pengumuman resmi pengelola kos dan agenda kebersamaan warga secara berkala.'
              )
            }>
            <HelpCircle size={19} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBtn}
            activeOpacity={0.7}
            onPress={() => router.push('/profile')}>
            <User size={19} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Segmented Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'pengumuman' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('pengumuman')}
            activeOpacity={0.8}>
            <Megaphone
              size={16}
              color={activeTab === 'pengumuman' ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'pengumuman' && styles.tabBtnTextActive,
              ]}>
              Pengumuman
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'agenda' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('agenda')}
            activeOpacity={0.8}>
            <Calendar
              size={16}
              color={activeTab === 'agenda' ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'agenda' && styles.tabBtnTextActive,
              ]}>
              Agenda
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'pengumuman' ? (
          /* ============================================================ */
          /* TAB 1: PENGUMUMAN RESMI */
          /* ============================================================ */
          <>
            <View style={styles.sectionHeaderBetween}>
              <View style={styles.titleIconRow}>
                <Megaphone size={18} color="#2563EB" />
                <Text style={styles.sectionTitle}>Pengumuman Resmi</Text>
              </View>
              <View style={styles.badgeNew}>
                <Text style={styles.badgeNewText}>2 Baru</Text>
              </View>
            </View>

            {/* Announcement Card 1: Pemadaman Air */}
            <View style={styles.noticeCard}>
              <View style={styles.noticeHeader}>
                <View style={styles.urgentPill}>
                  <Text style={styles.urgentPillText}>• PENTING • AIR</Text>
                </View>
                <View style={styles.dateRow}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.dateText}>10 Okt 2026</Text>
                </View>
              </View>

              <Text style={styles.noticeTitle}>
                Pemadaman Air Sementara & Kuras Tandon
              </Text>
              <View style={styles.timeScheduleRow}>
                <Clock size={13} color="#DC2626" />
                <Text style={styles.timeScheduleText}>14.00 - 16.00 WIB</Text>
              </View>

              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>
                  "Akan dilakukan pembersihan tandon air sentral serta penggantian klep
                  pompa utama. Dihimbau semua penghuni menampung air secukupnya sebelum
                  pukul 13.30 WIB."
                </Text>
              </View>

              <View style={styles.authorRow}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorAvatarText}>HM</Text>
                </View>
                <View style={styles.authorMeta}>
                  <Text style={styles.authorName}>Ibu Hajjah Maryam</Text>
                  <Text style={styles.authorRole}>Pemilik & Pengelola Kos</Text>
                </View>
                <TouchableOpacity
                  style={styles.copyBtn}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleCopyNotice(
                      'Pemadaman Air Sementara & Kuras Tandon: 14.00 - 16.00 WIB'
                    )
                  }>
                  <Copy size={13} color="#475569" />
                  <Text style={styles.copyBtnText}>Salin</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Announcement Card 2: Upgrade WiFi */}
            <View style={styles.noticeCard}>
              <View style={styles.noticeHeader}>
                <View style={styles.wifiPill}>
                  <Wifi size={12} color="#2563EB" />
                  <Text style={styles.wifiPillText}>INTERNET • WIFI</Text>
                </View>
                <View style={styles.dateRow}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.dateText}>12 Okt 2026</Text>
                </View>
              </View>

              <View style={styles.wifiTitleRow}>
                <View style={styles.wifiIconBox}>
                  <Wifi size={22} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.noticeTitle}>
                    Upgrade Kecepatan WiFi Kos ke 200 Mbps
                  </Text>
                  <Text style={styles.noticeDesc}>
                    Pemasangan router mesh tambahan di koridor lantai 2 untuk
                    mengatasi blank spot sinyal di area kamar ujung.
                  </Text>
                </View>
              </View>

              <View style={styles.statusTeknisiBox}>
                <Text style={styles.statusTeknisiLabel}>Status Teknisi</Text>
                <View style={styles.jadwalTerkonfirmasi}>
                  <CheckCircle2 size={13} color="#16A34A" />
                  <Text style={styles.jadwalTerkonfirmasiText}>
                    Jadwal Terkonfirmasi
                  </Text>
                </View>
              </View>
            </View>

            {/* Section Agenda & Jadwal Kos Preview */}
            <View style={styles.sectionHeaderBetween}>
              <View style={styles.titleIconRow}>
                <Calendar size={18} color="#2563EB" />
                <Text style={styles.sectionTitle}>Agenda & Jadwal Kos</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setActiveTab('agenda')}>
                <Text style={styles.seeAllText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            {/* Sync Button */}
            <TouchableOpacity
              style={styles.syncBtn}
              activeOpacity={0.8}
              onPress={handleSyncCalendar}>
              <RefreshCw size={15} color="#FFFFFF" />
              <Text style={styles.syncBtnText}>
                Sinkronisasi ke Kalender HP (Google / iCal)
              </Text>
            </TouchableOpacity>

            {/* Mini Agenda Item 1 */}
            <View style={styles.miniAgendaCard}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateBlockMonth}>OKT</Text>
                <Text style={styles.dateBlockDay}>18</Text>
              </View>
              <View style={styles.miniAgendaContent}>
                <View style={styles.miniAgendaTop}>
                  <View style={styles.tagBlue}>
                    <Text style={styles.tagBlueText}>Agenda Wajib</Text>
                  </View>
                  <Text style={styles.dayLabel}>Minggu</Text>
                </View>
                <Text style={styles.miniAgendaTitle}>
                  Kerja Bakti & Sanitasi Bersama Warga Kos
                </Text>
                <View style={styles.miniMetaRow}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.miniMetaText}>07.30 - 10.00 WIB</Text>
                </View>
                <View style={styles.miniMetaRow}>
                  <MapPin size={12} color="#64748B" />
                  <Text style={styles.miniMetaText}>Halaman Depan & Area Bersama</Text>
                </View>
                <View style={styles.coffeeAlert}>
                  <Coffee size={13} color="#2563EB" />
                  <Text style={styles.coffeeAlertText}>
                    Disediakan sarapan pagi dan es kopi bersama.
                  </Text>
                </View>
              </View>
            </View>

            {/* Mini Agenda Item 2 */}
            <View style={styles.miniAgendaCard}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateBlockMonth}>OKT</Text>
                <Text style={styles.dateBlockDay}>25</Text>
              </View>
              <View style={styles.miniAgendaContent}>
                <View style={styles.miniAgendaTop}>
                  <View style={styles.tagIndigo}>
                    <Text style={styles.tagIndigoText}>Rutin Bulanan</Text>
                  </View>
                  <Text style={styles.dayLabel}>Minggu</Text>
                </View>
                <Text style={styles.miniAgendaTitle}>
                  Iuran Kas Bersama & Refill P3K
                </Text>
                <View style={styles.iuranRow}>
                  <Text style={styles.iuranLabel}>Nominal Iuran</Text>
                  <Text style={styles.iuranAmount}>
                    Rp 35.000 <Text style={styles.perKamar}>/ Kamar</Text>
                  </Text>
                </View>
                <Text style={styles.miniMetaSub}>
                  Transfer via Rekening Bersama / Tunai
                </Text>
              </View>
            </View>

            {/* Mini Agenda Item 3 */}
            <View style={styles.miniAgendaCard}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateBlockMonth}>OKT</Text>
                <Text style={styles.dateBlockDay}>30</Text>
              </View>
              <View style={styles.miniAgendaContent}>
                <View style={styles.miniAgendaTop}>
                  <View style={styles.tagTeal}>
                    <Text style={styles.tagTealText}>Pemeliharaan</Text>
                  </View>
                  <Text style={styles.dayLabel}>Jumat</Text>
                </View>
                <Text style={styles.miniAgendaTitle}>
                  Penyemprotan Disinfektan & Fogging Nyamuk
                </Text>
                <View style={styles.miniMetaRow}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.miniMetaText}>09.00 - 11.30 WIB</Text>
                </View>
                <View style={styles.infoCalloutSm}>
                  <Info size={12} color="#64748B" />
                  <Text style={styles.infoCalloutSmText}>
                    Tutup pintu & jendela saat pengasapan
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* ============================================================ */
          /* TAB 2: AGENDA & KALENDER */
          /* ============================================================ */
          <>
            {/* Calendar Widget */}
            <View style={styles.calendarCard}>
              {/* Day names */}
              <View style={styles.calendarHeaderRow}>
                {['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'].map(
                  (day, i) => (
                    <Text
                      key={day}
                      style={[
                        styles.calDayName,
                        i === 0 && { color: '#EF4444' },
                      ]}>
                      {day}
                    </Text>
                  )
                )}
              </View>

              {/* Calendar Grid Numbers */}
              <View style={styles.calGrid}>
                {/* Row 1 */}
                <View style={styles.calRow}>
                  <Text style={styles.calDateMuted}>27</Text>
                  <Text style={styles.calDateMuted}>28</Text>
                  <Text style={styles.calDateMuted}>29</Text>
                  <Text style={styles.calDateMuted}>30</Text>
                  <Text style={styles.calDate}>1</Text>
                  <Text style={styles.calDate}>2</Text>
                  <Text style={styles.calDate}>3</Text>
                </View>

                {/* Row 2 */}
                <View style={styles.calRow}>
                  <Text style={styles.calDate}>4</Text>
                  <Text style={styles.calDate}>5</Text>
                  <Text style={styles.calDate}>6</Text>
                  <Text style={styles.calDate}>7</Text>
                  <Text style={styles.calDate}>8</Text>
                  <Text style={styles.calDate}>9</Text>
                  <Text style={styles.calDate}>10</Text>
                </View>

                {/* Row 3 */}
                <View style={styles.calRow}>
                  <Text style={styles.calDate}>11</Text>
                  <Text style={styles.calDate}>12</Text>
                  <Text style={styles.calDate}>13</Text>
                  <Text style={styles.calDate}>14</Text>
                  <View style={styles.calDateWithDot}>
                    <Text style={styles.calDate}>15</Text>
                    <View style={[styles.miniDot, { backgroundColor: '#0284C7' }]} />
                  </View>
                  <Text style={styles.calDate}>16</Text>
                  <Text style={styles.calDate}>17</Text>
                </View>

                {/* Row 4 */}
                <View style={styles.calRow}>
                  <TouchableOpacity
                    style={[
                      styles.calDateCircleSelected,
                      selectedDate === 18 && styles.calDateCircleActive,
                    ]}
                    onPress={() => setSelectedDate(18)}>
                    <Text style={styles.calDateActiveText}>18</Text>
                    <View style={styles.whiteMiniDot} />
                  </TouchableOpacity>
                  <Text style={styles.calDate}>19</Text>
                  <Text style={styles.calDate}>20</Text>
                  <Text style={styles.calDate}>21</Text>
                  <Text style={styles.calDate}>22</Text>
                  <Text style={styles.calDate}>23</Text>
                  <View style={styles.calDateKiniBox}>
                    <Text style={styles.calDateKiniText}>24</Text>
                    <Text style={styles.kiniSub}>KINI</Text>
                  </View>
                </View>

                {/* Row 5 */}
                <View style={styles.calRow}>
                  <TouchableOpacity
                    style={styles.calDateWithDot}
                    onPress={() => setSelectedDate(25)}>
                    <Text
                      style={[
                        styles.calDate,
                        selectedDate === 25 && { color: '#2563EB', fontWeight: '800' },
                      ]}>
                      25
                    </Text>
                    <View style={[styles.miniDot, { backgroundColor: '#2563EB' }]} />
                  </TouchableOpacity>
                  <Text style={styles.calDate}>26</Text>
                  <Text style={styles.calDate}>27</Text>
                  <Text style={styles.calDate}>28</Text>
                  <Text style={styles.calDate}>29</Text>
                  <TouchableOpacity
                    style={styles.calDateWithDot}
                    onPress={() => setSelectedDate(30)}>
                    <Text
                      style={[
                        styles.calDate,
                        selectedDate === 30 && { color: '#2563EB', fontWeight: '800' },
                      ]}>
                      30
                    </Text>
                    <View style={[styles.miniDot, { backgroundColor: '#0D9488' }]} />
                  </TouchableOpacity>
                  <Text style={styles.calDate}>31</Text>
                </View>
              </View>

              {/* Calendar Legend */}
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                  <Text style={styles.legendLabel}>Wajib Warga</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#0D9488' }]} />
                  <Text style={styles.legendLabel}>Fasilitas & Sanitasi</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4F46E5' }]} />
                  <Text style={styles.legendLabel}>Iuran Bersama</Text>
                </View>
              </View>
            </View>

            {/* Selected Date Header */}
            <View style={styles.selectedDateBanner}>
              <View style={styles.selectedBannerLeft}>
                <Calendar size={18} color="#2563EB" />
                <View>
                  <Text style={styles.selectedBannerTitle}>
                    {selectedDate === 18
                      ? 'Minggu, 18 Oktober 2026'
                      : selectedDate === 25
                      ? 'Minggu, 25 Oktober 2026'
                      : 'Jumat, 30 Oktober 2026'}
                  </Text>
                  <Text style={styles.selectedBannerSub}>
                    1 Kegiatan Wajib Terjadwal
                  </Text>
                </View>
              </View>
              <View style={styles.terpilihPill}>
                <Text style={styles.terpilihPillText}>Terpilih</Text>
              </View>
            </View>

            {/* Main Agenda Card: Kerja Bakti */}
            <View style={styles.agendaDetailCard}>
              <View style={styles.agendaTagRow}>
                <View style={styles.agendaWajibBadge}>
                  <Text style={styles.agendaWajibText}>
                    • Wajib • Seluruh Penghuni
                  </Text>
                </View>
                <View style={styles.mingguPagiBadge}>
                  <Text style={styles.mingguPagiText}>Minggu Pagi</Text>
                </View>
              </View>

              <Text style={styles.agendaMainTitle}>
                Kerja Bakti & Sanitasi Bersama Warga Kos
              </Text>

              <View style={styles.agendaMetaItem}>
                <Clock size={15} color="#2563EB" />
                <Text style={styles.agendaMetaVal}>07.30 - 10.00 WIB</Text>
              </View>

              <View style={styles.agendaMetaItem}>
                <MapPin size={15} color="#2563EB" />
                <Text style={styles.agendaMetaVal}>
                  Halaman Depan, Parkir Motor & Dapur Lantai 1
                </Text>
              </View>

              <View style={styles.agendaDescBox}>
                <Text style={styles.agendaDescText}>
                  Membersihkan saluran air, merapikan rak sepatu bersama, dan
                  sterilisasi dapur lantai 1. Disediakan sarapan lontong sayur & es
                  kopi bersama dari pengelola kos!
                </Text>
              </View>

              {/* Confirmation Status */}
              <View style={styles.attendanceRow}>
                <View style={styles.avatarGroup}>
                  <View style={[styles.avatarOverlap, { backgroundColor: '#3B82F6' }]}>
                    <Text style={styles.avatarOverlapText}>RF</Text>
                  </View>
                  <View style={[styles.avatarOverlap, { backgroundColor: '#10B981', left: -8 }]}>
                    <Text style={styles.avatarOverlapText}>DP</Text>
                  </View>
                  <View style={[styles.avatarOverlap, { backgroundColor: '#F59E0B', left: -16 }]}>
                    <Text style={styles.avatarOverlapText}>BN</Text>
                  </View>
                  <View style={[styles.avatarOverlap, { backgroundColor: '#EFF6FF', left: -24 }]}>
                    <Text style={[styles.avatarOverlapText, { color: '#2563EB' }]}>
                      +11
                    </Text>
                  </View>
                </View>
                <Text style={styles.confirmCountText}>14/16 Terkonfirmasi</Text>

                <TouchableOpacity
                  style={[
                    styles.hadirToggleBtn,
                    isAttending && styles.hadirToggleBtnActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setIsAttending(!isAttending);
                    Alert.alert(
                      'Presensi Acara',
                      !isAttending
                        ? 'Konfirmasi kehadiran Anda dicatat: Saya Hadir'
                        : 'Status kehadiran Anda dibatalkan.'
                    );
                  }}>
                  <Check size={14} color={isAttending ? '#2563EB' : '#64748B'} />
                  <Text
                    style={[
                      styles.hadirToggleText,
                      isAttending && styles.hadirToggleTextActive,
                    ]}>
                    Saya Hadir
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <View style={styles.agendaActionsRow}>
                <TouchableOpacity
                  style={[
                    styles.remindBtn,
                    isReminderSet && { backgroundColor: '#16A34A' },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setIsReminderSet(!isReminderSet);
                    Alert.alert(
                      'Pengingat',
                      !isReminderSet
                        ? 'Pengingat telah dipasang 1 jam sebelum kegiatan.'
                        : 'Pengingat dinonaktifkan.'
                    );
                  }}>
                  <Bell size={15} color="#FFFFFF" />
                  <Text style={styles.remindBtnText}>
                    {isReminderSet ? 'Pengingat Aktif' : 'Pasang Pengingat'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shareBtn}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert(
                      'Bagikan Agenda',
                      'Tautan agenda disalin untuk dibagikan ke WhatsApp warga kos.'
                    )
                  }>
                  <Share2 size={17} color="#475569" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Agenda Card 2: Iuran Kas Bersama */}
            <View style={styles.agendaDetailCard}>
              <View style={styles.agendaTagRow}>
                <View style={styles.tagIndigo}>
                  <Text style={styles.tagIndigoText}>• Rutin Bulanan</Text>
                </View>
                <Text style={styles.targetLabel}>
                  Target <Text style={styles.targetAmount}>Rp 35.000</Text>
                </Text>
              </View>

              <Text style={styles.agendaMainTitle}>
                Iuran Kas Bersama & Refill P3K
              </Text>

              <View style={styles.agendaMetaItem}>
                <Calendar size={15} color="#4F46E5" />
                <Text style={styles.agendaMetaVal}>
                  Minggu, 25 Okt 2026 • Maksimal 21.00 WIB
                </Text>
              </View>

              <View style={styles.infoCalloutBox}>
                <Info size={15} color="#4F46E5" style={{ marginTop: 2 }} />
                <Text style={styles.infoCalloutText}>
                  Bisa diserahkan tunai ke Pak Hendra (Kamar 102) atau transfer
                  langsung via rekening bersama KosKu.
                </Text>
              </View>

              <View style={styles.iuranFooterRow}>
                <Text style={styles.iuranFootText}>
                  Pengalokasian: Kas darurat, isi ulang P3K & gas dapur
                </Text>
                <TouchableOpacity
                  style={styles.bayarKasBtn}
                  activeOpacity={0.8}
                  onPress={() => router.push('/payment')}>
                  <Text style={styles.bayarKasBtnText}>Bayar Kas</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Agenda Card 3: Disinfektan & Fogging */}
            <View style={styles.agendaDetailCard}>
              <View style={styles.agendaTagRow}>
                <View style={styles.tagTeal}>
                  <Text style={styles.tagTealText}>• Pemeliharaan Gedung</Text>
                </View>
                <Flame size={16} color="#0D9488" />
              </View>

              <Text style={styles.agendaMainTitle}>
                Disinfektan & Fogging Nyamuk
              </Text>

              <View style={styles.agendaMetaItem}>
                <Clock size={15} color="#0D9488" />
                <Text style={styles.agendaMetaVal}>
                  Jumat, 30 Okt 2026 • 09.00 - 11.30 WIB
                </Text>
              </View>

              <View style={styles.dangerAlertBox}>
                <AlertCircle size={15} color="#DC2626" style={{ marginTop: 2 }} />
                <Text style={styles.dangerAlertText}>
                  Pemberitahuan Warga: Mohon menutup rapat pintu & jendela kamar
                  selama proses pengasapan area lorong dan taman berlangsung.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.saveScheduleBtn}
                activeOpacity={0.8}
                onPress={() => handleToggleSchedule('Fogging Nyamuk')}>
                <Text style={styles.saveScheduleBtnText}>
                  {savedSchedules.includes('Fogging Nyamuk')
                    ? '✓ Jadwal Tersimpan'
                    : '🔖 Simpan Jadwal'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Calendar Bottom Actions */}
            <TouchableOpacity
              style={styles.syncBtn}
              activeOpacity={0.8}
              onPress={handleSyncCalendar}>
              <RefreshCw size={15} color="#FFFFFF" />
              <Text style={styles.syncBtnText}>
                Sinkronisasi ke Kalender HP (Google / iCal)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.proposeBtn}
              activeOpacity={0.8}
              onPress={handleProposeActivity}>
              <Plus size={16} color="#2563EB" />
              <Text style={styles.proposeBtnText}>
                + Usulkan Kegiatan Warga Kos Baru
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 90 }} />
      </ScrollView>

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
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/profile')}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

  // Segmented Tab Switcher
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  tabBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Section Headers
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  titleIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  badgeNew: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeNewText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Notice Cards
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  urgentPill: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#DC2626',
  },
  wifiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  wifiPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 21,
  },
  noticeDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginTop: 4,
  },
  timeScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeScheduleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  quoteBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
  },
  quoteText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  authorAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  authorRole: {
    fontSize: 10,
    color: '#64748B',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  wifiTitleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  wifiIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTeknisiBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  statusTeknisiLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  jadwalTerkonfirmasi: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  jadwalTerkonfirmasiText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },

  // Sync Calendar Button
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 13,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#1E40AF',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  syncBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // Mini Agenda Card (Pengumuman tab)
  miniAgendaCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  dateBlock: {
    width: 48,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBlockMonth: {
    fontSize: 10,
    fontWeight: '800',
    color: '#BFDBFE',
    letterSpacing: 0.5,
  },
  dateBlockDay: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  miniAgendaContent: {
    flex: 1,
    gap: 5,
  },
  miniAgendaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBlue: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagBlueText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  tagIndigo: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagIndigoText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4F46E5',
  },
  tagTeal: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagTealText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0D9488',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  miniAgendaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  miniMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  miniMetaText: {
    fontSize: 11,
    color: '#64748B',
  },
  miniMetaSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  coffeeAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  coffeeAlertText: {
    fontSize: 11,
    color: '#475569',
    fontStyle: 'italic',
  },
  iuranRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  iuranLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  iuranAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  perKamar: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  infoCalloutSm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  infoCalloutSmText: {
    fontSize: 11,
    color: '#64748B',
  },

  // ================= CALENDAR STYLES =================
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  calDayName: {
    width: 36,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  calGrid: {
    gap: 10,
  },
  calRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calDate: {
    width: 36,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  calDateMuted: {
    width: 36,
    textAlign: 'center',
    fontSize: 13,
    color: '#CBD5E1',
  },
  calDateWithDot: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  miniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  calDateCircleSelected: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  calDateCircleActive: {
    backgroundColor: '#1E40AF',
  },
  calDateActiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  whiteMiniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  calDateKiniBox: {
    width: 36,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDateKiniText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  kiniSub: {
    fontSize: 8,
    fontWeight: '800',
    color: '#2563EB',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },

  // Selected Date Banner
  selectedDateBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  selectedBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
  },
  selectedBannerSub: {
    fontSize: 11,
    color: '#64748B',
  },
  terpilihPill: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  terpilihPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Agenda Detail Cards
  agendaDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  agendaTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agendaWajibBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  agendaWajibText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  mingguPagiBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mingguPagiText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  agendaMainTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 21,
  },
  agendaMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agendaMetaVal: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  agendaDescBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  agendaDescText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  attendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  avatarOverlap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlapText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  confirmCountText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  hadirToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  hadirToggleBtnActive: {
    backgroundColor: '#DBEAFE',
  },
  hadirToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  hadirToggleTextActive: {
    color: '#1E40AF',
  },
  agendaActionsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  remindBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  remindBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  shareBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card 2 Specifics
  targetLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  targetAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  infoCalloutBox: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  infoCalloutText: {
    flex: 1,
    fontSize: 12,
    color: '#3730A3',
    lineHeight: 18,
  },
  iuranFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  iuranFootText: {
    flex: 1,
    fontSize: 10,
    color: '#64748B',
    lineHeight: 15,
  },
  bayarKasBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  bayarKasBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },

  // Card 3 Specifics
  dangerAlertBox: {
    flexDirection: 'row',
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  dangerAlertText: {
    flex: 1,
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 18,
  },
  saveScheduleBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveScheduleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  // Propose activity button
  proposeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  proposeBtnText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
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

