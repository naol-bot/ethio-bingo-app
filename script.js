// የቴሌግራም Mini App መገናኛ
const tg = window.Telegram.WebApp;
tg.expand(); // ሙሉ ስክሪን እንዲሆን

// በፎቶ የላክካቸው የአማርኛ ህጎች ዝርዝር
const rulesData = [
    {
        title: "መረጣ",
        content: `
            <div class="rule-step"><div class="step-num">1</div><p><b>ካርድ ይምረጡ፦</b> ጨዋታውን ለመጀመር ከሚመጣልን ከ1-300 የመጫወቻ ካርድ ውስጥ አንዱን እንመርጣለን።</p></div>
            <div class="rule-step"><div class="step-num">2</div><p><b>ቀይ ምልክት፦</b> በመጫወቻ ካርዱ ላይ በቀይ ቀለም የተመረጡ ቁጥሮች የሚያሳዩት በሌላ ተጫዋች የተያዙ መሆናቸውን ነው።</p></div>
            <div class="rule-step"><div class="step-num">3</div><p><b>ቅድመ እይታ፦</b> የመጫወቻ ካርዱን ስንነካው ከታች በኩል የካርድ ቁጥሩ የሚዘረዝር መግለጫ ያሳየናል።</p></div>
            <div class="rule-footer">⏳ ወደ ጨዋታው ለመግባት የመረጥነውን ካርድ መመዝገብ ይኖርብናል።</div>
        `
    },
    {
        title: "ጨዋታ",
        content: `
            <div class="rule-step"><div class="step-num">1</div><p><b>መግቢያ፦</b> ወደ ጨዋታው ስንገባ በመረጥነው የካርድ ቁጥር መሰረት ካርድ እናገኛለን።</p></div>
            <div class="rule-step"><div class="step-num">2</div><p><b>የቁጥሮች ጥሪ፦</b> ጨዋታው ሲጀምር ቁጥሮች ከ1 እስከ 75 መጥራት ይጀምራል።</p></div>
            <div class="rule-section"><b>MARKING / መምረጥ፦</b> የሚጠራው ቁጥር የእኛ ካርድ ውስጥ ካለ በንክኪ እንመርጣለን።</div>
            <div class="rule-section"><b>UNMARKING / ማጥፋት፦</b> በስህተት የመረጥነውን ቁጥር በድጋሚ በመንካት ማጥፋት እንችላለን።</div>
        `
    },
    {
        title: "አሸናፊ",
        content: `
            <div class="win-banner">አሸናፊ ለመሆን</div>
            <p class="win-text">ቁጥሮች ሲጠሩ በካርዳችን ላይ እየመረጥን ወደ ጎን፣ ወደ ታች፣ በአግድም ወይም አራቱን ማዕዘናት ከሞላን ወዲያውኑ <b>BINGO</b> የሚለውን በመንካት ማሸነፍ እንችላለን።</p>
            <div class="win-icons">
                <div class="w-icon">➡<span>ወደ ጎን</span></div>
                <div class="w-icon">⬇<span>ወደ ታች</span></div>
                <div class="w-icon">↘<span>አግድም</span></div>
                <div class="w-icon">[]<span>አራቱን ማዕዘን</span></div>
            </div>
            <p class="small-note">ሁለት ወይም ከዚያ በላይ ተጫዋቾች እኩል ቢንጎ ካሉ ሽልማቱ እኩል ይከፈላል።</p>
        `
    },
    {
        title: "ቅጣት",
        content: `
            <div class="penalty-banner">የተሳሳተ ቢንጎ (PENALTY)</div>
            <p class="penalty-desc">ተገቢውን መስመር ሳይሞሉ በስህተት Bingo የሚለውን በመጫን ለሌሎች እንቅፋት የሚፈጥሩ ከሆነ ከጨዋታው ይታገዳሉ።</p>
            <div class="penalty-list">
                <div class="p-item">❌ ከጨዋታው ወዲያውኑ መባረር</div>
                <div class="p-item">❌ ያስያዙት ገንዘብ (Stake) አይመለስም</div>
            </div>
        `
    }
];

// Rules ገጽን ለመክፈት
function openRules() {
    document.getElementById('rules-overlay').style.display = 'flex';
    switchTab(0); // መጀመሪያ "መረጣ" እንዲከፈት
}

// Rules ገጽን ለመዝጋት
function closeRules() {
    document.getElementById('rules-overlay').style.display = 'none';
}

// በRules ታቦች መካከል ለመቀያየር
function switchTab(index) {
    const tabs = document.querySelectorAll('.tab-item');
    const contentArea = document.getElementById('rules-content-area');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[index].classList.add('active');
    
    contentArea.innerHTML = rulesData[index].content;
}

// የታችኛው ማውጫ (Nav) ብርሃን እንዲበራ
function setNavActive(element) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}

// Play በተኑ ሲነካ
function startGame() {
    tg.MainButton.setText("STARTING GAME...").show();
    setTimeout(() => {
        tg.MainButton.hide();
        alert("ETHIO BINGO በቅርቡ ይጀምራል!");
    }, 2000);
}
