let tg = window.Telegram.WebApp;
tg.expand(); // አፑን ሙሉ ገጽ ያደርገዋል

// የተጫዋቹን ስም ለመቀየር
const welcomeTitle = document.querySelector('.welcome-section p');
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    welcomeTitle.innerText = `Welcome, ${tg.initDataUnsafe.user.first_name}!`;
}

// ለጊዜው የብር መጠኑን 100 እናድርገው (በኋላ ከዳታቤዝ እናመጣዋለን)
document.getElementById('user-balance').innerText = "100.00 ETB";

// የ Play Button ሲነካ የሚሆን ነገር
document.querySelector('.play-btn').addEventListener('click', () => {
    tg.showAlert("ጨዋታው በቅርብ ቀን ይጀምራል!");
});
