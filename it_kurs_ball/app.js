/* ========================================================
   IT PARK ACADEMY — LMS TIZIMI (APP.JS)
   Public Landing (Mehmon) & Student Portal (O'quvchi Kabineti)
   ======================================================== */

// Telegram WebApp SDK
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

/* ========================================================
   TOAST BILDIRISHNOMALARI (NON-BLOCKING)
   ======================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast-box ${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* ========================================================
   TIL TIZIMI (UZBEK / ENGLISH)
   ======================================================== */
const I18N = {
  uz: {
    brandTitle: "IT PARK ACADEMY",
    brandSubtitle: "Ta'lim Markazi Tizimi",
    navCourses: "Kurslar",
    navFeatures: "Afzalliklar",
    navRegister: "Ro'yxatdan o'tish",
    navLogin: "👨‍🎓 O'quvchi Kabineti",
    navLogout: "🚪 Chiqish",
    heroTitle: "Kompyuter Savodxonligi (0 dan) va Sun'iy Intellekt (AI) Kurslari",
    heroSubtitle: "Bolalarga kompyuterni 0 dan o'rgatish, zamonaviy Sun'iy Intellekt (AI, ChatGPT) bilan ishlash va Prompt Engineering bo'yicha amaliy mashg'ulotlar. Qo'qondagi Noib ko'prigi MFY filialida!",
    btnRegisterTrial: "Bepul sinov darsiga yozilish",
    tabSchedule: "📅 Dars Jadvali",
    tabVideos: "🎥 Video Darslar & Arxiv",
    tabHomework: "📝 Uyga Vazifalar",
    tabLeaderboard: "🏆 Reyting",
    tabShop: "🛍️ Do'kon & Buyurtmalar",
    tabIdCard: "🪪 Guvohnoma (ID Card)"
  },
  en: {
    brandTitle: "IT PARK ACADEMY",
    brandSubtitle: "Educational Center System",
    navCourses: "Courses",
    navFeatures: "Advantages",
    navRegister: "Register",
    navLogin: "👨‍🎓 Student Portal",
    navLogout: "🚪 Log Out",
    heroTitle: "Computer Literacy (From Scratch) & Artificial Intelligence (AI)",
    heroSubtitle: "Teaching children computer skills from scratch, working with modern AI (ChatGPT) and Prompt Engineering in Qo'qon (Noib ko'prigi MFY).",
    btnRegisterTrial: "Apply for Free Trial Lesson",
    tabSchedule: "📅 Timetable",
    tabVideos: "🎥 Video Lessons",
    tabHomework: "📝 Homework",
    tabLeaderboard: "🏆 Leaderboard",
    tabShop: "🛍️ Store & Orders",
    tabIdCard: "🪪 Student ID Badge"
  }
};

let currentLang = 'uz';

function toggleLanguage() {
  currentLang = currentLang === 'uz' ? 'en' : 'uz';
  localStorage.setItem('IT_PARK_LANG', currentLang);
  updateLanguageUI();
}

function updateLanguageUI() {
  const langBtn = document.getElementById('langSwitchBtn');
  if (langBtn) langBtn.innerText = currentLang === 'uz' ? '🇺🇿 UZ' : '🇬🇧 EN';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && I18N[currentLang]?.[key]) {
      el.innerText = I18N[currentLang][key];
    }
  });
}

/* ========================================================
   MA'LUMOTLAR BAZASI
   ======================================================== */
const STORAGE_KEY = 'IT_PARK_OFFICIAL_STUDENTS_V2';
const SESSION_KEY = 'IT_PARK_STUDENT_SESSION';

// 22 ta haqiqiy o'quvchi ma'lumotlari (boshlang'ich parol: 1234, eng yuqori ball: 85 XP)
const DEFAULT_STUDENTS = [
  { id: 1, name: "Ismoilova Muslimaxon", group: "1-Guruh (10:00)", xp: 85, tasks: 12, rewards: 2, streak: 5, phone: "+998 90 123 45 01", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 2, name: "Ahrorov Muhammadjon", group: "1-Guruh (10:00)", xp: 70, tasks: 11, rewards: 1, streak: 5, phone: "+998 91 234 56 02", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 3, name: "Usmonov Abdullox", group: "1-Guruh (10:00)", xp: 65, tasks: 11, rewards: 1, streak: 5, phone: "+998 93 345 67 03", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 4, name: "Gafarov MuhammadSafoxon", group: "1-Guruh (10:00)", xp: 60, tasks: 10, rewards: 1, streak: 5, phone: "+998 94 456 78 04", pin: "1234", paymentStatus: "pending", attendance: "late" },
  { id: 5, name: "Sadikov MuhammadSodiq", group: "1-Guruh (10:00)", xp: 75, tasks: 10, rewards: 1, streak: 5, phone: "+998 97 567 89 05", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 6, name: "Nomonov Fatxullo", group: "1-Guruh (10:00)", xp: 55, tasks: 9, rewards: 1, streak: 4, phone: "+998 99 678 90 06", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 7, name: "Alijonov Ayubxon", group: "1-Guruh (10:00)", xp: 45, tasks: 7, rewards: 0, streak: 3, phone: "+998 90 789 01 07", pin: "1234", paymentStatus: "overdue", attendance: "absent" },
  { id: 8, name: "Anvarov Xoji Akbar", group: "1-Guruh (10:00)", xp: 40, tasks: 6, rewards: 0, streak: 2, phone: "+998 91 890 12 08", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 9, name: "Xoshimov Jobirjon", group: "1-Guruh (10:00)", xp: 35, tasks: 5, rewards: 0, streak: 2, phone: "+998 93 901 23 09", pin: "1234", paymentStatus: "pending", attendance: "present" },
  { id: 10, name: "Botirova Xadichabonu", group: "2-Guruh (Qizlar)", xp: 60, tasks: 9, rewards: 1, streak: 4, phone: "+998 94 012 34 10", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 11, name: "Qoraboyeva Madina", group: "2-Guruh (Qizlar)", xp: 50, tasks: 8, rewards: 1, streak: 3, phone: "+998 97 123 45 11", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 12, name: "Baratova Shaxrizoda", group: "2-Guruh (Qizlar)", xp: 45, tasks: 7, rewards: 0, streak: 3, phone: "+998 99 234 56 12", pin: "1234", paymentStatus: "pending", attendance: "present" },
  { id: 13, name: "Turg'unova Dilruzaxon", group: "2-Guruh (Qizlar)", xp: 25, tasks: 3, rewards: 0, streak: 1, phone: "+998 90 345 67 13", pin: "1234", paymentStatus: "overdue", attendance: "absent" },
  { id: 14, name: "Yusupov Umidjon", group: "3-Guruh (15:00)", xp: 75, tasks: 8, rewards: 1, streak: 3, phone: "+998 91 456 78 14", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 15, name: "Ahmedov SaidUmar", group: "3-Guruh (15:00)", xp: 20, tasks: 1, rewards: 0, streak: 0, phone: "+998 93 567 89 15", pin: "1234", paymentStatus: "pending", attendance: "present" },
  { id: 16, name: "Ikoromov MuhammadSodiq", group: "4-Guruh (17:00)", xp: 45, tasks: 7, rewards: 1, streak: 3, phone: "+998 94 678 90 16", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 17, name: "Yodgorjonov Salohiddin", group: "4-Guruh (17:00)", xp: 30, tasks: 3, rewards: 0, streak: 1, phone: "+998 97 789 01 17", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 18, name: "Mamarizayev Axrorjon", group: "4-Guruh (17:00)", xp: 20, tasks: 1, rewards: 0, streak: 0, phone: "+998 99 890 12 18", pin: "1234", paymentStatus: "overdue", attendance: "absent" },
  { id: 19, name: "A'zamjonov Saydullo", group: "4-Guruh (17:00)", xp: 20, tasks: 1, rewards: 0, streak: 0, phone: "+998 90 901 23 19", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 20, name: "Murodov Ayubxon", group: "4-Guruh (17:00)", xp: 15, tasks: 1, rewards: 0, streak: 0, phone: "+998 91 012 34 20", pin: "1234", paymentStatus: "pending", attendance: "present" },
  { id: 21, name: "Rahmonov Abdulxodi", group: "5-Guruh (Du/Cho/Ju)", xp: 15, tasks: 1, rewards: 0, streak: 0, phone: "+998 93 123 45 21", pin: "1234", paymentStatus: "paid", attendance: "present" },
  { id: 22, name: "Sobirov MuhammadSiddiq", group: "5-Guruh (Du/Cho/Ju)", xp: 10, tasks: 1, rewards: 0, streak: 0, phone: "+998 94 234 56 22", pin: "1234", paymentStatus: "paid", attendance: "present" }
];

const DEFAULT_COURSES = [
  {
    id: "ai-full",
    title: "Kompyuter Savodxonligi (0 dan) & Sun'iy Intellekt (AI) va Prompt Engineering",
    icon: "🤖",
    level: "0 dan boshlab (Barcha yoshdagi bolalar uchun)",
    price: "Amaliy ta'lim kursi",
    duration: "Amaliy kurs",
    desc: "Bolalarga kompyuterdan to'g'ri foydalanishni 0 dan o'rgatish, zamonaviy Sun'iy Intellekt (AI) dunyosi, ChatGPT va AI vositalari bilan ishlash hamda Prompt Engineering (sun'iy intellektga to'g'ri so'rov berish san'ati) bo'yicha amaliy darslar.",
    tags: ["Kompyuter 0 dan", "Sun'iy Intellekt", "Prompt Engineering", "ChatGPT & AI"]
  },
  {
    id: "comp-fnd",
    title: "1-Bosqich: Kompyuterni 0 dan O'rganish (Savodxonlik)",
    icon: "💻",
    level: "Boshlang'ich",
    price: "Asosiy poydevor",
    duration: "1-oy",
    desc: "Kompyuterni yoqish, Windows tizimi, klaviaturada tez yozish, dasturlar, tizim fayllari bilan ishlash va internet xavfsizligi qoidalari.",
    tags: ["Kompyuter 0 dan", "Windows", "Internet xavfsizligi"]
  },
  {
    id: "ai-prompt",
    title: "2-Bosqich: Sun'iy Intellekt (AI) & Prompt Engineering",
    icon: "⚡",
    level: "Chuqurlashtirilgan",
    price: "AI amaliyoti",
    duration: "2-oy",
    desc: "Neyrotarmoqlar va AI vositalari qanday ishlashi, sun'iy intellektga aniq va samarali buyruq (prompt) berish, matn, rasm va ijodiy ishlarni AI orqali yaratish.",
    tags: ["Sun'iy Intellekt", "Prompt Engineering", "ChatGPT"]
  }
];

const DEFAULT_VIDEOS = [
  { id: 1, title: "1-Dars: HTML5 Semantikasi va Hujjat Strukturasi", duration: "48 daqiqa", teacher: "Sanjar Rustamov", url: "https://www.youtube.com/embed/qz0aGYrrlhU", summary: "Web sahifa teglari, semantik tuzilma, qidiruv tizimlari (SEO) uchun optimizatsiya.", notes: "Semantik teglardan foydalanish brauzerlar va qidiruv tizimlari uchun standart hisoblanadi." },
  { id: 2, title: "2-Dars: CSS Flexbox va Grid Asoslari", duration: "55 daqiqa", teacher: "Sanjar Rustamov", url: "https://www.youtube.com/embed/JJSoEo8JSnc", summary: "Moslashuvchan layoutlar qurish, elementlarni tekislash va ekran o'lchamlari bo'yicha moslashtirish.", notes: "Flexbox bir o'lchamli qatorlar, Grid esa ikki o'lchamli joylashuvlar uchun qulay." },
  { id: 3, title: "3-Dars: JavaScript DOM va Hodisalar bilan Ishlash", duration: "1 soat 10 min", teacher: "Sanjar Rustamov", url: "https://www.youtube.com/embed/hdI2bqOjy3c", summary: "querySelector, event listeners, dinamik elementlar yaratish va forma ma'lumotlarini o'qish.", notes: "Hodisalar foydalanuvchi harakatlarini interaktiv qayta ishlash imkonini beradi." },
  { id: 4, title: "4-Dars: Python Funksiyalar va Ma'lumotlar Tuzilmalari", duration: "1 soat 05 min", teacher: "Rustam Qodirov", url: "https://www.youtube.com/embed/kqtD5dpn9C8", summary: "Funksiyalar yaratish, argumentlar, return qiymati, ro'yxat va lug'atlar bilan ishlash.", notes: "Funksiyalar kodni qisqartirish va qayta ishlatish uchun asosiy vositadir." }
];

const DEFAULT_SUBMISSIONS = [
  { id: 1, studentId: 1, studentName: "Ismoilova Muslimaxon", taskTitle: "React Todo List loyihasi", url: "https://github.com/muslimaxon/react-todo-app", note: "Barcha funksiyalar yozildi, local storage bilan integratsiya qilindi.", status: "graded", score: 15, feedback: "Kod toza yozilgan, komponentlar to'g'ri bo'lingan.", date: "Bugun 12:40" },
  { id: 2, studentId: 2, studentName: "Ahrorov Muhammadjon", taskTitle: "Python Bank tizimi", url: "https://github.com/muhammadjon/python-bank-cli", note: "OOP tamoyillari asosida balans boshqaruvi qilindi.", status: "pending", score: null, feedback: null, date: "Bugun 16:15" },
  { id: 3, studentId: 3, studentName: "Usmonov Abdullox", taskTitle: "CSS Grid Portfolio sayti", url: "https://github.com/abdullox/portfolio-2026", note: "Mobil va planshet ekranlariga to'liq moslashtirildi.", status: "pending", score: null, feedback: null, date: "Kecha 18:30" }
];

const DEFAULT_SHOP = [
  { id: 1, emoji: "🚀", name: "Cyber IT Stikerlar Paketi", desc: "Noutbuk va telefon uchun 10 ta yaltiroq 3D stiker", xp: 45 },
  { id: 2, emoji: "🍫", name: "Miya Quvvati Shokoladi", desc: "Darsda diqqatni oshiruvchi mazali KitKat & Snack", xp: 75 },
  { id: 3, emoji: "🎮", name: "1 Soat Erkin Game Time", desc: "Dars yakunida do'stlar bilan IT o'yin o'ynash huquqi", xp: 130 },
  { id: 4, emoji: "👕", name: "Code Master Futbolkasi", desc: "Maxsus yosh dasturchi brendli sifatli futbolka", xp: 320 },
  { id: 5, emoji: "🎧", name: "RGB Gaming Quloqchin", desc: "Kod yozish va musiqa uchun ajoyib quloqchin", xp: 480 },
  { id: 6, emoji: "☕", name: "Senior Developer Krujkasi", desc: "Kodli motivatsion termo krujka", xp: 200 }
];

const QUIZZES = [
  {
    topic: "Frontend Asoslari",
    questions: [
      { q: "JavaScript-da qiymati o'zgarmas o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?", options: ["let", "var", "const", "def"], correct: 2, xp: 5 },
      { q: "CSS-da elementlarni moslashuvchan qatorga joylashtirish uchun qaysi xususiyat ishlatiladi?", options: ["display: flex", "position: absolute", "float: left", "z-index: 10"], correct: 0, xp: 5 },
      { q: "Brauzer xotirasida ma'lumotlarni saqlash obyekti qaysi?", options: ["CookieCache", "localStorage", "DatabaseSQL", "MemoryStore"], correct: 1, xp: 5 }
    ]
  },
  {
    topic: "Python & Mantiq",
    questions: [
      { q: "Python tilida ro'yxat oxiriga element qo'shish funksiyasi qaysi?", options: [".add()", ".push()", ".append()", ".insertEnd()"], correct: 2, xp: 5 },
      { q: "Quyidagilardan qaysi biri lug'at (dictionary) turiga kiradi?", options: ["['a', 'b']", "('a', 'b')", "{'kalit': 'qiymat'}", "{1, 2, 3}"], correct: 2, xp: 5 },
      { q: "Python-da funksiya e'lon qilish kalit so'zi qaysi?", options: ["function", "def", "func", "create"], correct: 1, xp: 5 }
    ]
  }
];

const DEFAULT_TASKS = [
  { id: 1, title: "React Todo List loyihasi", xp: 20, group: "ALL", desc: "React hooklari (useState, useEffect) yordamida vazifalar boshqaruvi ilovasi yaratish." },
  { id: 2, title: "Python OOP Bank tizimi", xp: 25, group: "ALL", desc: "Klasslar, merosxo'rlik va inkapsulyatsiya tamoyillari asosida bank hisob raqamini boshqarish dasturi." },
  { id: 3, title: "CSS Grid Portfolio sayti", xp: 15, group: "ALL", desc: "CSS Grid va Flexbox yordamida to'liq moslashuvchan shaxsiy portfolio veb-sahifasini yasash." }
];

let appState = {
  students: [],
  leads: [],
  videoLessons: [],
  homeworkTasks: [],
  homeworkSubmissions: [],
  shopItems: []
};

let currentStudentId = null;

function loadState() {
  const savedLang = localStorage.getItem('IT_PARK_LANG');
  if (savedLang) currentLang = savedLang;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.students && parsed.students.length > 0) {
        appState.students = parsed.students.map(s => ({
          ...s,
          pin: s.pin || "1234",
          phone: s.phone || "+998 90 " + Math.floor(1000000 + Math.random() * 9000000),
          paymentStatus: s.paymentStatus || (s.xp > 200 ? "paid" : s.xp > 100 ? "pending" : "overdue"),
          attendance: s.attendance || (s.streak > 2 ? "present" : "late")
        }));
      } else {
        appState.students = DEFAULT_STUDENTS;
      }
      appState.shopItems = Array.isArray(parsed.shopItems) ? parsed.shopItems : DEFAULT_SHOP;
      appState.shopOrders = parsed.shopOrders || [];
      appState.scheduleNotice = parsed.scheduleNotice || {
        title: "Darslar boshlanishi haqida rasmiy e'lon",
        text: "Hurmatli o'quvchilar va ota-onalar! IT Park Qo'qon filiali (Noib ko'prigi MFY) darslari jadval bo'yicha o'z vaqtida bo'lib o'tadi. Sun'iy intellekt va kompyuter savodxonligi darslariga kechikmasdan kelishingiz so'raladi.",
        date: "Bugun",
        active: true
      };
      appState.scheduleAnnouncements = parsed.scheduleAnnouncements || (parsed.scheduleNotice ? [parsed.scheduleNotice] : []);
      appState.leads = parsed.leads || [];
      appState.videoLessons = (parsed.videoLessons && parsed.videoLessons.length > 0) ? parsed.videoLessons : DEFAULT_VIDEOS;
      appState.homeworkTasks = (parsed.homeworkTasks && parsed.homeworkTasks.length > 0) ? parsed.homeworkTasks : DEFAULT_TASKS;
      appState.homeworkSubmissions = parsed.homeworkSubmissions || DEFAULT_SUBMISSIONS;
      appState.customGroups = parsed.customGroups || [];
      normalizeStudentIds();
      saveState();
    } catch (e) {
      initDefaults();
    }
  } else {
    initDefaults();
  }

  const savedSession = sessionStorage.getItem(SESSION_KEY);
  if (savedSession) {
    try {
      const sess = JSON.parse(savedSession);
      currentStudentId = sess.studentId || null;
    } catch (e) {
      currentStudentId = null;
    }
  }

  // Markaziy bulutli baza bilan ulanishni boshlash
  initStudentCloudSync();
}

const OFFICIAL_XP_MAP = {
  1: 85,  // Ismoilova Muslimaxon (eng baland ball: 85 XP)
  2: 70,  // Ahrorov Muhammadjon: 70 XP
  3: 65,  // Usmonov Abdullox: 65 XP
  4: 60,  // Gafarov MuhammadSafoxon: 60 XP
  5: 75,  // Sadikov MuhammadSodiq: 75 XP
  6: 55,  // Nomonov Fatxullo: 55 XP
  7: 45,  // Alijonov Ayubxon: 45 XP
  8: 40,  // Anvarov Xoji Akbar: 40 XP
  9: 35,  // Xoshimov Jobirjon: 35 XP
  10: 60, // Botirova Xadichabonu: 60 XP
  11: 50, // Qoraboyeva Madina: 50 XP
  12: 45, // Baratova Shaxrizoda: 45 XP
  13: 25, // Turg'unova Dilruzaxon: 25 XP
  14: 75, // Yusupov Umidjon: 75 XP
  15: 20, // Ahmedov SaidUmar: 20 XP
  16: 45, // Ikoromov MuhammadSodiq: 45 XP
  17: 30, // Yodgorjonov Salohiddin: 30 XP
  18: 20, // Mamarizayev Axrorjon: 20 XP
  19: 20, // A'zamjonov Saydullo: 20 XP
  20: 15, // Murodov Ayubxon: 15 XP
  21: 15, // Rahmonov Abdulxodi: 15 XP
  22: 10  // Sobirov MuhammadSiddiq: 10 XP
};

function syncOfficialStudentPoints(force = false) {
  if (!appState.students) return;
  let changed = false;
  appState.students.forEach(s => {
    // Eng baland ball 85 XP. Agar o'quvchi bali 85 dan katta bo'lsa yoki eski buzilgan ballar bo'lsa:
    if (s.xp > 85 || force || (OFFICIAL_XP_MAP[s.id] !== undefined && s.xp > OFFICIAL_XP_MAP[s.id])) {
      if (OFFICIAL_XP_MAP[s.id] !== undefined) {
        s.xp = OFFICIAL_XP_MAP[s.id];
        changed = true;
      }
    }
  });
  if (changed) {
    saveState();
  }
}

function initDefaults() {
  appState.students = DEFAULT_STUDENTS;
  appState.shopItems = DEFAULT_SHOP;
  appState.shopOrders = [];
  appState.scheduleNotice = {
    title: "Darslar boshlanishi haqida rasmiy e'lon",
    text: "Hurmatli o'quvchilar va ota-onalar! IT Park Qo'qon filiali (Noib ko'prigi MFY) darslari jadval bo'yicha o'z vaqtida bo'lib o'tadi. Sun'iy intellekt va kompyuter savodxonligi darslariga kechikmasdan kelishingiz so'raladi.",
    date: "Bugun",
    active: true
  };
  appState.leads = [];
  appState.videoLessons = DEFAULT_VIDEOS;
  appState.homeworkTasks = DEFAULT_TASKS;
  appState.homeworkSubmissions = DEFAULT_SUBMISSIONS;
  saveState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  if (window.CloudDB) {
    CloudDB.save(appState);
  }
}

function initStudentCloudSync() {
  if (!window.CloudDB) return;
  CloudDB.init({
    onData: (cloudData) => {
      if (cloudData && cloudData.students && cloudData.students.length > 0) {
        console.log("☁️ [Student] Bulutdan yangi ma'lumotlar sinxronizatsiya qilindi.");
        appState = {
          ...appState,
          ...cloudData,
          shopItems: Array.isArray(cloudData.shopItems) ? cloudData.shopItems : [],
          shopOrders: Array.isArray(cloudData.shopOrders) ? cloudData.shopOrders : [],
          leads: Array.isArray(cloudData.leads) ? cloudData.leads : [],
          scheduleAnnouncements: Array.isArray(cloudData.scheduleAnnouncements) ? cloudData.scheduleAnnouncements : [],
          homeworkSubmissions: Array.isArray(cloudData.homeworkSubmissions) ? cloudData.homeworkSubmissions : [],
          customGroups: Array.isArray(cloudData.customGroups) ? cloudData.customGroups : []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));

        // Agar o'quvchi kabinetida bo'lsa, balli va ma'lumotlarini jonli yangilaymiz
        if (currentStudentId) {
          const st = appState.students.find(s => s.id === currentStudentId);
          if (st) {
            renderStudentPortal(st);
            if (typeof renderSubTab === 'function' && currentStudentSubTab) {
              renderSubTab(currentStudentSubTab, st);
            }
          }
        }
      }
    },
    onStatus: (status) => {
      updateStudentCloudStatusUI(status);
    }
  });
}

function updateStudentCloudStatusUI(status) {
  const badgeGuest = document.getElementById('cloudStatusBadge');
  const badgeUser = document.getElementById('cloudUserStatusBadge');
  [badgeGuest, badgeUser].forEach(b => {
    if (b) {
      b.innerText = status.text || "☁️ Bulut";
      b.className = `cloud-status-badge ${status.connected ? 'online' : status.mode === 'warning' ? 'warning' : 'offline'}`;
    }
  });
}

function saveSession() {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ studentId: currentStudentId }));
}

function normalizeStudentIds(force = false) {
  if (!appState.students || appState.students.length === 0) return;

  const hasLongOrBadId = force || appState.students.some((s, idx) => {
    return typeof s.id !== 'number' || s.id > 100 || isNaN(s.id);
  });

  if (hasLongOrBadId) {
    const idMap = {};
    appState.students.forEach((s, idx) => {
      const oldId = s.id;
      const newId = idx + 1;
      idMap[oldId] = newId;
      s.id = newId;
    });

    if (appState.homeworkSubmissions && appState.homeworkSubmissions.length > 0) {
      appState.homeworkSubmissions.forEach(sub => {
        if (idMap[sub.studentId]) {
          sub.studentId = idMap[sub.studentId];
        }
      });
    }

    if (currentStudentId && idMap[currentStudentId]) {
      currentStudentId = idMap[currentStudentId];
      saveSession();
    }
  }
}

/* ========================================================
   AVATAR / MONOGRAM
   ======================================================== */
const PALETTES = [
  { bg1: '#4f46e5' }, { bg1: '#0891b2' }, { bg1: '#059669' }, { bg1: '#d97706' }, { bg1: '#7c3aed' }
];

function getStudentAvatar(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const initials = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const pal = PALETTES[Math.abs(hash) % PALETTES.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="26" fill="${pal.bg1}"/>
    <text x="50" y="62" font-size="36" font-weight="800" fill="#ffffff" text-anchor="middle" font-family="-apple-system, sans-serif">${initials}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/* ========================================================
   ROUTER: GUEST VS STUDENT
   ======================================================== */
function applyView() {
  const guestView = document.getElementById('viewGuestLanding');
  const studentView = document.getElementById('viewStudentPortal');
  const navGuest = document.getElementById('navGuestActions');
  const navUser = document.getElementById('navUserActions');

  renderGuestLanding();

  if (currentStudentId) {
    const st = appState.students.find(s => s.id === currentStudentId);
    if (st) {
      guestView.style.display = 'none';
      studentView.style.display = 'block';
      navGuest.style.display = 'none';
      navUser.style.display = 'flex';
      renderStudentPortal(st);
      return;
    }
  }

  // Mehmon rejimi
  guestView.style.display = 'block';
  studentView.style.display = 'none';
  navGuest.style.display = 'flex';
  navUser.style.display = 'none';
  renderGuestLanding();
}

/* ========================================================
   MEHMON SAHIFASI
   ======================================================== */
function renderGuestLanding() {
  const container = document.getElementById('guestCoursesGrid');
  if (!container) return;

  container.innerHTML = DEFAULT_COURSES.map(c => `
    <div class="course-card-box">
      <div style="font-size: 1.8rem; margin-bottom: 8px;">${c.icon}</div>
      <h3 style="font-size: 1.12rem; font-weight: 800; color: #0f172a; margin-bottom: 6px;">${c.title}</h3>
      <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5; margin-bottom: 14px;">${c.desc}</p>
      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
        ${c.tags.map(t => `<span class="course-tag-pill">#${t}</span>`).join('')}
      </div>
      <div class="course-footer-row">
        <div>
          <div style="font-size: 1rem; font-weight: 900; color: #0f172a;">${c.price}</div>
          <div style="font-size: 0.74rem; color: #64748b;">Davomiyligi: ${c.duration}</div>
        </div>
        <button class="btn-enroll-course" onclick="scrollToRegister('${c.title}')">
          Tanlash
        </button>
      </div>
    </div>
  `).join('');
}

function scrollToCourses() {
  const el = document.getElementById('guestCoursesGrid');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
  const el = document.getElementById('featuresSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToRegister(courseTitle = '') {
  if (courseTitle) {
    const sel = document.getElementById('regCourseSelect');
    if (sel) sel.value = courseTitle;
  }
  const el = document.getElementById('registerSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function submitGuestRegistration(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const course = document.getElementById('regCourseSelect').value;
  const time = document.getElementById('regTimeSelect').value;
  const branch = document.getElementById('regBranchSelect').value;

  if (!name || !phone) {
    showToast("Iltimos, ism va telefon raqamingizni kiriting!", "error");
    return;
  }

  const newLead = {
    id: Date.now(),
    name: name,
    phone: phone,
    course: course,
    time: time,
    branch: branch,
    date: "Bugun " + new Date().toLocaleTimeString().slice(0, 5),
    status: "Yangi"
  };

  appState.leads.unshift(newLead);
  saveState();

  document.getElementById('guestRegisterForm').reset();
  showToast(`Rahmat, ${name}! Bepul sinov darsi arizangiz qabul qilindi.`, "success");
}

/* ========================================================
   O'QUVCHI KIRISHI (STUDENT AUTH)
   ======================================================== */
function openStudentAuthModal() {
  const modal = document.getElementById('studentAuthModal');
  if (modal) modal.classList.add('active');
  const input = document.getElementById('studentLoginInput');
  if (input) {
    input.focus();
  }
}

function closeStudentAuthModal() {
  const modal = document.getElementById('studentAuthModal');
  if (modal) modal.classList.remove('active');
  const form = document.getElementById('formStudentLogin');
  if (form) form.reset();
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function submitStudentLogin(e) {
  if (e) e.preventDefault();
  const rawInput = document.getElementById('studentLoginInput')?.value.trim();
  const rawPin = document.getElementById('studentLoginPin')?.value.trim();

  if (!rawInput) {
    showToast("Iltimos, telefon raqamingiz yoki ID raqamingizni kiriting!", "error");
    return;
  }
  if (!rawPin) {
    showToast("Iltimos, maxfiy parolingizni (PIN-kod) kiriting!", "error");
    return;
  }

  // Raqamli tozalash (telefon yoki ID uchun)
  const cleanDigits = rawInput.replace(/\D/g, '');

  const matched = appState.students.find(s => {
    // 1. ID bo'yicha qat'iy tekshirish
    if (String(s.id) === rawInput || `id:${s.id}` === rawInput.toLowerCase().replace(/\s+/g, '')) {
      return true;
    }
    // 2. Telefon raqami bo'yicha tekshirish (oxirgi 7 yoki 9 ta raqam mosligi)
    if (cleanDigits.length >= 7) {
      const sPhoneDigits = (s.phone || '').replace(/\D/g, '');
      if (sPhoneDigits.endsWith(cleanDigits) || cleanDigits.endsWith(sPhoneDigits)) {
        return true;
      }
    }
    // 3. To'liq ism familiyasi bo'yicha
    if (s.name.toLowerCase().trim() === rawInput.toLowerCase().trim()) {
      return true;
    }
    return false;
  });

  if (!matched) {
    showToast("Bunday o'quvchi topilmadi! Telefon raqam yoki ID'ni to'g'ri kiriting.", "error");
    return;
  }

  const expectedPin = String(matched.pin || "1234").trim();
  if (rawPin !== expectedPin) {
    showToast("Maxfiy parol (PIN) noto'g'ri! Iltimos, qaytadan tekshirib yozing.", "error");
    return;
  }

  currentStudentId = matched.id;
  saveSession();
  closeStudentAuthModal();
  applyView();
  showToast(`Xush kelibsiz, ${matched.name}!`, "success");
}

function studentLogout() {
  currentStudentId = null;
  saveSession();
  applyView();
  showToast("Tizimdan chiqildi.", "info");
}

/* ========================================================
   PAROLNI O'ZGARTIRISH (TALABA KABINETIDA)
   ======================================================== */
function openChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.add('active');
    document.getElementById('oldPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('confirmPasswordInput').value = '';
    document.getElementById('oldPasswordInput').focus();
  }
}

function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) modal.classList.remove('active');
}

function submitChangePassword(e) {
  if (e) e.preventDefault();
  if (!currentStudentId) return;

  const st = appState.students.find(s => s.id === currentStudentId);
  if (!st) return;

  const oldPass = document.getElementById('oldPasswordInput')?.value.trim();
  const newPass = document.getElementById('newPasswordInput')?.value.trim();
  const confirmPass = document.getElementById('confirmPasswordInput')?.value.trim();

  const currentPin = String(st.pin || "1234").trim();
  if (oldPass !== currentPin) {
    showToast("Amaldagi (eski) parolingiz noto'g'ri kiritildi!", "error");
    return;
  }

  if (!newPass || newPass.length < 4) {
    showToast("Yangi parol kamida 4 ta belgidan iborat bo'lishi shart!", "error");
    return;
  }

  if (newPass !== confirmPass) {
    showToast("Yangi kiritilgan parollar bir-biriga mos kelmadi!", "error");
    return;
  }

  st.pin = newPass;
  saveState();
  closeChangePasswordModal();
  showToast("Maxfiy parolingiz muvaffaqiyatli o'zgartirildi!", "success");
}

/* ========================================================
   O'QUVCHI PORTALI
   ======================================================== */
let currentSubTab = 'schedule';

function renderStudentPortal(st) {
  document.getElementById('stHeaderName').innerText = st.name;
  document.getElementById('stHeaderGroup').innerText = st.group;
  const idEl = document.getElementById('stHeaderId');
  if (idEl) idEl.innerText = `ID: #${st.id}`;
  document.getElementById('stHeaderXp').innerText = `⭐ ${st.xp} XP`;
  document.getElementById('stHeaderAvatar').src = getStudentAvatar(st.name);

  setStudentSubTab(currentSubTab);
}

function setStudentSubTab(tab) {
  currentSubTab = tab;
  document.querySelectorAll('#studentSubTabsBar .sub-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-subtab') === tab);
  });

  const st = appState.students.find(s => s.id === currentStudentId) || appState.students[0];

  document.getElementById('stContentSchedule').style.display = tab === 'schedule' ? 'block' : 'none';
  document.getElementById('stContentVideos').style.display = tab === 'videos' ? 'block' : 'none';
  document.getElementById('stContentHomework').style.display = tab === 'homework' ? 'block' : 'none';
  document.getElementById('stContentLeaderboard').style.display = tab === 'leaderboard' ? 'block' : 'none';
  document.getElementById('stContentShop').style.display = tab === 'shop' ? 'block' : 'none';
  const idCardEl = document.getElementById('stContentIdCard');
  if (idCardEl) idCardEl.style.display = tab === 'idcard' ? 'block' : 'none';

  if (tab === 'schedule') renderSchedule(st);
  if (tab === 'videos') renderVideos();
  if (tab === 'homework') renderHomework(st);
  if (tab === 'leaderboard') renderLeaderboard(st);
  if (tab === 'shop') renderShop(st);
  if (tab === 'idcard') renderIdCard(st);
}

function renderSchedule(st) {
  const container = document.getElementById('stScheduleBox');
  if (!container) return;

  const defaultDays = (st.group && (st.group.includes('Du') || st.group.includes('5-Guruh')))
    ? "Dushanba / Chorshanba / Juma"
    : "Seshanba / Payshanba / Shanba";
  const days = st.days || defaultDays;
  const defaultTime = st.group && st.group.includes('15:00') ? "15:00 - 17:00" : (st.group && st.group.includes('17:00') ? "17:00 - 19:00" : "10:00 - 12:00");
  const time = st.time || defaultTime;
  const defaultRoom = st.group && st.group.includes('1-Guruh') ? "302-xona (Turing Lab)" : "204-xona (Ada Lovelace)";
  const room = st.room || defaultRoom;
  const teacher = st.group && st.group.includes('1-Guruh') ? "Sanjarbek Rustamov" : "Rustam Qodirov";

  // Guruhga mos e'lonlarni saralash (faqat aytilgan guruhlarga ko'rinadi)
  const allAnnouncements = appState.scheduleAnnouncements || (appState.scheduleNotice ? [appState.scheduleNotice] : []);
  const visibleAnnouncements = allAnnouncements.filter(a => {
    if (!a || a.active === false || !a.text) return false;
    if (!a.targetGroup || a.targetGroup === 'ALL') return true;
    return a.targetGroup === st.group;
  });

  const noticeHtml = visibleAnnouncements.map(a => `
    <div class="schedule-announcement-banner">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
        <div class="announcement-badge">
          📢 ${a.targetGroup === 'ALL' || !a.targetGroup ? "Rasmiy E'lon (Barcha Guruhlar)" : "E'lon: " + a.targetGroup}
        </div>
        <span style="font-size: 0.74rem; color: #4338ca; font-weight: 700;">🕒 ${a.date || 'Bugun'}</span>
      </div>
      <h4 class="announcement-title">${a.title || "Dars jadvali e'loni"}</h4>
      <p class="announcement-text">${a.text}</p>
      <div class="announcement-meta">📍 IT Park Qo'qon (Noib ko'prigi MFY) • 🎯 Guruhingiz: <b>${st.group}</b></div>
    </div>
  `).join('');

  container.innerHTML = `
    ${noticeHtml}
    <div class="schedule-view-card">
      <div class="schedule-header-flex">
        <div>
          <span class="slot-time-badge">${st.group} (${time})</span>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-top: 4px;">📅 ${days}</h3>
        </div>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 800; color: #059669;">
          🕒 ${time} • ${room}
        </div>
      </div>

      <div class="schedule-day-row">
        <div class="schedule-slot-box today-active">
          <span class="slot-time-badge">Asosiy Dars</span>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">Amaliy Dasturlash Mashg'uloti</h4>
          <div class="slot-room-info">🏢 <strong>Xona:</strong> ${room}</div>
          <div class="slot-room-info">👨‍🏫 <strong>O'qituvchi:</strong> ${teacher}</div>
        </div>

        <div class="schedule-slot-box">
          <span class="slot-time-badge">Amaliyot & Konsultatsiya</span>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">Mustaqil Kod Yozish Zali</h4>
          <div class="slot-room-info">🏢 <strong>Xona:</strong> Coworking Hub (2-qavat)</div>
          <div class="slot-room-info">💡 <strong>Mentor:</strong> Navbatchi dasturchi</div>
        </div>
      </div>
    </div>
  `;
}

function renderVideos() {
  const container = document.getElementById('stVideosBox');
  if (!container) return;

  container.innerHTML = appState.videoLessons.map(v => `
    <div class="video-lesson-card">
      <div class="video-thumb-container">
        <div class="btn-play-trigger" onclick="openVideoModal(${v.id})">▶</div>
        <span class="video-duration-pill">⏱️ ${v.duration}</span>
      </div>
      <div class="video-body-wrap">
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${v.title}</h4>
          <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4; margin-bottom: 8px;">${v.summary}</p>
        </div>
        <div style="border-top: 1px solid #f1f5f9; padding-top: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.76rem; color: #64748b;">👨‍🏫 ${v.teacher}</span>
          <button class="btn-sm-action" onclick="openVideoModal(${v.id})">Ko'rish</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openVideoModal(id) {
  const v = appState.videoLessons.find(item => item.id === id);
  if (!v) return;

  document.getElementById('videoModalTitle').innerText = v.title;
  document.getElementById('videoModalTeacher').innerText = `O'qituvchi: ${v.teacher} | ${v.duration}`;
  document.getElementById('videoModalSummary').innerText = v.summary;
  document.getElementById('videoModalNotes').innerText = v.notes;
  document.getElementById('videoIframe').src = v.url;

  document.getElementById('videoPlayerModal').classList.add('active');
}

function closeVideoModal() {
  document.getElementById('videoIframe').src = "";
  document.getElementById('videoPlayerModal').classList.remove('active');
}

function renderHomework(st) {
  // 1. O'qituvchi e'lon qilgan faol vazifalar ro'yxati va select'ni to'ldirish
  const tasks = (appState.homeworkTasks && appState.homeworkTasks.length > 0) ? appState.homeworkTasks : DEFAULT_TASKS;
  const applicableTasks = tasks.filter(t => t.group === 'ALL' || t.group === st.group);

  const activeBox = document.getElementById('stActiveTasksBox');
  if (activeBox) {
    if (applicableTasks.length === 0) {
      activeBox.innerHTML = `<div style="color:#94a3b8; font-size:0.85rem; padding: 12px; background: #f8fafc; border-radius: 10px;">Hozircha guruhingiz uchun yangi vazifalar e'lon qilinmagan.</div>`;
    } else {
      activeBox.innerHTML = applicableTasks.map(t => `
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
            <strong style="color: #0f172a; font-size: 0.95rem;">${t.title}</strong>
            <span style="background: #eef2ff; color: #4f46e5; font-weight: 800; font-size: 0.78rem; padding: 2px 8px; border-radius: 6px;">+${t.xp} XP</span>
          </div>
          <p style="font-size: 0.82rem; color: #64748b; line-height: 1.4; margin: 0;">${t.desc || 'Amaliy vazifa'}</p>
        </div>
      `).join('');
    }
  }

  const select = document.getElementById('hwTaskSelect');
  if (select) {
    select.innerHTML = applicableTasks.map(t => `
      <option value="${t.title}">${t.title} (+${t.xp} XP)</option>
    `).join('');
  }

  // 2. Topshirilgan vazifalar tarixi
  const container = document.getElementById('stHomeworkHistory');
  if (!container) return;

  const subs = appState.homeworkSubmissions.filter(s => s.studentId === st.id);
  if (subs.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 20px;">Hozircha topshirilgan vazifalar yo'q.</div>`;
  } else {
    container.innerHTML = subs.map(s => `
      <div class="hw-assignment-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">${s.taskTitle}</h4>
          <span class="hw-status-badge ${s.status}">
            ${s.status === 'graded' ? `✅ Baholandi (+${s.score} XP)` : '⏳ Tekshirilmoqda'}
          </span>
        </div>
        <p style="font-size: 0.82rem; color: #475569; margin-bottom: 4px;"><strong>Yechim:</strong> ${s.note}</p>
        <p style="font-size: 0.8rem; margin-bottom: 6px;">
          🔗 <a href="${s.url}" target="_blank" style="color: #2563eb;">${s.url}</a>
        </p>
        ${s.feedback ? `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px 12px; border-radius: 10px; font-size: 0.8rem; color: #166534;">
            👨‍🏫 <strong>Ustoz xulosasi:</strong> "${s.feedback}"
          </div>
        ` : ''}
      </div>
    `).join('');
  }
}

function submitHomeworkForm(e) {
  if (e) e.preventDefault();
  const st = appState.students.find(s => s.id === currentStudentId);
  if (!st) return;

  const task = document.getElementById('hwTaskSelect').value;
  const link = document.getElementById('hwLinkInput').value.trim();
  const note = document.getElementById('hwNoteInput').value.trim();

  if (!link && !note) {
    showToast("Iltimos, havola yoki yechim matnini yozing!", "error");
    return;
  }

  appState.homeworkSubmissions.unshift({
    id: Date.now(),
    studentId: st.id,
    studentName: st.name,
    taskTitle: task,
    url: link || "https://github.com",
    note: note || "Vazifa topshirildi",
    status: "pending",
    score: null,
    feedback: null,
    date: "Bugun"
  });

  saveState();
  document.getElementById('hwSubmitForm').reset();
  showToast("Vazifangiz qabul qilindi! O'qituvchi tekshirib ball qo'yadi.", "success");
  renderHomework(st);
}

function renderLeaderboard(currentStudent) {
  const container = document.getElementById('stLeaderboardBox');
  if (!container) return;

  const sorted = [...appState.students].sort((a, b) => b.xp - a.xp);
  const myRank = sorted.findIndex(s => s.id === currentStudent.id) + 1;

  container.innerHTML = `
    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 16px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 0.82rem; color: #64748b; font-weight: 700;">Sizning o'rningiz:</div>
        <div style="font-size: 1.25rem; font-weight: 900; color: #4f46e5;">#${myRank} — ${currentStudent.name}</div>
      </div>
      <div style="font-size: 1.15rem; font-weight: 900; color: #0f172a;">
        ⭐ ${currentStudent.xp} XP
      </div>
    </div>

    <div class="leaderboard-list">
      ${sorted.map((s, idx) => `
        <div class="leader-row ${s.id === currentStudent.id ? 'current-user-row' : ''}">
          <div class="leader-rank">${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}</div>
          <div class="leader-avatar">
            <img src="${getStudentAvatar(s.name)}" alt="">
          </div>
          <div class="leader-info">
            <div class="leader-name">${s.name}</div>
            <div class="leader-group">${s.group}</div>
          </div>
          <div class="leader-xp">
            <span class="xp-val">${s.xp}</span>
            <span class="xp-lbl">XP</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderShop(st) {
  const container = document.getElementById('stShopBox');
  if (!container) return;

  const myOrders = (appState.shopOrders || []).filter(o => o.studentId === st.id);

  container.innerHTML = `
    <div style="margin-bottom: 14px; font-size: 0.95rem; font-weight: 800; color: #0f172a;">
      Mavjud balansingiz: <span style="color: #4f46e5;">⭐ ${st.xp} XP</span>
    </div>
    
    <div class="shop-grid">
      ${appState.shopItems.map(item => `
        <div class="shop-card">
          <div class="shop-emoji">${item.emoji}</div>
          <h4 class="shop-title">${item.name}</h4>
          <p class="shop-desc">${item.desc}</p>
          <div class="shop-price-row">
            <div class="shop-price">⭐ ${item.xp} XP</div>
            <button class="btn-buy ${st.xp >= item.xp ? 'active' : 'disabled'}" onclick="buyShopItem(${item.id})">
              ${st.xp >= item.xp ? 'Olish' : 'Yetarli emas'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- O'quvchi Buyurtmalari Tarixi -->
    <div style="margin-top: 36px; border-top: 1.5px solid #e2e8f0; padding-top: 22px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0;">
          📦 Mening Buyurtmalarim (Sovg'alar tarixi)
        </h4>
        <small style="color: #64748b; font-size: 0.78rem;">Admin mahsulotni topshirganda "Berildi" deb belgilanadi</small>
      </div>

      ${myOrders.length === 0 ? `
        <div style="text-align: center; color: #94a3b8; padding: 22px; background: #f8fafc; border: 1.5px dashed #e2e8f0; border-radius: 14px; font-size: 0.88rem;">
          Hozircha hech qanday sovg'a buyurtma qilmagansiz. Ballaringiz evaziga yuqoridagi do'kondan sovg'a tanlang!
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${myOrders.map(o => `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.6rem;">${o.itemEmoji || '🎁'}</span>
                <div>
                  <strong style="font-size: 0.95rem; color: #0f172a; display: block;">${o.itemName}</strong>
                  <small style="color: #64748b; font-size: 0.76rem;">Buyurtma vaqti: ${o.date} • ⭐ ${o.itemXp} XP</small>
                </div>
              </div>
              <div>
                ${o.status === 'delivered' ? `
                  <span class="order-status-badge delivered">✅ Berildi (Topshirildi)</span>
                ` : `
                  <span class="order-status-badge pending">⏳ Berilmagan (Kutilmoqda)</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function buyShopItem(id) {
  const st = appState.students.find(s => s.id === currentStudentId);
  const item = appState.shopItems.find(i => i.id === id);
  if (!st || !item) return;

  if (st.xp < item.xp) {
    showToast("Balingiz yetarli emas!", "error");
    return;
  }

  st.xp -= item.xp;
  st.rewards = (st.rewards || 0) + 1;

  if (!appState.shopOrders) appState.shopOrders = [];
  const newOrder = {
    id: Date.now(),
    studentId: st.id,
    studentName: st.name,
    studentGroup: st.group,
    studentPhone: st.phone || '',
    itemId: item.id,
    itemName: item.name,
    itemEmoji: item.emoji,
    itemXp: item.xp,
    date: "Bugun " + new Date().toLocaleTimeString().slice(0, 5),
    status: 'pending' // 'pending' (Berilmagan) or 'delivered' (Berildi)
  };
  appState.shopOrders.unshift(newOrder);

  saveState();
  const xpBadge = document.getElementById('stHeaderXp');
  if (xpBadge) xpBadge.innerText = `⭐ ${st.xp} XP`;
  showToast(`"${item.name}" buyurtma qilindi! Administrator darsda topshiradi.`, "success");
  renderShop(st);
}

/* ========================================================
   O'QUVCHI GUVOHNOMASI (ID CARD / BADGE)
   ======================================================== */
function renderIdCard(st) {
  const container = document.getElementById('stIdCardBox');
  if (!container) return;

  const defaultDays = (st.group && (st.group.includes('Du') || st.group.includes('5-Guruh')))
    ? "Dushanba / Chorshanba / Juma"
    : "Seshanba / Payshanba / Shanba";
  const days = st.days || defaultDays;
  const defaultTime = st.group && st.group.includes('15:00') ? "15:00 - 17:00" : (st.group && st.group.includes('17:00') ? "17:00 - 19:00" : "10:00 - 12:00");
  const time = st.time || defaultTime;
  const defaultRoom = st.group && st.group.includes('1-Guruh') ? "302-xona (Turing Lab)" : "204-xona (Ada Lovelace)";
  const room = st.room || defaultRoom;

  container.innerHTML = `
    <div class="id-card-container">
      <div class="id-card-wrapper" id="stIdCardBadge">
        <div class="id-card-header">
          <div class="id-card-logo-wrap">
            <div class="id-card-logo">IT</div>
            <div>
              <div class="id-card-inst">O'ZBEKISTON RESPUBLIKASI • IT PARK ACADEMY</div>
              <div class="id-card-branch">QO'QON FILIALI — NOIB KO'PRIGI MFY</div>
            </div>
          </div>
          <div class="id-card-chip">
            <span class="chip-hologram">GUVOHNOMA</span>
          </div>
        </div>

        <div class="id-card-body">
          <div class="id-card-photo-col">
            <div class="id-card-avatar">
              <img src="${getStudentAvatar(st.name)}" alt="${st.name}">
            </div>
            <div class="id-card-status-pill">🟢 FAOL O'QUVCHI</div>
            <div class="id-card-num">#DEV-${String(st.id).padStart(3, '0')}</div>
          </div>

          <div class="id-card-info-col">
            <div class="id-field">
              <span class="id-label">O'quvchi F.I.SH:</span>
              <strong class="id-value-name">${st.name}</strong>
            </div>
            <div class="id-field">
              <span class="id-label">Ta'lim Yo'nalishi:</span>
              <span class="id-value" style="color: #67e8f9;">Kompyuter Savodxonligi (0 dan) & Sun'iy Intellekt (AI)</span>
            </div>
            <div class="id-grid-two">
              <div class="id-field">
                <span class="id-label">Guruh:</span>
                <span class="id-value">${st.group}</span>
              </div>
              <div class="id-field">
                <span class="id-label">Dars Kunlari:</span>
                <span class="id-value">${days}</span>
              </div>
            </div>
            <div class="id-grid-two">
              <div class="id-field">
                <span class="id-label">Dars Vaqti:</span>
                <span class="id-value">${time}</span>
              </div>
              <div class="id-field">
                <span class="id-label">Xona:</span>
                <span class="id-value">${room}</span>
              </div>
            </div>
            <div class="id-field">
              <span class="id-label">Filial & Joylashuv:</span>
              <span class="id-value">Qo'qon shahar, Noib ko'prigi MFY</span>
            </div>
          </div>
        </div>

        <div class="id-card-footer">
          <div class="id-card-barcode">
            <div class="barcode-lines"></div>
            <span class="barcode-num">*IT-PARK-QOQON-${String(st.id).padStart(4, '0')}*</span>
          </div>
          <div class="id-card-seal">
            <span>★ IT PARK ACADEMY ★</span>
            <small>TASDIQLANGAN GUVOHNOMA</small>
          </div>
        </div>
      </div>

      <div class="id-card-actions">
        <button class="btn-primary" onclick="printStudentIdCard()" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-weight: 800; font-size: 0.95rem;">
          🖨️ Guvohnomani Chop Etish / PDF Saqlash
        </button>
      </div>
    </div>
  `;
}

function printStudentIdCard() {
  window.print();
}

/* ========================================================
   INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateLanguageUI();
  applyView();
});
