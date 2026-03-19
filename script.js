/**
 * 1. Rules መክፈቻና መዝጊያ (ለ index.html)
 * ይህ ፈንክሽን ከላይ መኖሩ ለ HTML onclick='toggleRules()' ጥሪ አስፈላጊ ነው
 */
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

/**
 * ገጹ ተጭኖ ሲያልቅ (DOM Content Loaded) የሚሰሩ ስራዎች
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- ሀ. Play Button Alert (ለ index.html) ---
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            alert("ጨዋታው በቅርቡ ይጀምራል... 🎮 \nComing Soon!");
        });
    }

    // --- ለ. DAILY / WEEKLY መቀያየሪያ (ለ scores.html) ---
    // በፎቶህ ላይ ያየሁትን structure (toggle-container) መሰረት ያደረገ
    const toggleContainer = document.querySelector('.toggle-container');
    
    if (toggleContainer) {
        const buttons = toggleContainer.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                // 1. መጀመሪያ ሁሉንም አዝራሮች ወደ መደበኛ ቀለም መልስ
                buttons.forEach(b => {
                    b.classList.remove('toggle-active'); // የበራውን ከለር አጥፋ
                    b.classList.add('text-gray-500');    // ግራጫ ከለር ጨምር
                    // ካልሰራ በቀጥታ ስታይል መቀየር፡
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#6b7280';
                });

                // 2. አሁን የተነካውን (የተመረጠውን) አዝራር አብራ
                this.classList.add('toggle-active');
                this.classList.remove('text-gray-500');
                // በቀጥታ ስታይል መቀየር (በፎቶው ላይ እንዳለው ደማቅ እንዲሆን)፡
                this.style.backgroundColor = '#374151'; 
                this.style.color = '#ffffff';

                // 3. ዳታውን መቀየር (ለጊዜው በኮንሶል እናሳይ)
                if (this.innerText.includes("WEEKLY")) {
                    console.log("Weekly Scores Activated");
                    // ወደፊት የሳምንቱን ዝርዝር እዚህ ጋር እናመጣለን
                } else {
                    console.log("Daily Scores Activated");
                    // ወደፊት የዕለቱን ዝርዝር እዚህ ጋር እናመጣለን
                }
            });
        });
    }

    // --- ሐ. Navigation Glow (ከፎቶህ ላይ የነበረ) ---
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        // አስፈላጊ ከሆነ እዚህ ጋር የናቪጌሽን ሎጂክ መጨመር ይቻላል
    });

});
