
function backToHome() {
    window.location.href = "https://tinny0727.github.io/Delay-home/"; // 根據你的檔案層級決定退幾層
}
function createGlitterBoxes(count = 45) {
    // 移除舊的容器避免重複
    const oldContainer = document.getElementById('bg-glitter-container');
    if (oldContainer) oldContainer.remove();

    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-glitter-container';
    document.body.prepend(bgContainer);

    for (let i = 0; i < count; i++) {
       const box = document.createElement('div');
box.classList.add('glitter-box');

// 隨機決定顏色
const isWhite = Math.random() > 0.7; // 30% 的機率出現金色

if (isWhite) {
    box.style.setProperty('--bg-color', 'rgb(250, 250, 250)'); // 白色
} else {
    box.style.setProperty('--bg-color', 'rgba(59, 189, 45, 0.78)'); // 
}

document.body.appendChild(box);

        const size = Math.random() * 20 + 4; // 稍微縮小方塊，質感更好
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // 隨機動畫參數
        const duration = (Math.random() * 3 + 2).toFixed(2); // 2.00s - 5.00s
        const delay = (Math.random() * -5).toFixed(2);      // 負值讓動畫錯開且立即開始

        Object.assign(box.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            // 強制寫入完整的 animation 字串
            animation: `blink ${duration}s infinite ease-in-out ${delay}s`
        });

        bgContainer.appendChild(box);
    }
}



// 統一初始化
document.addEventListener('DOMContentLoaded', () => {
    // 清空題目容器避免重複
    const surveyContainer = document.getElementById('survey-container');
    if (surveyContainer) {
        surveyContainer.innerHTML = ""; 
        initSurvey(); 
    }
    
    // 產生閃爍方塊
    createGlitterBoxes(35); 
});
// 修正後的 DOM 加載監聽，解決題目重複問題
document.addEventListener('DOMContentLoaded', () => {
    const surveyContainer = document.getElementById('survey-container');
    if (surveyContainer) {
        surveyContainer.innerHTML = ""; // 清空容器
        initSurvey(); 
    }
    createGlitterBoxes(30); 
});
function addGlassBubbles() {
    // 建立左下泡泡
    const bubble1 = document.createElement('div');
    bubble1.className = 'glass-bubble bubble-bottom-left';
    document.body.appendChild(bubble1);

    // 建立右上泡泡
    const bubble2 = document.createElement('div');
    bubble2.className = 'glass-bubble bubble-top-right';
    document.body.appendChild(bubble2);
}

// 修改後的初始化監聽
document.addEventListener('DOMContentLoaded', () => {
    const surveyContainer = document.getElementById('survey-container');
    if (surveyContainer) {
        surveyContainer.innerHTML = ""; // 確保清空容器
        initSurvey(); 
    }
    
    createGlitterBoxes(30); 
    addGlassBubbles(); // 加入大泡泡
});

const energyQuestions = [
    { id: 'body', title: '身體電力', q: '昨晚的休息，有讓身體充飽電嗎？', left: '好累', right: '滿電' },
    { id: 'mind', title: '心理空間', q: '現在的大腦，感覺輕盈還是沉重？', left: '超載', right: '清晰' },
    { id: 'emotion', title: '情緒飽和', q: '此刻的心情，像哪種色調？', left: '灰暗', right: '明亮' },
    { id: 'social', title: '社交電池', q: '面對人群，你還有多少動力？', left: '關機', right: '渴望' },
    { id: 'action', title: '行動力', q: '注意力是否能集中當下？', left: '無力', right: '十足' }
];

const container = document.getElementById('survey-container');
const submitBtn = document.getElementById('submit-btn');
const dateInput = document.getElementById('entry-date');

// 初始化
function initSurvey() {
    // 預設日期為今天
    dateInput.valueAsDate = new Date();

    energyQuestions.forEach(item => {
        const group = document.createElement('div');
        group.className = 'slider-group';
        group.innerHTML = `
            <div class="label-row">
                <span class="question">${item.q}</span>
                <span class="percentage" id="val-${item.id}">50%</span>
            </div>
            <input type="range" id="${item.id}" min="0" max="100" value="50">
            <div class="hint-row">
                <span>${item.left}</span>
                <span>${item.right}</span>
            </div>
        `;
        container.appendChild(group);

        const slider = group.querySelector('input');
        slider.addEventListener('input', () => updateUI(item.id, slider.value));
        updateUI(item.id, 50);
    });
}
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('music-toggle');

// 音樂開關邏輯
musicBtn.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play();
        bgm.volume = 0.3; // 保持低音量背景音樂
        musicBtn.classList.add('playing');
    } else {
        bgm.pause();
        musicBtn.classList.remove('playing');
    }
});



// 核心：紅藍綠變化邏輯
function updateUI(id, value) {
    const text = document.getElementById(`val-${id}`);
    const slider = document.getElementById(id);
    
    text.innerText = `${value}%`;
    
    // 調整漸變背景的顯示比例 (background-size)
    slider.style.backgroundSize = `${value}% 100%`;

    // 根據區間改變文字顏色回饋
    if (value < 40) text.style.color = "#ff4d4d"; // 紅
    else if (value < 75) text.style.color = "#5086dc"; // 藍
    else text.style.color = "#10b95f"; // 綠
}


submitBtn.addEventListener('click', () => {
    // 1. 計算數值
    const inputs = document.querySelectorAll('input[type="range"]');
    let total = 0;
    inputs.forEach(i => total += parseInt(i.value));
    const avg = total / inputs.length;

    // 2. 切換顯示：隱藏問卷，顯示結果
    document.getElementById('survey-content').classList.add('hidden');
    const evalSection = document.getElementById('eval-section');
    evalSection.classList.remove('hidden');

    const sphere = document.getElementById('eval-sphere');
    const status = document.getElementById('eval-status');
    const desc = document.getElementById('eval-desc');
    const loadingMsg = document.querySelector('.loading-text');

    // 3. 判斷能量狀態
    let color, text, message;
    if (avg < 40) {
        color = 'radial-gradient(circle at 30% 30%, #ff9a9e, #f6416c)';
        text = "維持期 X 恢復期";
        message = "嘟嘟嘟...偵測到電力較低。這段時間請對自己溫柔一點。";
    } else if (avg < 75) {
        color = 'radial-gradient(circle at 30% 30%, #a1c4fd, #3b82f6)';
        text = "流動期 X 平穩能量";
        message = "能量運轉平穩。現在很適合靜下心來，梳理此刻的思緒。";
    } else {
        color = 'radial-gradient(circle at 30% 30%, #84fab0, #10b981)';
        text = "深潛期 X 高能量";
        message = "你的能量非常飽滿！適合展開那些大膽的靈感與計畫。";
    }

    // 4. 動態效果：先顯示「載入中」，1.5秒後亮球
    setTimeout(() => {
        loadingMsg.innerText = "載入完成！這是你當下的能量：";
        sphere.style.background = color;
        status.innerText = text;
        desc.innerText = message;
    }, 5000);
});

