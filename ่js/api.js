const API_URL = 'https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec';

const ApiService = {
  /**
   * ฟังก์ชันส่ง Request ไปยัง GAS
   */
  async _post(action, data = {}) {
    try {
      // ใช้โหมด no-cors ไม่ได้หากต้องการรับข้อมูล JSON กลับมา 
      // ดังนั้นต้อง Deploy GAS เป็น 'Anyone' (สาธารณะ)
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action, data }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error(`API Error (${action}):`, error);
      return { success: false, message: error.message };
    }
  },

  /** 1. ตรวจสอบสิทธิ์เข้าใช้งาน */
  login: (user, pass) => ApiService._post('checkLogin', { user, pass }),

  /** 2. ดึงข้อมูล Master และรายการงาน (ส่งชื่อ User ไปด้วยเพื่อกรอง MyJobs) */
  getInitialData: (userName) => ApiService._post('getInitialData', { userName }),

  /** 3. อัปเดตสถานะงาน (รับงาน/กำลังทำ/เสร็จสิ้น) */
  updateJob: (jobId, status, owner) => 
    ApiService._post('updateJobStatus', { JobID: jobId, Status: status, Owner: owner }),

  /** 4. บันทึก Ticket ใหม่เข้าไปใน Sheet 'IT_Ticket' */
  createTicket: (payload) => ApiService._post('saveITTicket', payload)
};
