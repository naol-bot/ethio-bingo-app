// 1. የRules መስኮት እንዲከፈትና እንዲዘጋ የሚያደርግ
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// 2. Play ቁልፍ ሲነካ መልዕክት እንዲያሳይ
document.getElementById('playBtn').addEventListener('click', function() {
    alert("ጨዋታው በቅርቡ ይጀምራል... ⏳🎮\nComing Soon!");
});

// 3. ከስር ያሉ አይኮኖች ሲነኩ እንዲበሩ (Navigation Glow)
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // መጀመሪያ የነበረውን የበራ አይኮን አጥፋ
        navItems.forEach(i => i.classList.remove('active'));
        // አሁን የተነካውን አብራ
        this.classList.add('active');
    });
});
// --- Scores Page Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-container button');
    
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // ሁሉንም አጥፋ
                toggleButtons.forEach(btn => {
                    btn.classList.remove('toggle-active');
                    btn.classList.add('text-gray-500');
                });
                // የተነካውን አብራ
                this.classList.add('toggle-active');
                this.classList.remove('text-gray-500');
                
                // እዚህ ጋር ዳታውን መቀየር ትችላለህ (ለወደፊቱ)
                console.log(this.innerText + " list selected");
            });
        });
    }
});
// በገጹ ላይ ያሉትን ሁሉንም የ toggle ቁልፎች ፈልግ
const setupToggles = () => {
    const container = document.querySelector('.toggle-container');
    if (!container) return;

    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // መጀመሪያ በሁለቱም ላይ ያለውን የነቃ ከለር (toggle-active) አጥፋ
            buttons.forEach(b => {
                b.classList.remove('toggle-active');
                b.classList.add('text-gray-500');
            });
            
            // አሁን የተነካውን ቁልፍ አብራ
            this.classList.add('toggle-active');
            this.classList.remove('text-gray-500');
            
            // እዚህ ጋር የዝርዝር መረጃውን መቀየር ትችላለህ
            console.log(this.innerText + " ተመርጧል");
        });
    });
};

// ገጹ ተጭኖ ሲያልቅ ስራውን ይጀምር
document.addEventListener('DOMContentLoaded', setupToggles);
