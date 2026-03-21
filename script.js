// --- 1. Configurations & State ---
let mainWallet = 60; // ይህን ዳታ በኋላ ከDatabase ትቀይረዋለህ
let playWallet = 0;
let stakeAmount = 10;
let myPicks = JSON.parse(localStorage.getItem('myBingoPicks')) || [];
let timeLeft = localStorage.getItem('bingoTimer') ? parseInt(localStorage.getItem('bingoTimer')) : 45;
let isLocked = false;
let timerInterval;

// ቋሚ 400 ካርቴላዎች (75 ቦል ቢንጎ)
const BINGO_DATA = {};
function generateAllCartelas() {
    for (let i = 1; i <= 400; i++) {
        BINGO_DATA[i] = {
            B: [i%15+1, (i+3)%15+1, (i+5)%15+1, (i+7)%15+1, (i+10)%15+1],
            I: [16+i%15, 19+i%15, 22+i%15, 25+i%15, 28+i%15],
            N: [31+i%15, 34+i%15, "⭐", 40+i%15, 43+i%15],
            G: [46+i%15, 49+i%15, 52+i%15, 55+i%15, 58+i%15],
            O: [61+i%15, 64+i%15, 67+i%15, 70+i%15, 74+i%15]
        };
    }
}
generateAllCartelas();

// --- 2. Initial Setup ---
window.onload = () => {
    updateWalletDisplays();
    if (localStorage.getItem('inGame') === 'true') {
        startPlay();
    }
};

function updateWalletDisplays() {
    document.getElementById('main-wallet-display').innerText = mainWallet;
    document.getElementById('play-wallet-display').innerText = playWallet;
    document.getElementById('totalBalanceDisplay').innerText = mainWallet + playWallet;
}

// --- 3. Core Functions ---
function startPlay() {
    localStorage.setItem('inGame', 'true');
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('mainGameScreen').classList.remove('hidden');
    
    initNumbersGrid();
    startTimer();
    updateCartelaDisplay();
}

function initNumbersGrid() {
    const grid = document.getElementById('numbers-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 400; i++) {
        const btn = document.createElement('div');
        btn.innerText = i;
        btn.id = `num-${i}`;
        let isPicked = myPicks.includes(i);
        btn.className = `text-[10px] py-2 text-center font-black rounded cursor-pointer border transition-all ${isPicked ? 'bg-green-500 border-green-500 text-white' : 'bg-[#1a2a4a] border-gray-700'}`;
        
        btn.onclick = () => toggleNumber(i, btn);
        grid.appendChild(btn);
    }
}

function toggleNumber(num, el) {
    if (isLocked) return; // 4 ሰከንድ ሲቀረው ይቆለፋል

    const index = myPicks.indexOf(num);
    if (index > -1) {
        // Deselect
        myPicks.splice(index, 1);
        el.className = "text-[10px] py-2 text-center font-black rounded cursor-pointer bg-[#1a2a4a] border border-gray-700";
    } else {
        // Select
        if (myPicks.length >= 2) return alert("ከ 2 ካርቴላ በላይ መያዝ አይቻልም!");
        if ((mainWallet + playWallet) < stakeAmount) return alert("Insufficient Balance!");

        myPicks.push(num);
        el.className = "text-[10px] py-2 text-center font-black rounded cursor-pointer bg-green-500 border-green-500 text-white scale-105 shadow-lg";
    }
    localStorage.setItem('myBingoPicks', JSON.stringify(myPicks));
    updateCartelaDisplay();
}

function startTimer() {
    const timerEl = document.getElementById('game-timer');
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        localStorage.setItem('bingoTimer', timeLeft);
        timerEl.innerText = timeLeft + " s";

        if (timeLeft <= 10) {
            timerEl.classList.add('text-red-500', 'border-red-500', 'bg-red-500/20', 'animate-pulse');
        }

        if (timeLeft <= 4) {
            isLocked = true;
            timerEl.innerText = "LOCKED";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem('bingoTimer');
            timerEl.innerText = "STARTING...";
            // እዚህ ጋር ወደ ጨዋታው እንዲሸጋገር ያደርጋል
        }
    }, 1000);
}

function updateCartelaDisplay() {
    const section = document.getElementById('cartela-section');
    const container = document.getElementById('cartela-container');
    
    if (myPicks.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    container.innerHTML = '';
    
    myPicks.forEach(num => {
        const card = BINGO_DATA[num];
        let gridHtml = '';
        
        // Headers
        const colors = ['bg-blue-600', 'bg-purple-600', 'bg-pink-600', 'bg-green-600', 'bg-orange-600'];
        ['B','I','N','G','O'].forEach((h, i) => {
            gridHtml += `<div class="${colors[i]} text-[9px] py-0.5 text-center font-black text-white">${h}</div>`;
        });

        // Grid
        for (let r = 0; r < 5; r++) {
            ['B','I','N','G','O'].forEach(col => {
                let val = card[col][r];
                gridHtml += `<div class="bg-white text-black text-[11px] h-7 flex items-center justify-center font-bold border border-gray-100">
                    ${val === "⭐" ? "<span class='text-yellow-500 text-sm'>⭐</span>" : val}
                </div>`;
            });
        }

        container.innerHTML += `
            <div class="w-[145px] bg-white p-1 rounded-lg shadow-2xl border-2 border-orange-500 overflow-hidden">
                <div class="bg-orange-500 text-white text-[9px] text-center font-black py-0.5 mb-1 uppercase">Cartel #${num}</div>
                <div class="grid grid-cols-5 gap-[1px] bg-gray-200 border border-gray-200">${gridHtml}</div>
            </div>`;
    });
}

function closeGame() {
    localStorage.removeItem('inGame');
    localStorage.removeItem('bingoTimer');
    localStorage.removeItem('myBingoPicks');
    location.reload();
}
