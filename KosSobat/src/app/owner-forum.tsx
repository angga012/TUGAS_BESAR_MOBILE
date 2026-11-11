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
  CornerDownRight,
  Edit2,
  Edit3,
  FileText,
  Home,
  MessageCircle,
  MessageSquare,
  Phone,
  Reply,
  Send,
  Sparkles,
  User,
  Users,
  Zap,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type OwnerForumTab = 'personal' | 'warga';

export default function OwnerForumScreen() {
  const [tab, setTab] = useState<OwnerForumTab>('personal');
  const [isAnswerSent, setIsAnswerSent] = useState(false);
  const [activeQuickText, setActiveQuickText] = useState(
    'Pak Joko estimasi jam 14.00 WIB sampai di A12 ya Mbak Rifa.'
  );

  const handleSendQuickAnswer = () => {
    setIsAnswerSent(true);
    Alert.alert(
      'Jawaban Terkirim',
      `Pesan telah dikirim ke Rifa Fauziah (Kamar A12):\n"${activeQuickText}"`
    );
  };

  const handleReplyDimas = () => {
    Alert.alert(
      'Balas Dimas Prasetyo (B03)',
      'Paket sepatu sudah disimpan aman di loker penerimaan lobi utama.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Kirim Balasan',
          onPress: () =>
            Alert.alert('Sukses', 'Balasan untuk Dimas Prasetyo terkirim.'),
        },
      ]
    );
  };

  const handleVerifySarahTransfer = () => {
    Alert.alert(
      'Verifikasi Pembayaran Sarah Amanda',
      'Bukti transfer sewa Kamar A05 sebesar Rp 1.150.000 cocok & valid.',
      [
        { text: 'Tutup', style: 'cancel' },
        {
          text: 'Verifikasi & Terbitkan Kuitansi',
          onPress: () =>
            Alert.alert(
              'Berhasil',
              'Kuitansi #KOS-2026-10-A05 diterbitkan dan otomatis dikirim ke Sarah Amanda.'
            ),
        },
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
              Pak Hendra (Pemilik & Pengelola) • <Text style={{ color: '#2563EB' }}>Forum Admin</Text>
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

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'personal' && styles.tabBtnActive]}
          activeOpacity={0.8}
          onPress={() => setTab('personal')}>
          <MessageCircle
            size={16}
            color={tab === 'personal' ? '#FFFFFF' : '#64748B'}
          />
          <Text
            style={[
              styles.tabBtnText,
              tab === 'personal' && styles.tabBtnTextActive,
            ]}>
            Chat Personal
          </Text>
          <View style={styles.tabBadgeRed}>
            <Text style={styles.tabBadgeRedText}>3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === 'warga' && styles.tabBtnActive]}
          activeOpacity={0.8}
          onPress={() => setTab('warga')}>
          <Users
            size={16}
            color={tab === 'warga' ? '#FFFFFF' : '#64748B'}
          />
          <Text
            style={[
              styles.tabBtnText,
              tab === 'warga' && styles.tabBtnTextActive,
            ]}>
            Forum Warga
          </Text>
          <View style={styles.wargaDotRow}>
            <View style={styles.greenDot} />
            <Text style={styles.wargaDotText}>24</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {tab === 'personal' ? (
          <>
            {/* Urgent Response Notification Card */}
            <View style={styles.responseBanner}>
              <View style={styles.bannerIconBox}>
                <MessageSquare size={18} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>3 Pesan Membutuhkan Respon</Text>
                <Text style={styles.bannerSub}>
                  Rata-rata respon admin: &lt; 5 menit
                </Text>
              </View>
              <View style={styles.aktifPill}>
                <Text style={styles.aktifPillText}>Aktif</Text>
              </View>
            </View>

            {/* Active Response Item: Rifa Fauziah */}
            <View style={styles.chatCardActive}>
              <View style={styles.chatCardHeader}>
                <View style={styles.avatarWrap}>
                  <View style={styles.residentAvatar}>
                    <Text style={styles.residentAvatarText}>RF</Text>
                  </View>
                  <View style={styles.onlineBadgeDot} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.nameHeaderRow}>
                    <Text style={styles.tenantName}>Rifa Fauziah</Text>
                    <View style={styles.roomPill}>
                      <Text style={styles.roomPillText}>Kamar A12</Text>
                    </View>
                  </View>
                  <View style={styles.waitingTimeRow}>
                    <Clock size={11} color="#DC2626" />
                    <Text style={styles.waitingTimeText}>
                      Menunggu balasan (3 menit lalu)
                    </Text>
                  </View>
                </View>

                <View style={styles.prioritasAcBadge}>
                  <Text style={styles.prioritasAcText}>Prioritas AC</Text>
                </View>
              </View>

              {/* Message from Tenant */}
              <View style={styles.tenantMessageBox}>
                <View style={styles.msgMetaRow}>
                  <Text style={styles.msgMetaLabel}>Pesan Penghuni</Text>
                  <Text style={styles.msgMetaTime}>13.42 WIB</Text>
                </View>
                <Text style={styles.msgText}>
                  "Pak Hendra, untuk teknisi perbaikan AC nanti siang kira-kira
                  jam berapa ya sampainya di A12?"
                </Text>
              </View>

              {/* Automated Smart Reply Box */}
              <View style={styles.smartReplyContainer}>
                <View style={styles.smartReplyTop}>
                  <View style={styles.smartReplyLabelRow}>
                    <Zap size={14} color="#2563EB" />
                    <Text style={styles.smartReplyTitle}>
                      Balas Cepat Otomatis (Rekomendasi)
                    </Text>
                  </View>
                  <Text style={styles.slotTeknisiText}>Slot: Teknisi Fix</Text>
                </View>

                <View style={styles.replyBubblePreview}>
                  <Text style={styles.replyBubbleText}>{activeQuickText}</Text>
                </View>

                {/* Quick Chips */}
                <View style={styles.chipsRow}>
                  <TouchableOpacity
                    style={styles.chipItem}
                    onPress={() =>
                      setActiveQuickText(
                        'Pak Joko estimasi jam 14.00 WIB sampai di A12 ya Mbak Rifa.'
                      )
                    }>
                    <Clock size={11} color="#475569" />
                    <Text style={styles.chipText}>Jam 14.00 Tiba</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.chipItem}
                    onPress={() =>
                      setActiveQuickText(
                        'Teknisi sedang dalam perjalanan menuju unit A12.'
                      )
                    }>
                    <Text style={styles.chipText}>🚗 Sedang Jalan</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.chipItem}
                    onPress={() =>
                      setActiveQuickText(
                        'Akan didampingi langsung oleh staf pengelola saat pengerjaan.'
                      )
                    }>
                    <Text style={styles.chipText}>🤝 Didampingi</Text>
                  </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View style={styles.replyActionRow}>
                  <TouchableOpacity
                    style={[
                      styles.sendAnswerBtn,
                      isAnswerSent && styles.sendAnswerBtnDone,
                    ]}
                    activeOpacity={0.8}
                    onPress={handleSendQuickAnswer}>
                    <Send size={15} color="#FFFFFF" />
                    <Text style={styles.sendAnswerBtnText}>
                      {isAnswerSent
                        ? '✓ Jawaban Terkirim'
                        : 'Kirim Jawaban Sekarang'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.editAnswerBtn}
                    activeOpacity={0.7}
                    onPress={() =>
                      Alert.prompt
                        ? Alert.prompt(
                            'Edit Pesan Balasan',
                            'Ketik balasan khusus untuk Rifa:',
                            (text) => text && setActiveQuickText(text),
                            'plain-text',
                            activeQuickText
                          )
                        : Alert.alert('Edit Pesan', 'Gunakan chips untuk menyesuaikan teks balasan.')
                    }>
                    <Edit3 size={17} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Antrean Chat Lainnya */}
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderBetween}>
                <Text style={styles.sectionTitle}>Antrean Chat Lainnya</Text>
                <Text style={styles.queueCountText}>2 Menunggu Tanggapan</Text>
              </View>

              {/* Queue 1: Dimas Prasetyo */}
              <View style={styles.queueItemCard}>
                <View style={styles.queueAvatar}>
                  <Text style={styles.queueAvatarText}>DP</Text>
                </View>

                <View style={{ flex: 1, gap: 2 }}>
                  <View style={styles.queueTopRow}>
                    <Text style={styles.queueName}>Dimas Prasetyo</Text>
                    <View style={styles.queueRoomBadge}>
                      <Text style={styles.queueRoomText}>B03</Text>
                    </View>
                    <Text style={styles.queueTime}>10.15 WIB</Text>
                  </View>
                  <Text style={styles.queueMsgText} numberOfLines={2}>
                    "Pak Hendra, paket sepatu saya di pos satpam apa sudah
                    dipindahkan ke rak lobi ya?"
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.replyIconBtn}
                  activeOpacity={0.8}
                  onPress={handleReplyDimas}>
                  <Reply size={16} color="#2563EB" />
                </TouchableOpacity>
              </View>

              {/* Queue 2: Sarah Amanda */}
              <View style={styles.queueItemCard}>
                <View style={styles.queueAvatar}>
                  <Text style={styles.queueAvatarText}>SA</Text>
                </View>

                <View style={{ flex: 1, gap: 2 }}>
                  <View style={styles.queueTopRow}>
                    <Text style={styles.queueName}>Sarah Amanda</Text>
                    <View style={styles.queueRoomBadge}>
                      <Text style={styles.queueRoomText}>A05</Text>
                    </View>
                    <Text style={styles.queueTime}>Kemarin</Text>
                  </View>
                  <View style={styles.fileSentRow}>
                    <FileText size={12} color="#2563EB" />
                    <Text style={styles.fileSentText} numberOfLines={1}>
                      Mengirim bukti transfer sewa bulan...
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.verifyIconBtn}
                  activeOpacity={0.8}
                  onPress={handleVerifySarahTransfer}>
                  <CheckCircle2 size={18} color="#16A34A" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          /* ============================================================ */
          /* TAB 2: FORUM WARGA (MODERASI ADMIN) */
          /* ============================================================ */
          <View style={styles.forumWargaModerasiWrap}>
            <View style={styles.moderasiHeaderCard}>
              <Users size={20} color="#2563EB" />
              <View style={{ flex: 1 }}>
                <Text style={styles.moderasiTitle}>Moderasi Forum Warga</Text>
                <Text style={styles.moderasiSub}>
                  Pantau percakapan publik antar penghuni kos secara transparan.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.broadcastForumBtn}
              activeOpacity={0.8}
              onPress={() => router.push('/announcements')}>
              <Text style={styles.broadcastForumBtnText}>
                📢 Siarkan Pengumuman Resmi Pengelola
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewLiveForumBtn}
              activeOpacity={0.8}
              onPress={() => router.push('/forum')}>
              <Text style={styles.viewLiveForumBtnText}>
                Lihat Tampilan Chat Penghuni &gt;
              </Text>
            </TouchableOpacity>
          </View>
        )}

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

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <View style={{ position: 'relative' }}>
            <MessageSquare size={21} color="#2563EB" />
            <View style={styles.navChatDot} />
          </View>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Forum</Text>
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
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tabs
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  tabBadgeRed: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  tabBadgeRedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  wargaDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  wargaDotText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 14,
  },

  // Urgent Response Banner
  responseBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  bannerIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  bannerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  aktifPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  aktifPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },

  // Active Chat Item
  chatCardActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  chatCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  residentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  residentAvatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E40AF',
  },
  onlineBadgeDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tenantName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  roomPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roomPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  waitingTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  waitingTimeText: {
    fontSize: 10,
    color: '#DC2626',
    fontWeight: '600',
  },
  prioritasAcBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  prioritasAcText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
  },

  // Tenant Message
  tenantMessageBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  msgMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgMetaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  msgMetaTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  msgText: {
    fontSize: 12,
    color: '#1E293B',
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Smart Reply Container
  smartReplyContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  smartReplyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smartReplyLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smartReplyTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },
  slotTeknisiText: {
    fontSize: 10,
    color: '#64748B',
  },
  replyBubblePreview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  replyBubbleText: {
    fontSize: 12,
    color: '#0F172A',
    lineHeight: 18,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
  },
  replyActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  sendAnswerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  sendAnswerBtnDone: {
    backgroundColor: '#16A34A',
  },
  sendAnswerBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  editAnswerBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Antrean Chat Lainnya
  sectionWrap: {
    gap: 10,
    marginTop: 6,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  queueCountText: {
    fontSize: 11,
    color: '#64748B',
  },
  queueItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  queueAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  queueTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  queueName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  queueRoomBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  queueRoomText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  queueTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginLeft: 'auto',
  },
  queueMsgText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  fileSentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fileSentText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
  replyIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Forum Warga Moderasi
  forumWargaModerasiWrap: {
    gap: 12,
  },
  moderasiHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  moderasiTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  moderasiSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  broadcastForumBtn: {
    backgroundColor: '#1E40AF',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  broadcastForumBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  viewLiveForumBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewLiveForumBtnText: {
    color: '#2563EB',
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

