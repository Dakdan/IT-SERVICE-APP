## 📡 Base Configuration

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxF7ImGdY6XqcFZ4zp6wSK4KMWTrkBk_NoMS5TucQ-e46EvvzP9O32hSzaENSqgoe0B/exec';
const SHEET_ID = '1TUcThdPyAqFRwkFg1NTMtwqbFVjrkJXWqYw0AlwwriI';
🔄 HTTP Methods
ทั้งหมดใช้ POST method

fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'actionName', data: {...} })
})
.then(res => res.json())
.then(data => console.log(data));

📋 API Endpoints
1. Authentication
Login

// Request
{
  action: 'login',
  username: 'admin',
  password: '1234'
}

// Response
{
  success: true,
  user: {
    ITUSERNO: '1',
    USERID: 'admin',
    UserTypeID: 'IT',
    UserTypeName: 'เจ้าหน้าที่ IT',
    UserName: 'ผู้ดูแลระบบ',
    UserPN: 'admin',
    UserMail: 'admin@hospital.go.th'
  }
}

Logout

// Request
{
  action: 'logout',
  email: 'admin@hospital.go.th'
}

// Response
{
  success: true,
  message: 'ออกจากระบบสำเร็จ'
}

Verify First Time (ครั้งแรก)

// Request
{
  action: 'verifyFirstTime',
  email: 'user@hospital.go.th',
  username: 'newuser',
  code: '123456'
}

// Response
{
  success: true,
  message: 'ยืนยันตัวตนสำเร็จ'
}

Set Password

// Request
{
  action: 'setPassword',
  email: 'user@hospital.go.th',
  username: 'newuser',
  password: 'newpassword123'
}

// Response
{
  success: true,
  message: 'บันทึกรหัสผ่านสำเร็จ'
}

Request Password Reset

// Request
{
  action: 'requestPasswordReset',
  email: 'admin@hospital.go.th'
}

// Response
{
  success: true,
  message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมล'
}

2. Job Tickets Management
Get All Job Tickets

// Request
{
  action: 'getJobTickets'
}

// Response
{
  success: true,
  data: [
    {
      JobID: 'JOB-2024-001',
      CreateDate: '2024-01-15T10:30:00Z',
      CreateBy: 'user001',
      Source: 'แจ้งออนไลน์',
      JobType: 'ซ่อมคอมพิวเตอร์',
      AssetCode: 'PC-001',
      AssetName: 'คอมพิวเตอร์ตั้งโต๊ะ',
      Department: 'ห้องตรวจ 1',
      Problem: 'เครื่องเปิดไม่ติด',
      Priority: 'สูง',
      Status: 'รอรับงาน',
      Owner: '',
      StartTime: '',
      CloseTime: ''
    }
  ]
}

Update Job Ticket

// Request
{
  action: 'updateJobTicket',
  jobId: 'JOB-2024-001',
  updates: {
    Status: 'กำลังดำเนินการ',
    Owner: 'admin',
    StartTime: '2024-01-15T11:00:00Z',
    RiskNote: 'หมายเหตุเพิ่มเติม'
  }
}

// Response
{
  success: true,
  message: 'อัปเดตงานสำเร็จ'
}

Get Job Ticket Detail

// Request
{
  action: 'getJobDetail',
  jobId: 'JOB-2024-001'
}

// Response
{
  success: true,
  data: {
    JobID: 'JOB-2024-001',
    // ... full job details
  }
}

3. IT Tickets (Activity Logging)
Get IT Tickets

// Request
{
  action: 'getITTickets'
}

// Response
{
  success: true,
  data: [
    {
      TicketID: 'IT-2024-001',
      JobType: 'ซ่อมคอมพิวเตอร์',
      SubType: 'เปลี่ยนอุปกรณ์',
      Department: 'ห้องตรวจ 1',
      Asset: 'PC-001',
      Description: 'เปลี่ยน RAM 8GB',
      Status: 'เสร็จสิ้น',
      CreatedBy: 'admin',
      CreatedDate: '2024-01-15T12:00:00Z'
    }
  ]
}

Add IT Ticket (บันทึกกิจกรรม)

// Request
{
  action: 'addITTicket',
  ticket: {
    JobType: 'ซ่อมคอมพิวเตอร์',
    SubType: 'เปลี่ยนอุปกรณ์',
    Department: 'ห้องตรวจ 1',
    Asset: 'PC-001',
    Description: 'เปลี่ยน RAM 8GB',
    Status: 'เสร็จสิ้น'
  }
}

// Response
{
  success: true,
  ticketId: 'IT-2024-001',
  message: 'บันทึกกิจกรรมสำเร็จ'
}

4. Master Data
Get IT Users

// Request
{
  action: 'getITUsers'
}

// Response
{
  success: true,
  data: [
    {
      ITUSERNO: '1',
      UserName: 'ผู้ดูแลระบบ',
      UserPN: 'admin',
      UserTypeID: 'IT'
    }
  ]
}

Get Departments

// Request
{
  action: 'getDepartments'
}

// Response
{
  success: true,
  data: [
    {
      DeptID: '1',
      Note3: 'ห้องตรวจ 1'
    }
  ]
}

Get Assets

// Request
{
  action: 'getAssets'
}

// Response
{
  success: true,
  data: [
    {
      AssetID: 'PC-001',
      AssetName: 'คอมพิวเตอร์ตั้งโต๊ะ Dell'
    }
  ]
}

Get Job Types

// Request
{
  action: 'getJobTypes'
}

// Response
{
  success: true,
  data: [
    {
      TypeID: '1',
      TypeName: 'ซ่อมคอมพิวเตอร์'
    }
  ]
}

Get Job Sub Types

// Request
{
  action: 'getJobSubTypes'
}

// Response
{
  success: true,
  data: [
    {
      SubTypeID: '1',
      TypeID: '1',
      SubTypeName: 'เปลี่ยนอุปกรณ์'
    }
  ]
}

Get System Links

// Request
{
  action: 'getSystemLinks'
}

// Response
{
  success: true,
  data: [
    {
      LinkID: '1',
      Name: 'HOSxP',
      URL: 'http://hosxp.hospital.go.th',
      RoleAllow: 'ALL',
      Active: 'Y',
      Linkicon: '🏥'
    }
  ]
}

5. Logging & Audit
Add Log (บันทึกการทำกิจกรรม)

// Request
{
  action: 'addLog',
  email: 'admin@hospital.go.th',
  action: 'LOGIN',
  status: 'SUCCESS',
  message: 'เข้าสู่ระบบสำเร็จ',
  timestamp: '2024-01-15T10:30:00Z'
}

// Response
{
  success: true,
  logId: 'LOG-2024-001',
  message: 'บันทึกสำเร็จ'
}

Get Logs

// Request
{
  action: 'getLogs',
  email: 'admin@hospital.go.th',
  limit: 100
}

// Response
{
  success: true,
  data: [
    {
      logId: 'LOG-2024-001',
      email: 'admin@hospital.go.th',
      action: 'LOGIN',
      status: 'SUCCESS',
      message: 'เข้าสู่ระบบสำเร็จ',
      timestamp: '2024-01-15T10:30:00Z'
    }
  ]
}

🎯 Response Format
Success Response
{
  success: true,
  data: { /* specific data */ },
  message: 'สำเร็จ'
}

Error Response
{
  success: false,
  error: 'ERROR_CODE',
  message: 'รายละเอียดข้อผิดพลาด'
}

⏱️ Status Codes & Messages
🔒 Security Headers
// ต้องเพิ่มใน Google Apps Script
function doPost(e) {
  const response = HtmlService.createHtmlOutput('...');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-XSS-Protection', '1; mode=block');
  return response;
}

📊 Rate Limiting
- 60 requests per minute per user
- 1000 requests per hour per sheet
- 10MB payload limit

🔄 Example: Complete Flow
// 1. Login
const loginResult = await callApi('login', {
  username: 'admin',
  password: '1234'
});

if (!loginResult.success) throw new Error('Login failed');

const user = loginResult.user;
sessionStorage.setItem('user', JSON.stringify(user));

// 2. Get all tickets
const ticketsResult = await callApi('getJobTickets');
const tickets = ticketsResult.data;

// 3. Get departments for dropdown
const deptsResult = await callApi('getDepartments');
const departments = deptsResult.data;

// 4. Update a ticket
const updateResult = await callApi('updateJobTicket', {
  jobId: 'JOB-2024-001',
  updates: {
    Status: 'กำลังดำเนินการ',
    Owner: 'admin',
    StartTime: new Date().toISOString()
  }
});

// 5. Log the action
await callApi('addLog', {
  email: user.UserMail,
  action: 'UPDATE_JOB',
  status: 'SUCCESS',
  message: 'อัปเดตงาน JOB-2024-001'
});

// 6. Logout
await callApi('logout', {
  email: user.UserMail
});

🛠️ Helper Functions
// Call API
async function callApi(action, data = {}) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, sheetId: SHEET_ID, ...data })
    });
    
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Generate unique ID
function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now()}`;
}

📚 References
https://developers.google.com/apps-script/reference
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://www.json.org/
Last Updated: 2024
API Version: 1.0.0
