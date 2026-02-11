/**
 * Main.js - ศูนย์กลางควบคุม UI และ Session (ฉบับปรับปรุง)
 */

// 1. จัดการ Loader (วงกลมหมุนๆ)
const Loader = {
  show: () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'flex';
  },
  hide: () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }
};

// 2. จัดการ Modal/Popup แจ้งเตือน
/**
 * @param {string} title - หัวข้อ
 * @param {string} message - ข้อความ
 * @param {string} type - 'success', 'error', 'warning'
 */
function showModal(title, message, type = 'success') {
  const popup = document.getElementById('popup');
  const pTitle = document.getElementById('popup-title');
  const pMsg = document.getElementById('popup-message');
  const pBox = document.querySelector('.popup-box'); // ตัวนี้สำคัญมาก

  // เช็คก่อนว่า Element ครบไหม
  if (popup && pTitle && pMsg) {
    
    // ถ้ามี pBox ให้เปลี่ยนสีตาม Type (ถ้าไม่มีให้ข้ามส่วนสีไปก่อน)
    if (pBox) {
      pBox.classList.remove('success', 'error', 'warning');
      pBox.classList.add(type);
    }

    let icon = "🔔";
    if (type === 'success') icon = "✅";
    if (type === 'error') icon = "❌";
    if (type === 'warning') icon = "⚠️";

    pTitle.innerHTML = `<span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">${icon}</span>${title}`;
    pMsg.innerText = message;
    
    popup.style.display = 'flex';
  } else {
    alert(`${title}: ${message}`);
  }
}

// ฟังก์ชันสำหรับปิด Popup
function closePopup() {
  const popup = document.getElementById('popup');
  if (popup) popup.style.display = 'none';
}

// 3. จัดการ Session ผู้ใช้
const Auth = {
  // บันทึกข้อมูลลงเครื่อง
  setSession: (userData) => {
    localStorage.setItem("it_session", JSON.stringify(userData));
  },
  // ดึงข้อมูลผู้ใช้ออกมา
  getUser: () => {
    const data = localStorage.getItem("it_session");
    return data ? JSON.parse(data) : null;
  },
  // ออกจากระบบ
  logout: () => {
    localStorage.removeItem("it_session");
    location.href = "login.html";
  },
  // ตรวจสอบความปลอดภัย
  checkAuth: () => {
    if (!Auth.getUser()) {
      location.href = "login.html";
    }
  }
};

// เช็คเผื่อกรณีโค้ดเดิมเรียกใช้ชื่อ showPopup ให้ส่งไปที่ showModal แทน
function showPopup(title, message) {
    showModal(title, message, 'warning');
}
/* ตัวอย่างสีสำหรับ Popup ตามประเภท */
.popup-box.success { border-top: 5px solid #28a745; }
.popup-box.error { border-top: 5px solid #dc3545; }
.popup-box.warning { border-top: 5px solid #ffc107; }

.popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; /* ถูกควบคุมโดย JS ให้เป็น none/flex */
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
