// አፑ መጫኑን ለማረጋገጥ
window.onload = function() {
    let tg = window.Telegram.WebApp;
    tg.expand();

    // 1. የተጫዋቹን ስም መቀየር
    let welcomeMsg = document.getElementById("welcome-user");
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        welcomeMsg.innerText = `Welcome, ${tg.initDataUnsafe.user.first_name}!`;
    }

    // 2. የ Rules ሳጥን ስራ
    let modal = document.getElementById("rules-modal");
    let btn = document.getElementById("rules-btn");
    let span = document.querySelector(".close");

    if (btn) {
        btn.onclick = function() { modal.style.display = "block"; }
    }
    if (span) {
        span.onclick = function() { modal.style.display = "none"; }
    }

    window.onclick = function(event) {
        if (event.target == modal) { modal.style.display = "none"; }
    }

    // 3. የብር መጠን (0 ይሁን)
    let balanceElement = document.getElementById("user-balance");
    if (balanceElement) {
        balanceElement.innerText = "0";
    }

    // 4. PLAY 10 ሲነካ መልእክት እንዲያሳይ (በጣም ወሳኙ ክፍል)
    let playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.onclick = function() {
            tg.showAlert("ጨዋታው በቅርብ ቀን ይጀምራል!");
        };
    }
};
