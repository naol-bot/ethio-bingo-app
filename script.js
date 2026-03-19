// 1. Rules መክፈቻና መዝጊያ
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // --- ሀ. Play Button Alert ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            alert("ጨዋታው በቅርቡ ይጀምራል... 🎮 \nComing Soon!");
        });
    }

    // --- ለ. Daily/Weekly መቀያየሪያ ሎጂክ ---
    const container = document.querySelector('.toggle-container');
    if (container) {
        const buttons = container.querySelectorAll('button');
        
        // እዚህ ጋር ዳታውን የሚይዙ ኤለመንቶችን እንፈልጋለን (ለምሳሌ የዝርዝሩ መያዣ ID 'playerList' ከሆነ)
        const playerList = document.getElementById('playerList'); 

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Button Visual Change
                buttons.forEach(b => {
                    b.classList.remove('toggle-active');
                    b.classList.add('text-gray-500');
                });
                this.classList.add('toggle-active');
                this.classList.remove('text-gray-500');

                // ዳታውን የመቀየር ስራ
                if (this.innerText.includes("WEEKLY")) {
                    console.log("Weekly list loading...");
                    // እዚህ ጋር የ Weekly ተጫዋቾችን ዝርዝር የሚቀይር ኮድ ይታከላል
                } else {
                    console.log("Daily list loading...");
                    // እዚህ ጋር የ Daily ተጫዋቾችን ዝርዝር የሚቀይር ኮድ ይታከላል
                }
            });
        });
    }
});
