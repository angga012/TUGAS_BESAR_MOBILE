import { router } from 'expo-router';
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  DoorClosed,
  Download,
  Droplets,
  History,
  Lock,
  QrCode,
  Receipt,
  Trash2,
  Upload,
  User,
  Wallet,
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

type PaymentMethod = 'qris' | 'va' | 'transfer';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qris');
  const [showRincian, setShowRincian] = useState(true);

  const handlePay = () => {
    if (selectedMethod === 'qris') {
      Alert.alert(
        'QRIS KosSobat',
        'Menampilkan Kode QRIS Dinamis sebesar Rp 1.150.000.\nSilakan scan melalui aplikasi m-banking atau e-wallet Anda.'
      );
    } else if (selectedMethod === 'va') {
      Alert.alert(
        'Virtual Account',
        'Nomor VA BCA: 8274 0812 3456 7890\nAtas Nama: KosSobat - Marshell (Kamar A12)'
      );
    } else {
      Alert.alert(
        'Transfer Manual',
        'Silakan transfer ke Rekening BCA: 437-092-1188 a.n Hendra Gunawan dan unggah struk bukti transfer.'
      );
    }
  };

  const handleDownloadReceipt = (month: string) => {
    Alert.alert(
      'Kuitansi Digital',
      `Kuitansi resmi KosSobat untuk ${month} telah diunduh (Format PDF).`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.circleBtn}
          activeOpacity={0.7}
          onPress={() => router.back()}>
          <ArrowLeft size={19} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Bayar Sewa</Text>

        <TouchableOpacity style={styles.avatarCircle} activeOpacity={0.8}>
          <User size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Section Header Title & Icon */}
        <View style={styles.pageHeaderRow}>
          <View>
            <Text style={styles.superTitle}>KEUANGAN KOST</Text>
            <Text style={styles.mainTitle}>Pembayaran & Riwayat</Text>
          </View>
          <View style={styles.walletIconBox}>
            <Wallet size={20} color="#2563EB" />
          </View>
        </View>

        {/* 1. Kartu Tagihan Berjalan */}
        <View style={styles.billCard}>
          {/* Status Jatuh Tempo */}
          <View style={styles.billStatusRow}>
            <View style={styles.unpaidTag}>
              <View style={styles.redDot} />
              <Text style={styles.unpaidTagText}>Belum Bayar</Text>
            </View>

            <View style={styles.dueDateWrap}>
              <Text style={styles.dueLabel}>Jatuh Tempo</Text>
              <Text style={styles.dueDateValue}>15 Okt 2026</Text>
            </View>
          </View>

          {/* Judul Tagihan */}
          <Text style={styles.billPeriodTitle}>Tagihan Bulan Oktober 2026</Text>

          {/* Kotak Total Tagihan */}
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Tagihan</Text>
            <Text style={styles.totalValue}>Rp 1.150.000</Text>
          </View>

          {/* Accordion Rincian Biaya Sewa */}
          <TouchableOpacity
            style={styles.accordionHeader}
            activeOpacity={0.8}
            onPress={() => setShowRincian(!showRincian)}>
            <View style={styles.accordionHeaderLeft}>
              <Receipt size={17} color="#2563EB" />
              <Text style={styles.accordionTitle}>Rincian Biaya Sewa</Text>
            </View>
            {showRincian ? (
              <ChevronUp size={18} color="#2563EB" />
            ) : (
              <ChevronDown size={18} color="#2563EB" />
            )}
          </TouchableOpacity>

          {showRincian && (
            <View style={styles.rincianList}>
              <View style={styles.rincianItem}>
                <View style={styles.rincianLeft}>
                  <DoorClosed size={15} color="#64748B" />
                  <Text style={styles.rincianName}>Sewa Kamar A12</Text>
                </View>
                <Text style={styles.rincianValue}>Rp 1.050.000</Text>
              </View>

              <View style={styles.rincianItem}>
                <View style={styles.rincianLeft}>
                  <Trash2 size={15} color="#64748B" />
                  <Text style={styles.rincianName}>Iuran Kebersihan & Sampah</Text>
                </View>
                <Text style={styles.rincianValue}>Rp 50.000</Text>
              </View>

              <View style={styles.rincianItem}>
                <View style={styles.rincianLeft}>
                  <Droplets size={15} color="#64748B" />
                  <Text style={styles.rincianName}>Biaya Fasilitas Air & Listrik</Text>
                </View>
                <Text style={styles.rincianValue}>Rp 50.000</Text>
              </View>
            </View>
          )}

          {/* Pilihan Metode Pembayaran Cepat */}
          <View style={styles.methodsSection}>
            <Text style={styles.methodsHeading}>PILIH METODE PEMBAYARAN CEPAT</Text>
            <View style={styles.methodsRow}>
              {/* QRIS */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  selectedMethod === 'qris' && styles.methodCardActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod('qris')}>
                <QrCode
                  size={20}
                  color={selectedMethod === 'qris' ? '#2563EB' : '#64748B'}
                />
                <Text
                  style={[
                    styles.methodName,
                    selectedMethod === 'qris' && styles.methodNameActive,
                  ]}>
                  QRIS
                </Text>
                <Text style={styles.methodBadge}>Instan</Text>
              </TouchableOpacity>

              {/* Virtual Account */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  selectedMethod === 'va' && styles.methodCardActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod('va')}>
                <Building2
                  size={20}
                  color={selectedMethod === 'va' ? '#2563EB' : '#64748B'}
                />
                <Text
                  style={[
                    styles.methodName,
                    selectedMethod === 'va' && styles.methodNameActive,
                  ]}>
                  Virtual Acct
                </Text>
                <Text style={styles.methodBadge}>BCA/MDR/BRI</Text>
              </TouchableOpacity>

              {/* Transfer Manual */}
              <TouchableOpacity
                style={[
                  styles.methodCard,
                  selectedMethod === 'transfer' && styles.methodCardActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod('transfer')}>
                <Upload
                  size={19}
                  color={selectedMethod === 'transfer' ? '#2563EB' : '#64748B'}
                />
                <Text
                  style={[
                    styles.methodName,
                    selectedMethod === 'transfer' && styles.methodNameActive,
                  ]}>
                  Transfer
                </Text>
                <Text style={styles.methodBadge}>Unggah Bukti</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol Bayar Sekarang */}
          <TouchableOpacity
            style={styles.payBtn}
            onPress={handlePay}
            activeOpacity={0.85}>
            <Lock size={16} color="#FFFFFF" />
            <Text style={styles.payBtnText}>
              {selectedMethod === 'qris'
                ? 'Bayar Sekarang via QRIS'
                : selectedMethod === 'va'
                  ? 'Dapatkan Nomor Virtual Account'
                  : 'Unggah Bukti Transfer Bank'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Section Riwayat Pembayaran */}
        <View style={styles.historySection}>
          <View style={styles.historyHeaderBetween}>
            <View style={styles.historyHeaderLeft}>
              <History size={19} color="#0F172A" />
              <Text style={styles.historyTitle}>Riwayat Pembayaran</Text>
            </View>
            <View style={styles.roomPill}>
              <Text style={styles.roomPillText}>Kamar A12</Text>
            </View>
          </View>

          {/* Item 1: September 2026 */}
          <View style={styles.historyCard}>
            <View style={styles.historyCardTop}>
              <View style={styles.checkCircleBox}>
                <Check size={16} color="#2563EB" strokeWidth={3} />
              </View>
              <View style={styles.historyCardInfo}>
                <Text style={styles.historyPeriodTitle}>September 2026</Text>
                <Text style={styles.historyDateSubtitle}>
                  Lunas pada 12 Sep 2026
                </Text>
              </View>
              <View style={styles.historyAmountCol}>
                <Text style={styles.historyAmountValue}>Rp 1.150.000</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeText}>LUNAS</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.receiptDownloadBtn}
              activeOpacity={0.8}
              onPress={() => handleDownloadReceipt('September 2026')}>
              <Download size={14} color="#2563EB" />
              <Text style={styles.receiptDownloadText}>Unduh Kuitansi</Text>
            </TouchableOpacity>
          </View>

          {/* Item 2: Agustus 2026 */}
          <View style={styles.historyCard}>
            <View style={styles.historyCardTop}>
              <View style={styles.checkCircleBox}>
                <Check size={16} color="#2563EB" strokeWidth={3} />
              </View>
              <View style={styles.historyCardInfo}>
                <Text style={styles.historyPeriodTitle}>Agustus 2026</Text>
                <Text style={styles.historyDateSubtitle}>
                  Lunas pada 10 Agu 2026
                </Text>
              </View>
              <View style={styles.historyAmountCol}>
                <Text style={styles.historyAmountValue}>Rp 1.150.000</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeText}>LUNAS</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.receiptDownloadBtn}
              activeOpacity={0.8}
              onPress={() => handleDownloadReceipt('Agustus 2026')}>
              <Download size={14} color="#2563EB" />
              <Text style={styles.receiptDownloadText}>Unduh Kuitansi</Text>
            </TouchableOpacity>
          </View>

          {/* Item 3: Juli 2026 */}
          <View style={styles.historyCard}>
            <View style={styles.historyCardTop}>
              <View style={styles.checkCircleBox}>
                <Check size={16} color="#2563EB" strokeWidth={3} />
              </View>
              <View style={styles.historyCardInfo}>
                <Text style={styles.historyPeriodTitle}>Juli 2026</Text>
                <Text style={styles.historyDateSubtitle}>
                  Lunas pada 08 Jul 2026
                </Text>
              </View>
              <View style={styles.historyAmountCol}>
                <Text style={styles.historyAmountValue}>Rp 1.150.000</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeText}>LUNAS</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.receiptDownloadBtn}
              activeOpacity={0.8}
              onPress={() => handleDownloadReceipt('Juli 2026')}>
              <Download size={14} color="#2563EB" />
              <Text style={styles.receiptDownloadText}>Unduh Kuitansi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },

  // Page Header
  pageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  superTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  walletIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 1. Bill Card
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  billStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unpaidTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 6,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  unpaidTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  dueDateWrap: {
    alignItems: 'flex-end',
  },
  dueLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  dueDateValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  billPeriodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CFE0FC',
  },
  totalLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E40AF',
  },

  // Accordion Rincian
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accordionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  rincianList: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  rincianItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rincianLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rincianName: {
    fontSize: 12,
    color: '#475569',
  },
  rincianValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Payment Methods
  methodsSection: {
    gap: 8,
    marginTop: 4,
  },
  methodsHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  methodCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  methodName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  methodNameActive: {
    color: '#1E40AF',
  },
  methodBadge: {
    fontSize: 9,
    color: '#64748B',
  },

  // Action Button
  payBtn: {
    backgroundColor: '#1D4ED8',
    flexDirection: 'row',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    shadowColor: '#1D4ED8',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // 2. History Section
  historySection: {
    gap: 10,
    marginTop: 4,
  },
  historyHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  roomPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roomPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // History Card
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  historyCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCircleBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyCardInfo: {
    flex: 1,
  },
  historyPeriodTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  historyDateSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  historyAmountCol: {
    alignItems: 'flex-end',
    gap: 3,
  },
  historyAmountValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  paidBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  paidBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1E40AF',
  },
  receiptDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  receiptDownloadText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});
