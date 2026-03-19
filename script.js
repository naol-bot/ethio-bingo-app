// 1. ለ index.html (ከድሮው ፋይልህ ላይ የተወሰደ)
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) modal.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. ለ index.html (Play button)
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => alert("Coming Soon!"));
    }

    // 3. ለ scores.html (አዲሱ DAILY/WEEKLY መቀያየሪያ)
    const toggleContainer = document.querySelector('.toggle-container');
    if (toggleContainer) {
        const buttons = toggleContainer.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => {
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#6b7280';
                });
                this.style.backgroundColor = '#374151'; 
                this.style.color = '#ffffff';
                console.log(this.innerText + " ተመረጠ");
            });
        });
    }
});
