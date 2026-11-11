import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  User,
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Role = "penghuni" | "pemilik";

const APP_LOGO = require("../Prototype/logo.png");

export default function LoginScreen() {
  const [role, setRole] = useState<Role>("penghuni");

  // Form Penghuni
  const [penghuniIdentifier, setPenghuniIdentifier] = useState("");
  const [penghuniPassword, setPenghuniPassword] = useState("");
  const [showPenghuniPassword, setShowPenghuniPassword] = useState(false);
  const [rememberPenghuni, setRememberPenghuni] = useState(false);

  // Form Pemilik
  const [pemilikIdentifier, setPemilikIdentifier] = useState(
    "hendra.pengelola@kosku.id",
  );
  const [pemilikPassword, setPemilikPassword] = useState("HarmoniLiving2024!");
  const [showPemilikPassword, setShowPemilikPassword] = useState(false);
  const [rememberPemilik, setRememberPemilik] = useState(true);

  const handleAutofillPenghuni = () => {
    setPenghuniIdentifier("0812-3456-7890");
    setPenghuniPassword("123456");
    Alert.alert(
      "Autofill Berhasil",
      "Data demo Rifa Fauziah (Kamar A12) telah diisikan.",
    );
  };

  const handleAutofillPemilik = () => {
    setPemilikIdentifier("hendra.pengelola@kosku.id");
    setPemilikPassword("HarmoniLiving2024!");
    Alert.alert(
      "Akses Demo Cepat",
      "Data demo Pak Hendra (Graha Harmoni Living) telah diisikan.",
    );
  };

  const handleLogin = () => {
    if (role === "penghuni") {
      if (!penghuniIdentifier || !penghuniPassword) {
        Alert.alert(
          "Peringatan",
          "Silakan masukkan nomor WhatsApp/Email dan PIN kamar.",
        );
        return;
      }
      router.push("/home");
    } else {
      if (!pemilikIdentifier || !pemilikPassword) {
        Alert.alert(
          "Peringatan",
          "Silakan masukkan email pengelola dan kata sandi.",
        );
        return;
      }
      Alert.alert(
        "Login Pengelola Berhasil",
        `Selamat datang Pak Hendra di KosSobat Admin Suite!\nID: ${pemilikIdentifier}`,
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.circleBtn} activeOpacity={0.7}>
              <ArrowLeft size={20} color="#0F172A" />
            </TouchableOpacity>
            <View style={styles.loginBadgeRow}>
              <Text style={styles.loginBadgeText}>Login</Text>
              <View style={styles.userAvatarCircle}>
                <User size={13} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Logo Utama */}
          <View style={styles.topLogoContainer}>
            <Image
              source={APP_LOGO}
              style={styles.mainBrandLogo}
              resizeMode="contain"
            />
          </View>

          {/* Judul & Subtitle */}
          {role === "penghuni" ? (
            <View style={styles.heroCenter}>
              <View style={styles.portalPill}>
                <MapPin size={12} color="#2563EB" />
                <Text style={styles.portalPillText}>PORTAL PENGHUNI</Text>
              </View>
              <Text style={styles.mainTitle}>Masuk ke Akun Penghuni</Text>
              <Text style={styles.subTitle}>
                Akses kamar digital, tagihan sewa, dan forum warga KosSobat
              </Text>
            </View>
          ) : (
            <View style={styles.heroCenter}>
              <View style={styles.badgeRowCenter}>
                <View style={styles.adminSuitePill}>
                  <ShieldCheck size={13} color="#2563EB" />
                  <Text style={styles.adminSuiteText}>Admin Suite</Text>
                </View>
                <View style={styles.operasionalPill}>
                  <View style={styles.greenDot} />
                  <Text style={styles.operasionalText}>Pusat Operasional</Text>
                </View>
              </View>
              <Text style={styles.mainTitle}>Masuk Portal Pengelola</Text>
              <Text style={styles.subTitle}>
                Kelola okupansi unit, pantau kas masuk, verifikasi aduan, dan
                kendalikan smart lock kamar secara terpadu.
              </Text>
            </View>
          )}

          {/* Switcher Tab Peran */}
          <View style={styles.roleSwitcherContainer}>
            <TouchableOpacity
              style={[
                styles.roleTab,
                role === "penghuni" && styles.roleTabActive,
              ]}
              onPress={() => setRole("penghuni")}
              activeOpacity={0.8}
            >
              <User
                size={16}
                color={role === "penghuni" ? "#FFFFFF" : "#475569"}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === "penghuni" && styles.roleTabTextActive,
                ]}
              >
                Penghuni
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleTab,
                role === "pemilik" && styles.roleTabActive,
              ]}
              onPress={() => setRole("pemilik")}
              activeOpacity={0.8}
            >
              <Building2
                size={16}
                color={role === "pemilik" ? "#FFFFFF" : "#475569"}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === "pemilik" && styles.roleTabTextActive,
                ]}
              >
                Pemilik Kos
              </Text>
            </TouchableOpacity>
          </View>

          {/* ==================== FORM PENGHUNI ==================== */}
          {role === "penghuni" && (
            <View style={styles.contentSection}>
              {/* Autofill Card */}
              <TouchableOpacity
                style={styles.autofillCard}
                onPress={handleAutofillPenghuni}
                activeOpacity={0.8}
              >
                <View style={styles.autofillIconBox}>
                  <Zap size={18} color="#2563EB" />
                </View>
                <View style={styles.autofillTextBox}>
                  <Text style={styles.autofillLabel}>AUTOFILL INSTAN</Text>
                  <Text style={styles.autofillDesc}>
                    Demo: Rifa Fauziah (Kamar A12)
                  </Text>
                </View>
                <ArrowRight size={18} color="#2563EB" />
              </TouchableOpacity>

              {/* Input WhatsApp / Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nomor WhatsApp atau Email</Text>
                <View style={styles.inputWrap}>
                  <Smartphone
                    size={20}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="0812-3456-7890 atau email"
                    placeholderTextColor="#94A3B8"
                    value={penghuniIdentifier}
                    onChangeText={setPenghuniIdentifier}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Input PIN */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Kata Sandi / PIN Kamar</Text>
                <View style={styles.inputWrap}>
                  <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Masukkan sandi atau 6 digit PIN"
                    placeholderTextColor="#94A3B8"
                    value={penghuniPassword}
                    onChangeText={setPenghuniPassword}
                    secureTextEntry={!showPenghuniPassword}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowPenghuniPassword(!showPenghuniPassword)
                    }
                    style={styles.eyeIconBtn}
                  >
                    {showPenghuniPassword ? (
                      <Eye size={20} color="#94A3B8" />
                    ) : (
                      <EyeOff size={20} color="#94A3B8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot */}
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  activeOpacity={0.8}
                  onPress={() => setRememberPenghuni(!rememberPenghuni)}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      rememberPenghuni && styles.checkboxBoxActive,
                    ]}
                  >
                    {rememberPenghuni && <Check size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Ingat saya</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.linkText}>Lupa Kata Sandi?</Text>
                </TouchableOpacity>
              </View>

              {/* Tombol Login */}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Masuk Sekarang ➔</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>
                  atau masuk lebih cepat dengan
                </Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                  <MessageSquare size={18} color="#16A34A" />
                  <Text style={styles.socialBtnText}>WhatsApp OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                  <Mail size={17} color="#EA4335" />
                  <Text style={styles.socialBtnText}>Google</Text>
                </TouchableOpacity>
              </View>

              {/* Footer Register */}
              <View style={styles.footerWrap}>
                <Text style={styles.footerNote}>
                  Belum punya akun penghuni?{" "}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: "/register",
                      params: { role: "penghuni" },
                    })
                  }
                >
                  <Text style={styles.footerLink}>Daftar Penghuni Baru</Text>
                </TouchableOpacity>
              </View>

              {/* Security Card */}
              <View style={styles.securityCard}>
                <View style={styles.securityIconBox}>
                  <ShieldCheck size={20} color="#2563EB" />
                </View>
                <Text style={styles.securityText}>
                  Dilindungi enkripsi data end-to-end KosSobat & IoT Smart
                  Access
                </Text>
              </View>
            </View>
          )}

          {/* ==================== FORM PEMILIK ==================== */}
          {role === "pemilik" && (
            <View style={styles.contentSection}>
              {/* Akses Demo Cepat */}
              <TouchableOpacity
                style={styles.autofillCard}
                onPress={handleAutofillPemilik}
                activeOpacity={0.8}
              >
                <View style={styles.autofillIconBox}>
                  <Zap size={18} color="#2563EB" />
                </View>
                <View style={styles.autofillTextBox}>
                  <Text style={styles.autofillLabel}>AKSES DEMO CEPAT</Text>
                  <Text style={styles.autofillTitleBold}>
                    Pak Hendra • Graha Harmoni Living
                  </Text>
                  <Text style={styles.autofillSub}>
                    12 Kamar Aktif • Admin Utama
                  </Text>
                </View>
                <ArrowRight size={18} color="#2563EB" />
              </TouchableOpacity>

              {/* Input Email Pemilik */}
              <View style={styles.inputGroup}>
                <View style={styles.labelWithTag}>
                  <Text style={styles.inputLabel}>
                    Email Pemilik / ID Pengelola
                  </Text>
                  <Text style={styles.b2bTag}>Terdaftar B2B</Text>
                </View>
                <View style={styles.inputWrap}>
                  <Mail size={20} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="hendra.pengelola@kosku.id"
                    placeholderTextColor="#94A3B8"
                    value={pemilikIdentifier}
                    onChangeText={setPemilikIdentifier}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Input Kata Sandi Pemilik */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Kata Sandi Akun Pemilik</Text>
                <View style={styles.inputWrap}>
                  <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Masukkan sandi pemilik"
                    placeholderTextColor="#94A3B8"
                    value={pemilikPassword}
                    onChangeText={setPemilikPassword}
                    secureTextEntry={!showPemilikPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPemilikPassword(!showPemilikPassword)}
                    style={styles.eyeIconBtn}
                  >
                    {showPemilikPassword ? (
                      <Eye size={20} color="#94A3B8" />
                    ) : (
                      <EyeOff size={20} color="#94A3B8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember & Forgot */}
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  activeOpacity={0.8}
                  onPress={() => setRememberPemilik(!rememberPemilik)}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      rememberPemilik && styles.checkboxBoxActive,
                    ]}
                  >
                    {rememberPemilik && <Check size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Simpan perangkat ini</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.linkText}>Lupa Kata Sandi?</Text>
                </TouchableOpacity>
              </View>

              {/* Tombol Login Pemilik */}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>
                  Masuk ke Dashboard Pemilik ➔
                </Text>
              </TouchableOpacity>

              {/* 2FA Card */}
              <View style={styles.twoFactorCard}>
                <View style={styles.shieldRoundBox}>
                  <ShieldCheck size={22} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.twoFactorTitle}>
                    Proteksi Keamanan Ganda (2FA)
                  </Text>
                  <Text style={styles.twoFactorDesc}>
                    Verifikasi PIN 6–digit & token otomatis dikirimkan ke
                    WhatsApp resmi pengelola untuk tiap sesi perangkat baru.
                  </Text>
                </View>
              </View>

              {/* Kluster Terkoneksi */}
              <View style={styles.clusterSection}>
                <View style={styles.clusterHeader}>
                  <Text style={styles.clusterTitle}>KLUSTER TERKONEKSI</Text>
                  <View style={styles.clusterRealtimeRow}>
                    <RefreshCw size={12} color="#2563EB" />
                    <Text style={styles.clusterRealtimeText}>
                      Sinkronisasi Realtime
                    </Text>
                  </View>
                </View>
                <View style={styles.clusterCardsRow}>
                  <View style={styles.clusterCard}>
                    <View style={styles.clusterThumbPlaceholder}>
                      <Home size={32} color="#60A5FA" />
                      <View style={styles.unitBadge}>
                        <Text style={styles.unitBadgeText}>12 Unit</Text>
                      </View>
                    </View>
                    <View style={styles.clusterCardBody}>
                      <Text style={styles.clusterPropName}>Harmoni Living</Text>
                      <View style={styles.clusterStatusRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#16A34A" },
                          ]}
                        />
                        <Text
                          style={[
                            styles.clusterStatusText,
                            { color: "#16A34A" },
                          ]}
                        >
                          100% Terisi
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.clusterCard}>
                    <View style={styles.clusterThumbPlaceholder}>
                      <Building2 size={32} color="#93C5FD" />
                      <View style={styles.unitBadge}>
                        <Text style={styles.unitBadgeText}>8 Unit</Text>
                      </View>
                    </View>
                    <View style={styles.clusterCardBody}>
                      <Text style={styles.clusterPropName}>
                        Harmoni Suite II
                      </Text>
                      <View style={styles.clusterStatusRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#2563EB" },
                          ]}
                        />
                        <Text
                          style={[
                            styles.clusterStatusText,
                            { color: "#2563EB" },
                          ]}
                        >
                          1 Kamar Kosong
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Footer Daftarkan Properti */}
              <View style={styles.footerClusterSection}>
                <Text style={styles.footerNote}>
                  Ingin mengelola kos dengan KosSobat?
                </Text>
                <TouchableOpacity
                  style={styles.registerPropBtn}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({
                      pathname: "/register",
                      params: { role: "pemilik" },
                    })
                  }
                >
                  <Building2 size={18} color="#2563EB" />
                  <Text style={styles.registerPropText}>
                    Daftarkan Properti Kos Baru
                  </Text>
                </TouchableOpacity>
                <Text style={styles.enterpriseProtectionText}>
                  KosSobat Enterprise Protection • SLA 99.9% Uptime
                </Text>
              </View>
            </View>
          )}

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    minHeight: 46,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  loginBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  loginBadgeText: { fontSize: 13, fontWeight: "600", color: "#1E40AF" },
  userAvatarCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#1E40AF",
    alignItems: "center",
    justifyContent: "center",
  },

  topLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 8,
  },
  mainBrandLogo: { width: 230, height: 125 },

  heroCenter: { alignItems: "center", marginBottom: 12 },
  portalPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    marginBottom: 8,
  },
  portalPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1E40AF",
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 15,
  },

  badgeRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },
  adminSuitePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  adminSuiteText: { fontSize: 11, fontWeight: "700", color: "#1D4ED8" },
  operasionalPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  operasionalText: { fontSize: 11, fontWeight: "700", color: "#047857" },

  roleSwitcherContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  roleTabActive: {
    backgroundColor: "#2563EB",
    elevation: 3,
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  roleTabText: { fontSize: 14, fontWeight: "600", color: "#475569" },
  roleTabTextActive: { color: "#FFFFFF", fontWeight: "700" },

  contentSection: { gap: 14 },

  autofillCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  autofillIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  autofillTextBox: { flex: 1 },
  autofillLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 0.5,
  },
  autofillDesc: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 2,
  },
  autofillTitleBold: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 2,
  },
  autofillSub: { fontSize: 11, color: "#64748B", marginTop: 1 },

  inputGroup: { gap: 6 },
  inputLabel: { fontSize: 13, fontWeight: "600", color: "#374151" },
  labelWithTag: { flexDirection: "row", alignItems: "center", gap: 8 },
  b2bTag: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1D4ED8",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 50,
    gap: 10,
  },
  inputIcon: {},
  textInput: { flex: 1, fontSize: 15, color: "#0F172A" },
  eyeIconBtn: { padding: 4 },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  checkboxLabel: { fontSize: 13, color: "#475569" },
  linkText: { fontSize: 13, color: "#2563EB", fontWeight: "600" },

  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  dividerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
  dividerText: { fontSize: 11, color: "#94A3B8", textAlign: "center" },

  socialRow: { flexDirection: "row", gap: 10 },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  socialBtnText: { fontSize: 13, fontWeight: "600", color: "#0F172A" },

  footerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footerNote: { fontSize: 13, color: "#64748B" },
  footerLink: { fontSize: 13, fontWeight: "700", color: "#2563EB" },

  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  securityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  securityText: { flex: 1, fontSize: 12, color: "#0369A1", lineHeight: 17 },

  twoFactorCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  shieldRoundBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  twoFactorTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 4,
  },
  twoFactorDesc: { fontSize: 12, color: "#3B82F6", lineHeight: 17 },

  clusterSection: { gap: 10 },
  clusterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clusterTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#475569",
    letterSpacing: 0.5,
  },
  clusterRealtimeRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  clusterRealtimeText: { fontSize: 11, color: "#2563EB", fontWeight: "600" },
  clusterCardsRow: { flexDirection: "row", gap: 10 },
  clusterCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  clusterThumbPlaceholder: {
    backgroundColor: "#EFF6FF",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  unitBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#1E40AF",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  unitBadgeText: { fontSize: 10, fontWeight: "700", color: "#FFFFFF" },
  clusterCardBody: { padding: 10, gap: 4 },
  clusterPropName: { fontSize: 13, fontWeight: "700", color: "#0F172A" },
  clusterStatusRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  clusterStatusText: { fontSize: 11, fontWeight: "600" },

  footerClusterSection: { alignItems: "center", gap: 10 },
  registerPropBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  registerPropText: { fontSize: 14, fontWeight: "700", color: "#1D4ED8" },
  enterpriseProtectionText: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
  },
});
