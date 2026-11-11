import { router } from 'expo-router';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  DoorOpen,
  Edit3,
  Filter,
  Flame,
  Home,
  Info,
  Layers,
  MapPin,
  Maximize2,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  User,
  Users,
  Wifi,
  Wind,
  X,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
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

type FilterCategory = 'semua' | 'terisi' | 'kosong' | 'lantai1' | 'lantai2';

interface Resident {
  name: string;
  avatar: string;
  origin: string;
  university: string;
  major: string;
  phone?: string;
}

interface RoomItem {
  id: string;
  roomNumber: string;
  floor: number;
  position: string;
  isOccupied: boolean;
  resident?: Resident;
  price?: number;
  tags?: string[];
  specs?: string[];
  emptyDescription?: string;
}

const ROOM_DATA: RoomItem[] = [
  {
    id: 'kmr-01',
    roomNumber: 'Kamar 01',
    floor: 1,
    position: 'Lt. 1 Depan',
    isOccupied: true,
    resident: {
      name: 'Rizky Ramadhan',
      avatar: 'RR',
      origin: 'Jawa Timur (Malang)',
      university: 'Univ. Muhammadiyah Malang (UMM)',
      major: 'Teknik Mesin',
      phone: '081234567801',
    },
    tags: ['AC', 'KM Dalam', 'Springbed', 'Meja Belajar'],
  },
  {
    id: 'kmr-02',
    roomNumber: 'Kamar 02',
    floor: 1,
    position: 'Lt. 1 Tengah',
    isOccupied: true,
    resident: {
      name: 'Dimas Prasetyo',
      avatar: 'DP',
      origin: 'Jawa Barat (Bandung)',
      university: 'Universitas Brawijaya (UB)',
      major: 'Teknik Informatika',
      phone: '081234567802',
    },
    tags: ['AC', 'KM Dalam', 'Single Bed', 'WiFi 100Mbps'],
  },
  {
    id: 'kmr-03',
    roomNumber: 'Kamar 03',
    floor: 1,
    position: 'Lt. 1 Sudut',
    isOccupied: true,
    resident: {
      name: 'Bima Nugraha',
      avatar: 'BN',
      origin: 'DI Yogyakarta',
      university: 'Institut Teknologi Sepuluh Nopember',
      major: 'Desain Komunikasi Visual (DKV)',
      phone: '081234567803',
    },
    tags: ['AC', 'KM Dalam', 'Lemari 2 Pintu', 'Meja Belajar'],
  },
  {
    id: 'kmr-04',
    roomNumber: 'Kamar 04',
    floor: 1,
    position: 'Lt. 1 Belakang',
    isOccupied: false,
    price: 1100000,
    emptyDescription:
      'Kamar ini masih kosong dan belum ada yang tinggalin / menempati.',
    specs: [
      'Ukuran Kamar Luas 3 x 4 Meter',
      'Kamar Mandi Dalam (Kloset Duduk & Shower)',
      'Kasur Busa Tebal Baru & Sprei Siap Pakai',
      'Lemari 2 Pintu + Cermin',
      'Ventilasi jendela menghadap taman samping asri',
    ],
  },
  {
    id: 'kmr-05',
    roomNumber: 'Kamar 05',
    floor: 2,
    position: 'Lt. 2 Balkon',
    isOccupied: true,
    resident: {
      name: 'Rifa Fauziah',
      avatar: 'RF',
      origin: 'Jawa Tengah (Solo)',
      university: 'Universitas Negeri Malang (UM)',
      major: 'Manajemen Bisnis',
      phone: '081234567805',
    },
    tags: ['AC', 'KM Dalam', 'Akses Balkon', 'Meja Belajar'],
  },
  {
    id: 'kmr-06',
    roomNumber: 'Kamar 06',
    floor: 2,
    position: 'Lt. 2 Tengah',
    isOccupied: true,
    resident: {
      name: 'Ahmad Fauzi',
      avatar: 'AF',
      origin: 'Sumatera Utara (Medan)',
      university: 'Universitas Brawijaya (UB)',
      major: 'Ilmu Komunikasi',
      phone: '081234567806',
    },
    tags: ['AC', 'KM Luar', 'Springbed single', 'Meja Belajar'],
  },
  {
    id: 'kmr-09',
    roomNumber: 'Kamar 09',
    floor: 2,
    position: 'Lt. 2 Ujung',
    isOccupied: false,
    price: 1100000,
    emptyDescription:
      'Kamar ini masih kosong dan belum ada yang tinggalin / menempati.',
    specs: [
      'Luas 3 x 4 Meter posisi pojok tenang',
      'Kamar Mandi Dalam bersih',
      'Kasur busa tebal baru & bantal guling lengkap',
      'Lemari pakaian 2 pintu baru',
      'Sirkulasi udara sejuk, jendela hadap taman samping',
    ],
  },
];

export default function ExploreRoomsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('semua');
  const [bookedRooms, setBookedRooms] = useState<string[]>([]);

  // Filter & Search Logic
  const filteredRooms = useMemo(() => {
    return ROOM_DATA.filter((room) => {
      // Filter tab
      if (activeFilter === 'terisi' && !room.isOccupied) return false;
      if (activeFilter === 'kosong' && room.isOccupied) return false;
      if (activeFilter === 'lantai1' && room.floor !== 1) return false;
      if (activeFilter === 'lantai2' && room.floor !== 2) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchRoom = room.roomNumber.toLowerCase().includes(q);
      const matchPos = room.position.toLowerCase().includes(q);
      const matchName = room.resident?.name.toLowerCase().includes(q);
      const matchUniv = room.resident?.university.toLowerCase().includes(q);
      const matchMajor = room.resident?.major.toLowerCase().includes(q);
      const matchOrigin = room.resident?.origin.toLowerCase().includes(q);

      return (
        matchRoom ||
        matchPos ||
        Boolean(matchName) ||
        Boolean(matchUniv) ||
        Boolean(matchMajor) ||
        Boolean(matchOrigin)
      );
    });
  }, [searchQuery, activeFilter]);

  const handleBooking = (room: RoomItem) => {
    const isBooked = bookedRooms.includes(room.id);
    if (isBooked) {
      Alert.alert(
        'Batalkan Tanda Booking?',
        `Apakah Anda ingin membatalkan tanda booking untuk ${room.roomNumber}?`,
        [
          { text: 'Tidak', style: 'cancel' },
          {
            text: 'Ya, Batalkan',
            onPress: () => {
              setBookedRooms((prev) => prev.filter((id) => id !== room.id));
              Alert.alert('Sukses', `Tanda booking ${room.roomNumber} dibatalkan.`);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Tandai Booking Unit',
        `Konfirmasi booking untuk ${room.roomNumber} (${room.position}) seharga Rp 1.100.000/bulan?\n\nPengelola akan segera memverifikasi ketersediaan dan menghubungi Anda.`,
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Booking Sekarang',
            onPress: () => {
              setBookedRooms((prev) => [...prev, room.id]);
              Alert.alert(
                'Booking Berhasil!',
                `Permintaan booking ${room.roomNumber} telah dikirim ke Pak Hendra (Pengelola).`
              );
            },
          },
        ]
      );
    }
  };

  const handleContactResident = (resident: Resident) => {
    Alert.alert(
      `Hubungi ${resident.name}`,
      `Kirim pesan ke penghuni ini melalui Forum Warga atau WhatsApp?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Buka Forum Chat',
          onPress: () => router.push('/forum'),
        },
      ]
    );
  };

  const handleCallManager = (roomNumber: string) => {
    Alert.alert(
      'Hubungi Pengelola',
      `Tanyakan ketersediaan ${roomNumber} kepada Pengelola (${KOST_CONTACT.name})?\nNomor: ${KOST_CONTACT.phone}`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: '📞 Hubungi Sekarang',
          onPress: () => makePhoneCall(KOST_CONTACT.phone),
        },
      ]
    );
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

        <Text style={styles.headerTitle}>Kamar & Penghuni</Text>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.circleBtn}
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                'Filter Kamar',
                'Pilih lantai atau status kamar dari tombol filter di bawah kotak pencarian.'
              );
            }}>
            <SlidersHorizontal size={19} color="#0F172A" />
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
        {/* 1. Summary Card Okupansi Kos */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            {/* Total Unit */}
            <View style={styles.summaryCol}>
              <View style={styles.summaryIconBox}>
                <Building2 size={16} color="#2563EB" />
              </View>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>Kapasitas Kos</Text>
              <Text style={styles.summarySub}>Total Unit</Text>
            </View>

            <View style={styles.summaryDivider} />

            {/* Terisi */}
            <View style={styles.summaryCol}>
              <View style={styles.summaryIconBox}>
                <Users size={16} color="#2563EB" />
              </View>
              <Text style={styles.summaryValue}>10</Text>
              <Text style={styles.summaryLabel}>Mahasiswa Aktif</Text>
              <Text style={styles.summarySub}>Terisi</Text>
            </View>

            <View style={styles.summaryDivider} />

            {/* Kosong */}
            <View style={styles.summaryCol}>
              <View style={styles.summaryIconBox}>
                <DoorOpen size={16} color="#2563EB" />
              </View>
              <Text style={styles.summaryValue}>2</Text>
              <Text style={styles.summaryLabel}>Siap Huni</Text>
              <Text style={styles.summarySub}>Kosong</Text>
            </View>
          </View>

          {/* Progress Bar Okupansi */}
          <View style={styles.occupancyWrap}>
            <View style={styles.occupancyLabelRow}>
              <Text style={styles.occupancyTitle}>Tingkat Okupansi Bangunan</Text>
              <Text style={styles.occupancyPercent}>83.3% Terisi</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: '83.3%' }]} />
            </View>
          </View>
        </View>

        {/* 2. Search Bar Input */}
        <View style={styles.searchBox}>
          <Search size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari kamar, nama, kampus, asal..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'semua' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('semua')}>
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'semua' && styles.filterChipTextActive,
              ]}>
              Semua (7)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'terisi' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('terisi')}>
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'terisi' && styles.filterChipTextActive,
              ]}>
              Terisi (5)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'kosong' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('kosong')}>
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'kosong' && styles.filterChipTextActive,
              ]}>
              Kosong / Siap Huni (2)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'lantai1' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('lantai1')}>
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'lantai1' && styles.filterChipTextActive,
              ]}>
              Lantai 1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'lantai2' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('lantai2')}>
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'lantai2' && styles.filterChipTextActive,
              ]}>
              Lantai 2
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 3. Room Cards List */}
        <View style={styles.roomList}>
          {filteredRooms.map((room) => {
            const isBooked = bookedRooms.includes(room.id);

            if (room.isOccupied && room.resident) {
              // Occupied Room Card
              return (
                <View key={room.id} style={styles.roomCard}>
                  {/* Card Header */}
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.roomTitleGroup}>
                      <View style={styles.roomNumberBadge}>
                        <Text style={styles.roomNumberText}>{room.roomNumber}</Text>
                      </View>
                      <View style={styles.positionBadge}>
                        <Edit3 size={11} color="#64748B" />
                        <Text style={styles.positionText}>{room.position}</Text>
                      </View>
                    </View>

                    <View style={styles.statusPillOccupied}>
                      <View style={styles.blueDot} />
                      <Text style={styles.statusPillTextOccupied}>Terisi</Text>
                    </View>
                  </View>

                  {/* Resident Profile Section */}
                  <View style={styles.residentRow}>
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>{room.resident.avatar}</Text>
                    </View>

                    <View style={styles.residentMeta}>
                      <View style={styles.residentNameRow}>
                        <Text style={styles.residentName}>{room.resident.name}</Text>
                        <View style={styles.onlineMiniDot} />
                      </View>
                      <View style={styles.originRow}>
                        <MapPin size={12} color="#64748B" />
                        <Text style={styles.originText}>{room.resident.origin}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.chatActionBtn}
                      activeOpacity={0.7}
                      onPress={() => handleContactResident(room.resident!)}>
                      <MessageSquare size={17} color="#2563EB" />
                    </TouchableOpacity>
                  </View>

                  {/* Academic Info Box */}
                  <View style={styles.academicBox}>
                    <View style={styles.academicCol}>
                      <Text style={styles.academicLabel}>UNIVERSITAS</Text>
                      <Text style={styles.academicValue} numberOfLines={1}>
                        {room.resident.university}
                      </Text>
                    </View>
                    <View style={styles.academicCol}>
                      <Text style={styles.academicLabel}>PROGRAM STUDI</Text>
                      <Text style={styles.academicValue} numberOfLines={1}>
                        {room.resident.major}
                      </Text>
                    </View>
                  </View>

                  {/* Facility Tag Pills */}
                  {room.tags && (
                    <View style={styles.tagsContainer}>
                      {room.tags.map((tag, idx) => (
                        <View key={idx} style={styles.facilityPill}>
                          <Text style={styles.facilityPillText}>
                            {tag.includes('AC') && '❄️ '}
                            {tag.includes('KM') && '🚿 '}
                            {tag.includes('Bed') && '🛏️ '}
                            {tag.includes('Spring') && '🛏️ '}
                            {tag.includes('Lemari') && '🚪 '}
                            {tag.includes('Meja') && '🪑 '}
                            {tag.includes('WiFi') && '📶 '}
                            {tag.includes('Balkon') && '🏢 '}
                            {tag}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            }

            // Empty / Available Room Card
            return (
              <View key={room.id} style={[styles.roomCard, styles.emptyRoomCard]}>
                {/* Header */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.roomTitleGroup}>
                    <View style={styles.emptyNumberBadge}>
                      <Text style={styles.emptyNumberText}>{room.roomNumber}</Text>
                    </View>
                    <View style={styles.positionBadge}>
                      <Edit3 size={11} color="#64748B" />
                      <Text style={styles.positionText}>{room.position}</Text>
                    </View>
                  </View>

                  <View style={styles.statusPillEmpty}>
                    <View style={styles.cyanDot} />
                    <Text style={styles.statusPillTextEmpty}>Kosong / Siap Huni</Text>
                  </View>
                </View>

                {/* Info Callout */}
                <View style={styles.emptyCallout}>
                  <Info size={15} color="#2563EB" style={{ marginTop: 2 }} />
                  <Text style={styles.emptyCalloutText}>{room.emptyDescription}</Text>
                </View>

                {/* Specs Container */}
                <View style={styles.specsWrap}>
                  <Text style={styles.specsHeading}>
                    SPESIFIKASI & FASILITAS KAMAR
                  </Text>
                  {room.specs?.map((spec, sIdx) => (
                    <View key={sIdx} style={styles.specItemRow}>
                      <View style={styles.specIconDot}>
                        <Check size={11} color="#2563EB" />
                      </View>
                      <Text style={styles.specItemText}>{spec}</Text>
                    </View>
                  ))}
                </View>

                {/* Price Row */}
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.priceLabel}>Tarif Bulanan</Text>
                    <Text style={styles.priceValue}>
                      Rp {room.price?.toLocaleString('id-ID')}{' '}
                      <Text style={styles.priceMonth}>/ bulan</Text>
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.emptyActionsRow}>
                  <TouchableOpacity
                    style={[
                      styles.bookingBtn,
                      isBooked && styles.bookingBtnActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handleBooking(room)}>
                    <Tag size={16} color="#FFFFFF" />
                    <Text style={styles.bookingBtnText}>
                      {isBooked ? '✓ Sudah Ditandai Booking' : 'Tandai Booking'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.callManagerBtn}
                    activeOpacity={0.8}
                    onPress={() => handleCallManager(room.roomNumber)}>
                    <Phone size={18} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

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
    fontSize: 17,
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
    gap: 14,
  },

  // 1. Summary Okupansi Card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  summarySub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F1F5F9',
  },
  occupancyWrap: {
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
  occupancyTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  occupancyPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  progressBarTrack: {
    height: 7,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },

  // 2. Search & Filter Bar
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  filterBar: {
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // 3. Room List & Cards
  roomList: {
    gap: 14,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  emptyRoomCard: {
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomNumberBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roomNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  emptyNumberBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  emptyNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#475569',
  },
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  positionText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statusPillOccupied: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  statusPillTextOccupied: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  statusPillEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  cyanDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusPillTextEmpty: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },

  // Occupied Resident Row
  residentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E40AF',
  },
  residentMeta: {
    flex: 1,
    gap: 3,
  },
  residentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  residentName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  onlineMiniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  originText: {
    fontSize: 12,
    color: '#64748B',
  },
  chatActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Academic Box
  academicBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  academicCol: {
    gap: 2,
  },
  academicLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  academicValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },

  // Facilities tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  facilityPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  facilityPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },

  // Empty Room Detail
  emptyCallout: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    alignItems: 'flex-start',
  },
  emptyCalloutText: {
    flex: 1,
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
  },
  specsWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    gap: 9,
  },
  specsHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  specItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  specIconDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  specItemText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
  },
  priceRow: {
    paddingVertical: 2,
  },
  priceLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2563EB',
    marginTop: 2,
  },
  priceMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  emptyActionsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  bookingBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bookingBtnActive: {
    backgroundColor: '#16A34A',
    shadowColor: '#16A34A',
  },
  bookingBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  callManagerBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
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
