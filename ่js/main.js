/**
 * Main.js - ศูนย์กลางควบคุม UI และ Session
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

// 2. จัดการ Popup แจ้งเตือน
function showPopup(title, message) {
  const popup = document.getElementById('popup');
  const pTitle = document.getElementById('popup-title');
  const pMsg = document.getElementById('popup-message');
  
  if (popup && pTitle && pMsg) {
    pTitle.innerText = title;
    pMsg.innerText = message;
    popup.style.display = 'flex';
  } else {
    alert(`${title}: ${message}`);
  }
}

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
  // ตรวจสอบว่าเป็นพนักงาน IT หรือไม่ (ถ้ามี field UserRole ใน Sheet)
  checkAuth: () => {
    if (!Auth.getUser()) {
      location.href = "login.html";
    }
  }
};
/**
 * ฟังก์ชันแสดง Modal แจ้งผลการทำงาน
 * @param {string} title - หัวข้อ
 * @param {string} message - ข้อความ
 * @param {string} type - 'success', 'error', 'warning'
 */
function showModal(title, message, type = 'success') {
  const popup = document.getElementById('popup');
  const pTitle = document.getElementById('popup-title');
  const pMsg = document.getElementById('popup-message');
  const pBox = document.querySelector('.popup-box');

  // ล้าง class เดิมออกก่อน
  pBox.classList.remove('success', 'error', 'warning');
  pBox.classList.add(type);

  // กำหนด Icon ตามประเภท
  let icon = "🔔";
  if (type === 'success') icon = "✅";
  if (type === 'error') icon = "❌";
  if (type === 'warning') icon = "⚠️";

  pTitle.innerHTML = `<span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">${icon}</span>${title}`;
  pMsg.innerText = message;
  
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
