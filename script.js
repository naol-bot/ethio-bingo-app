// Rules ሞዳል ለመክፈት እና ለመዝጋት
function toggleRules() {
    const modal = document.getElementById('rulesModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// Play ቁልፍ ሲነካ የሚመጣ መልዕክት
document.getElementById('playBtn').addEventListener('click', function() {
    alert("ጨዋታው በቅርቡ ይጀምራል... ⏳🎮\nComing Soon!");
});
