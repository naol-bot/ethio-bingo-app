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
