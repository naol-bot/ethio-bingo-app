let tg = window.Telegram.WebApp;
tg.expand();

window.onload = function() {
    // የተጫዋች ስም
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        document.getElementById("welcome-user").innerText = "Welcome, " + tg.initDataUnsafe.user.first_name;
    }

    // Rules Modal
    let modal = document.getElementById("rules-modal");
    let btn = document.getElementById("rules-btn");
    let span = document.getElementById("close-modal");

    btn.onclick = function() { modal.style.display = "block"; }
    span.onclick = function() { modal.style.display = "none"; }
    window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }

    // Play Alert
    document.querySelector('.play-btn').onclick = function() {
        tg.showAlert("ጨዋታው በቅርብ ቀን ይጀምራል!");
    };
};
