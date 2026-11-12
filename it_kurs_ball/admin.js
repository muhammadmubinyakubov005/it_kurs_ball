/* ========================================================
   IT PARK ACADEMY — ADMINISTRATOR & O'QITUVCHI BOSHQARUVI (ADMIN.JS)
   ======================================================== */

const STORAGE_KEY = 'IT_PARK_OFFICIAL_STUDENTS_V2';
const ADMIN_SESSION_KEY = 'IT_PARK_ADMIN_AUTH';

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

const DEFAULT_VIDEOS = [
  { id: 1, title: "1-Dars: HTML5 Semantikasi va Hujjat Strukturasi", duration: "48 daqiqa", teacher: "Muhammadmubin Yakubov", url: "https://www.youtube.com/embed/qz0aGYrrlhU", summary: "Web sahifa teglari, semantik tuzilma, qidiruv tizimlari (SEO) uchun optimizatsiya.", notes: "Semantik teglardan foydalanish brauzerlar va qidiruv tizimlari uchun standart hisoblanadi." },
  { id: 2, title: "2-Dars: CSS Flexbox va Grid Asoslari", duration: "55 daqiqa", teacher: "Muhammadmubin Yakubov", url: "https://www.youtube.com/embed/JJSoEo8JSnc", summary: "Moslashuvchan layoutlar qurish, elementlarni tekislash va ekran o'lchamlari bo'yicha moslashtirish.", notes: "Flexbox bir o'lchamli qatorlar, Grid esa ikki o'lchamli joylashuvlar uchun qulay." },
  { id: 3, title: "3-Dars: JavaScript DOM va Hodisalar bilan Ishlash", duration: "1 soat 10 min", teacher: "Muhammadmubin Yakubov", url: "https://www.youtube.com/embed/hdI2bqOjy3c", summary: "querySelector, event listeners, dinamik elementlar yaratish va forma ma'lumotlarini o'qish.", notes: "Hodisalar foydalanuvchi harakatlarini interaktiv qayta ishlash imkonini beradi." },
  { id: 4, title: "4-Dars: Python Funksiyalar va Ma'lumotlar Tuzilmalari", duration: "1 soat 05 min", teacher: "Muhammadmubin Yakubov", url: "https://www.youtube.com/embed/kqtD5dpn9C8", summary: "Funksiyalar yaratish, argumentlar, return qiymati, ro'yxat va lug'atlar bilan ishlash.", notes: "Funksiyalar kodni qisqartirish va qayta ishlatish uchun asosiy vositadir." }
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

let isAdminAuth = false;

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

const DEFAULT_SHOP = [
  { id: 1, emoji: "🚀", name: "Cyber IT Stikerlar Paketi", desc: "Noutbuk va telefon uchun 10 ta yaltiroq 3D stiker", xp: 45 },
  { id: 2, emoji: "🍫", name: "Miya Quvvati Shokoladi", desc: "Darsda diqqatni oshiruvchi mazali KitKat & Snack", xp: 75 },
  { id: 3, emoji: "🎮", name: "1 Soat Erkin Game Time", desc: "Dars yakunida do'stlar bilan IT o'yin o'ynash huquqi", xp: 130 },
  { id: 4, emoji: "👕", name: "Code Master Futbolkasi", desc: "Maxsus yosh dasturchi brendli sifatli futbolka", xp: 320 },
  { id: 5, emoji: "🎧", name: "RGB Gaming Quloqchin", desc: "Kod yozish va musiqa uchun ajoyib quloqchin", xp: 480 },
  { id: 6, emoji: "☕", name: "Senior Developer Krujkasi", desc: "Kodli motivatsion termo krujka", xp: 200 }
];

function loadAdminState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState = JSON.parse(saved);
      if (!appState.students || appState.students.length === 0) {
        appState.students = DEFAULT_STUDENTS;
      } else {
        appState.students = appState.students.map(s => ({
          ...s,
          pin: s.pin || "1234"
        }));
      }
      appState.shopItems = Array.isArray(appState.shopItems) ? appState.shopItems : DEFAULT_SHOP;
      appState.shopOrders = appState.shopOrders || [];
      appState.scheduleNotice = appState.scheduleNotice || {
        title: "Darslar boshlanishi haqida rasmiy e'lon",
        text: "Hurmatli o'quvchilar va ota-onalar! IT Park Qo'qon filiali (Noib ko'prigi MFY) darslari jadval bo'yicha o'z vaqtida bo'lib o'tadi. Sun'iy intellekt va kompyuter savodxonligi darslariga kechikmasdan kelishingiz so'raladi.",
        date: "Bugun",
        active: true
      };
      appState.scheduleAnnouncements = appState.scheduleAnnouncements || (appState.scheduleNotice ? [appState.scheduleNotice] : []);
      appState.videoLessons = Array.isArray(appState.videoLessons) ? appState.videoLessons : DEFAULT_VIDEOS;
      appState.homeworkTasks = Array.isArray(appState.homeworkTasks) ? appState.homeworkTasks : DEFAULT_TASKS;
    } catch (e) {
      console.error(e);
      appState.students = DEFAULT_STUDENTS;
      appState.shopItems = DEFAULT_SHOP;
      appState.shopOrders = [];
      appState.videoLessons = DEFAULT_VIDEOS;
      appState.homeworkTasks = DEFAULT_TASKS;
    }
  } else {
    appState.students = DEFAULT_STUDENTS;
    appState.shopItems = DEFAULT_SHOP;
    appState.shopOrders = [];
    appState.videoLessons = DEFAULT_VIDEOS;
    appState.homeworkTasks = DEFAULT_TASKS;
  }

  normalizeStudentIds();
  saveAdminState();

  // Markaziy bulutli baza bilan sinxronizatsiya
  initAdminCloudSync();

  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (session === 'true') {
    isAdminAuth = true;
  }
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
    saveAdminState();
  }
}

function forceRestoreOfficialPoints() {
  if (confirm("Barcha 22 ta o'quvchining ballarini haqiqiy rasmiy holatiga (eng balandi 85 XP, Sadikov 75 XP, Yusupov 75 XP, Madina 50 XP...) qaytarishni tasdiqlaysizmi?")) {
    syncOfficialStudentPoints(true);
    renderPoints();
    if (typeof renderAttendance === 'function') renderAttendance();
    showToast("Barcha o'quvchilarning rasmiy ballari to'liq tiklandi (eng balandi: 85 XP)!", "success");
  }
}

function getNextSequentialId() {
  const existingIds = new Set((appState.students || []).map(s => s.id));
  let id = 1;
  while (existingIds.has(id)) {
    id++;
  }
  return id;
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
  }
}

function reindexAllStudentIds() {
  if (!confirm("Barcha o'quvchilar ID raqamlari 1 dan boshlab ketma-ketlikda (1, 2, 3...) qayta tartiblansinmi?")) return;
  normalizeStudentIds(true);
  saveAdminState();
  renderPoints();
  if (typeof renderAttendance === 'function') renderAttendance();
  showToast(`Barcha o'quvchilar ID raqami 1 dan ${appState.students.length} gacha ketma-ket qilib tartiblandi!`, "success");
}

function saveAdminState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  if (window.CloudDB) {
    CloudDB.save(appState);
  }
}

function checkAdminAuth() {
  const loginBox = document.getElementById('adminLoginSection');
  const dashboard = document.getElementById('adminDashboardSection');

  if (isAdminAuth) {
    loginBox.style.display = 'none';
    dashboard.style.display = 'block';
    renderAdminPortal();
  } else {
    loginBox.style.display = 'flex';
    dashboard.style.display = 'none';
  }
}

const ADMIN_PASS_SHA256 = '3ca6970869fa261fc682c67ac6177ad3cbb7854dab2738c93583c74cbeeff0b5';

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function submitAdminLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById('adminUsername').value.trim();
  const pass = document.getElementById('adminPassword').value.trim();
  const passHash = (window.crypto && window.crypto.subtle) ? await sha256Hex(pass) : '';

  if (user === 'admin' && passHash === ADMIN_PASS_SHA256) {
    isAdminAuth = true;
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    checkAdminAuth();
    showToast("Xush kelibsiz, Administrator!", "success");
  } else {
    showToast("Login yoki parol noto'g'ri!", "error");
  }
}

function adminLogout() {
  isAdminAuth = false;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  checkAdminAuth();
  showToast("Administrator tizimidan chiqildi.", "info");
}

/* ========================================================
   SUB-TABS MANAGEMENT
   ======================================================== */
let activeTab = 'leads';

function switchAdminTab(tab) {
  activeTab = tab;
  document.querySelectorAll('#adminSubTabs .sub-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });

  document.getElementById('secLeads').style.display = tab === 'leads' ? 'block' : 'none';
  document.getElementById('secAttendance').style.display = tab === 'attendance' ? 'block' : 'none';
  document.getElementById('secHomework').style.display = tab === 'homework' ? 'block' : 'none';
  document.getElementById('secContent').style.display = tab === 'content' ? 'block' : 'none';
  const secShop = document.getElementById('secShop');
  if (secShop) secShop.style.display = tab === 'shop' ? 'block' : 'none';
  document.getElementById('secPoints').style.display = tab === 'points' ? 'block' : 'none';
  const secCloud = document.getElementById('secCloud');
  if (secCloud) secCloud.style.display = tab === 'cloud' ? 'block' : 'none';

  if (tab === 'leads') renderLeads();
  if (tab === 'attendance') renderAttendance();
  if (tab === 'homework') renderHomeworkReview();
  if (tab === 'content') renderContentManager();
  if (tab === 'shop') renderAdminShop();
  if (tab === 'points') renderPoints();
  if (tab === 'cloud') renderCloudTab();
}

function renderAdminPortal() {
  switchAdminTab(activeTab);
}

/* ========================================================
   1. ARIZALAR CRM
   ======================================================== */
function renderLeads() {
  const tbody = document.getElementById('leadsTableBody');
  if (!tbody) return;

  const searchQuery = (document.getElementById('searchLeadsInput')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('filterLeadStatus')?.value || 'ALL';

  let leads = appState.leads || [];
  document.getElementById('statTotalLeads').innerText = leads.length;
  document.getElementById('statNewLeads').innerText = leads.filter(l => l.status === 'Yangi').length;
  document.getElementById('statContactedLeads').innerText = leads.filter(l => l.status === "Bog'lanildi").length;
  document.getElementById('statEnrolledLeads').innerText = leads.filter(l => l.status === 'Darsga keldi').length;

  if (statusFilter !== 'ALL') {
    leads = leads.filter(l => l.status === statusFilter);
  }
  if (searchQuery) {
    leads = leads.filter(l => 
      (l.name && l.name.toLowerCase().includes(searchQuery)) ||
      (l.phone && l.phone.includes(searchQuery)) ||
      (l.course && l.course.toLowerCase().includes(searchQuery))
    );
  }

  if (leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 24px;">Arizalar topilmadi.</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(l => `
    <tr>
      <td><strong>${highlightMatch(l.name, searchQuery)}</strong></td>
      <td><a href="tel:${l.phone}" style="color: #2563eb; font-weight: 700; text-decoration: none;">📞 ${l.phone}</a></td>
      <td><span class="course-tag-pill">${l.course}</span></td>
      <td>${l.time}</td>
      <td>${l.branch || 'Markaziy'}</td>
      <td>
        <select class="lead-status-pill ${l.status.toLowerCase().replace(/['\s]/g, '')}" onchange="changeLeadStatus(${l.id}, this.value)" style="border:none; cursor:pointer;">
          <option value="Yangi" ${l.status === 'Yangi' ? 'selected' : ''}>Yangi</option>
          <option value="Bog'lanildi" ${l.status === "Bog'lanildi" ? 'selected' : ''}>Bog'lanildi</option>
          <option value="Darsga keldi" ${l.status === 'Darsga keldi' ? 'selected' : ''}>Darsga keldi</option>
          <option value="Bekor qilindi" ${l.status === 'Bekor qilindi' ? 'selected' : ''}>Bekor qilindi</option>
        </select>
      </td>
      <td>
        <button class="btn-sm-action" onclick="convertLeadToStudent(${l.id})">🎓 + Guruhga qo'shish</button>
      </td>
    </tr>
  `).join('');
}

function changeLeadStatus(id, newStatus) {
  const l = (appState.leads || []).find(item => item.id === id);
  if (l) {
    l.status = newStatus;
    saveAdminState();
    renderLeads();
    showToast(`Ariza holati "${newStatus}"ga o'zgartirildi.`, "info");
  }
}

function convertLeadToStudent(id) {
  const l = (appState.leads || []).find(item => item.id === id);
  if (!l) return;

  const group = prompt(`"${l.name}" o'quvchisi qaysi guruhga qo'shilsin?`, "1-Guruh (10:00)");
  if (!group) return;

  const newId = getNextSequentialId();
  appState.students.push({
    id: newId,
    name: l.name,
    group: group,
    xp: 20,
    tasks: 0,
    rewards: 0,
    streak: 1,
    phone: l.phone,
    pin: "1234",
    paymentStatus: "paid",
    attendance: "present"
  });

  l.status = "Darsga keldi";
  saveAdminState();
  renderLeads();
  showToast(`"${l.name}" muvaffaqiyatli ${group} guruhiga qo'shildi!`, "success");
}

/* ========================================================
   2. DAVOMAT VA TO'LOVLAR
   ======================================================== */
function renderAttendance() {
  const tbody = document.getElementById('attTableBody');
  if (!tbody) return;

  const searchQuery = (document.getElementById('searchAttendanceStudent')?.value || '').toLowerCase().trim();
  const grpFilter = document.getElementById('filterGroup')?.value || 'ALL';
  const payFilter = document.getElementById('filterPayment')?.value || 'ALL';

  let list = [...appState.students];

  document.getElementById('statAttPaid').innerText = appState.students.filter(s => s.paymentStatus === 'paid').length;
  document.getElementById('statAttPending').innerText = appState.students.filter(s => s.paymentStatus === 'pending').length;
  document.getElementById('statAttOverdue').innerText = appState.students.filter(s => s.paymentStatus === 'overdue').length;

  if (grpFilter !== 'ALL') list = list.filter(s => s.group === grpFilter);
  if (payFilter !== 'ALL') list = list.filter(s => s.paymentStatus === payFilter);
  if (searchQuery) {
    list = list.filter(s => {
      const idStr = String(s.id);
      const devCode = `dev-${idStr}`;
      const fullDev = `#dev-${idStr.padStart(3, '0')}`.toLowerCase();
      const idMatch = idStr === searchQuery || devCode.includes(searchQuery) || fullDev.includes(searchQuery);
      const nameMatch = s.name.toLowerCase().includes(searchQuery);
      const phoneMatch = (s.phone || '').replace(/\s+/g, '').includes(searchQuery.replace(/\s+/g, ''));
      return idMatch || nameMatch || phoneMatch;
    });
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 24px;">Qidiruv bo'yicha o'quvchi topilmadi.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(s => `
    <tr>
      <td><span style="font-family:'JetBrains Mono'; font-weight:800; color:#4f46e5;">#DEV-${String(s.id).padStart(3, '0')}</span></td>
      <td><strong>${highlightMatch(s.name, searchQuery)}</strong></td>
      <td>
        <span class="course-tag-pill">${s.group}</span>
        <div style="font-size:0.75rem; color:#64748b; margin-top:3px; font-weight:600;">
          📅 ${s.days || (s.group && (s.group.includes('Du') || s.group.includes('5-Guruh')) ? 'Dush/Chor/Juma' : 'Sesh/Pay/Shan')}
        </div>
      </td>
      <td>${s.phone}</td>
      <td>
        <span class="payment-badge ${s.paymentStatus}" onclick="cyclePayment(${s.id})" style="cursor: pointer;" title="O'zgartirish uchun bosing">
          ${s.paymentStatus === 'paid' ? '🟢 To\'langan' : s.paymentStatus === 'overdue' ? '🔴 Qarzdor' : '🟡 Kutilmoqda'}
        </span>
      </td>
    </tr>
  `).join('');
}

function resetAttendanceFilters() {
  const search = document.getElementById('searchAttendanceStudent');
  if (search) search.value = '';
  const grp = document.getElementById('filterGroup');
  if (grp) grp.value = 'ALL';
  const pay = document.getElementById('filterPayment');
  if (pay) pay.value = 'ALL';
  renderAttendance();
}

function setStudentAttendance(id, status) {
  const s = appState.students.find(st => st.id === id);
  if (s) {
    s.attendance = status;
    saveAdminState();
    renderAttendance();
  }
}

function cyclePayment(id) {
  const s = appState.students.find(st => st.id === id);
  if (!s) return;

  if (s.paymentStatus === 'paid') s.paymentStatus = 'pending';
  else if (s.paymentStatus === 'pending') s.paymentStatus = 'overdue';
  else s.paymentStatus = 'paid';

  saveAdminState();
  renderAttendance();
  showToast(`"${s.name}" to'lov holati yangilandi.`, "info");
}

/* ========================================================
   3. UY ISHLARINI TEKSHIRISH
   ======================================================== */
function renderHomeworkReview() {
  const container = document.getElementById('homeworkQueueList');
  if (!container) return;

  const subs = appState.homeworkSubmissions || [];
  if (subs.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 24px;">Hozircha tekshirish uchun vazifalar yo'q.</div>`;
    return;
  }

  container.innerHTML = subs.map(sub => `
    <div class="hw-assignment-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
        <div>
          <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a;">${sub.studentName}</h4>
          <span style="font-size: 0.8rem; color: #64748b;">${sub.taskTitle} • ${sub.date}</span>
        </div>
        <span class="hw-status-badge ${sub.status}">
          ${sub.status === 'graded' ? `Baholandi (+${sub.score} XP)` : 'Kutilmoqda'}
        </span>
      </div>

      <p style="font-size: 0.84rem; color: #334155; margin-bottom: 6px;"><strong>Izoh:</strong> ${sub.note}</p>
      ${sub.url ? `<p style="font-size: 0.8rem; margin-bottom: 10px;">🔗 Havola: <a href="${sub.url}" target="_blank" style="color: #2563eb; font-weight: 700;">${sub.url}</a></p>` : ''}
      ${sub.image ? `<div style="margin-bottom: 12px;"><img src="${sub.image}" alt="O'quvchi vazifasi" style="max-width: 100%; max-height: 280px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="const w=window.open(); if(w) w.document.write('<img src=\\''+this.src+'\\' style=\\'max-width:100%\\'>');" title="Kattalashtirish uchun bosing"></div>` : ''}

      ${sub.status === 'pending' ? `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <input type="number" id="gradeScore_${sub.id}" class="app-input" value="15" style="width: 80px;" placeholder="XP">
          <input type="text" id="gradeComment_${sub.id}" class="app-input" style="flex:1;" placeholder="Ustoz xulosasi va maslahati">
          <button class="btn-primary" onclick="submitGrade(${sub.id})">Baholash</button>
        </div>
      ` : `
        <div style="font-size: 0.82rem; color: #166534; background: #f0fdf4; padding: 6px 12px; border-radius: 8px;">
          Ustoz fikri: "${sub.feedback}" (Ball: +${sub.score} XP)
        </div>
      `}
    </div>
  `).join('');
}

function submitGrade(subId) {
  const sub = (appState.homeworkSubmissions || []).find(s => s.id === subId);
  if (!sub) return;

  const score = parseInt(document.getElementById(`gradeScore_${subId}`).value) || 15;
  const feedback = document.getElementById(`gradeComment_${subId}`).value.trim() || "Vazifa qabul qilindi.";

  sub.status = "graded";
  sub.score = score;
  sub.feedback = feedback;

  const st = appState.students.find(s => s.id === sub.studentId);
  if (st) {
    st.xp += score;
    st.tasks = (st.tasks || 0) + 1;
  }

  saveAdminState();
  renderHomeworkReview();
  showToast(`Vazifa baholandi va o'quvchiga +${score} XP qo'shildi!`, "success");
}

/* ========================================================
   4. VIDEO DARSLAR VA VAZIFALAR BOSHQARUVI (ADMIN JOYLASh)
   ======================================================== */
function formatYouTubeEmbedUrl(url) {
  if (!url) return "";
  url = url.trim();
  if (url.includes('/embed/')) return url;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
}

function renderContentManager() {
  renderAdminVideoList();
  renderAdminTaskList();
  loadAnnouncementIntoForm();
}

function loadAnnouncementIntoForm() {
  if (!appState.scheduleAnnouncements) {
    appState.scheduleAnnouncements = appState.scheduleNotice ? [appState.scheduleNotice] : [];
  }
  renderAdminAnnouncementsList();
}

function renderAdminAnnouncementsList() {
  const container = document.getElementById('adminAnnouncementsList');
  if (!container) return;

  const list = appState.scheduleAnnouncements || [];
  if (list.length === 0) {
    container.innerHTML = `<div style="color: #64748b; font-size: 0.8rem; padding: 6px 0;">Hozircha faol e'lonlar mavjud emas.</div>`;
    return;
  }

  container.innerHTML = list.map(a => `
    <div style="background: #ffffff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="font-size: 0.92rem; color: #0f172a;">${a.title}</strong>
          <span style="background: ${a.targetGroup === 'ALL' || !a.targetGroup ? '#dbeafe' : '#fef3c7'}; color: ${a.targetGroup === 'ALL' || !a.targetGroup ? '#1e40af' : '#92400e'}; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 12px;">
            🎯 ${a.targetGroup === 'ALL' || !a.targetGroup ? "Barcha Guruhlar" : a.targetGroup}
          </span>
          <small style="color: #64748b; font-size: 0.72rem;">${a.date}</small>
        </div>
        <p style="font-size: 0.82rem; color: #475569; margin: 4px 0 0 0; line-height: 1.4;">${a.text}</p>
      </div>
      <div>
        <button class="btn-sm-action" style="background: #fee2e2; color: #b91c1c; padding: 4px 8px;" onclick="deleteAnnouncement(${a.id || 0})" title="E'lonni o'chirish">
          🗑️ O'chirish
        </button>
      </div>
    </div>
  `).join('');
}

function submitScheduleAnnouncement() {
  const group = document.getElementById('adminAnnounceGroup')?.value || "ALL";
  const title = document.getElementById('adminAnnounceTitle')?.value.trim() || "Dars jadvali e'loni";
  const text = document.getElementById('adminAnnounceText')?.value.trim();
  const active = document.getElementById('adminAnnounceActive')?.checked ?? true;

  if (!text) {
    showToast("E'lon matnini yozing!", "error");
    return;
  }

  if (!appState.scheduleAnnouncements) appState.scheduleAnnouncements = [];

  const newAnnounce = {
    id: Date.now(),
    title: title,
    text: text,
    targetGroup: group, // "ALL" or specific group e.g. "1-Guruh (10:00)"
    date: "Bugun " + new Date().toLocaleTimeString().slice(0, 5),
    active: active
  };

  appState.scheduleAnnouncements.unshift(newAnnounce);
  appState.scheduleNotice = newAnnounce; // For backwards compatibility

  saveAdminState();
  document.getElementById('adminAnnounceText').value = "";
  renderAdminAnnouncementsList();
  showToast(`E'lon ${group === 'ALL' ? 'barcha guruhlar' : group} uchun muvaffaqiyatli chiqarildi!`, "success");
}

function deleteAnnouncement(id) {
  if (confirm("Ushbu e'lonni o'chirishni tasdiqlaysizmi?")) {
    if (!id && appState.scheduleNotice) {
      appState.scheduleNotice = null;
      appState.scheduleAnnouncements = [];
    } else {
      appState.scheduleAnnouncements = (appState.scheduleAnnouncements || []).filter(a => a.id !== id);
      appState.scheduleNotice = appState.scheduleAnnouncements[0] || null;
    }
    saveAdminState();
    renderAdminAnnouncementsList();
    showToast("E'lon o'chirildi.", "info");
  }
}

function renderAdminVideoList() {
  const container = document.getElementById('adminVideosList');
  if (!container) return;

  const videos = appState.videoLessons || [];
  if (videos.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 20px;">Hozircha video darslar yo'q.</div>`;
    return;
  }

  container.innerHTML = videos.map(v => `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
      <div style="flex: 1;">
        <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">${v.title}</div>
        <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">
          ⏱️ ${v.duration} • 👨‍🏫 ${v.teacher} • 🔗 <a href="${v.url}" target="_blank" style="color: #2563eb;">Videoni ochish</a>
        </div>
      </div>
      <button class="btn-cancel" onclick="deleteVideoLesson(${v.id})" style="background: #fee2e2; color: #b91c1c; padding: 6px 12px; font-size: 0.8rem; font-weight: 700;">
        🗑️ O'chirish
      </button>
    </div>
  `).join('');
}

function submitNewVideoLesson() {
  const title = document.getElementById('newVideoTitle').value.trim();
  const rawUrl = document.getElementById('newVideoUrl').value.trim();
  const duration = document.getElementById('newVideoDuration').value.trim() || "45 daqiqa";
  const teacher = document.getElementById('newVideoTeacher').value.trim() || "Ustoz";
  const summary = document.getElementById('newVideoSummary').value.trim() || "Dars konspekti va amaliyot";

  if (!title || !rawUrl) {
    showToast("Iltimos, video mavzusi va YouTube havolasini kiriting!", "error");
    return;
  }

  const embedUrl = formatYouTubeEmbedUrl(rawUrl);
  const newId = (appState.videoLessons && appState.videoLessons.length > 0) ? Math.max(...appState.videoLessons.map(v => v.id)) + 1 : 1;

  appState.videoLessons.unshift({
    id: newId,
    title: title,
    url: embedUrl,
    duration: duration,
    teacher: teacher,
    summary: summary,
    notes: summary
  });

  saveAdminState();
  document.getElementById('newVideoTitle').value = '';
  document.getElementById('newVideoUrl').value = '';
  document.getElementById('newVideoDuration').value = '';
  document.getElementById('newVideoSummary').value = '';

  renderAdminVideoList();
  showToast(`"${title}" video darsi muvaffaqiyatli joylandi! Barcha o'quvchilar kabinetida darhol ko'rinadi.`, "success");
}

function deleteVideoLesson(id) {
  const v = (appState.videoLessons || []).find(item => item.id === id);
  if (!v) return;

  if (confirm(`"${v.title}" videosini o'chirishni tasdiqlaysizmi?`)) {
    appState.videoLessons = appState.videoLessons.filter(item => item.id !== id);
    saveAdminState();
    renderAdminVideoList();
    showToast(`"${v.title}" video darsi o'chirildi.`, "info");
  }
}

function renderAdminTaskList() {
  const container = document.getElementById('adminTasksList');
  if (!container) return;

  const tasks = appState.homeworkTasks || [];
  if (tasks.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 20px;">Hozircha faol vazifalar yo'q.</div>`;
    return;
  }

  container.innerHTML = tasks.map(t => `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">${t.title}</span>
          <span style="background: #eef2ff; color: #4f46e5; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-size: 0.75rem;">+${t.xp} XP</span>
          <span class="course-tag-pill" style="font-size: 0.75rem;">${t.group === 'ALL' ? 'Barcha Guruhlar' : t.group}</span>
        </div>
        <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">${t.desc || 'Tavsif berilmagan'}</div>
      </div>
      <button class="btn-cancel" onclick="deleteHomeworkTask(${t.id})" style="background: #fee2e2; color: #b91c1c; padding: 6px 12px; font-size: 0.8rem; font-weight: 700;">
        🗑️ O'chirish
      </button>
    </div>
  `).join('');
}

function submitNewHomeworkTask() {
  const title = document.getElementById('newTaskTitle').value.trim();
  const xp = parseInt(document.getElementById('newTaskXp').value) || 20;
  const group = document.getElementById('newTaskGroup').value;
  const desc = document.getElementById('newTaskDesc').value.trim();

  if (!title) {
    showToast("Iltimos, vazifa mavzusini kiriting!", "error");
    return;
  }

  const newId = (appState.homeworkTasks && appState.homeworkTasks.length > 0) ? Math.max(...appState.homeworkTasks.map(t => t.id)) + 1 : 1;

  appState.homeworkTasks.unshift({
    id: newId,
    title: title,
    xp: xp,
    group: group,
    desc: desc || "Darsda o'tilgan mavzuni mustahkamlash uchun amaliy vazifa."
  });

  saveAdminState();
  document.getElementById('newTaskTitle').value = '';
  document.getElementById('newTaskDesc').value = '';

  renderAdminTaskList();
  showToast(`"${title}" vazifasi e'lon qilindi! Barcha o'quvchilar kabinetida darhol ko'rinadi.`, "success");
}

function deleteHomeworkTask(id) {
  const t = (appState.homeworkTasks || []).find(item => item.id === id);
  if (!t) return;

  if (confirm(`"${t.title}" vazifasini o'chirishni tasdiqlaysizmi?`)) {
    appState.homeworkTasks = appState.homeworkTasks.filter(item => item.id !== id);
    saveAdminState();
    renderAdminTaskList();
    showToast(`"${t.title}" vazifasi o'chirildi.`, "info");
  }
}

/* ========================================================
   5. BALLAR & GURUHLAR (TEZKOR QIDIRUV VA TANLASH)
   ======================================================== */
let selectedStudentIdForPoints = null;

function renderPoints() {
  filterPointsStudents();
}

function filterPointsStudents() {
  const query = (document.getElementById('searchPointsStudent')?.value || '').toLowerCase().trim();
  const group = document.getElementById('filterPointsGroup')?.value || 'ALL';

  let filtered = [...appState.students];
  if (group !== 'ALL') {
    filtered = filtered.filter(s => s.group === group);
  }
  if (query) {
    filtered = filtered.filter(s => {
      const idStr = String(s.id);
      const phoneDigits = (s.phone || '').replace(/\D/g, '');
      const queryDigits = query.replace(/\D/g, '');
      const idMatch = idStr === query || `#${idStr}` === query || `id:${idStr}` === query;
      const nameMatch = s.name.toLowerCase().includes(query);
      const phoneMatch = queryDigits.length >= 3 && phoneDigits.includes(queryDigits);
      return idMatch || nameMatch || phoneMatch;
    });
  }

  // Hisoblagichni yangilash
  const countEl = document.getElementById('pointsFilteredCount');
  if (countEl) countEl.innerText = filtered.length;

  // Tanlangan o'quvchini tekshirish
  if (!selectedStudentIdForPoints || !appState.students.some(s => s.id === selectedStudentIdForPoints)) {
    if (filtered.length > 0) {
      selectedStudentIdForPoints = filtered[0].id;
    } else if (appState.students.length > 0) {
      selectedStudentIdForPoints = appState.students[0].id;
    } else {
      selectedStudentIdForPoints = null;
    }
  }

  // Dropdownni to'ldirish
  const select = document.getElementById('pointsStudentSelect');
  if (select) {
    const listForSelect = filtered.length > 0 ? filtered : appState.students;
    select.innerHTML = listForSelect.map(s => `
      <option value="${s.id}" ${s.id === selectedStudentIdForPoints ? 'selected' : ''}>
        #${s.id} — ${s.name} (${s.group}) [⭐ ${s.xp} XP]
      </option>
    `).join('');
  }

  // Tanlangan kartani yangilash
  updateSelectedStudentCard();

  // Ro'yxatni chiqarish
  const list = document.getElementById('pointsStudentsList');
  if (list) {
    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; color: #94a3b8; padding: 30px; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1;">
          🔍 "${query}" bo'yicha hech qanday o'quvchi topilmadi.<br>
          <button class="btn-sm-action" onclick="resetPointsFilters()" style="margin-top: 10px;">Barcha o'quvchilarni ko'rsatish</button>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(s => {
      const isSelected = s.id === selectedStudentIdForPoints;
      return `
        <div class="admin-student-item ${isSelected ? 'selected' : ''}" onclick="selectStudentForPoints(${s.id})">
          <div class="student-info-col" style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${isSelected ? '<span style="color: #4f46e5; font-size: 1rem;">👉</span>' : ''}
              <strong>${highlightMatch(s.name, query)}</strong>
            </div>
            <small style="display:block; color:#64748b; margin-top: 2px;">
              ${s.group} • ID: <b>#${s.id}</b> • Tel: ${s.phone || 'N/A'}
            </small>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
              <span style="background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:4px; font-size:0.75rem; font-weight:700;">
                📅 ${s.days ? s.days.split(' / ').slice(0, 2).join('/') + '...' : (s.group && s.group.includes('Du') ? 'Du/Cho/Ju' : 'Se/Pay/Sha')}
              </span>
              <span style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:0.75rem; font-weight:700; color:#334155;">
                🔑 PIN: ${s.pin || '1234'}
              </span>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;" onclick="event.stopPropagation()">
            <span style="font-weight: 800; color: #4f46e5; white-space: nowrap;">⭐ ${s.xp} XP</span>
            <button class="btn-sm-action" onclick="toggleStudentLoginPermission(${s.id})" style="background:${s.canLogin ? '#dcfce7' : '#fee2e2'}; color:${s.canLogin ? '#166534' : '#991b1b'}; border:none;">
              ${s.canLogin ? '🔓 Ruxsat bor' : '🔒 Ruxsat yo\'q'}
            </button>
            <button class="btn-sm-action" onclick="openEditModal(${s.id})">Tahrirlash</button>
          </div>
        </div>
      `;
    }).join('');
  }
}

function highlightMatch(text, query) {
  if (!query || typeof text !== 'string') return text || '';
  const cleanQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${cleanQ})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function selectStudentForPoints(id) {
  selectedStudentIdForPoints = id;
  const select = document.getElementById('pointsStudentSelect');
  if (select) select.value = id;
  updateSelectedStudentCard();

  document.querySelectorAll('#pointsStudentsList .admin-student-item').forEach(el => {
    el.classList.remove('selected');
  });
  filterPointsStudents();
}

function onPointsSelectChange(id) {
  selectedStudentIdForPoints = parseInt(id);
  updateSelectedStudentCard();
  filterPointsStudents();
}

function updateSelectedStudentCard() {
  const cardName = document.getElementById('selStudentName');
  const cardMeta = document.getElementById('selStudentMeta');
  const cardXp = document.getElementById('selStudentXp');
  if (!cardName) return;

  const st = appState.students.find(s => s.id === selectedStudentIdForPoints);
  if (st) {
    cardName.innerText = st.name;
    cardMeta.innerText = `${st.group} • ID: #${st.id} • Tel: ${st.phone || 'N/A'} • PIN: ${st.pin || '1234'}`;
    cardXp.innerText = `⭐ ${st.xp} XP (Topshirgan: ${st.tasks || 0} ta vazifa)`;
  } else {
    cardName.innerText = "Hech kim tanlanmagan";
    cardMeta.innerText = "Iltimos, o'quvchini tanlang";
    cardXp.innerText = "⭐ 0 XP";
  }
}

function resetPointsFilters() {
  const search = document.getElementById('searchPointsStudent');
  if (search) search.value = '';
  const grp = document.getElementById('filterPointsGroup');
  if (grp) grp.value = 'ALL';
  filterPointsStudents();
}

function awardPoints(pts, reason) {
  if (!selectedStudentIdForPoints) {
    showToast("Iltimos, avval o'quvchini tanlang!", "error");
    return;
  }

  const st = appState.students.find(s => s.id === selectedStudentIdForPoints);
  if (!st) {
    showToast("O'quvchi topilmadi!", "error");
    return;
  }

  st.xp += pts;
  saveAdminState();
  filterPointsStudents();
  showToast(`"${st.name}"ga ${pts > 0 ? '+' : ''}${pts} XP berildi (${reason}). Yangi ball: ${st.xp} XP`, "success");
}

function awardCustomPoints() {
  const input = document.getElementById('customXpInput');
  const reasonInput = document.getElementById('customXpReason');
  if (!input) return;

  const pts = parseInt(input.value);
  if (isNaN(pts) || pts === 0) {
    showToast("Iltimos, qo'shiladigan yoki ayiriladigan ball miqdorini kiriting!", "error");
    return;
  }
  const reason = reasonInput.value.trim() || "Qo'shimcha rag'bat";

  awardPoints(pts, reason);
  input.value = '';
  if (reasonInput) reasonInput.value = '';
}

function awardAttendanceAll() {
  if (!confirm("Barcha o'quvchilarga bugungi dars davomati uchun +5 XP berilsinmi?")) return;

  appState.students.forEach(s => {
    s.xp += 5;
    s.streak = (s.streak || 1) + 1;
  });

  saveAdminState();
  renderPoints();
  showToast("Barcha o'quvchilarga +5 XP berildi!", "success");
}

function exportCsvData() {
  const rows = [
    ["ID", "F.I.SH", "Guruh", "Telefon", "XP Ball", "To'lov Holati", "Davomat"]
  ];
  appState.students.forEach(s => {
    rows.push([s.id, `"${s.name}"`, `"${s.group}"`, `"${s.phone}"`, s.xp, s.paymentStatus, s.attendance]);
  });
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map(e => e.join(",")).join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", `IT_Park_Oquvchilar_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ========================================================
   MODALS: ADD & EDIT STUDENT
   ======================================================== */
function openAddStudentModal() {
  document.getElementById('addStudentModal').classList.add('active');
}

function submitNewStudent() {
  const name = document.getElementById('newStudentName').value.trim();
  const group = document.getElementById('newStudentGroup').value;
  const phone = document.getElementById('newStudentPhone').value.trim() || "+998 90 000 00 00";
  const days = document.getElementById('newStudentDays')?.value || "Seshanba / Payshanba / Shanba";
  const time = document.getElementById('newStudentTime')?.value.trim() || "10:00 - 12:00";
  const room = document.getElementById('newStudentRoom')?.value.trim() || "302-xona";
  const pin = document.getElementById('newStudentPin').value.trim() || "1234";
  const xp = parseInt(document.getElementById('newStudentXp').value) || 10;

  if (!name) {
    showToast("Ism kiritilmadi!", "error");
    return;
  }

  const newId = getNextSequentialId();
  appState.students.push({
    id: newId,
    name: name,
    group: group,
    days: days,
    time: time,
    room: room,
    xp: xp,
    tasks: 1,
    rewards: 0,
    streak: 1,
    phone: phone,
    pin: pin,
    paymentStatus: "paid",
    attendance: "present"
  });

  saveAdminState();
  document.getElementById('addStudentModal').classList.remove('active');
  document.getElementById('newStudentName').value = '';
  document.getElementById('newStudentPhone').value = '';
  document.getElementById('newStudentPin').value = '1234';
  renderPoints();
  if (typeof renderAttendance === 'function') renderAttendance();
  showToast(`"${name}" yangi o'quvchi sifatida qo'shildi (PIN: ${pin}).`, "success");
}

function openEditModal(id) {
  const s = appState.students.find(st => st.id === id);
  if (!s) return;

  const defaultDays = (s.group && (s.group.includes('Du') || s.group.includes('5-Guruh')))
    ? "Dushanba / Chorshanba / Juma"
    : "Seshanba / Payshanba / Shanba";
  const defaultTime = s.group && s.group.includes('15:00') ? "15:00 - 17:00" : (s.group && s.group.includes('17:00') ? "17:00 - 19:00" : "10:00 - 12:00");
  const defaultRoom = s.group && s.group.includes('1-Guruh') ? "302-xona (Turing Lab)" : "204-xona (Ada Lovelace)";

  document.getElementById('editStudentId').value = s.id;
  document.getElementById('editStudentName').value = s.name;
  document.getElementById('editStudentGroup').value = s.group;
  if (document.getElementById('editStudentDays')) {
    document.getElementById('editStudentDays').value = s.days || defaultDays;
  }
  if (document.getElementById('editStudentTime')) {
    document.getElementById('editStudentTime').value = s.time || defaultTime;
  }
  if (document.getElementById('editStudentRoom')) {
    document.getElementById('editStudentRoom').value = s.room || defaultRoom;
  }
  document.getElementById('editStudentXp').value = s.xp;
  document.getElementById('editStudentPin').value = s.pin || "1234";
  const canLoginEl = document.getElementById('editStudentCanLogin');
  if (canLoginEl) canLoginEl.checked = s.canLogin === true;
  document.getElementById('editStudentModal').classList.add('active');
}

function toggleStudentLoginPermission(id) {
  const s = appState.students.find(st => st.id === id);
  if (!s) return;
  s.canLogin = !(s.canLogin === true);
  saveAdminState();
  renderPoints();
  showToast(
    s.canLogin ? `🔓 ${s.name} ga akkauntga kirish ruxsati berildi.` : `🔒 ${s.name} ning akkauntiga kirish yopildi.`,
    s.canLogin ? "success" : "warning"
  );
}

function resetStudentPinToDefault() {
  document.getElementById('editStudentPin').value = "1234";
  showToast("PIN '1234' ga o'zgartirildi. Saqlash uchun 'Saqlash' tugmasini bosing.", "info");
}

function submitEditStudent() {
  const id = parseInt(document.getElementById('editStudentId').value);
  const name = document.getElementById('editStudentName').value.trim();
  const group = document.getElementById('editStudentGroup').value;
  const days = document.getElementById('editStudentDays')?.value;
  const time = document.getElementById('editStudentTime')?.value.trim();
  const room = document.getElementById('editStudentRoom')?.value.trim();
  const xp = parseInt(document.getElementById('editStudentXp').value) || 0;
  const pin = document.getElementById('editStudentPin').value.trim() || "1234";

  const s = appState.students.find(st => st.id === id);
  if (!s) return;

  s.name = name;
  s.group = group;
  if (days) s.days = days;
  if (time) s.time = time;
  if (room) s.room = room;
  s.xp = xp;
  s.pin = pin;
  const canLoginEl = document.getElementById('editStudentCanLogin');
  if (canLoginEl) s.canLogin = canLoginEl.checked === true;

  saveAdminState();
  document.getElementById('editStudentModal').classList.remove('active');
  renderPoints();
  if (typeof renderAttendance === 'function') renderAttendance();
  showToast("O'quvchi dars kunlari, ma'lumotlari va paroli yangilandi.", "success");
}

function deleteStudent() {
  const id = parseInt(document.getElementById('editStudentId').value);
  const s = appState.students.find(st => st.id === id);
  if (!s) return;

  if (confirm(`"${s.name}"ni o'chirishni tasdiqlaysizmi?`)) {
    appState.students = appState.students.filter(st => st.id !== id);
    saveAdminState();
    document.getElementById('editStudentModal').classList.remove('active');
    renderPoints();
    showToast(`"${s.name}" ro'yxatdan o'chirildi.`, "info");
  }
}

/* ========================================================
   6. DO'KON VA BUYURTMALAR BOSHQARUVI (ADMIN)
   ======================================================== */
function renderAdminShop() {
  const tbody = document.getElementById('adminOrdersTableBody');
  const productsGrid = document.getElementById('adminShopProductsGrid');
  if (!tbody || !productsGrid) return;

  const orders = appState.shopOrders || [];
  const products = appState.shopItems || [];

  // Statistikalar
  const statTotal = document.getElementById('statTotalOrders');
  const statPending = document.getElementById('statPendingOrders');
  const statDelivered = document.getElementById('statDeliveredOrders');
  const statItemsCount = document.getElementById('statShopItemsCount');

  if (statTotal) statTotal.innerText = orders.length;
  if (statPending) statPending.innerText = orders.filter(o => o.status !== 'delivered').length;
  if (statDelivered) statDelivered.innerText = orders.filter(o => o.status === 'delivered').length;
  if (statItemsCount) statItemsCount.innerText = products.length;

  // 1. BUYURTMALAR JADVALI
  const search = (document.getElementById('searchOrdersInput')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('filterOrdersStatus')?.value || 'ALL';

  let filteredOrders = [...orders];
  if (statusFilter === 'pending') {
    filteredOrders = filteredOrders.filter(o => o.status !== 'delivered');
  } else if (statusFilter === 'delivered') {
    filteredOrders = filteredOrders.filter(o => o.status === 'delivered');
  }

  if (search) {
    filteredOrders = filteredOrders.filter(o =>
      (o.studentName || '').toLowerCase().includes(search) ||
      (o.itemName || '').toLowerCase().includes(search) ||
      String(o.studentId).includes(search) ||
      (o.studentGroup || '').toLowerCase().includes(search)
    );
  }

  if (filteredOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #94a3b8; padding: 24px;">Buyurtmalar topilmadi.</td></tr>`;
  } else {
    tbody.innerHTML = filteredOrders.map(o => {
      const isDelivered = o.status === 'delivered';
      return `
        <tr>
          <td><span style="font-family:'JetBrains Mono'; font-weight:800; color:#64748b;">#${String(o.id).slice(-4)}</span></td>
          <td>
            <strong>${o.studentName}</strong>
            <small style="display:block; color:#64748b;">ID: #${o.studentId} • Tel: ${o.studentPhone || 'N/A'}</small>
          </td>
          <td><span class="course-tag-pill">${o.studentGroup}</span></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">${o.itemEmoji || '🎁'}</span>
              <strong>${o.itemName}</strong>
            </div>
          </td>
          <td><strong style="color: #4f46e5;">⭐ ${o.itemXp} XP</strong></td>
          <td><small style="color: #64748b;">${o.date}</small></td>
          <td>
            ${isDelivered ? `
              <span class="order-status-badge delivered">✅ Berildi</span>
            ` : `
              <span class="order-status-badge pending">⏳ Berilmagan</span>
            `}
          </td>
          <td style="text-align: right;">
            <div style="display: flex; gap: 6px; justify-content: flex-end; flex-wrap: wrap;">
              ${!isDelivered ? `
                <button class="btn-sm-action" style="background: #dcfce7; color: #166534; font-weight: 800;" onclick="markOrderDelivered(${o.id})">
                  ✅ Berildi deb belgilash
                </button>
                <button class="btn-sm-action" style="background: #fee2e2; color: #b91c1c; font-weight: 800;" onclick="cancelOrderAndRefund(${o.id})">
                  ❌ Bekor qilish & Qaytarish
                </button>
              ` : `
                <button class="btn-sm-action" onclick="revertOrderToPending(${o.id})">
                  🔄 Qaytarish (Kutilmoqda)
                </button>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 2. MAHSULOTLAR GRID
  if (products.length === 0) {
    productsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #94a3b8; padding: 24px;">Do'konda mahsulotlar yo'q. Yangi qo'shish tugmasini bosing.</div>`;
  } else {
    productsGrid.innerHTML = products.map(p => `
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div>
          <div style="font-size: 2rem; margin-bottom: 8px;">${p.emoji || '🎁'}</div>
          <h4 style="font-size: 1rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${p.name}</h4>
          <p style="font-size: 0.8rem; color: #64748b; line-height: 1.4; margin-bottom: 10px;">${p.desc}</p>
        </div>
        <div style="border-top: 1px solid #f1f5f9; padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 900; color: #4f46e5; font-size: 1.05rem;">⭐ ${p.xp} XP</span>
          <div style="display: flex; gap: 6px;">
            <button class="btn-sm-action" onclick="openEditProductModal(${p.id})">✏️ Tahrirlash</button>
            <button class="btn-sm-action" style="background:#fee2e2; color:#b91c1c;" onclick="deleteProduct(${p.id})">🗑️</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function markOrderDelivered(orderId) {
  const o = (appState.shopOrders || []).find(item => item.id === orderId);
  if (!o) return;
  o.status = 'delivered';
  saveAdminState();
  renderAdminShop();
  showToast(`"${o.itemName}" buyurtmasi topshirildi deb belgilandi!`, "success");
}

function revertOrderToPending(orderId) {
  const o = (appState.shopOrders || []).find(item => item.id === orderId);
  if (!o) return;
  o.status = 'pending';
  saveAdminState();
  renderAdminShop();
  showToast(`Buyurtma holati qaytadan "Berilmagan"ga o'tkazildi.`, "info");
}

function cancelOrderAndRefund(orderId) {
  const o = (appState.shopOrders || []).find(item => item.id === orderId);
  if (!o) return;

  if (confirm(`Rostdan ham ushbu buyurtmani bekor qilib, o'quvchiga ${o.itemXp} XP qaytarmoqchimisiz?`)) {
    const student = (appState.students || []).find(s => s.id === o.studentId);
    if (student) {
      student.xp += o.itemXp;
    }
    appState.shopOrders = appState.shopOrders.filter(item => item.id !== orderId);
    saveAdminState();
    renderAdminShop();
    showToast(`Buyurtma bekor qilindi va o'quvchiga ${o.itemXp} XP qaytarildi.`, "info");
  }
}

function openAddProductModal() {
  document.getElementById('productModalTitle').innerText = "Yangi Mahsulot Qo'shish";
  document.getElementById('productModalId').value = "";
  document.getElementById('productEmoji').value = "🎁";
  document.getElementById('productName').value = "";
  document.getElementById('productDesc').value = "";
  document.getElementById('productXp').value = "100";
  document.getElementById('productModal').classList.add('active');
}

function openEditProductModal(productId) {
  const p = (appState.shopItems || []).find(item => item.id === productId);
  if (!p) return;

  document.getElementById('productModalTitle').innerText = "Mahsulotni Tahrirlash";
  document.getElementById('productModalId').value = p.id;
  document.getElementById('productEmoji').value = p.emoji || "🎁";
  document.getElementById('productName').value = p.name;
  document.getElementById('productDesc').value = p.desc || "";
  document.getElementById('productXp').value = p.xp;
  document.getElementById('productModal').classList.add('active');
}

function submitProductForm() {
  const idStr = document.getElementById('productModalId').value;
  const emoji = document.getElementById('productEmoji').value.trim() || "🎁";
  const name = document.getElementById('productName').value.trim();
  const desc = document.getElementById('productDesc').value.trim();
  const xp = parseInt(document.getElementById('productXp').value) || 50;

  if (!name) {
    showToast("Mahsulot nomini kiriting!", "error");
    return;
  }

  if (!appState.shopItems) appState.shopItems = [];

  if (idStr) {
    // Tahrirlash
    const p = appState.shopItems.find(item => item.id === parseInt(idStr));
    if (p) {
      p.emoji = emoji;
      p.name = name;
      p.desc = desc;
      p.xp = xp;
      showToast(`"${name}" mahsuloti muvaffaqiyatli yangilandi.`, "success");
    }
  } else {
    // Yangi qo'shish
    const newId = Date.now();
    appState.shopItems.push({
      id: newId,
      emoji: emoji,
      name: name,
      desc: desc,
      xp: xp
    });
    showToast(`"${name}" do'konga yangi mahsulot sifatida qo'shildi!`, "success");
  }

  saveAdminState();
  closeModal('productModal');
  renderAdminShop();
}

function deleteProduct(productId) {
  const p = (appState.shopItems || []).find(item => item.id === productId);
  if (!p) return;

  if (confirm(`"${p.name}" mahsulotini do'kondan butunlay o'chirmoqchimisiz?`)) {
    appState.shopItems = appState.shopItems.filter(item => item.id !== productId);
    saveAdminState();
    renderAdminShop();
    showToast(`"${p.name}" o'chirildi.`, "info");
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

/* ========================================================
   BULUTLI BAZA (FIREBASE REALTIME DB) BOSHQARUVI
   ======================================================== */
function initAdminCloudSync() {
  if (!window.CloudDB) return;
  CloudDB.init({
    onData: (cloudData) => {
      if (cloudData && cloudData.students && cloudData.students.length > 0) {
        console.log("☁️ [Admin] Bulutdan yangi ma'lumotlar qabul qilindi.");
        appState = {
          ...appState,
          ...cloudData,
          shopItems: Array.isArray(cloudData.shopItems) ? cloudData.shopItems : [],
          shopOrders: Array.isArray(cloudData.shopOrders) ? cloudData.shopOrders : [],
          leads: Array.isArray(cloudData.leads) ? cloudData.leads : [],
          scheduleAnnouncements: Array.isArray(cloudData.scheduleAnnouncements) ? cloudData.scheduleAnnouncements : [],
          videoLessons: Array.isArray(cloudData.videoLessons) ? cloudData.videoLessons : [],
          homeworkTasks: Array.isArray(cloudData.homeworkTasks) ? cloudData.homeworkTasks : [],
          homeworkSubmissions: Array.isArray(cloudData.homeworkSubmissions) ? cloudData.homeworkSubmissions : [],
          customGroups: Array.isArray(cloudData.customGroups) ? cloudData.customGroups : []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        if (isAdminAuth) {
          renderAdminPortal();
        }
      }
    },
    onStatus: (status) => {
      updateAdminCloudStatusUI(status);
    }
  });
}

function renderCloudTab() {
  const cfg = CloudDB ? CloudDB.getConfig() : {};
  const dbUrlInput = document.getElementById('fbDbUrl');
  const apiKeyInput = document.getElementById('fbApiKey');
  const projIdInput = document.getElementById('fbProjectId');
  const fullText = document.getElementById('fbFullConfigText');

  if (dbUrlInput && cfg.databaseURL) dbUrlInput.value = cfg.databaseURL;
  if (apiKeyInput && cfg.apiKey) apiKeyInput.value = cfg.apiKey;
  if (projIdInput && cfg.projectId) projIdInput.value = cfg.projectId;
  if (fullText && cfg) fullText.value = JSON.stringify(cfg, null, 2);

  updateAdminCloudStatusUI({
    connected: CloudDB ? CloudDB.isConnected : false,
    mode: (CloudDB && CloudDB.isConnected) ? 'cloud' : 'offline',
    text: (CloudDB && CloudDB.isConnected) ? "🟢 Bulut: Jonli ulanish" : "🟡 Mahalliy rejim (Keshda ishlamoqda)"
  });
}

function submitFirebaseConfigForm(e) {
  if (e) e.preventDefault();
  const dbUrl = document.getElementById('fbDbUrl')?.value.trim();
  const apiKey = document.getElementById('fbApiKey')?.value.trim();
  const projectId = document.getElementById('fbProjectId')?.value.trim();
  const fullText = document.getElementById('fbFullConfigText')?.value.trim();

  let finalConfig = {};

  if (fullText && fullText.includes('{')) {
    try {
      const cleanJson = fullText.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      finalConfig = JSON.parse(cleanJson);
    } catch (err) {
      const dbUrlMatch = fullText.match(/databaseURL\s*:\s*["']([^"']+)["']/);
      const apiKeyMatch = fullText.match(/apiKey\s*:\s*["']([^"']+)["']/);
      const projMatch = fullText.match(/projectId\s*:\s*["']([^"']+)["']/);
      if (dbUrlMatch) finalConfig.databaseURL = dbUrlMatch[1];
      if (apiKeyMatch) finalConfig.apiKey = apiKeyMatch[1];
      if (projMatch) finalConfig.projectId = projMatch[1];
    }
  }

  if (dbUrl) finalConfig.databaseURL = dbUrl;
  if (apiKey) finalConfig.apiKey = apiKey;
  if (projectId) finalConfig.projectId = projectId;

  if (!finalConfig.databaseURL) {
    showToast("Iltimos, kamida Firebase Realtime Database URL manzilini kiriting!", "error");
    return;
  }

  CloudDB.saveConfig(finalConfig);
  showToast("Firebase sozlamalari saqlandi! Baza ulanmoqda...", "success");

  CloudDB.init({
    onData: (cloudData) => {
      if (cloudData && cloudData.students) {
        appState = {
          ...appState,
          ...cloudData,
          shopItems: Array.isArray(cloudData.shopItems) ? cloudData.shopItems : [],
          shopOrders: Array.isArray(cloudData.shopOrders) ? cloudData.shopOrders : [],
          leads: Array.isArray(cloudData.leads) ? cloudData.leads : [],
          scheduleAnnouncements: Array.isArray(cloudData.scheduleAnnouncements) ? cloudData.scheduleAnnouncements : [],
          videoLessons: Array.isArray(cloudData.videoLessons) ? cloudData.videoLessons : [],
          homeworkTasks: Array.isArray(cloudData.homeworkTasks) ? cloudData.homeworkTasks : [],
          homeworkSubmissions: Array.isArray(cloudData.homeworkSubmissions) ? cloudData.homeworkSubmissions : [],
          customGroups: Array.isArray(cloudData.customGroups) ? cloudData.customGroups : []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        renderAdminPortal();
      }
    },
    onStatus: (st) => updateAdminCloudStatusUI(st)
  });

  setTimeout(() => {
    forcePushToCloud();
  }, 1000);
}

function forcePushToCloud() {
  if (!window.CloudDB) return;
  CloudDB.forcePush(appState).then(success => {
    if (success) {
      showToast("Barcha 22 ta o'quvchi, ballar va do'kon ma'lumotlari bulutga muvaffaqiyatli yuklandi!", "success");
    } else {
      showToast("Bulutga yuklashda xatolik. Internetni va Firebase qoidalarini (Rules) tekshiring.", "error");
    }
  });
}

function forcePullFromCloud() {
  if (!window.CloudDB) return;
  CloudDB.pullOnce().then(cloudData => {
    if (cloudData && cloudData.students && cloudData.students.length > 0) {
      appState = { ...appState, ...cloudData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      renderAdminPortal();
      showToast("Bulutdan so'nggi yangilangan ma'lumotlar yuklab olindi!", "success");
    } else {
      showToast("Bulutli bazada hozircha ma'lumot yo'q yoki ulanib bo'lmadi.", "warning");
    }
  });
}

function updateAdminCloudStatusUI(status) {
  const badge = document.getElementById('adminCloudStatusBadge');
  const liveText = document.getElementById('cloudLiveStatusText');
  const dbUrlText = document.getElementById('cloudLiveDbUrlText');
  const cfg = CloudDB ? CloudDB.getConfig() : {};

  if (badge) {
    badge.innerText = status.text || "☁️ Bulut";
    badge.className = `cloud-status-badge ${status.connected ? 'online' : status.mode === 'warning' ? 'warning' : 'offline'}`;
  }

  if (liveText) {
    if (status.connected) {
      liveText.innerHTML = "🟢 Ulangan (Jonli Real-time Sinxronizatsiya)";
      liveText.style.color = "#059669";
    } else if (status.mode === 'warning') {
      liveText.innerHTML = "⚠️ Ruxsat tekshirilmoqda (Rules tekshiring)";
      liveText.style.color = "#dc2626";
    } else {
      liveText.innerHTML = "🟡 Mahalliy rejim (Keshda ishlamoqda)";
      liveText.style.color = "#d97706";
    }
  }

  if (dbUrlText) {
    dbUrlText.innerText = `Baza: ${cfg.databaseURL || 'Standart lokal rejim'}`;
  }
}

/* ========================================================
   INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadAdminState();
  checkAdminAuth();
});
