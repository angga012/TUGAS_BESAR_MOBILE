import { router } from 'expo-router';
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  Edit2,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Filter,
  Home,
  Layers,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  QrCode,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  User,
  UserCheck,
  UserPlus,
  Users,
  Wifi,
  Wind,
  X,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
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

type RoomFilter = 'semua' | 'terisi' | 'kosong';

interface AdminRoom {
  id: string;
  number: string;
  floor: string;
  isOccupied: boolean;
  residentName?: string;
  origin?: string;
  campus?: string;
  tags: string[];
  price?: number;
  emptyDesc?: string;
  phone?: string;
}

const ADMIN_ROOM_DATA: AdminRoom[] = [
  {
    id: '01',
    number: '01',
    floor: 'Lt. 1',
    isOccupied: true,
    residentName: 'Rizky Ramadhan',
    origin: 'Malang',
    campus: 'UMM (Teknik Mesin)',
    tags: ['AC Dingin', 'KM Dalam', 'Springbed'],
    phone: '081234567801',
  },
  {
    id: '02',
    number: '02',
    floor: 'Lt. 1',
    isOccupied: true,
    residentName: 'Dimas Prasetyo',
    origin: 'Bandung',
    campus: 'UB (Teknik Informatika)',
    tags: ['AC', 'KM Dalam', 'Single Bed', 'WiFi'],
    phone: '081234567802',
  },
  {
    id: '03',
    number: '03',
    floor: 'Lt. 1',
    isOccupied: true,
    residentName: 'Bima Nugraha',
    origin: 'Yogyakarta',
    campus: 'ITS (DKV)',
    tags: ['AC', 'KM Dalam', 'Meja Belajar'],
    phone: '081234567803',
  },
  {
    id: '04',
    number: '04',
    floor: 'Lt. 1',
    isOccupied: false,
    price: 1100000,
    emptyDesc:
      'Kamar ini masih kosong dan belum ada yang tinggalin / menempati. Ukuran 3x4m, KM Dalam, kasur busa tebal baru, lemari 2 pintu.',
    tags: ['3x4m', 'KM Dalam', 'Lemari 2 Pintu'],
  },
  {
    id: '05',
    number: '05',
    floor: 'Lt. 1',
    isOccupied: true,
    residentName: 'Rifa Fauziah',
    origin: 'Solo',
    campus: 'UM (Manajemen Bisnis)',
    tags: ['AC', 'KM Dalam', 'Akses Balkon'],
    phone: '081234567890',
  },
  {
    id: '06',
    number: '06',
    floor: 'Lt. 2',
    isOccupied: true,
    residentName: 'Ahmad Fauzi',
    origin: 'Medan',
    campus: 'UB (Ilmu Komunikasi)',
    tags: ['AC', 'KM Luar', 'WiFi'],
    phone: '081234567806',
  },
  {
    id: '09',
    number: '09',
    floor: 'Lt. 2',
    isOccupied: false,
    price: 1100000,
    emptyDesc:
      'Posisi Lt. 2 Ujung tenang & pencahayaan alami optimal. Luas 3x4m, KM Dalam, lemari baru, sirkulasi sejuk.',
    tags: ['3x4m', 'KM Dalam', 'View Luar'],
  },
];

export default function OwnerRoomsScreen() {
  const [filter, setFilter] = useState<RoomFilter>('semua');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ADMIN_ROOM_DATA.filter((item) => {
      if (filter === 'terisi' && !item.isOccupied) return false;
      if (filter === 'kosong' && item.isOccupied) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.number.toLowerCase().includes(q) ||
        item.floor.toLowerCase().includes(q) ||
        Boolean(item.residentName?.toLowerCase().includes(q)) ||
        Boolean(item.campus?.toLowerCase().includes(q)) ||
        Boolean(item.origin?.toLowerCase().includes(q))
      );
    });
  }, [filter, search]);

  const handleContractDetail = (room: AdminRoom) => {
    Alert.alert(
      `Detail Kontrak Kamar ${room.number}`,
      `Penghuni: ${room.residentName}\nKampus: ${room.campus}\nAsal: ${room.origin}\nStatus Sewa: Aktif hingga 15 Jan 2027\nTarif: Rp 1.150.000 / bln`
    );
  };

  const handleChatWA = (room: AdminRoom) => {
    Alert.alert(
      'Hubungi Penghuni',
      `Kirim WhatsApp ke ${room.residentName} (${room.phone})?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Buka Obrolan',
          onPress: () => router.push('/owner-forum'),
        },
      ]
    );
  };

  const handlePublishAd = (room: AdminRoom) => {
    Alert.alert(
      'Terbitkan Iklan',
      `Unit Kamar ${room.number} (${room.floor}) berhasil disinkronkan ke Marketplace Kos & Status Siap Huni dipublikasikan!`
    );
  };

  const handleInputTenant = (room: AdminRoom) => {
    Alert.alert(
      'Input Penghuni Baru',
      `Masukkan data kontrak & KTP penghuni baru untuk Kamar ${room.number}.`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Form Registrasi', onPress: () => router.push('/register') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.circleBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Master Data Kamar</Text>
          <Text style={styles.headerSub}>KosKu Admin Suite</Text>
        </View>

        <TouchableOpacity
          style={styles.profileBtn}
          activeOpacity={0.7}
          onPress={() => router.push('/owner-profile')}>
          <User size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Building Selector Bar */}
        <View style={styles.buildingBar}>
          <View style={styles.buildingLeft}>
            <Building2 size={16} color="#1E40AF" />
            <Text style={styles.buildingTitle}>Gedung Utama (Blok A-B)</Text>
          </View>
          <View style={styles.buildingActions}>
            <TouchableOpacity
              style={styles.buildingFilterBtn}
              onPress={() =>
                Alert.alert('Filter Blok', 'Pilih blok bangunan: Blok A atau Blok B')
              }>
              <SlidersHorizontal size={13} color="#2563EB" />
              <Text style={styles.buildingFilterText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buildingAddBtn}
              onPress={() =>
                Alert.alert('Tambah Kamar', 'Buka modal pembuatan unit kamar baru.')
              }>
              <Plus size={13} color="#FFFFFF" />
              <Text style={styles.buildingAddText}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Occupancy Status Card */}
        <View style={styles.occupancyCard}>
          <Text style={styles.occupancyHeading}>
            STATUS OKUPANSI BANGUNAN
          </Text>
          <View style={styles.occupancyHeaderRow}>
            <Text style={styles.occupancyBig}>10 dari 12 Kamar Terisi</Text>
            <View style={styles.occupancyBadge}>
              <Text style={styles.occupancyBadgeText}>83.3% Okupansi</Text>
            </View>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '83.3%' }]} />
          </View>

          <View style={styles.occupancyLegendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.legendText}>10 Aktif Menghuni</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#94A3B8' }]} />
              <Text style={styles.legendText}>
                2 Kamar Kosong (Kmr 04 & 09)
              </Text>
            </View>
          </View>

          {/* 3 Metric Summary Boxes */}
          <View style={styles.metricThreeRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Total Unit</Text>
              <Text style={styles.metricVal}>12</Text>
              <Text style={styles.metricSub}>2 Lantai</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Terisi</Text>
              <Text style={[styles.metricVal, { color: '#2563EB' }]}>10</Text>
              <Text style={styles.metricSub}>Mahasiswa & Kerja</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Siap Huni</Text>
              <Text style={[styles.metricVal, { color: '#059669' }]}>2</Text>
              <Text style={styles.metricSub}>Rp 1,1 Jt / bln</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={17} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nomor kamar, nama, kampus, asal..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={15} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPillsRow}>
          <TouchableOpacity
            style={[
              styles.pillBtn,
              filter === 'semua' && styles.pillBtnActive,
            ]}
            onPress={() => setFilter('semua')}>
            <Text
              style={[
                styles.pillBtnText,
                filter === 'semua' && styles.pillBtnTextActive,
              ]}>
              Semua (12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pillBtn,
              filter === 'terisi' && styles.pillBtnActive,
            ]}
            onPress={() => setFilter('terisi')}>
            <Text
              style={[
                styles.pillBtnText,
                filter === 'terisi' && styles.pillBtnTextActive,
              ]}>
              Terisi (10)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pillBtn,
              filter === 'kosong' && styles.pillBtnActive,
            ]}
            onPress={() => setFilter('kosong')}>
            <Text
              style={[
                styles.pillBtnText,
                filter === 'kosong' && styles.pillBtnTextActive,
              ]}>
              Kosong / Siap Huni (2)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Room List */}
        <View style={styles.roomsList}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.roomCard}>
              <View style={styles.roomCardHeader}>
                <View style={styles.roomNumBadge}>
                  <Text style={styles.roomNumText}>{item.number}</Text>
                  <Text style={styles.roomFloorText}>{item.floor}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  {item.isOccupied ? (
                    <>
                      <View style={styles.tenantNameRow}>
                        <Text style={styles.tenantNameText}>
                          {item.residentName}
                        </Text>
                        <View style={styles.onlineDot} />
                      </View>
                      <Text style={styles.tenantOriginText}>
                        {item.origin} • {item.campus}
                      </Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.emptyTitleRow}>
                        <Text style={styles.emptyTitleText}>
                          Kamar {item.number} (Kosong)
                        </Text>
                        <View style={styles.emptyDot} />
                      </View>
                      <Text style={styles.emptyPriceText}>
                        Rp {item.price?.toLocaleString('id-ID')}{' '}
                        <Text style={styles.monthText}>/ bulan</Text>
                      </Text>
                    </>
                  )}
                </View>

                <View
                  style={
                    item.isOccupied
                      ? styles.terisiBadge
                      : styles.siapHuniBadge
                  }>
                  <Text
                    style={
                      item.isOccupied
                        ? styles.terisiBadgeText
                        : styles.siapHuniBadgeText
                    }>
                    {item.isOccupied ? 'Terisi' : 'Siap Huni'}
                  </Text>
                </View>
              </View>

              {/* Empty room description */}
              {!item.isOccupied && item.emptyDesc && (
                <View style={styles.emptyDescBox}>
                  <Text style={styles.emptyDescContent}>{item.emptyDesc}</Text>
                </View>
              )}

              {/* Facility Pills */}
              <View style={styles.tagsContainer}>
                {item.tags.map((tag, tIdx) => (
                  <View key={tIdx} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>
                      {tag.includes('AC') && '❄️ '}
                      {tag.includes('KM') && '🚿 '}
                      {tag.includes('Spring') && '🛏️ '}
                      {tag.includes('Bed') && '🛏️ '}
                      {tag.includes('WiFi') && '📶 '}
                      {tag.includes('Meja') && '🪑 '}
                      {tag.includes('Lemari') && '🚪 '}
                      {tag.includes('3x4') && '📐 '}
                      {tag.includes('View') && '🪟 '}
                      {tag.includes('Balkon') && '🏢 '}
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              {item.isOccupied ? (
                <View style={styles.actionTwoCol}>
                  <TouchableOpacity
                    style={styles.actionOutlineBtn}
                    activeOpacity={0.8}
                    onPress={() => handleContractDetail(item)}>
                    <FileText size={14} color="#2563EB" />
                    <Text style={styles.actionOutlineText}>Detail Kontrak</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionOutlineBtn}
                    activeOpacity={0.8}
                    onPress={() => handleChatWA(item)}>
                    <MessageCircle size={14} color="#2563EB" />
                    <Text style={styles.actionOutlineText}>Chat WA</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.actionTwoCol}>
                  <TouchableOpacity
                    style={styles.actionSolidBtn}
                    activeOpacity={0.8}
                    onPress={() => handlePublishAd(item)}>
                    <Share2 size={14} color="#FFFFFF" />
                    <Text style={styles.actionSolidText}>Terbitkan Iklan</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionSoftBtn}
                    activeOpacity={0.8}
                    onPress={() => handleInputTenant(item)}>
                    <UserPlus size={14} color="#1E40AF" />
                    <Text style={styles.actionSoftText}>Input Penghuni</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.bottomStickyBar}>
        <TouchableOpacity
          style={styles.addUnitBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Tambah Unit Kamar',
              'Form pembuatan unit kamar baru: tentukan nomor kamar, lantai, fasilitas bawaan, dan tarif sewa bulanan.'
            )
          }>
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.addUnitBtnText}>Tambah Unit Kamar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportBtn}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Export Data Master',
              'Data 12 unit kamar & penghuni berhasil diexport ke format Excel (.xlsx).'
            )
          }>
          <Download size={16} color="#2563EB" />
          <Text style={styles.exportBtnText}>Export</Text>
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
  headerSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
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

  // Building Bar
  buildingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buildingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buildingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  buildingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buildingFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buildingFilterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  buildingAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buildingAddText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Occupancy Card
  occupancyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  occupancyHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  occupancyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occupancyBig: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
  },
  occupancyBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  occupancyBadgeText: {
    fontSize: 11,
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
  occupancyLegendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  metricThreeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  metricSub: {
    fontSize: 9,
    color: '#94A3B8',
  },

  // Search & Filter
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    paddingVertical: 0,
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  pillBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Rooms List
  roomsList: {
    gap: 12,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  roomCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roomNumBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomNumText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1D4ED8',
  },
  roomFloorText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  tenantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tenantNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  tenantOriginText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  emptyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emptyTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  emptyPriceText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563EB',
    marginTop: 2,
  },
  monthText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  terisiBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  terisiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  siapHuniBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  siapHuniBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  emptyDescBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  emptyDescContent: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  actionTwoCol: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  actionOutlineBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  actionOutlineText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  actionSolidBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  actionSolidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionSoftBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  actionSoftText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E40AF',
  },

  // Bottom Sticky Bar
  bottomStickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    elevation: 6,
  },
  addUnitBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addUnitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  exportBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563EB',
  },
});

