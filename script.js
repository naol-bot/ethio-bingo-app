// --- 1. Configurations & State ---
let mainWallet = 60; // Sample data - ከDatabase ጋር ይገናኛል
let playWallet = 0;
let stakeAmount = 10;
// Refresh ሲደረግ ዳታ እንዳይጠፋ ከ localStorage መጥራት
let myPicks = JSON.parse(localStorage.getItem('dilBingoPicks')) || [];
let timeLeft = localStorage.getItem('dilBingoTimer') ? parseInt(localStorage.getItem('dilBingoTimer')) : 45;
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
    if (localStorage.getItem('dilInGame') === 'true') {
        startPlay();
    }
};

function updateWalletDisplays() {
    // Welcome Screen ላይ ያለው Balance
    if(document.getElementById('totalBalanceDisplay')) {
        document.getElementById('totalBalanceDisplay').innerText = mainWallet + playWallet;
    }
    // Game Screen ላይ ያሉት Wallet IDs
    if(document.getElementById('main-wallet-val')) {
        document.getElementById('main-wallet-val').innerText = mainWallet;
    }
    if(document.getElementById('play-wallet-val')) {
        document.getElementById('play-wallet-val').innerText = playWallet;
    }
}

function startPlay() {
    localStorage.setItem('dilInGame', 'true');
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
        // Dil Bingo Style: አነስ ያሉ ቁጥሮች እና ለስላሳ Border
        btn.className = `text-[10px] py-2 text-center font-bold rounded-xl border transition-all ${
            isPicked ? 'bg-orange-500 border-orange-400 text-white shadow-lg' : 'bg-gray-800/40 border-gray-700 text-gray-400'
        }`;
        
        btn.onclick = () => toggleNumber(i, btn);
        grid.appendChild(btn);
    }
}

function toggleNumber(num, el) {
    if (isLocked) return; // 4 ሰከንድ ሲቀረው መቆለፍ

    const index = myPicks.indexOf(num);
    if (index > -1) {
        // Deselect
        myPicks.splice(index, 1);
        el.className = "text-[10px] py-2 text-center font-bold rounded-xl border bg-gray-800/40 border-gray-700 text-gray-400";
    } else {
        // አዲስ ለመያዝ Wallet Check
        if (myPicks.length >= 2) return; // ቢበዛ 2 ካርቴላ
        
        if ((mainWallet + playWallet) < stakeAmount) {
            alert("Insufficient Balance! እባክዎ ባላንስ ይሙሉ።");
            return;
        }
        
        myPicks.push(num);
        el.className = "text-[10px] py-2 text-center font-bold rounded-xl border bg-orange-500 border-orange-400 text-white shadow-lg scale-95";
    }
    
    localStorage.setItem('dilBingoPicks', JSON.stringify(myPicks));
    updateCartelaDisplay();
}

// --- 4. Timer Logic ---
function startTimer() {
    const timerEl = document.getElementById('game-timer');
    if (!timerEl) return;
    
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        localStorage.setItem('dilBingoTimer', timeLeft);
        timerEl.innerText = timeLeft + " s";

        // 🔴 10 ሰከንድ ሲቀረው ቀይ መሆን
        if (timeLeft <= 10 && timeLeft > 0) {
            timerEl.classList.replace('text-yellow-500', 'text-red-500');
            timerEl.classList.add('animate-pulse', 'border-red-500');
        }

        // 🔒 4 ሰከንድ ሲቀረው መቆለፍ
        if (timeLeft <= 4 && timeLeft > 0) {
            isLocked = true;
            timerEl.innerText = "LOCKED";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.innerText = "STARTING...";
            timerEl.classList.remove('animate-pulse');
            // እዚህ ጋር የኳስ ማውጫውን ፈንክሽን እንጠራለን
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
    container.innerHTML = '';
    
    myPicks.forEach(num => {
        const card = BINGO_DATA[num];
        let gridHtml = '';
        
        // Header Colors (B-I-N-G-O) - በፎቶው መሰረት
        const colors = ['bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-green-600', 'bg-orange-600'];
        ['B','I','N','G','O'].forEach((h, i) => {
            gridHtml += `<div class="${colors[i]} text-[9px] py-1 text-center font-black text-white">${h}</div>`;
        });

        // 5x5 Grid
        for (let r = 0; r < 5; r++) {
            ['B','I','N','G','O'].forEach(col => {
                let val = card[col][r];
                gridHtml += `<div class="bg-white text-black text-[11px] h-8 flex items-center justify-center font-bold border border-gray-100">
                    ${val === "⭐" ? "<span class='text-yellow-500 text-lg'>⭐</span>" : val}
                </div>`;
            });
        }

        container.innerHTML += `
            <div class="w-[155px] bg-white p-1 rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-500 transform transition-all">
                <div class="bg-orange-500 text-white text-[10px] text-center font-black py-1 mb-1 italic uppercase">Cartel #${num}</div>
                <div class="grid grid-cols-5 gap-[1px] bg-gray-200 border border-gray-200">
                    ${gridHtml}
                </div>
            </div>`;
    });
}

function closeGame() {
    // ሁሉንም ዳታ አጽድቶ ወደ መጀመሪያው ገጽ መመለስ
    localStorage.removeItem('dilInGame');
    localStorage.removeItem('dilBingoTimer');
    localStorage.removeItem('dilBingoPicks');
    location.reload();
}
