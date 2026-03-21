// ==========================================
// 1. ቋሚ ዳታዎች (400 ካርቴላዎች እና Wallet)
// ==========================================
let mainBalance = 0;   // Win የሚደረግበት
let playBalance = 50;  // Deposit የሚደረግበት (ለሙከራ 50 ተሰጥቷል)
let myPicks = [];      // ተጫዋቹ የያዛቸው ቁጥሮች (Max 2)
let timeLeft = 45;
let timerId = null;

// የካርቴላ ዳታ ማመንጫ (ለሙከራ 400 ቋሚ ካርቴላዎች)
const BINGO_DATABASE = {};
for (let i = 1; i <= 400; i++) {
    BINGO_DATABASE[i] = {
        B: getRandomSet(1, 15),
        I: getRandomSet(16, 30),
        N: getRandomSet(31, 45, true), // FREE በ 3ኛው ቦታ
        G: getRandomSet(46, 60),
        O: getRandomSet(61, 75)
    };
}

function getRandomSet(min, max, isN = false) {
    let set = [];
    while(set.length < 5) {
        let r = Math.floor(Math.random() * (max - min + 1)) + min;
        if(!set.includes(r)) set.push(r);
    }
    if(isN) set[2] = "FREE";
    return set;
}

// ==========================================
// 2. የጨዋታው ዋና ተግባራት (Game Logic)
// ==========================================

// ጨዋታውን ለመጀመር (Play 10 ሲነካ)
function initBingoGame() {
    updateWalletDisplays();
    generateNumberGrid();
    startRegistrationTimer();
}

// 1-400 ቁጥሮችን መፍጠር
function generateNumberGrid() {
    const grid = document.getElementById('numbers-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for (let i = 1; i <= 400; i++) {
        const btn = document.createElement('div');
        btn.id = `num-${i}`;
        btn.innerText = i;
        btn.className = "bg-gray-800/40 border border-gray-700 rounded-lg py-3 text-center text-xs font-black cursor-pointer transition-all active:scale-95";
        btn.onclick = () => attemptToPickNumber(i, btn);
        grid.appendChild(btn);
    }
}

// ቁጥር ለመያዝ ሲሞከር
function attemptToPickNumber(num, element) {
    if (timeLeft <= 0) return alert("የመመዝገቢያ ጊዜ አብቅቷል!");
    if (myPicks.includes(num)) return; // ቀድሞ ከተመረጠ
    if (myPicks.length >= 2) return alert("ቢበዛ 2 ካርቴላ ብቻ ነው መያዝ የሚቻለው!");

    const stake = 10;
    // Wallet Logic: መጀመሪያ ከ Play Wallet መቀነስ
    if (playBalance >= stake) {
        playBalance -= stake;
    } else if (mainBalance >= stake) {
        mainBalance -= stake;
    } else {
        return alert("በቂ ሂሳብ የለዎትም! እባክዎ Deposit ያድርጉ።");
    }

    myPicks.push(num);
    element.style.backgroundColor = "#22c55e"; // Green
    element.style.borderColor = "#22c55e";
    element.classList.add("shadow-[0_0_15px_rgba(34,197,94,0.5)]");
    
    updateWalletDisplays();
    renderCartela(num);
}

// የ 5x5 ካርቴላ ማሳያ
function renderCartela(num) {
    const section = document.getElementById('cartela-section');
    const grid = document.getElementById('cartela-grid');
    const label = document.getElementById('cartela-label');
    const card = BINGO_DATABASE[num];

    section.classList.remove('hidden');
    label.innerText = `CARTEL #${num}`;
    grid.innerHTML = '';

    const cols = ['B', 'I', 'N', 'G', 'O'];
    for (let row = 0; row < 5; row++) {
        cols.forEach(col => {
            const val = card[col][row];
            const cell = document.createElement('div');
            cell.className = "bg-white text-black h-10 flex items-center justify-center font-bold text-sm border-b border-r border-gray-200";
            
            if (val === "FREE") {
                cell.innerHTML = "⭐";
                cell.className += " bg-teal-400 text-white";
            } else {
                cell.innerText = val;
            }
            grid.appendChild(cell);
        });
    }
    section.scrollIntoView({ behavior: 'smooth' });
}

// 45 ሰከንድ ቆጣሪ
function startRegistrationTimer() {
    timeLeft = 45;
    if (timerId) clearInterval(timerId);
    
    const timerDisplay = document.getElementById('game-timer');
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft + " s";
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerDisplay.innerText = "CLOSED";
            alert("ምዝገባ ተዘግቷል! ጨዋታው ይጀምራል።");
        }
    }, 1000);
}

function updateWalletDisplays() {
    if(document.getElementById('main-wallet-display')) 
        document.getElementById('main-wallet-display').innerText = mainBalance;
    if(document.getElementById('play-wallet-display')) 
        document.getElementById('play-wallet-display').innerText = playBalance;
    if(document.getElementById('mainBalanceDisplay'))
        document.getElementById('mainBalanceDisplay').innerText = mainBalance;
}

// Rules Toggle
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) modal.classList.toggle('hidden');
}

// ==========================================
// 3. ያንተ ነባር ኮድ (Scores, History, Wallet)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Leaderboard ዳታ
    const dailyPlayers = [
        { rank: 1, name: "@ናርዶስ ፈቃዱ", score: 66, class: "rank-gold" },
        { rank: 2, name: "@FEታ", score: 58, class: "rank-silver" },
        { rank: 3, name: "@BETINA", score: 58, class: "rank-bronze" }
    ];

    const historyList = document.getElementById('historyList');
    if (historyList) {
        const gameHistory = [
            { id: "#DBIYE4Q1", stake: 10, win: 632, date: "19/3/2026", time: "07:54 PM" },
            { id: "#DB6C7LBP", stake: 10, win: 640, date: "19/3/2026", time: "07:52 PM" }
        ];
        // ... (እዚህ ጋር ያንተ የታሪክ ዝርዝር ኮድ ይቀጥላል)
    }

    // Wallet Activity
    const walletActivity = document.getElementById('walletActivity');
    if (walletActivity) {
        // ... (እዚህ ጋር ያንተ የ Wallet ዝርዝር ኮድ ይቀጥላል)
    }
});
