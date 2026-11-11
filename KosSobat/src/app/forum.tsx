import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Camera,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  DoorOpen,
  FileText,
  Home,
  Image as ImageIcon,
  Info,
  MapPin,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  User,
  Users,
  Wrench,
  X,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KOST_CONTACT, makePhoneCall } from '../services/telephonyService';

type TabView = 'grup' | 'personal';

interface ChatMessage {
  id: string;
  sender: string;
  room?: string;
  isOwner?: boolean;
  isMe?: boolean;
  avatar?: string;
  text: string;
  time: string;
  isOfficialNotice?: boolean;
  attachment?: {
    title: string;
    sub: string;
    amount?: string;
    type: 'transfer' | 'receipt' | 'technician';
  };
}

export default function ForumChatScreen() {
  const [activeTab, setActiveTab] = useState<TabView>('grup');
  const [groupInput, setGroupInput] = useState('');
  const [personalInput, setPersonalInput] = useState('');

  const [groupMessages, setGroupMessages] = useState<ChatMessage[]>([
    {
      id: 'g-1',
      sender: 'Taufik',
      room: 'Kamar B03',
      avatar: 'T',
      text: 'Ada yang mau ikut titip makan siang nasi padang Simpang Raya ga guys? Mau pesan bareng di ojol biar hemat ongkir 🍛',
      time: '11:42',
    },
    {
      id: 'g-2',
      sender: 'Sarah',
      room: 'Kamar A05',
      avatar: 'S',
      text: 'Mau dong Dimas! Aku titip ayam pop 1 yaa 🍗',
      time: '11:45',
    },
    {
      id: 'g-3',
      sender: 'Ibu Hj. Maryam',
      isOwner: true,
      avatar: 'HM',
      isOfficialNotice: true,
      text: 'Pengumuman Fasilitas: Mengingatkan kembali ya anak-anak kos, besok ada teknisi PDAM datang jam 2 siang untuk cek tandon air utama. Mohon tampung air cadangan secukupnya pagi hari.',
      time: '12:05',
    },
    {
      id: 'g-4',
      sender: 'Marshell',
      isMe: true,
      text: 'Baik bu pengelola, terima kasih infonya 🙏',
      time: '12:10',
    },
  ]);

  const [personalMessages, setPersonalMessages] = useState<ChatMessage[]>([
    {
      id: 'p-1',
      sender: 'Pak Hendra (Pengelola)',
      isOwner: true,
      avatar: 'H',
      text: 'Pagi Marshel, mengingatkan untuk bukti transfer pembayaran sewa bulan Oktober ini ya jika sudah melakukan transaksi. Terima kasih 🙏',
      time: '09:15',
    },
    {
      id: 'p-2',
      sender: 'Marshell',
      isMe: true,
      text: 'Pagi Pak Hendra, ini saya lampirkan bukti transfer untuk sewa Kamar A12 bulan Oktober via BCA ya Pak.',
      time: '09:20',
    },
    {
      id: 'p-3',
      sender: 'Marshell',
      isMe: true,
      text: 'Bukti transfer pembayaran berhasil terlampir',
      time: '09:21',
      attachment: {
        title: 'Rp 1.150.000',
        sub: 'BCA • Sewa Kost Okt 2026',
        amount: 'Rp 1.150.000',
        type: 'transfer',
      },
    },
    {
      id: 'p-4',
      sender: 'Pak Hendra (Pengelola)',
      isOwner: true,
      avatar: 'H',
      text: 'Terima kasih Marshel, sudah saya verifikasi di sistem dan kuitansi resminya sudah otomatis masuk ke menu Pembayaran & Riwayat di aplikasi ya 👍',
      time: '09:30',
      attachment: {
        title: 'Kuitansi #KOS-2026-10-A12',
        sub: 'Status: Lunas & Terverifikasi',
        type: 'receipt',
      },
    },
    {
      id: 'p-5',
      sender: 'Marshell',
      isMe: true,
      text: 'Siap Pak, terima kasih banyak! Oiya Pak, mau tanya teknisi AC yang perbaikan keran dan AC nanti siang kira-kira jam berapa ya sampainya?',
      time: '10:05',
    },
    {
      id: 'p-6',
      sender: 'Pak Hendra (Pengelola)',
      isOwner: true,
      avatar: 'H',
      text: 'Pak Joko teknisi estimasi jam 14.00 WIB sudah sampai di kamar A12 ya Mbak. Nanti langsung dikabari via aplikasi juga saat beliau sudah di depan.',
      time: '10:12',
      attachment: {
        title: 'Pak Joko (Teknisi AC & Plumbing)',
        sub: 'Jadwal: 14.00 WIB Hari Ini',
        type: 'technician',
      },
    },
  ]);

  const handleSendGroup = () => {
    if (!groupInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `g-${Date.now()}`,
      sender: 'Marshell',
      isMe: true,
      text: groupInput.trim(),
      time: 'Baru saja',
    };
    setGroupMessages([...groupMessages, newMsg]);
    setGroupInput('');
  };

  const handleSendPersonal = () => {
    if (!personalInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      sender: 'Marshell',
      isMe: true,
      text: personalInput.trim(),
      time: 'Baru saja',
    };
    setPersonalMessages([...personalMessages, newMsg]);
    setPersonalInput('');
  };

  const handleQuickReply = (text: string) => {
    setPersonalInput(text);
  };

  const handleCallOwner = () => {
    Alert.alert(
      'Hubungi Pengelola',
      `Telepon Pak Hendra (${KOST_CONTACT.phone})?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: '📞 Hubungi', onPress: () => makePhoneCall(KOST_CONTACT.phone) },
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
            <Text style={styles.headerSub}>KOST HARMONY LIVING</Text>
            <Text style={styles.headerTitle}>
              {activeTab === 'grup' ? 'Chat & Forum Penghuni' : 'Chat Personal'}
            </Text>
          </View>
        </View>

        <View style={styles.headerRightActions}>
          {activeTab === 'personal' ? (
            <>
              <TouchableOpacity
                style={styles.circleBtn}
                activeOpacity={0.7}
                onPress={handleCallOwner}>
                <Phone size={18} color="#2563EB" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleBtn}
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert('Opsi', 'Detail kontak pengelola Graha Harmoni Living.')
                }>
                <MoreVertical size={18} color="#0F172A" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.circleBtn}
              activeOpacity={0.7}
              onPress={() => router.push('/announcements')}>
              <Bell size={18} color="#0F172A" />
              <View style={styles.notifBadgeDot} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Segmented Tab Switcher */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'grup' && styles.tabBtnActive]}
          onPress={() => setActiveTab('grup')}
          activeOpacity={0.8}>
          <Users
            size={16}
            color={activeTab === 'grup' ? '#FFFFFF' : '#64748B'}
          />
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'grup' && styles.tabBtnTextActive,
            ]}>
            Grup Warga Kos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'personal' && styles.tabBtnActive]}
          onPress={() => setActiveTab('personal')}
          activeOpacity={0.8}>
          <MessageCircle
            size={16}
            color={activeTab === 'personal' ? '#FFFFFF' : '#64748B'}
          />
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'personal' && styles.tabBtnTextActive,
            ]}>
            Chat Personal
          </Text>
          <View
            style={[
              styles.unreadBadge,
              activeTab === 'personal' && { backgroundColor: '#FFFFFF' },
            ]}>
            <Text
              style={[
                styles.unreadBadgeText,
                activeTab === 'personal' && { color: '#2563EB' },
              ]}>
              2
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {activeTab === 'grup' ? (
            /* ============================================================ */
            /* TAB 1: GRUP WARGA KOS */
            /* ============================================================ */
            <>
              {/* Group Banner Info */}
              <View style={styles.groupInfoCard}>
                <View style={styles.groupInfoHeader}>
                  <View style={styles.groupIconBox}>
                    <Users size={18} color="#2563EB" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.groupTitleRow}>
                      <Text style={styles.groupName}>Warga Kos Harmoni</Text>
                      <View style={styles.resmiBadge}>
                        <View style={styles.blueDot} />
                        <Text style={styles.resmiText}>Resmi</Text>
                      </View>
                    </View>
                    <Text style={styles.groupSub}>
                      24 Penghuni Aktif • Kos Griya Harmoni
                    </Text>
                  </View>
                </View>

                {/* Night Curfew Callout */}
                <TouchableOpacity
                  style={styles.curfewCallout}
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.alert(
                      'Tata Tertib Jam Malam',
                      'Gerbang utama dikunci otomatis pukul 22.00 WIB demi keamanan. Akses darurat dapat menggunakan PIN Kunci Digital atau lapor satpam.'
                    )
                  }>
                  <MapPin size={13} color="#2563EB" />
                  <Text style={styles.curfewText} numberOfLines={1}>
                    Aturan Jam Malam: Gerbang digembok jam 22.00 WIB
                  </Text>
                  <Text style={styles.curfewLink}>Detail &gt;</Text>
                </TouchableOpacity>
              </View>

              {/* Date Separator */}
              <View style={styles.dateSeparator}>
                <Text style={styles.dateSeparatorText}>Hari Ini, 24 Oktober</Text>
              </View>

              {/* Messages Stream */}
              {groupMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.msgWrapper,
                    msg.isMe ? styles.msgWrapperRight : styles.msgWrapperLeft,
                  ]}>
                  {!msg.isMe && (
                    <View
                      style={[
                        styles.msgAvatar,
                        msg.isOwner && { backgroundColor: '#1E40AF' },
                      ]}>
                      <Text
                        style={[
                          styles.msgAvatarText,
                          msg.isOwner && { color: '#FFFFFF' },
                        ]}>
                        {msg.avatar ?? msg.sender.charAt(0)}
                      </Text>
                    </View>
                  )}

                  <View style={{ maxWidth: '82%' }}>
                    {!msg.isMe && (
                      <View style={styles.senderNameRow}>
                        <Text style={styles.senderName}>{msg.sender}</Text>
                        {msg.room && (
                          <Text style={styles.senderRoom}>• {msg.room}</Text>
                        )}
                        {msg.isOwner && (
                          <View style={styles.pengelolaBadge}>
                            <Text style={styles.pengelolaBadgeText}>
                              PENGELOLA
                            </Text>
                          </View>
                        )}
                      </View>
                    )}

                    <View
                      style={[
                        styles.bubble,
                        msg.isMe ? styles.bubbleMe : styles.bubbleOther,
                        msg.isOfficialNotice && styles.bubbleOfficial,
                      ]}>
                      {msg.isOfficialNotice && (
                        <View style={styles.officialHeaderRow}>
                          <Megaphone size={14} color="#2563EB" />
                          <Text style={styles.officialNoticeHeading}>
                            Pengumuman Fasilitas
                          </Text>
                        </View>
                      )}
                      <Text
                        style={[
                          styles.bubbleText,
                          msg.isMe ? styles.bubbleTextMe : styles.bubbleTextOther,
                        ]}>
                        {msg.text}
                      </Text>
                      <View style={styles.bubbleTimeRow}>
                        <Text
                          style={[
                            styles.bubbleTime,
                            msg.isMe && styles.bubbleTimeMe,
                          ]}>
                          {msg.time}
                        </Text>
                        {msg.isMe && (
                          <CheckCheck size={13} color="#FFFFFF" style={{ marginLeft: 3 }} />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              {/* Floating Link to Personal Chat */}
              <TouchableOpacity
                style={styles.floatingPersonalCard}
                activeOpacity={0.8}
                onPress={() => setActiveTab('personal')}>
                <View style={styles.floatingPersonalIcon}>
                  <MessageSquare size={16} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.floatingPersonalTitle}>
                    Chat Pribadi (2 Belum Dibaca)
                  </Text>
                  <Text style={styles.floatingPersonalSub} numberOfLines={1}>
                    Pak Hendra: Bukti transfer sewa bulan Oktober...
                  </Text>
                </View>
                <ChevronRight size={18} color="#94A3B8" />
              </TouchableOpacity>
            </>
          ) : (
            /* ============================================================ */
            /* TAB 2: CHAT PERSONAL */
            /* ============================================================ */
            <>
              {/* Room Banner */}
              <TouchableOpacity
                style={styles.personalRoomBanner}
                activeOpacity={0.7}
                onPress={() => router.push('/payment')}>
                <DoorOpen size={15} color="#2563EB" />
                <Text style={styles.personalRoomText}>
                  Kamar A12 • Kost Graha Harmoni
                </Text>
                <Text style={styles.personalDetailLink}>Detail Sewa &gt;</Text>
              </TouchableOpacity>

              {/* Date Separator */}
              <View style={styles.dateSeparator}>
                <Text style={styles.dateSeparatorText}>
                  Hari Ini, 24 Oktober 2026
                </Text>
              </View>

              {/* Messages Stream */}
              {personalMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.msgWrapper,
                    msg.isMe ? styles.msgWrapperRight : styles.msgWrapperLeft,
                  ]}>
                  {!msg.isMe && (
                    <View style={styles.ownerAvatar}>
                      <Text style={styles.ownerAvatarText}>PH</Text>
                    </View>
                  )}

                  <View style={{ maxWidth: '85%' }}>
                    {msg.attachment?.type === 'transfer' ? (
                      /* Transfer receipt attachment preview card */
                      <View style={styles.transferReceiptCard}>
                        <View style={styles.transferReceiptHeader}>
                          <View style={styles.berhasilBadge}>
                            <CheckCircle2 size={12} color="#16A34A" />
                            <Text style={styles.berhasilText}>Berhasil</Text>
                          </View>
                        </View>

                        <View style={styles.transferReceiptBody}>
                          <Text style={styles.transferAmountBig}>
                            {msg.attachment.amount}
                          </Text>
                          <Text style={styles.transferSub}>
                            {msg.attachment.sub}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={styles.openReceiptBtn}
                          activeOpacity={0.8}
                          onPress={() =>
                            Alert.alert(
                              'Bukti Transfer BCA',
                              'Nomor Referensi: TRF-BCA-88392104\nJumlah: Rp 1.150.000\nPengirim: Marshell (Kamar A12)\nPenerima: Hendra Gunawan (Graha Harmoni Living)'
                            )
                          }>
                          <Text style={styles.openReceiptBtnText}>
                            👁️ Buka Bukti Transfer
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.bubbleTimeRowRight}>
                          <Text style={styles.bubbleTime}>{msg.time}</Text>
                          <CheckCheck size={13} color="#2563EB" style={{ marginLeft: 3 }} />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.bubble,
                          msg.isMe ? styles.bubbleMe : styles.bubbleOther,
                        ]}>
                        <Text
                          style={[
                            styles.bubbleText,
                            msg.isMe
                              ? styles.bubbleTextMe
                              : styles.bubbleTextOther,
                          ]}>
                          {msg.text}
                        </Text>

                        {/* Extra Attachment Box */}
                        {msg.attachment?.type === 'receipt' && (
                          <View style={styles.receiptNoticeBox}>
                            <FileText size={14} color="#16A34A" />
                            <View style={{ flex: 1 }}>
                              <Text style={styles.receiptNoticeTitle}>
                                {msg.attachment.title}
                              </Text>
                              <Text style={styles.receiptNoticeSub}>
                                {msg.attachment.sub}
                              </Text>
                            </View>
                          </View>
                        )}

                        {msg.attachment?.type === 'technician' && (
                          <View style={styles.technicianNoticeBox}>
                            <Wrench size={16} color="#2563EB" />
                            <View style={{ flex: 1 }}>
                              <Text style={styles.techNoticeTitle}>
                                {msg.attachment.title}
                              </Text>
                              <Text style={styles.techNoticeSub}>
                                {msg.attachment.sub}
                              </Text>
                            </View>
                          </View>
                        )}

                        <View style={styles.bubbleTimeRow}>
                          <Text
                            style={[
                              styles.bubbleTime,
                              msg.isMe && styles.bubbleTimeMe,
                            ]}>
                            {msg.time}
                          </Text>
                          {msg.isMe && (
                            <CheckCheck size={13} color="#FFFFFF" style={{ marginLeft: 3 }} />
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ))}

              {/* Quick Reply Chips */}
              <View style={styles.quickChipsWrap}>
                <TouchableOpacity
                  style={styles.quickChip}
                  onPress={() => handleQuickReply('Terima kasih Pak 👍')}>
                  <Text style={styles.quickChipText}>Terima kasih Pak 👍</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickChip}
                  onPress={() => handleQuickReply('Saya tunggu di kamar 🕒')}>
                  <Text style={styles.quickChipText}>
                    Saya tunggu di kamar 🕒
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickChip}
                  onPress={() =>
                    handleQuickReply(
                      'Bukti transfer sudah saya kirimkan via BCA'
                    )
                  }>
                  <Text style={styles.quickChipText}>Bukti transfer...</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={{ height: 90 }} />
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          {activeTab === 'grup' ? (
            <>
              <TouchableOpacity
                style={styles.inputActionIcon}
                onPress={() =>
                  Alert.alert('Lampiran', 'Pilih foto atau dokumen untuk dikirim ke grup warga.')
                }>
                <Camera size={20} color="#64748B" />
              </TouchableOpacity>
              <TextInput
                style={styles.chatInput}
                placeholder="Tulis pesan ke grup warga..."
                placeholderTextColor="#94A3B8"
                value={groupInput}
                onChangeText={setGroupInput}
              />
              <TouchableOpacity
                style={styles.inputActionIcon}
                onPress={() =>
                  Alert.alert('Emoji', 'Pilih stiker dan emoji kebersamaan kos.')
                }>
                <Smile size={20} color="#64748B" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendBtn}
                activeOpacity={0.8}
                onPress={handleSendGroup}>
                <Send size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.inputActionIcon}
                onPress={() =>
                  Alert.alert('Lampiran', 'Kirim foto kendala atau bukti transfer ke Pak Hendra.')
                }>
                <Plus size={22} color="#64748B" />
              </TouchableOpacity>
              <TextInput
                style={styles.chatInput}
                placeholder="Ketik pesan..."
                placeholderTextColor="#94A3B8"
                value={personalInput}
                onChangeText={setPersonalInput}
              />
              <TouchableOpacity
                style={styles.inputActionIcon}
                onPress={() =>
                  Alert.alert('Emoji', 'Pilih ekspresi obrolan.')
                }>
                <Smile size={20} color="#64748B" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendBtn}
                activeOpacity={0.8}
                onPress={handleSendPersonal}>
                <Send size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.8}
          onPress={() => router.push('/home')}>
          <Home size={21} color="#64748B" />
          <Text style={styles.navLabel}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <View style={{ position: 'relative' }}>
            <MessageSquare size={21} color="#2563EB" />
            <View style={styles.navChatDot} />
          </View>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Chat</Text>
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
  headerSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
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
  notifBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },

  // Segmented Tabs
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
  unreadBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  unreadBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },

  // Group Info Banner
  groupInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  groupInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groupIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  resmiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  blueDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2563EB',
  },
  resmiText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  groupSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  curfewCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
  },
  curfewText: {
    flex: 1,
    fontSize: 11,
    color: '#334155',
    fontWeight: '500',
  },
  curfewLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Date Separator
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 8,
  },
  dateSeparatorText: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Chat Bubbles
  msgWrapper: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  msgWrapperLeft: {
    alignSelf: 'flex-start',
  },
  msgWrapperRight: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  msgAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  msgAvatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E40AF',
  },
  ownerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  ownerAvatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  senderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  senderRoom: {
    fontSize: 11,
    color: '#64748B',
  },
  pengelolaBadge: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  pengelolaBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  bubbleOther: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: '#2563EB',
    borderTopRightRadius: 4,
  },
  bubbleOfficial: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  officialHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  officialNoticeHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 19,
  },
  bubbleTextOther: {
    color: '#0F172A',
  },
  bubbleTextMe: {
    color: '#FFFFFF',
  },
  bubbleTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  bubbleTimeRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  bubbleTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  bubbleTimeMe: {
    color: '#BFDBFE',
  },

  // Floating Personal Card
  floatingPersonalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginTop: 10,
  },
  floatingPersonalIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingPersonalTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E40AF',
  },
  floatingPersonalSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  // Personal Room Banner
  personalRoomBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  personalRoomText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
  personalDetailLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Transfer Receipt Attachment
  transferReceiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  transferReceiptHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  berhasilBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  berhasilText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  transferReceiptBody: {
    gap: 2,
  },
  transferAmountBig: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  transferSub: {
    fontSize: 11,
    color: '#64748B',
  },
  openReceiptBtn: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  openReceiptBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Attachments in bubble
  receiptNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginTop: 6,
  },
  receiptNoticeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
  },
  receiptNoticeSub: {
    fontSize: 10,
    color: '#15803D',
  },
  technicianNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginTop: 6,
  },
  techNoticeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },
  techNoticeSub: {
    fontSize: 10,
    color: '#2563EB',
  },

  // Quick Reply Chips
  quickChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  quickChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  quickChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Chat Input Container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 60,
  },
  inputActionIcon: {
    padding: 6,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
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

