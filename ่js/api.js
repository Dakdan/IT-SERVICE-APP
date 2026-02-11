// js/api.js
const API_URL = 'https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec';

const ApiService = {
  async login(username, password) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors', // ลองเพิ่มโหมดนี้หากยังโดน Block (แต่จะอ่าน JSON ลำบากหน่อย)
        // หรือใช้โหมดมาตรฐานแต่ส่งเป็น text/plain แทน
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'checkLogin',
          data: { user: username, pass: password }
        })
      });
      
      // กรณีใช้ Google Script บางครั้งต้องรอการ Redirect
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  }
};
