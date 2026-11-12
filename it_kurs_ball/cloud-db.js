/* ========================================================
   IT PARK ACADEMY — BULUTLI BAZA (FIREBASE REALTIME DB)
   Yagona Markaziy Baza va Jonli Sinxronizatsiya Tizimi
   ======================================================== */

const CLOUD_CONFIG_KEY = 'IT_PARK_FIREBASE_CONFIG';

// Standart / Boshlang'ich konfiguratsiya
// Foydalanuvchi Admin paneldan istalgan payt o'z Firebase kalitlarini qo'yishi mumkin
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBDHieycFwN4XUfoe31wX6KSWBvw00ywAo",
  authDomain: "it-kurs-ball.firebaseapp.com",
  databaseURL: "https://it-kurs-ball-default-rtdb.firebaseio.com",
  projectId: "it-kurs-ball",
  storageBucket: "it-kurs-ball.firebasestorage.app",
  messagingSenderId: "46592703770",
  appId: "1:46592703770:web:da8762f42e725675a9c0a3",
  measurementId: "G-VGD5R4B5HY"
};

const CloudDB = {
  db: null,
  isInitialized: false,
  isConnected: false,
  saveTimeout: null,
  listeners: [],
  statusCallbacks: [],

  getConfig() {
    try {
      const saved = localStorage.getItem(CLOUD_CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Firebase config o'qishda xatolik:", e);
    }
    return DEFAULT_FIREBASE_CONFIG;
  },

  saveConfig(configObj) {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(configObj));
  },

  isCustomConfigured() {
    const cfg = this.getConfig();
    return !!(cfg && cfg.databaseURL && !cfg.databaseURL.includes('it-park-academy-uz-default'));
  },

  init(options = {}) {
    const { onData, onStatus } = options;
    if (onStatus) this.statusCallbacks.push(onStatus);
    if (onData) this.listeners.push(onData);

    const config = this.getConfig();

    // Firebase kutubxonasi mavjudligini tekshirish
    if (typeof firebase === 'undefined') {
      console.log("ℹ️ Firebase SDK yuklanmagan yoki oflayn rejim.");
      this.notifyStatus({ connected: false, mode: 'local', text: "Lokal rejim" });
      return;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      this.db = firebase.database();
      this.isInitialized = true;

      // Internet ulanish holatini kuzatish
      const connectedRef = this.db.ref('.info/connected');
      connectedRef.on('value', (snap) => {
        this.isConnected = snap.val() === true;
        if (this.isConnected) {
          this.notifyStatus({ connected: true, mode: 'cloud', text: "🟢 Bulut: Jonli ulanish" });
        } else {
          this.notifyStatus({ connected: false, mode: 'offline', text: "🟡 Lokal keshda ishlamoqda" });
        }
      });

      // Markaziy ma'lumotlar bazasini tinglash (Real-time listener)
      const dataRef = this.db.ref('it_academy/appState');
      dataRef.on('value', (snapshot) => {
        const val = snapshot.val();
        if (val && val.students && val.students.length > 0) {
          this.listeners.forEach(fn => {
            try { fn(val); } catch (err) { console.error("Cloud listener error:", err); }
          });
        } else {
          // Baza bo'sh bo'lsa, mavjud lokal ma'lumotlarni bulutga dastlabki yuklash (Seed)
          console.log("ℹ️ Bulutli baza bo'sh. Dastlabki ma'lumotlar yuklanmoqda...");
          if (window.appState && window.appState.students && window.appState.students.length > 0) {
            this.forcePush(window.appState);
          }
        }
      }, (error) => {
        console.warn("Firebase ulanish ruxsati yoki xatolik:", error.message);
        this.notifyStatus({ connected: false, mode: 'warning', text: "⚠️ Ruxsat tekshirilmoqda" });
      });

    } catch (e) {
      console.warn("Firebase init xatosi (Lokal rejimda davom etiladi):", e);
      this.notifyStatus({ connected: false, mode: 'local', text: "Lokal rejim" });
    }
  },

  // Ma'lumotlarni bulutga yuborish (Debounce bilan optimallashtirilgan)
  save(state) {
    if (!this.isInitialized || !this.db) return;
    
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.forcePush(state);
    }, 400);
  },

  // To'g'ridan-to'g'ri bulutga yozish
  forcePush(state) {
    if (!this.isInitialized || !this.db) return Promise.resolve(false);
    return this.db.ref('it_academy/appState').set(state)
      .then(() => {
        console.log("✅ Ma'lumotlar bulutga (Firebase) muvaffaqiyatli saqlandi.");
        return true;
      })
      .catch((err) => {
        console.warn("Bulutga saqlashda xatolik:", err);
        return false;
      });
  },

  // Bulutdan barcha ma'lumotlarni majburiy yuklab olish
  pullOnce() {
    if (!this.isInitialized || !this.db) return Promise.resolve(null);
    return this.db.ref('it_academy/appState').once('value')
      .then(snap => snap.val())
      .catch(err => {
        console.warn("Bulutdan olishda xatolik:", err);
        return null;
      });
  },

  notifyStatus(statusObj) {
    this.statusCallbacks.forEach(cb => {
      try { cb(statusObj); } catch (e) {}
    });
  }
};

window.CloudDB = CloudDB;
