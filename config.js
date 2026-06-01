// config.js - ไฟล์ตั้งค่าศูนย์กลางของระบบ RJRH TRAINING CENTER

const SUPABASE_URL = "https://ghgmupyrkeakyolliogv.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ211cHlya2Vha3lvbGxpb2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDE0ODksImV4cCI6MjA5NDgxNzQ4OX0.RSciT8WVeD9bwmo3DlMhw4KsdM1ftgKXka9QI9pvYzs"; 

// 🎯 Google Apps Script Web App APIs 
// ⚠️ สำคัญมาก: ตรงนี้ต้องมั่นใจว่าเป็น URL ที่ได้จากการ Deploy "เวอร์ชันใหม่" (New Version) หลังจากที่เราแยกไฟล์ GAS แล้วนะครับ
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbw1bS3fjGQngjLdKssc8yWzmbQ1gKOvTvUxraCU2eIHNxjvyyAj3iIqGcey_ETZK3pk/exec";
const MAIN_REG_API_URL = GOOGLE_SHEET_API; // 🛠️ เสริมตัวแปรนี้เข้ามาเพื่อรองรับโค้ดเก่าใน checkin.html ไม่ให้หลุดโฟลว์

const CERT_STB_API = "https://script.google.com/macros/s/AKfycbwPVTBu8ykhFvQQ0vCmAamXikaUC-wAA7DHI7pa1k0Y50sGK2BrLNXYLFcA9kUh76Fh/exec";
const CERT_BLS_API = "https://script.google.com/macros/s/AKfycbxeH8fwOwWeOh83K5zORNVtq5O1ZnNLZDAB79Ic2wyJWZjWRK9frNkD6_dRs_jl6gNVoA/exec";

// ประกาศตัวแปรเซสชันเพื่อให้เรียกใช้ร่วมกันได้ง่าย
let supabaseClient;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ฟังก์ชันกลางสำหรับตรวจสอบสิทธิ์ (Route Guard) ถ้าไม่ได้ล็อกอินให้เด้งไปหน้าแรก
async function checkAuthGuard() {
    if (!supabaseClient) return;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session && !window.location.pathname.endsWith('index.html')) {
            window.location.href = "index.html";
        }
        return session;
    } catch (e) {
        console.error("Auth Guard Failure:", e);
    }
}

// ฟังก์ชันสากลสำหรับปุ่ม Log out
async function handleGlobalLogout() {
    if (supabaseClient) {
        try {
            await supabaseClient.auth.signOut();
            window.location.href = "index.html";
        } catch (e) {
            console.error("Logout Error:", e);
            window.location.href = "index.html"; // บังคับเด้งออกหน้าแรกแม้จะ SignOut พัง
        }
    }
}
