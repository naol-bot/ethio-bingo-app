// 1. Rules መክፈቻና መዝጊያ (ለ index.html)
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) modal.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 2. SCORES PAGE LOGIC (ለ scores.html)
    // ==========================================
    const dailyPlayers = [
        { rank: 1, name: "@ናርዶስ ፈቃዱ", score: 66, class: "rank-gold" },
        { rank: 2, name: "@FEታ", score: 58, class: "rank-silver" },
        { rank: 3, name: "@BETINA", score: 58, class: "rank-bronze" },
        { rank: 4, name: "@SEBLE BAMI", score: 46, class: "rank-default" }
    ];

    const weeklyPlayers = [
        { rank: 1, name: "@WASE_KING", score: 7500, class: "rank-gold" },
        { rank: 2, name: "@ETHIO_BINGO", score: 6200, class: "rank-silver" },
        { rank: 3, name: "@PLAYER_ONE", score: 5800, class: "rank-bronze" }
    ];

    function updateLeaderboard(players, type) {
        const listContainer = document.getElementById('playerList');
        if (!listContainer) return;

        let html = `<p class="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 pl-1">Top 10 Players (${type})</p>`;
        players.forEach(p => {
            html += `
                <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 ${p.class} rounded-xl flex items-center justify-center font-black italic text-lg shadow-lg">${p.rank}</div>
                        <span class="font-bold text-sm tracking-wide text-gray-200">${p.name}</span>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-lg leading-none">${p.score}</p>
                        <p class="text-[8px] text-gray-500 font-bold uppercase mt-1">Games</p>
                    </div>
                </div>`;
        });
        listContainer.innerHTML = html;
    }

    // Score Toggle Buttons
    const toggleButtons = document.querySelectorAll('.toggle-container button');
    if (toggleButtons.length > 0) {
        updateLeaderboard(dailyPlayers, "Daily");
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleButtons.forEach(b => {
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#6b7280';
                });
                this.style.backgroundColor = '#374151'; 
                this.style.color = '#ffffff';
                if (this.innerText.includes("WEEKLY")) {
                    updateLeaderboard(weeklyPlayers, "Weekly");
                } else {
                    updateLeaderboard(dailyPlayers, "Daily");
                }
            });
        });
    }

    // ==========================================
    // 3. HISTORY PAGE LOGIC (ለ history.html)
    // ==========================================
    const historyList = document.getElementById('historyList');
    if (historyList) {
        // የጨዋታ ታሪክ ዳታ (ከፎቶህ ላይ የተወሰደ)
        const gameHistory = [
            { id: "#DBIYE4Q1", stake: 10, win: 632, date: "19/3/2026", time: "07:54 PM" },
            { id: "#DB6C7LBP", stake: 10, win: 640, date: "19/3/2026", time: "07:52 PM" },
            { id: "#DBM5BI0B", stake: 10, win: 544, date: "19/3/2026", time: "07:50 PM" },
            { id: "#DBFYF1E4", stake: 10, win: 268, date: "19/3/2026", time: "07:48 PM" },
            { id: "#DBXYJ2QR", stake: 10, win: 162, date: "19/3/2026", time: "07:44 PM" }
        ];

        let historyHtml = "";
        gameHistory.forEach(game => {
            historyHtml += `
                <div class="score-card p-4 rounded-[1.5rem] flex justify-between items-center border border-white/5 bg-white/5 mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 text-xl">🏆</div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="font-black text-green-500 text-[12px]">BINGO VICTORY</h4>
                                <span class="text-[9px] opacity-40 font-mono">${game.id}</span>
                            </div>
                            <p class="text-[10px] opacity-60 font-bold uppercase tracking-wider">Stake: ${game.stake} ETB • ${game.date}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-green-400 font-black text-lg leading-none">+${game.win} <span class="text-[10px]">ETB</span></p>
                        <p class="text-[9px] opacity-40 font-bold mt-1">${game.time}</p>
                    </div>
                </div>`;
        });
        historyList.innerHTML = historyHtml;
    }

    // 4. Play Button (ለ index.html)
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => alert("ጨዋታው በቅርቡ ይጀምራል... 🎮"));
    }
});
