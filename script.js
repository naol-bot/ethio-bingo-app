// 1. ለ index.html (Rules)
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) modal.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- ዳታ (የተጫዋቾች ዝርዝር) ---
    const dailyData = `
        <p class="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 pl-1">Top 10 Players (Daily)</p>
        <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rank-gold rounded-xl flex items-center justify-center font-black italic text-lg">1</div>
                <span class="font-bold text-sm">@ናርዶስ ፈቃዱ</span>
            </div>
            <div class="text-right"><p class="font-black text-lg">66</p><p class="text-[8px] text-gray-500 uppercase">Games</p></div>
        </div>
        <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rank-silver rounded-xl flex items-center justify-center font-black italic text-lg">2</div>
                <span class="font-bold text-sm">@FEታ</span>
            </div>
            <div class="text-right"><p class="font-black text-lg">58</p><p class="text-[8px] text-gray-500 uppercase">Games</p></div>
        </div>
    `;

    const weeklyData = `
        <p class="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4 pl-1">Top 10 Players (Weekly)</p>
        <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rank-gold rounded-xl flex items-center justify-center font-black italic text-lg">1</div>
                <span class="font-bold text-sm">@አቤል_የሳምንቱ_አሸናፊ</span>
            </div>
            <div class="text-right"><p class="font-black text-lg">450</p><p class="text-[8px] text-gray-500 uppercase">Games</p></div>
        </div>
        <div class="score-card p-4 rounded-[1.2rem] flex justify-between items-center mb-3">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rank-silver rounded-xl flex items-center justify-center font-black italic text-lg">2</div>
                <span class="font-bold text-sm">@ቤቲ_ቢንጎ</span>
            </div>
            <div class="text-right"><p class="font-black text-lg">380</p><p class="text-[8px] text-gray-500 uppercase">Games</p></div>
        </div>
    `;

    // --- ሎጂክ ---
    const toggleContainer = document.querySelector('.toggle-container');
    const scoreListContainer = document.querySelector('.space-y-3'); // ስሞቹ ያሉበት ቦታ

    if (toggleContainer && scoreListContainer) {
        const buttons = toggleContainer.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                // 1. Button Color Change
                buttons.forEach(b => {
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#6b7280';
                });
                this.style.backgroundColor = '#374151'; 
                this.style.color = '#ffffff';

                // 2. ዳታውን መቀየር
                if (this.innerText.includes("WEEKLY")) {
                    scoreListContainer.innerHTML = weeklyData;
                } else {
                    scoreListContainer.innerHTML = dailyData;
                }
            });
        });
    }
});
