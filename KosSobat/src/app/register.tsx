import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  UserPlus,
  Briefcase,
  ShieldCheck,
  User,
  Building2,
  Mail,
  Smartphone,
  GraduationCap,
  KeyRound,
  QrCode,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Check,
  Plus,
  Sparkles,
  FileCheck2,
  Key,
  Users,
  MapPin,
  Zap,
  X,
} from 'lucide-react-native';

const APP_LOGO = require('../Prototype/logo.png');

type RegisterRole = 'penghuni' | 'pemilik';
type StatusAktivitas = 'mahasiswa' | 'karyawan';
type TipeKos = 'putra' | 'putri' | 'campur';
type RoomLocation = { number: string; floor: string };

export default function RegisterScreen() {
  const params = useLocalSearchParams<{ role?: string }>();
  const [role, setRole] = useState<RegisterRole>(
    params.role === 'pemilik' ? 'pemilik' : 'penghuni'
  );

  // ==========================================
  // STATE REGISTER PENGHUNI
  // ==========================================
  const [namaPenghuni, setNamaPenghuni] = useState('Rifa Fauziah');
  const [waPenghuni, setWaPenghuni] = useState('081298453210');
  const [emailPenghuni, setEmailPenghuni] = useState('rifa.fauziah@email.com');
  const [statusAktivitas, setStatusAktivitas] = useState<StatusAktivitas>('mahasiswa');
  const [instansiJurusan, setInstansiJurusan] = useState('UMM - Desain Grafis');

  const [kodeUndangan, setKodeUndangan] = useState('');
  const [nomorKamarPenghuni, setNomorKamarPenghuni] = useState('');
  const [lantaiKamarPenghuni, setLantaiKamarPenghuni] = useState('');

  const [sandiPenghuni, setSandiPenghuni] = useState('KosKuAman2025');
  const [konfirmasiSandiPenghuni, setKonfirmasiSandiPenghuni] = useState('KosKuAman2025');
  const [showSandiPenghuni, setShowSandiPenghuni] = useState(false);
  const [showKonfirmasiPenghuni, setShowKonfirmasiPenghuni] = useState(false);
  const [agreePenghuni, setAgreePenghuni] = useState(true);

  // ==========================================
  // STATE REGISTER PEMILIK KOS
  // ==========================================
  const [namaPemilik, setNamaPemilik] = useState('Pak Hendra Gunawan');
  const [waPemilik, setWaPemilik] = useState('+62 81234567890');
  const [emailPemilik, setEmailPemilik] = useState('hendra.kosku@gmail.com');

  const [namaProperti, setNamaProperti] = useState('Graha Harmoni Living');
  const [tipeKos, setTipeKos] = useState<TipeKos>('campur');
  const [rooms, setRooms] = useState<RoomLocation[]>([]);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomFloor, setNewRoomFloor] = useState('');
  const [alamatProperti, setAlamatProperti] = useState(
    'Jl. Soekarno Hatta No. 42, Lowokwaru, Kota Malang, Jawa Timur'
  );

  const [sandiPemilik, setSandiPemilik] = useState('KosHarmoni2024!');
  const [pinIoT, setPinIoT] = useState('892011');
  const [showSandiPemilik, setShowSandiPemilik] = useState(false);
  const [showPinIoT, setShowPinIoT] = useState(false);
  const [agreePemilik, setAgreePemilik] = useState(true);

  // Submit Handler Penghuni
  const handleRegisterPenghuni = () => {
    if (!namaPenghuni || !waPenghuni || !emailPenghuni || !sandiPenghuni) {
      Alert.alert('Peringatan', 'Harap lengkapi semua kolom bertanda bintang (*).');
      return;
    }
    if (!nomorKamarPenghuni.trim() || !lantaiKamarPenghuni.trim()) {
      Alert.alert('Peringatan', 'Silakan masukkan nomor kamar dan lantai sesuai informasi dari pemilik kos.');
      return;
    }
    const floor = Number(lantaiKamarPenghuni);
    if (!Number.isInteger(floor) || floor < 1 || floor > 3) {
      Alert.alert('Peringatan', 'Nomor lantai harus antara 1 sampai 3.');
      return;
    }
    if (sandiPenghuni !== konfirmasiSandiPenghuni) {
      Alert.alert('Peringatan', 'Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!agreePenghuni) {
      Alert.alert('Peringatan', 'Anda harus menyetujui syarat & tata tertib kos.');
      return;
    }

    Alert.alert(
      'Pendaftaran Penghuni Berhasil!',
      `Selamat! Akun Anda terhubung dengan Kamar ${nomorKamarPenghuni.trim()}, Lantai ${floor} di Kost Harmony Living. Silakan masuk.`,
      [{ text: 'Masuk Sekarang', onPress: () => router.push('/') }]
    );
  };

  const handleAddRoom = () => {
    const number = newRoomNumber.trim();
    const floor = newRoomFloor.trim();
    const parsedFloor = Number(floor);

    if (!number || !floor) {
      Alert.alert('Peringatan', 'Masukkan nomor kamar dan lantainya terlebih dahulu.');
      return;
    }
    if (!Number.isInteger(parsedFloor) || parsedFloor < 1 || parsedFloor > 3) {
      Alert.alert('Peringatan', 'Nomor lantai harus antara 1 sampai 3.');
      return;
    }
    if (rooms.some((room) => room.number.toLowerCase() === number.toLowerCase())) {
      Alert.alert('Peringatan', 'Nomor kamar tersebut sudah ditambahkan.');
      return;
    }

    setRooms((currentRooms) => [...currentRooms, { number, floor }]);
    setNewRoomNumber('');
    setNewRoomFloor('');
  };

  // Submit Handler Pemilik
  const handleRegisterPemilik = () => {
    if (!namaPemilik || !waPemilik || !emailPemilik || !namaProperti || !sandiPemilik || !pinIoT) {
      Alert.alert('Peringatan', 'Harap lengkapi semua data pemilik dan unit properti.');
      return;
    }
    if (rooms.length === 0) {
      Alert.alert('Peringatan', 'Tambahkan minimal satu nomor kamar beserta lantainya.');
      return;
    }
    if (pinIoT.length !== 6) {
      Alert.alert('Peringatan', 'PIN Otorisasi IoT & Kas harus 6 digit.');
      return;
    }
    if (!agreePemilik) {
      Alert.alert('Peringatan', 'Anda harus menyetujui ketentuan manajemen properti.');
      return;
    }

    Alert.alert(
      'Properti Berhasil Didaftarkan!',
      `Properti ${namaProperti} (${rooms.length} Unit) berhasil dibuat dalam sistem KosSobat. Silakan masuk ke Portal Pengelola.`,
      [{ text: 'Masuk Portal', onPress: () => router.push('/') }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* 1. Top Bar Navigation (Bersih & Rapi) */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.circleBtn}
              activeOpacity={0.7}
              onPress={() => router.back()}>
              <ArrowLeft size={19} color="#0F172A" />
            </TouchableOpacity>

            <View style={styles.registerBadgeRow}>
              <Text style={styles.registerBadgeText}>
                {role === 'penghuni' ? 'Register Penghuni' : 'Register Pemilik'}
              </Text>
              <View style={styles.userAvatarCircle}>
                <UserPlus size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* 2. Logo Utama di Bagian Atas */}
          <View style={styles.topLogoContainer}>
            <Image
              source={APP_LOGO}
              style={styles.mainBrandLogo}
              resizeMode="contain"
            />
          </View>

          {/* 3. Judul & Subtitle Sesuai Role */}
          {role === 'penghuni' ? (
            <View style={styles.heroCenter}>
              <View style={styles.stepBadge}>
                <Briefcase size={12} color="#2563EB" />
                <Text style={styles.stepBadgeText}>Langkah 1 dari 2 • Data Diri & Unit</Text>
              </View>
              <Text style={styles.pageTitle}>Daftar Akun Penghuni</Text>
              <Text style={styles.pageSubtitle}>
                Bergabung dengan hunian kos dan nikmati kemudahan bayar sewa, keluhan
                kamar, serta akses fasilitas digital.
              </Text>
            </View>
          ) : (
            <View style={styles.heroCenter}>
              <View style={styles.juraganBadge}>
                <ShieldCheck size={13} color="#2563EB" />
                <Text style={styles.juraganBadgeText}>Portal Juragan Kos • Terverifikasi Resmi</Text>
              </View>
              <Text style={styles.pageTitle}>Daftarkan Properti Kos Anda</Text>
              <Text style={styles.pageSubtitle}>
                Mulai kelola hunian kos secara otomatis, dari tagihan kas hingga
                Smart Lock IoT yang aman.
              </Text>
            </View>
          )}

          {/* 4. Switcher Tab: Penghuni vs Pemilik Kos (Di Bawah Judul) */}
          <View style={styles.roleSwitcherContainer}>
            <TouchableOpacity
              style={[styles.roleTab, role === 'penghuni' && styles.roleTabActive]}
              onPress={() => setRole('penghuni')}
              activeOpacity={0.8}>
              <User
                size={16}
                color={role === 'penghuni' ? '#FFFFFF' : '#475569'}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === 'penghuni' && styles.roleTabTextActive,
                ]}>
                Daftar Penghuni
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleTab, role === 'pemilik' && styles.roleTabActive]}
              onPress={() => setRole('pemilik')}
              activeOpacity={0.8}>
              <Building2
                size={16}
                color={role === 'pemilik' ? '#FFFFFF' : '#475569'}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === 'pemilik' && styles.roleTabTextActive,
                ]}>
                Daftar Pemilik Kos
              </Text>
            </TouchableOpacity>
          </View>

          {/* ============================================================== */}
          {/* 5. FORM REGISTRASI PENGHUNI                                    */}
          {/* ============================================================== */}
          {role === 'penghuni' && (
            <View style={{ gap: 14 }}>
              {/* Card 1: Identitas Diri */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderRow}>
                  <User size={18} color="#2563EB" />
                  <Text style={styles.sectionTitle}>Identitas Diri</Text>
                </View>

                {/* Nama Lengkap */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nama Lengkap (Sesuai KTP) <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <User size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nama sesuai KTP"
                      placeholderTextColor="#94A3B8"
                      value={namaPenghuni}
                      onChangeText={setNamaPenghuni}
                    />
                  </View>
                </View>

                {/* WhatsApp */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nomor WhatsApp Aktif <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Smartphone size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="0812-XXXX-XXXX"
                      placeholderTextColor="#94A3B8"
                      value={waPenghuni}
                      onChangeText={setWaPenghuni}
                      keyboardType="phone-pad"
                    />
                  </View>
                  <View style={styles.infoHintRow}>
                    <Zap size={13} color="#2563EB" />
                    <Text style={styles.infoHintText}>
                      Untuk billing sewa otomatis & pengumuman mendesak kos
                    </Text>
                  </View>
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Email Aktif <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="nama@email.com"
                      placeholderTextColor="#94A3B8"
                      value={emailPenghuni}
                      onChangeText={setEmailPenghuni}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Status Aktivitas */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Status Aktivitas <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.statusButtonsRow}>
                    <TouchableOpacity
                      style={[
                        styles.statusBtn,
                        statusAktivitas === 'mahasiswa' && styles.statusBtnActive,
                      ]}
                      onPress={() => setStatusAktivitas('mahasiswa')}
                      activeOpacity={0.8}>
                      <GraduationCap
                        size={16}
                        color={statusAktivitas === 'mahasiswa' ? '#FFFFFF' : '#475569'}
                      />
                      <Text
                        style={[
                          styles.statusBtnText,
                          statusAktivitas === 'mahasiswa' && styles.statusBtnTextActive,
                        ]}>
                        Mahasiswa
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.statusBtn,
                        statusAktivitas === 'karyawan' && styles.statusBtnActive,
                      ]}
                      onPress={() => setStatusAktivitas('karyawan')}
                      activeOpacity={0.8}>
                      <Briefcase
                        size={16}
                        color={statusAktivitas === 'karyawan' ? '#FFFFFF' : '#475569'}
                      />
                      <Text
                        style={[
                          styles.statusBtnText,
                          statusAktivitas === 'karyawan' && styles.statusBtnTextActive,
                        ]}>
                        Karyawan
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputWrap, { marginTop: 6 }]}>
                    <Building2 size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder={
                        statusAktivitas === 'mahasiswa'
                          ? 'Nama Kampus & Jurusan (misal: UMM - DKV)'
                          : 'Nama Perusahaan / Tempat Kerja'
                      }
                      placeholderTextColor="#94A3B8"
                      value={instansiJurusan}
                      onChangeText={setInstansiJurusan}
                    />
                  </View>
                </View>
              </View>

              {/* Card 2: Pilih Unit Kos */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderBetween}>
                  <View style={styles.sectionHeaderRow}>
                    <Building2 size={19} color="#2563EB" />
                    <Text style={styles.sectionTitle}>Pilih Unit Kos</Text>
                  </View>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedBadgeText}>Terverifikasi</Text>
                  </View>
                </View>

                {/* Kode Undangan */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelBetweenRow}>
                    <Text style={styles.inputLabel}>
                      Kode Undangan Kos <Text style={styles.requiredStar}>*</Text>
                    </Text>
                    <TouchableOpacity style={styles.scanQrRow} activeOpacity={0.7}>
                      <QrCode size={14} color="#2563EB" />
                      <Text style={styles.scanQrText}>Scan QR</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.kodeInputWrap}>
                    <KeyRound size={18} color="#2563EB" />
                    <TextInput
                      style={styles.kodeTextInput}
                      value={kodeUndangan}
                      onChangeText={setKodeUndangan}
                      placeholder="Contoh: HARM-A12"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="characters"
                    />
                    <View style={styles.foundBadge}>
                      <CheckCircle2 size={14} color="#16A34A" />
                      <Text style={styles.foundBadgeText}>Ditemukan</Text>
                    </View>
                  </View>
                </View>

                {/* Info Properti */}
                <View style={styles.propertyInfoCard}>
                  <View style={styles.propertyIconBox}>
                    <Building2 size={24} color="#2563EB" />
                  </View>
                  <View style={styles.propertyTextBox}>
                    <Text style={styles.propertyTitle}>Kost Harmony Living</Text>
                    <Text style={styles.propertyAddress}>
                      Jl. Sumbersari No. 12, Lowokwaru, Malang
                    </Text>
                    <View style={styles.pengelolaRow}>
                      <View style={styles.blueDot} />
                      <Text style={styles.pengelolaText}>Pengelola: Bapak Hendra</Text>
                    </View>
                  </View>
                </View>

                {/* Pilihan Nomor Kamar Tersedia */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nomor Kamar dan Lantai <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <Text style={styles.kamarSubLabel}>
                    Masukkan nomor kamar dan lantai yang sudah dikonfirmasi oleh pemilik kos.
                  </Text>

                  <View style={styles.roomInputRow}>
                    <View style={[styles.inputWrap, styles.roomInputField]}>
                      <Building2 size={17} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Nomor kamar"
                        placeholderTextColor="#94A3B8"
                        value={nomorKamarPenghuni}
                        onChangeText={setNomorKamarPenghuni}
                        autoCapitalize="characters"
                      />
                    </View>
                    <View style={[styles.inputWrap, styles.roomFloorInput]}>
                      <MapPin size={17} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Lantai"
                        placeholderTextColor="#94A3B8"
                        value={lantaiKamarPenghuni}
                        onChangeText={setLantaiKamarPenghuni}
                        keyboardType="number-pad"
                        maxLength={1}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Card 3: Keamanan Akun */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderRow}>
                  <ShieldCheck size={19} color="#2563EB" />
                  <Text style={styles.sectionTitle}>Keamanan Akun</Text>
                </View>

                {/* Kata Sandi Baru */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Kata Sandi Baru <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Minimal 8 karakter"
                      placeholderTextColor="#94A3B8"
                      value={sandiPenghuni}
                      onChangeText={setSandiPenghuni}
                      secureTextEntry={!showSandiPenghuni}
                    />
                    <TouchableOpacity
                      onPress={() => setShowSandiPenghuni(!showSandiPenghuni)}
                      style={styles.eyeIconBtn}>
                      {showSandiPenghuni ? (
                        <Eye size={18} color="#94A3B8" />
                      ) : (
                        <EyeOff size={18} color="#94A3B8" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Konfirmasi Kata Sandi */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Konfirmasi Kata Sandi <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ulangi kata sandi baru"
                      placeholderTextColor="#94A3B8"
                      value={konfirmasiSandiPenghuni}
                      onChangeText={setKonfirmasiSandiPenghuni}
                      secureTextEntry={!showKonfirmasiPenghuni}
                    />
                    <TouchableOpacity
                      onPress={() => setShowKonfirmasiPenghuni(!showKonfirmasiPenghuni)}
                      style={styles.eyeIconBtn}>
                      {showKonfirmasiPenghuni ? (
                        <Eye size={18} color="#94A3B8" />
                      ) : (
                        <EyeOff size={18} color="#94A3B8" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Checkbox Syarat & Tata Tertib */}
                <TouchableOpacity
                  style={styles.termsRow}
                  activeOpacity={0.8}
                  onPress={() => setAgreePenghuni(!agreePenghuni)}>
                  <View
                    style={[
                      styles.checkboxBox,
                      agreePenghuni && styles.checkboxBoxActive,
                    ]}>
                    {agreePenghuni && (
                      <Check size={12} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    Saya menyetujui <Text style={styles.termsLink}>Syarat & Ketentuan</Text>{' '}
                    serta{' '}
                    <Text style={styles.termsLink}>Tata Tertib Kos Harmony Living</Text>{' '}
                    yang berlaku untuk kenyamanan bersama.
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tombol Aksi Penghuni */}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleRegisterPenghuni}
                activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>
                  Daftar & Hubungkan ke Kamar ➔
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ============================================================== */}
          {/* 6. FORM REGISTRASI PEMILIK KOS (ADMIN)                         */}
          {/* ============================================================== */}
          {role === 'pemilik' && (
            <View style={{ gap: 14 }}>
              {/* Card 1: Data Diri Pengelola */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderRow}>
                  <User size={19} color="#2563EB" />
                  <Text style={styles.sectionTitle}>Data Diri Pengelola</Text>
                </View>

                {/* Nama Pemilik */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nama Lengkap Pemilik / Pengelola <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <User size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nama lengkap pengelola"
                      placeholderTextColor="#94A3B8"
                      value={namaPemilik}
                      onChangeText={setNamaPemilik}
                    />
                  </View>
                </View>

                {/* WhatsApp Pengelola */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelBetweenRow}>
                    <Text style={styles.inputLabel}>
                      Nomor WhatsApp Pengelola <Text style={styles.requiredStar}>*</Text>
                    </Text>
                    <View style={styles.notifOtomatisPill}>
                      <Zap size={11} color="#2563EB" fill="#2563EB" />
                      <Text style={styles.notifOtomatisText}>Notif Tagihan Otomatis</Text>
                    </View>
                  </View>
                  <View style={styles.inputWrap}>
                    <Smartphone size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="+62 812-XXXX-XXXX"
                      placeholderTextColor="#94A3B8"
                      value={waPemilik}
                      onChangeText={setWaPemilik}
                      keyboardType="phone-pad"
                    />
                  </View>
                  <Text style={styles.helperText}>
                    Digunakan untuk kuitansi digital instan dan rekonsiliasi kas masuk.
                  </Text>
                </View>

                {/* Email Operasional */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Email Operasional <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="email.operasional@kosku.id"
                      placeholderTextColor="#94A3B8"
                      value={emailPemilik}
                      onChangeText={setEmailPemilik}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </View>

              {/* Card 2: Data Unit Properti */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderRow}>
                  <Building2 size={19} color="#2563EB" />
                  <Text style={styles.sectionTitle}>Data Unit Properti</Text>
                </View>

                {/* Nama Properti */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nama Properti Kos <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Building2 size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Contoh: Graha Harmoni Living"
                      placeholderTextColor="#94A3B8"
                      value={namaProperti}
                      onChangeText={setNamaProperti}
                    />
                  </View>
                </View>

                {/* Tipe Hunian Kos */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Tipe Hunian Kos <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.tipeKosRow}>
                    {/* Putra */}
                    <TouchableOpacity
                      style={[
                        styles.tipeKosBtn,
                        tipeKos === 'putra' && styles.tipeKosBtnActive,
                      ]}
                      onPress={() => setTipeKos('putra')}
                      activeOpacity={0.8}>
                      <User
                        size={15}
                        color={tipeKos === 'putra' ? '#FFFFFF' : '#475569'}
                      />
                      <Text
                        style={[
                          styles.tipeKosText,
                          tipeKos === 'putra' && styles.tipeKosTextActive,
                        ]}>
                        Kos Putra
                      </Text>
                    </TouchableOpacity>

                    {/* Putri */}
                    <TouchableOpacity
                      style={[
                        styles.tipeKosBtn,
                        tipeKos === 'putri' && styles.tipeKosBtnActive,
                      ]}
                      onPress={() => setTipeKos('putri')}
                      activeOpacity={0.8}>
                      <User
                        size={15}
                        color={tipeKos === 'putri' ? '#FFFFFF' : '#475569'}
                      />
                      <Text
                        style={[
                          styles.tipeKosText,
                          tipeKos === 'putri' && styles.tipeKosTextActive,
                        ]}>
                        Kos Putri
                      </Text>
                    </TouchableOpacity>

                    {/* Campur */}
                    <TouchableOpacity
                      style={[
                        styles.tipeKosBtn,
                        tipeKos === 'campur' && styles.tipeKosBtnActive,
                      ]}
                      onPress={() => setTipeKos('campur')}
                      activeOpacity={0.8}>
                      <Users
                        size={15}
                        color={tipeKos === 'campur' ? '#FFFFFF' : '#475569'}
                      />
                      <Text
                        style={[
                          styles.tipeKosText,
                          tipeKos === 'campur' && styles.tipeKosTextActive,
                        ]}>
                        Kos Campur
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Daftar Nomor Kamar */}
                <View style={styles.inputGroup}>
                  <View style={styles.roomListHeader}>
                    <Text style={styles.inputLabel}>
                      Nomor Kamar dan Lantai <Text style={styles.requiredStar}>*</Text>
                    </Text>
                    <Text style={styles.roomCount}>{rooms.length} kamar</Text>
                  </View>
                  <Text style={styles.helperText}>
                    Masukkan nomor kamar dan lantainya satu per satu. Lantai yang tersedia 1 sampai 3.
                  </Text>
                  <View style={styles.roomInputRow}>
                    <View style={[styles.inputWrap, styles.roomInputField]}>
                      <Building2 size={17} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Nomor kamar"
                        placeholderTextColor="#94A3B8"
                        value={newRoomNumber}
                        onChangeText={setNewRoomNumber}
                        autoCapitalize="characters"
                      />
                    </View>
                    <View style={[styles.inputWrap, styles.roomFloorInput]}>
                      <MapPin size={17} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Lantai"
                        placeholderTextColor="#94A3B8"
                        value={newRoomFloor}
                        onChangeText={setNewRoomFloor}
                        keyboardType="number-pad"
                        maxLength={1}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.roomAddButton}
                      onPress={handleAddRoom}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel="Tambah nomor kamar">
                      <Plus size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  {rooms.map((room) => (
                    <View key={room.number} style={styles.roomListItem}>
                      <Text style={styles.roomListItemText}>
                        Kamar {room.number} · Lantai {room.floor}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          setRooms((currentRooms) =>
                            currentRooms.filter((currentRoom) => currentRoom.number !== room.number)
                          )
                        }
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={`Hapus kamar ${room.number}`}>
                        <X size={17} color="#64748B" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Alamat Lengkap & Kota */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Alamat Lengkap & Kota <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={[styles.inputWrap, { height: 'auto', paddingVertical: 10 }]}>
                    <MapPin
                      size={19}
                      color="#94A3B8"
                      style={[styles.inputIcon, { marginTop: 2 }]}
                    />
                    <TextInput
                      style={[styles.textInput, { minHeight: 48, textAlignVertical: 'top' }]}
                      placeholder="Alamat jalan, kelurahan, kecamatan, kota"
                      placeholderTextColor="#94A3B8"
                      value={alamatProperti}
                      onChangeText={setAlamatProperti}
                      multiline
                    />
                  </View>
                </View>
              </View>

              {/* Card 3: Kredensial & Otorisasi IoT */}
              <View style={styles.cardSection}>
                <View style={styles.sectionHeaderRow}>
                  <Lock size={18} color="#2563EB" />
                  <Text style={styles.sectionTitle}>Kredensial & Otorisasi IoT</Text>
                </View>

                {/* Kata Sandi Pemilik */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Kata Sandi Akun <Text style={styles.requiredStar}>*</Text>
                  </Text>
                  <View style={styles.inputWrap}>
                    <Key size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan kata sandi baru"
                      placeholderTextColor="#94A3B8"
                      value={sandiPemilik}
                      onChangeText={setSandiPemilik}
                      secureTextEntry={!showSandiPemilik}
                    />
                    <TouchableOpacity
                      onPress={() => setShowSandiPemilik(!showSandiPemilik)}
                      style={styles.eyeIconBtn}>
                      {showSandiPemilik ? (
                        <Eye size={18} color="#94A3B8" />
                      ) : (
                        <EyeOff size={18} color="#94A3B8" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* PIN Keamanan Pengelola 6-Digit */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelBetweenRow}>
                    <Text style={styles.inputLabel}>
                      PIN Keamanan Pengelola (6 Digit) <Text style={styles.requiredStar}>*</Text>
                    </Text>
                    <View style={styles.notifOtomatisPill}>
                      <ShieldCheck size={11} color="#2563EB" />
                      <Text style={styles.notifOtomatisText}>Untuk IoT & Kas</Text>
                    </View>
                  </View>
                  <View style={styles.inputWrap}>
                    <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, { letterSpacing: 4, fontWeight: '700' }]}
                      placeholder="8 9 2 0 1 1"
                      placeholderTextColor="#94A3B8"
                      value={pinIoT}
                      onChangeText={setPinIoT}
                      keyboardType="numeric"
                      maxLength={6}
                      secureTextEntry={!showPinIoT}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPinIoT(!showPinIoT)}
                      style={styles.eyeIconBtn}>
                      {showPinIoT ? (
                        <Eye size={18} color="#94A3B8" />
                      ) : (
                        <EyeOff size={18} color="#94A3B8" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.helperText}>
                    Wajib dimasukkan saat transfer penarikan dana sewa dan buka darurat Smart Lock.
                  </Text>
                </View>
              </View>

              {/* Card 4: Otomatisasi Unggulan KosSobat */}
              <View style={styles.highlightSection}>
                <View style={styles.highlightHeader}>
                  <Sparkles size={16} color="#2563EB" />
                  <Text style={styles.highlightTitle}>Otomatisasi Unggulan KosSobat</Text>
                </View>

                <View style={styles.featureRowCard}>
                  <View style={styles.featureIconBox}>
                    <FileCheck2 size={19} color="#2563EB" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>Kuitansi & Rekonsiliasi Kas QRIS/BCA</Text>
                    <Text style={styles.featureDesc}>
                      Verifikasi uang sewa otomatis tanpa perlu cek mutasi manual berkali-kali.
                    </Text>
                  </View>
                </View>

                <View style={styles.featureRowCard}>
                  <View style={styles.featureIconBox}>
                    <Key size={19} color="#2563EB" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>Sinkronisasi Tiket Aduan & Kunci IoT</Text>
                    <Text style={styles.featureDesc}>
                      Akses Smart Door Lock kamar langsung terintegrasi dengan status pembayaran sewa.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Checkbox Ketentuan Pemilik */}
              <TouchableOpacity
                style={styles.termsRow}
                activeOpacity={0.8}
                onPress={() => setAgreePemilik(!agreePemilik)}>
                <View
                  style={[
                    styles.checkboxBox,
                    agreePemilik && styles.checkboxBoxActive,
                  ]}>
                  {agreePemilik && (
                    <Check size={12} color="#FFFFFF" strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.termsText}>
                  Saya menyetujui{' '}
                  <Text style={styles.termsLink}>
                    Ketentuan Layanan Manajemen Properti KosSobat
                  </Text>{' '}
                  dan kebijakan privasi data penghuni.
                </Text>
              </TouchableOpacity>

              {/* Tombol Aksi Pemilik */}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleRegisterPemilik}
                activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>
                  Lanjutkan & Siapkan Kamar Kos ➔
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 7. Footer: Kembali ke Login */}
          <View style={styles.footerWrap}>
            <Text style={styles.footerNote}>
              {role === 'penghuni'
                ? 'Sudah punya akun KosSobat? '
                : 'Sudah terdaftar sebagai pengelola? '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/')}>
              <Text style={styles.footerLink}>
                {role === 'penghuni' ? 'Masuk di sini' : 'Masuk ke Portal'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  // 1. Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    minHeight: 46,
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
  registerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  registerBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
  userAvatarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 2. Logo Utama di Atas
  topLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  mainBrandLogo: {
    width: 220,
    height: 115,
  },

  // 3. Hero Center
  heroCenter: {
    alignItems: 'center',
    marginBottom: 12,
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 5,
    marginBottom: 8,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  juraganBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 5,
    marginBottom: 8,
  },
  juraganBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 10,
  },

  // 4. Role Switcher Tab
  roleSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  roleTabActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Cards
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  verifiedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },

  // Inputs
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  requiredStar: {
    color: '#EF4444',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 8,
  },
  eyeIconBtn: {
    padding: 4,
  },
  infoHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  infoHintText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  helperText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginTop: 2,
  },

  // Status buttons Penghuni
  statusButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  statusBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  statusBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  statusBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Unit kos
  labelBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanQrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scanQrText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  kodeInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  kodeTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginLeft: 8,
  },
  foundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  foundBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },

  // Property info card
  propertyInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#EEF4FF',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  propertyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyTextBox: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  propertyAddress: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  pengelolaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  pengelolaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },

  // Room inputs and owner room list
  kamarSubLabel: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  roomInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomInputField: {
    flex: 1,
  },
  roomFloorInput: {
    width: 112,
  },
  roomListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomCount: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
  },
  roomAddButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 14,
  },
  roomListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  roomListItemText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },

  // Tipe Kos Pemilik
  tipeKosRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipeKosBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  tipeKosBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tipeKosText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  tipeKosTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  notifOtomatisPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  notifOtomatisText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  // Highlight Features Pemilik
  highlightSection: {
    backgroundColor: '#EEF4FF',
    borderRadius: 18,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  highlightTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
  },
  featureRowCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },

  // Terms Checkbox
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
  },
  checkboxBoxActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  termsLink: {
    color: '#2563EB',
    fontWeight: '700',
  },

  // Primary Button
  primaryBtn: {
    backgroundColor: '#2563EB',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Footer
  footerWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  footerNote: {
    fontSize: 13,
    color: '#64748B',
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
});
