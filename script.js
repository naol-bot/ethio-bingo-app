// --- 1. State & Data Initializing ---
let mainWallet = 50; // Sample data - በኋላ ከ database ጋር ይገናኛል
let playWallet = 10; // Sample data
let stakeAmount = 10;
// Refresh ሲደረግ ዳታ እንዳይጠፋ ከ localStorage መጥራት
let myPicks = JSON.parse(localStorage.getItem('myBingoPicks')) || [];
let timeLeft = localStorage.getItem('bingoTimer') ? parseInt(localStorage.getItem('bingoTimer')) : 45;
let isLocked = false;
let timerInterval;

// ቋሚ 400 ካርቴላዎች ዳታ (75 ቦል ቢንጎ ህግ)
const BINGO_DATA = {};
function generateAllCartelas() {
    for (let i = 1; i <= 400; i++) {
        BINGO_DATA[i] = {
            B: [i % 15 + 1, (i + 3) % 15 + 1, (i + 5) % 15 + 1, (i + 7) % 15 + 1, (i + 10) % 15 + 1],
            I: [16 + i % 15, 19 + i % 15, 22 + i % 15, 25 + i % 15, 28 + i % 15],
            N: [31 + i % 15, 34 + i % 15, "⭐", 40 + i % 15, 43 + i % 15],
            G: [46 + i % 15, 49 + i % 15, 52 + i % 15, 55 + i % 15, 58 + i % 15],
            O: [61 + i % 15, 64 + i % 15, 67 + i % 15, 70 + i % 15, 74 + i % 15]
        };
    }
}
generateAllCartelas();

// --- 2. Startup Functions ---
window.onload = () => {
    updateWalletDisplays();
    // Refresh ከተደረገ እና ጨዋታ ላይ ከነበረ ቀጥታ ወደዛው ይመለሳል
    if (localStorage.getItem('inGame') === 'true') {
        startPlay();
    }
};

function updateWalletDisplays() {
    // HTML ላይ ካሉት IDዎች ጋር ማገናኘት
    if(document.getElementById('main-wallet-display')) {
        document.getElementById('main-wallet-display').innerText = mainWallet;
    }
    if(document.getElementById('play-wallet-display')) {
        document.getElementById('play-wallet-display').innerText = playWallet;
    }
    if(document.getElementById('totalBalanceDisplay')) {
        document.getElementById('totalBalanceDisplay').innerText = mainWallet + playWallet;
    }
}

function startPlay() {
    localStorage.setItem('inGame', 'true');
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('mainGameScreen').classList.remove('hidden');
    initNumbersGrid();
    startTimer();
    updateCartelaDisplay();
}

// --- 3. Grid & Selection Logic ---
function initNumbersGrid() {
    const grid = document.getElementById('numbers-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for (let i = 1; i <= 400; i++) {
        const btn = document.createElement('div');
        btn.innerText = i;
        btn.id = `num-${i}`;
        
        let isPicked = myPicks.includes(i);
        // ቁጥሮቹ አነስ እንዲሉ እና በረድፍ 8 እንዲሆኑ ተደርጓል
        btn.className = `text-[10px] py-2 text-center font-black rounded cursor-pointer border transition-all ${
            isPicked ? 'bg-green-500 border-green-500 text-white shadow-inner scale-95' : 'bg-[#1a2a4a] border-gray-700'
        }`;
        
        btn.onclick = () => toggleNumber(i, btn);
        grid.appendChild(btn);
    }
}

function toggleNumber(num, el) {
    if (isLocked) return; // 4 ሰከንድ ሲቀረው መያዝ አይቻልም

    const index = myPicks.indexOf(num);
    if (index > -1) {
        // Deselect (ማጥፋት)
        myPicks.splice(index, 1);
        el.className = "text-[10px] py-2 text-center font-black rounded cursor-pointer bg-[#1a2a4a] border border-gray-700";
    } else {
        // አዲስ ለመያዝ
        if (myPicks.length >= 2) return alert("ቢበዛ 2 ካርቴላ ብቻ ነው መያዝ የሚቻለው!");
        
        // Wallet Check (ብር መኖሩን ማረጋገጫ)
        if ((mainWallet + playWallet) < stakeAmount) {
            return alert("Insufficient Balance! እባክዎ መጀመሪያ ተቀማጭ ያድርጉ።");
        }
        
        myPicks.push(num);
        el.className = "text-[10px] py-2 text-center font-black rounded cursor-pointer bg-green-500 border-green-500 text-white scale-105 shadow-lg";
    }
    
    // ምርጫውን በ localStorage ማስቀመጥ (Refresh መቋቋም)
    localStorage.setItem('myBingoPicks', JSON.stringify(myPicks));
    updateCartelaDisplay();
}

// --- 4. Timer Logic ---
function startTimer() {
    const timerEl = document.getElementById('game-timer');
    if (!timerEl) return;
    
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        localStorage.setItem('bingoTimer', timeLeft);
        timerEl.innerText = timeLeft + " s";

        // ከ 10 ሰከንድ በታች ሲሆን Red መሆን
        if (timeLeft <= 10 && timeLeft > 0) {
            timerEl.classList.add('text-red-500', 'border-red-500', 'bg-red-500/20', 'animate-pulse');
            timerEl.classList.remove('text-yellow-500');
        }

        // ከ 4 ሰከንድ በታች ሲሆን መቆለፍ
        if (timeLeft <= 4 && timeLeft > 0) {
            isLocked = true;
            timerEl.innerText = "LOCKED";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem('bingoTimer');
            timerEl.innerText = "STARTING GAME...";
            // ሰዓቱ ሲያልቅ የሚፈጠረውን የጨዋታ ሂደት እዚህ እንቀጥላለን
            timerEl.classList.replace('text-red-500', 'text-green-500');
        }
    }, 1000);
}

// --- 5. Cartela Display Logic ---
function updateCartelaDisplay() {
    const section = document.getElementById('cartela-section');
    const container = document.getElementById('cartela-container');
    
    if (!container) return;

    if (myPicks.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    container.innerHTML = ''; // ማጽዳት
    
    myPicks.forEach(num => {
        const card = BINGO_DATA[num];
        let gridHtml = '';
        
        // Header (B-I-N-G-O) ከለር ያላቸው
        const headerColors = ['bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-green-600', 'bg-orange-600'];
        ['B','I','N','G','O'].forEach((h, i) => {
            gridHtml += `<div class="${headerColors[i]} text-[9px] py-1 text-center font-black text-white">${h}</div>`;
        });

        // 5x5 Grid (ቁጥሮችን መደርደር)
        for (let r = 0; r < 5; r++) {
            ['B','I','N','G','O'].forEach(col => {
                let val = card[col][r];
                gridHtml += `<div class="bg-white text-black text-[11px] h-8 flex items-center justify-center font-bold border border-gray-100 shadow-sm">
                    ${val === "⭐" ? "<span class='text-yellow-500 text-lg'>⭐</span>" : val}
                </div>`;
            });
        }

        // የካርቴላው ካርድ ዲዛይን
        container.innerHTML += `
            <div class="w-[145px] bg-white p-1 rounded-xl shadow-2xl overflow-hidden border-2 border-orange-500 transition-all transform hover:scale-105">
                <div class="bg-orange-500 text-white text-[10px] text-center font-black py-1 mb-1 uppercase tracking-tighter">CARTEL #${num}</div>
                <div class="grid grid-cols-5 gap-[1px] bg-gray-200 border border-gray-200">
                    ${gridHtml}
                </div>
            </div>`;
    });
}

function closeGame() {
    // ሁሉንም ዳታ አጽድቶ ወደ ፊት ገጽ መመለስ
    localStorage.removeItem('inGame');
    localStorage.removeItem('bingoTimer');
    localStorage.removeItem('myBingoPicks');
    location.reload(); 
}
