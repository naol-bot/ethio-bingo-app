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
