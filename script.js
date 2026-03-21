function showRules() {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('rules-screen').classList.remove('hidden');
    switchTab('tab1'); // Default tab
}

function hideRules() {
    document.getElementById('rules-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

function startGame() {
    alert("ጨዋታው ለመጀመር በቂ ብር የሎትም! እባክዎ ቀድመው ይሙሉ::");
}

const tabData = {
    'tab1': `
        <div class="rule-item"><h3>1. ካርድ ይምረጡ</h3><p>ጨዋታውን ለመጀመር ከሚመጡት ከ1-300 የጨዋታ ካርድ ውስጥ አንዱን እንመርጣለን::</p></div>
        <div class="rule-item"><h3>2. ቀይ ምልክት</h3><p>የተመረጡት ቁጥሮች በሌላ ተጫዋች መያዛቸውን ያሳያል::</p></div>
    `,
    'tab2': `
        <div class="rule-item"><h3>1. መግቢያ</h3><p>ወደ ጨዋታው ስንገባ በመረጥነው የካርድ ቁጥር መሰረት የጨዋታ ካርድ እናገኛለን::</p></div>
        <div class="rule-item"><h3>2. የቁጥሮች ጥሪ</h3><p>ጨዋታው ሲጀምር የተለያዩ ቁጥሮች ከ1 እስከ 75 መጥራት ይጀምራል::</p></div>
    `,
    'tab3': `
        <div class="rule-item" style="background: orange; color: white;">
            <h3>አሸናፊ ለመሆን</h3>
            <p>ቁጥሮች ሲጠሩ ከካርዳችን ላይ በማርክ አግድም፣ ቁልቁል ወይም በዲያጎናል ካሟላን BINGO የሚለውን ተጭነን እናሸንፋለን::</p>
        </div>
    `,
    'tab4': `
        <div class="rule-item" style="border-left-color: red;">
            <h3 style="color: red;">የተሳሳተ ቢንጎ (PENALTY)</h3>
            <p>ሳያሟሉ ቢንጎ ካሉ ከጨዋታው ይባረራሉ:: ያሲያዙት Stake አይመለስም::</p>
        </div>
    `
};

function switchTab(tabId) {
    // Update active tab UI
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Logic to highlight selected tab could be added here
    
    // Update content
    document.getElementById('tab-content').innerHTML = tabData[tabId];
}
// ዋናውን ገጽ ደብቆ የህግ ገጹን የሚያሳይ
function openRules() {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('rules-screen').classList.remove('hidden');
    // መጀመሪያ ስንከፍተው የመጀመሪያውን Tab ይዘት እንዲያሳየው
    switchRulesTab('card'); 
}

// የህግ ገጹን ዘግቶ ወደ ዋናው የሚመለስ
function closeRules() {
    document.getElementById('rules-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

function showStakeAlert() {
    alert("ጨዋታው ለመጀመር በቂ ብር የሎትም!");
}

// የህጎቹ ይዘት በታብ
const rulesData = {
    'card': `
        <div class="rule-card">
            <h3><span class="rule-number">1</span> ካርድ ይምረጡ</h3>
            <p>ጨዋታውን ለመጀመር ከሚመጡት ከ1-300 የጨዋታ ካርድ ውስጥ አንዱን እንመርጣለን::</p>
        </div>
        <div class="rule-card">
            <h3><span class="rule-number">2</span> ቀይ ምልክት</h3>
            <p>የተመረጡት ቁጥሮች በሌላ ተጫዋች መያዛቸውን ያሳያል::</p>
        </div>
    `,
    'play': `
        <div class="rule-card">
            <h3><span class="rule-number">1</span> መግቢያ</h3>
            <p>ወደ ጨዋታው ስንገባ በመረጥነው የካርድ ቁጥር መሰረት የጨዋታ ካርድ እናገኛለን::</p>
        </div>
        <div class="rule-card">
            <h3><span class="rule-number">2</span> የቁጥሮች ጥሪ</h3>
            <p>ጨዋታው ሲጀምር የተለያዩ ቁጥሮች ከ1 እስከ 75 መጥራት ይጀምራል::</p>
        </div>
    `,
    'win': `
        <div class="rule-card" style="border-left-color: orange; background-color: rgba(255, 165, 0, 0.1);">
            <h3 style="color: orange;">አሸናፊ ለመሆን</h3>
            <p>ቁጥሮች ሲጠሩ ከካርዳችን ላይ በማርክ አግድም፣ ቁልቁል ወይም በዲያጎናል ካሟላን BINGO የሚለውን ተጭነን እናሸንፋለን::</p>
        </div>
    `,
    'penalty': `
        <div class="rule-card rule-penalty">
            <h3 style="color: #ff1744;">የተሳሳተ ቢንጎ (PENALTY)</h3>
            <p>ሳያሟሉ ቢንጎ ካሉ ከጨዋታው ይባረራሉ:: ያሲያዙት Stake አይመለስም::</p>
        </div>
        <div class="penalty-item">
            <span>❌</span> ከጨዋታው ወዲያውኑ መሰረዝ
        </div>
        <div class="penalty-item" style="margin-top: 10px;">
            <span>❌</span> ያሲያዙት ገንዘብ (Stake) አይመለስም
        </div>
    `
};

// ታቦቹን ሲቀይሩ ይዘቱን ለመቀየር
function switchRulesTab(tabName) {
    // ይዘቱን መሙላት
    document.getElementById('rules-dynamic-content').innerHTML = rulesData[tabName];

    // የተመረጠውን ታብ አክቲቭ ለማድረግ
    const tabs = document.querySelectorAll('.rule-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // በጠቅነው ላይ አክቲቭ ክላስ መጨመር (ለዲዛይን)
    // ይህንን ለማድረግ በተኑ ላይ index መጠቀም ይሻላል፣ ግን ለጊዜው ተግባሩ ይሰራል::
}
