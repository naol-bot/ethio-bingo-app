// 1. Rules (ለ index.html)
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) modal.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- የተጫዋቾች ዳታ (እዚህ ጋር ስሞቹን መቀየር ትችላለህ) ---
    const dailyPlayers = [
        { rank: 1, name: "@ናርዶስ ፈቃዱ", score: 1048, class: "rank-gold" },
        { rank: 2, name: "@FEታ", score: 1033, class: "rank-silver" },
        { rank: 3, name: "@BETINA", score: 971, class: "rank-bronze" }
    ];

    const weeklyPlayers = [
        { rank: 1, name: "@WASE_KING", score: 7500, class: "rank-gold" },
        { rank: 2, name: "@ETHIO_BINGO", score: 6200, class: "rank-silver" },
        { rank: 3, name: "@PLAYER_ONE", score: 5800, class: "rank-bronze" }
    ];

    // ዝርዝሩን በገጹ ላይ የሚሰራ ፈንክሽን
    function renderPlayers(players, type) {
        const container = document.getElementById('playerList');
        if (!container) return;

        let html = `<p class="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 pl-1">Top 10 Players (${type})</p>`;
        
        players.forEach(p => {
            html += `
                <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 ${p.class} rounded-xl flex items-center justify-center font-black italic text-lg shadow-lg">${p.rank}</div>
                        <span class="font-bold text-sm tracking-wide">${p.name}</span>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-lg leading-none">${p.score}</p>
                        <p class="text-[8px] text-gray-500 font-bold uppercase mt-1">Games</p>
                    </div>
                </div>`;
        });
        container.innerHTML = html;
    }

    // --- የቁልፎች ስራ ---
    const buttons = document.querySelectorAll('.toggle-container button');
    
    // መጀመሪያ ገጹ ሲከፈት የDaily ዳታን አሳይ
    if(document.getElementById('playerList')) renderPlayers(dailyPlayers, "Daily");

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // ከለር መቀየር
            buttons.forEach(b => {
                b.style.backgroundColor = 'transparent';
                b.style.color = '#6b7280';
            });
            this.style.backgroundColor = '#374151'; 
            this.style.color = '#ffffff';

            // መረጃውን መቀየር
            if (this.innerText.includes("WEEKLY")) {
                renderPlayers(weeklyPlayers, "Weekly");
            } else {
                renderPlayers(dailyPlayers, "Daily");
            }
        });
    });

    // Play Button (ለ index.html)
    const playBtn = document.getElementById('playBtn');
    if (playBtn) playBtn.addEventListener('click', () => alert("Coming Soon!"));
});
