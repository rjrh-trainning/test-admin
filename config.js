// config.js - ไฟล์ตั้งค่าศูนย์กลางของระบบ RJRH TRAINING CENTER

const SUPABASE_URL = "https://ghgmupyrkeakyolliogv.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ211cHlya2Vha3lvbGxpb2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDE0ODksImV4cCI6MjA5NDgxNzQ4OX0.RSciT8WVeD9bwmo3DlMhw4KsdM1ftgKXka9QI9pvYzs"; 

// Google Apps Script Web App APIs
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbyi4yhs6KQ9ajFJmG9h0jq_Alhm4ko-8vokVSmLy5VZdG_ATpi6JlQ7Py4ykuHjZDwX/exec";
const CERT_STB_API = "https://script.google.com/macros/s/AKfycby0ebBHlmguiJX9RYqX7cBhKV7Cni42Xn6IsJfbjvS2EIZFrBJpu31fI2gQ2Xm5cOEh/exec";

// ประกาศตัวแปรเซสชันเพื่อให้เรียกใช้ร่วมกันได้ง่าย
let supabaseClient;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ฟังก์ชันกลางสำหรับตรวจสอบสิทธิ์ (Route Guard) ถ้าไม่ได้ล็อกอินให้เด้งไปหน้าแรก
async function checkAuthGuard() {
    if (!supabaseClient) return;
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session && !window.location.pathname.endsWith('index.html')) {
        window.location.href = "index.html";
    }
    return session;
}

// ฟังก์ชันสากลสำหรับปุ่ม Log out
async function handleGlobalLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
        window.location.href = "index.html";
    }
}
