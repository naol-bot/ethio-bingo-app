// ቴሌግራምን ማገናኘት
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
let span = document.getElementsByClassName("close")[0];

if (btn) {
    btn.onclick = function() { modal.style.display = "block"; }
}
if (span) {
    span.onclick = function() { modal.style.display = "none"; }
}

window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}

// 3. የብር መጠን (መጀመሪያ 0 ይሁን)
document.getElementById("user-balance").innerText = "0";

// 4. አዲሱ ኮድ፡ PLAY 10 ሲነካ መልእክት እንዲያሳይ
document.querySelector('.play-btn').addEventListener('click', () => {
    tg.showAlert("ጨዋታው በቅርብ ቀን ይጀምራል!");
});
