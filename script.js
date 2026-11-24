// Превключване между разделите
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-modules').classList.remove('active');
    
    document.getElementById(sectionId).classList.add('active');
    
    // Активирай бутона ако съществува
    const btn = document.getElementById('btn-' + sectionId);
    if (btn) {
        btn.classList.add('active');
    }
    
    // Активирай dropdown ако е теория
    if (sectionId === 'theory') {
        document.getElementById('btn-modules').classList.add('active');
    }

    if (sectionId === 'euler') {
        updateEuler();
    }
}

// Дирихле
function updateDirichlet() {
    let items = parseInt(document.getElementById('itemsCount').value) || 0;
    let boxes = parseInt(document.getElementById('boxesCount').value) || 1;
    
    if (boxes < 1) boxes = 1;
    if (items < 0) items = 0;

    let container = document.getElementById('boxesContainer');
    let resultText = document.getElementById('resultText');
    
    container.innerHTML = '';
    
    let distribution = new Array(boxes).fill(0);
    for (let i = 0; i < items; i++) {
        distribution[i % boxes]++;
    }
    
    let minGuaranteed = Math.ceil(items / boxes);

    for (let i = 0; i < boxes; i++) {
        let boxDiv = document.createElement('div');
        boxDiv.className = 'box';
        boxDiv.innerHTML = `<h4>Кутия ${i+1}</h4>`;
        
        for (let j = 0; j < distribution[i]; j++) {
            let itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerText = '🐰';
            boxDiv.appendChild(itemDiv);
        }
        container.appendChild(boxDiv);
    }

    resultText.innerHTML = `<strong>💡 Извод по Принципа на Дирихле:</strong><br>
    Ако разпределим <b>${items}</b> предмета в <b>${boxes}</b> кутии, то поне в една кутия се гарантира, че ще има поне <b>${minGuaranteed}</b> предмета.`;
}

// Ойлерови кръгове
function updateEuler() {
    let totalA = parseInt(document.getElementById('setA').value) || 0;
    let totalB = parseInt(document.getElementById('setB').value) || 0;
    let intersection = parseInt(document.getElementById('setC').value) || 0;

    if (intersection > totalA) { intersection = totalA; document.getElementById('setC').value = intersection; }
    if (intersection > totalB) { intersection = totalB; document.getElementById('setC').value = intersection; }

    let onlyA = totalA - intersection;
    let onlyB = totalB - intersection;
    let union = onlyA + onlyB + intersection;

    let canvas = document.getElementById('eulerCanvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(180, 150, 90, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(79, 70, 229, 0.3)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#4f46e5';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(320, 150, 90, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(onlyA, 135, 150);
    ctx.fillText(intersection, 242, 150);
    ctx.fillText(onlyB, 345, 150);
    
    ctx.fillStyle = '#4f46e5';
    ctx.fillText("Множество A", 120, 40);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText("Множество B", 290, 40);

    let eulerResultText = document.getElementById('eulerResultText');
    eulerResultText.innerHTML = `<strong>💡 Формула за включване и изключване:</strong><br>
    • Само в А: <b>${totalA} - ${intersection} = ${onlyA}</b><br>
    • Само в Б: <b>${totalB} - ${intersection} = ${onlyB}</b><br>
    • Общ брой елементи в обединението (A ∪ B): <b>${onlyA} + ${onlyB} + ${intersection} = ${union}</b>`;
}

// Проверка на ребуса
function checkPuzzle() {
    let a = parseInt(document.getElementById('valA').value);
    let b = parseInt(document.getElementById('valB').value);
    let resBox = document.getElementById('puzzleResultText');
    resBox.style.display = 'block';

    if (isNaN(a) || isNaN(b)) {
        resBox.style.background = '#fef2f2';
        resBox.style.borderLeft = '5px solid #ef4444';
        resBox.innerHTML = '<strong>⚠️ Моля, попълни стойности и за двете букви!</strong>';
        return;
    }

    if (a === b) {
        resBox.style.background = '#fef2f2';
        resBox.style.borderLeft = '5px solid #ef4444';
        resBox.innerHTML = '<strong>❌ Грешка:</strong> Различните букви трябва да отговарят на различни цифри!';
        return;
    }

    let numAB = a * 10 + b;
    let numBA = b * 10 + a;

    if (numAB + numBA === 132) {
        resBox.style.background = '#ecfdf5';
        resBox.style.borderLeft = '5px solid #10b981';
        resBox.innerHTML = `<strong>🎉 Браво! Верен отговор!</strong><br>
        Проверка: ${numAB} + ${numBA} = 132. Ти успешно разгада ребуса!`;
    } else {
        resBox.style.background = '#fef2f2';
        resBox.style.borderLeft = '5px solid #ef4444';
        resBox.innerHTML = `<strong>❌ Опитай пак!</strong> Получи се ${numAB} + ${numBA} = ${numAB + numBA}, а търсим сбор 132.`;
    }
}

// База със състезателни задачи за 5-6 клас (Модул 4)
const examQuestions = [
    {
        q: "1. В тъмна стая има чекмедже с 10 черни и 10 бели чорапа. Най-малко колко чорапа трябва да извадим наслуки, за да сме сигурни, че имаме поне един чифт от един и същи цвят?",
        options: ["2 чорапа", "3 чорапа", "11 чорапа", "12 чорапа"],
        correct: 1,
        explanation: "По Принципа на Дирихле имаме 2 цвята (кутии). При 3 извадени чорапа поне два ще са от един и същи цвят."
    },
    {
        q: "2. В един клас от 28 ученици, 18 тренират футбол, а 15 тренират плуване. Всеки ученик тренира поне един от двата спорта. Колко ученици тренират и футбол, и плуване?",
        options: ["3 ученици", "5 ученици", "7 ученици", "10 ученици"],
        correct: 1,
        explanation: "Използваме Кръговете на Ойлер: 18 + 15 - 28 = 33 - 28 = 5 ученици тренират и двата спорта."
    },
    {
        q: "3. Ако двуцифреното число AB + BA = 154 и A > B, на колко е равна най-голямата възможна стойност на A?",
        options: ["7", "8", "9", "6"],
        correct: 2,
        explanation: "AB + BA = 11 × (A + B) = 154, откъдето A + B = 14. За да е най-голямо A (цифра до 9), избираме A = 9 и B = 5 (95 + 59 = 154)."
    },
    {
        q: "4. Охлюв се катери по стълб, висок 10 метра. През деня се изкачва с 3 метра нагоре, а през нощта се свлича с 2 метра надолу. На кой ден ще стигне върха?",
        options: ["На 10-ия ден", "На 9-ия ден", "На 8-ия ден", "На 7-ия ден"],
        correct: 2,
        explanation: "За 7 денонощия се изкачва на 7 метра (по 1 метър на денонощие). На 8-ия ден изминава останалите 3 метра и стига върха, без да се свлича повече."
    },
    {
        q: "5. Сборът на три последователни естествени числа е 72. Кое е най-голямото от тях?",
        options: ["23", "24", "25", "26"],
        correct: 2,
        explanation: "Средното число е 72 : 3 = 24. Числата са 23, 24 и 25, като най-голямото е 25."
    }
];

let timerInterval;
let timeLeft = 15 * 60;

function startExam() {
    document.getElementById('examStartScreen').style.display = 'none';
    document.getElementById('examResultScreen').style.display = 'none';
    document.getElementById('examActiveScreen').style.display = 'block';

    timeLeft = 15 * 60;
    updateTimerDisplay();

    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    examQuestions.forEach((item, index) => {
        let optionsHTML = '';
        item.options.forEach((opt, optIndex) => {
            optionsHTML += `
                <label class="option-label">
                    <input type="radio" name="q${index}" value="${optIndex}">
                    <span>${opt}</span>
                </label>
            `;
        });

        container.innerHTML += `
            <div class="question-card">
                <h4>${item.q}</h4>
                <div class="options-list">${optionsHTML}</div>
            </div>
        `;
    });

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Времето изтече! Тестът се предава автоматично.");
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitExam() {
    clearInterval(timerInterval);
    document.getElementById('examActiveScreen').style.display = 'none';
    
    let score = 0;
    let feedbackHTML = '';

    examQuestions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const userAnswer = selected ? parseInt(selected.value) : -1;
        const isCorrect = (userAnswer === item.correct);

        if (isCorrect) score++;

        feedbackHTML += `
            <div class="question-card" style="border-left: 5px solid ${isCorrect ? '#10b981' : '#ef4444'};">
                <h4>${item.q}</h4>
                <p>Твоят отговор: <strong>${userAnswer !== -1 ? item.options[userAnswer] : 'Няма отговор'}</strong> 
                ${isCorrect ? '✅' : `❌ (Верен: <strong>${item.options[item.correct]}</strong>)`}</p>
                <p style="color: #475569; font-size: 14px;">💡 <em>Решение: ${item.explanation}</em></p>
            </div>
        `;
    });

    const resultScreen = document.getElementById('examResultScreen');
    resultScreen.style.display = 'block';
    resultScreen.innerHTML = `
        <div class="result-summary">
            <h3>🏆 Резултат от състезанието: ${score} от ${examQuestions.length} точки!</h3>
            <p>${score === examQuestions.length ? 'Перфектно представяне! Готов си за олимпиадата!' : 'Страхотен опит! Разгледай обясненията по-долу.'}</p>
            <button class="btn-check" onclick="startExam()" style="margin-top: 10px;">🔄 Опитай отново</button>
        </div>
        <h3 style="margin-top: 25px;">Подробен преглед на задачите:</h3>
        ${feedbackHTML}
    `;
}

// Начално зареждане на Модул 1
updateDirichlet();

// ===== ТЕОРИЯ =====
function showTheory(topic) {
    const content = document.getElementById('theory-content');
    const simulator = document.getElementById('theory-simulator');
    const examples = document.getElementById('theory-examples');
    const simulatorContent = document.getElementById('simulator-content');
    const examplesContent = document.getElementById('examples-content');
    
    if (topic === 'dirichlet-theory') {
        content.innerHTML = `
            <h3>🎯 Принцип на Дирихле (Принцип на чекмеджетата)</h3>
            <p><strong>Определение:</strong> Ако разпределим <b>N</b> предмета в <b>K</b> кутии (където N > K), 
            то поне в една кутия ще има повече от един предмет.</p>
            <p><strong>Математическо формулиране:</strong> Поне една кутия ще съдържа поне ⌈N/K⌉ предмета.</p>
            <p><strong>Формула:</strong> Гарантиран минимум = ⌈N/K⌉ = ⌊(N-1)/K⌋ + 1</p>
            <p><strong>Пример:</strong> 7 зайчета в 3 норички → минимално едната норичка ще има ⌈7/3⌉ = 3 зайчета.</p>
            <p><strong>Приложения:</strong> Чорапи в тъмнина, съвпадения при рождени дни, картонни вероятности</p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Брой предмети (N):</label>
                    <input type="number" id="dirichlet-items" value="10" min="1" max="50" oninput="updateDirichletTheory()">
                </div>
                <div class="control-item">
                    <label>Брой кутии (K):</label>
                    <input type="number" id="dirichlet-boxes" value="3" min="1" max="20" oninput="updateDirichletTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateDirichletTheory()">🔄 Обновай</button>
                </div>
            </div>
            <div class="simulator-result" id="dirichlet-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ (с подробно решение)</h4>
            
            <div class="example-card">
                <h4>Пример 1: Чорапи в тъмнина</h4>
                <p><strong>Задача:</strong> В чекмеджето има 10 черни и 10 бели чорапа. Най-малко колко чорапа трябва да извадим в тъмнина, за да сме сигурни че имаме един чифт (два еднакви)?</p>
                <div class="step"><strong>Решение:</strong><br>
                N = ? (колко чорапа)<br>
                K = 2 (цвята: черни и бели)<br>
                Търсим минимално N така че ⌈N/2⌉ ≥ 2<br>
                N = 3 чорапа
                </div>
                <div class="answer">✅ Отговор: 3 чорапа (гарантирано има 2 еднакви)</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Съвпадение на рождени дни</h4>
                <p><strong>Задача:</strong> Колко ученици трябва да имаме в един клас, за да сме сигурни че поне двама имат рожден ден на един и същи месец?</p>
                <div class="step"><strong>Решение:</strong><br>
                N = ? (брой ученици)<br>
                K = 12 (месеци)<br>
                Търсим минимално N така че ⌈N/12⌉ ≥ 2<br>
                N = 13 ученици
                </div>
                <div class="answer">✅ Отговор: 13 ученици</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Цветни пръчици в торба</h4>
                <p><strong>Задача:</strong> В торба има 5 червени, 5 сини и 5 зелени пръчици. Най-малко колко трябва да извадим, за да гарантираме три еднакви?</p>
                <div class="step"><strong>Решение:</strong><br>
                K = 3 цвята (кутии)<br>
                Търсим минимално N такова че ⌈N/3⌉ ≥ 3<br>
                Най-лошия случай: 2 červeni + 2 сини + 2 зелени = 6 пръчици<br>
                Следващата (7-ма) гарантирано е еднакъв цвят
                </div>
                <div class="answer">✅ Отговор: 7 пръчици</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Числа и остатъци</h4>
                <p><strong>Задача:</strong> От 5 произволни цели числа, поне две дават един и същи остатък при деление на 4. Защо?</p>
                <div class="step"><strong>Решение:</strong><br>
                При деление на 4, остатъците са: 0, 1, 2, 3 (K = 4 възможности)<br>
                Имаме N = 5 числа (предмета)<br>
                По Принципа на Дирихле: ⌈5/4⌉ = 2<br>
                Минимално 2 числа имат същия остатък
                </div>
                <div class="answer">✅ Отговор: Защото К=4 остатъка < N=5 числа</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА (само отговори - опитай сам!)</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Пръстени</h4>
                <p><strong>Задача:</strong> В кутия има 20 еднакви пръстена в три различни размера (малки, средни, големи). Най-малко колко трябва да извадим, за да гарантираме поне 3 еднакви размера?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 7 пръстена</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Топчета в кутия</h4>
                <p><strong>Задача:</strong> В тъмна стая има кутия с топчета: 10 червени, 10 сини и 10 жълти. Най-малко колко трябва да извадим, за да сме сигурни, че имаме 5 еднакви цвята?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 13 топчета</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateDirichletTheory();
        
    } else if (topic === 'euler-theory') {
        content.innerHTML = `
            <h3>🔵 Кръгове на Ойлер (Венови диаграми)</h3>
            <p><strong>Определение:</strong> Визуален начин да представим множества и техните връзки.</p>
            <p><strong>Формула за включване и изключване (2 множества):</strong></p>
            <p style="font-size: 1.2em; color: #667eea; font-weight: bold;">|A ∪ B| = |A| + |B| - |A ∩ B|</p>
            <p><strong>За 3 множества:</strong></p>
            <p style="font-size: 1.1em; font-family: monospace; background: #f0f9ff; padding: 10px; border-radius: 5px;">
            |A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |B ∩ C| - |A ∩ C| + |A ∩ B ∩ C|
            </p>
            <p><strong>Пример:</strong> 12 ученици говорят английски, 8 немски, 3 и двата езика.<br>
            Общо = 12 + 8 - 3 = 17 ученици говорят поне един от двата езика.</p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Множество A:</label>
                    <input type="number" id="euler-a" value="15" min="0" max="50" oninput="updateEulerTheory()">
                </div>
                <div class="control-item">
                    <label>Множество B:</label>
                    <input type="number" id="euler-b" value="12" min="0" max="50" oninput="updateEulerTheory()">
                </div>
                <div class="control-item">
                    <label>Пресичане A ∩ B:</label>
                    <input type="number" id="euler-intersection" value="5" min="0" max="30" oninput="updateEulerTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateEulerTheory()">🔄 Обновай</button>
                </div>
            </div>
            <canvas id="euler-theory-canvas" width="500" height="300" style="border: 1px solid #e2e8f0; border-radius: 8px; display: block; margin: 15px 0;"></canvas>
            <div class="simulator-result" id="euler-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ (с подробно решение)</h4>
            
            <div class="example-card">
                <h4>Пример 1: Спортове в класа</h4>
                <p><strong>Задача:</strong> В един клас 20 ученици. 15 тренират футбол, 10 тренират плуване, 7 тренират и двата спорта. Колко не тренират нито един?</p>
                <div class="step"><strong>Решение:</strong><br>
                |A ∪ B| = |A| + |B| - |A ∩ B|<br>
                |A ∪ B| = 15 + 10 - 7 = 18 (тренират поне един спорт)<br>
                Не тренират: 20 - 18 = 2 ученици
                </div>
                <div class="answer">✅ Отговор: 2 ученици</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Програмиране и Математика</h4>
                <p><strong>Задача:</strong> От 30 ученици, 18 харесват програмиране, 20 харесват математика, 15 харесват и двете. Колко не харесват нито една?</p>
                <div class="step"><strong>Решение:</strong><br>
                |A ∪ B| = 18 + 20 - 15 = 23 (харесват поне една)<br>
                Не харесват: 30 - 23 = 7 ученици
                </div>
                <div class="answer">✅ Отговор: 7 ученици</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Езици в училище</h4>
                <p><strong>Задача:</strong> 50 ученици учат френски или немски. 35 учат френски, 30 учат немски. Колко учат и двата езика?</p>
                <div class="step"><strong>Решение:</strong><br>
                |A ∪ B| = |A| + |B| - |A ∩ B|<br>
                50 = 35 + 30 - |A ∩ B|<br>
                |A ∩ B| = 35 + 30 - 50 = 15 ученици
                </div>
                <div class="answer">✅ Отговор: 15 ученици</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Четене на книги</h4>
                <p><strong>Задача:</strong> От 25 ученици, 14 прочитаха Писмото (П), 11 прочитаха Лов (Л), 5 прочитаха и двете. Колко не прочитаха нито една?</p>
                <div class="step"><strong>Решение:</strong><br>
                Прочели поне една: |П ∪ Л| = 14 + 11 - 5 = 20<br>
                Не прочели нито една: 25 - 20 = 5 ученици
                </div>
                <div class="answer">✅ Отговор: 5 ученици</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА (само отговори - опитай сам!)</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Участие в клубове</h4>
                <p><strong>Задача:</strong> От 40 ученици, 24 са в шахматния клуб, 18 са в музикалния клуб, 8 са в и двата. Колко не са в нито един клуб?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 6 ученици</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Животни в зоопарк</h4>
                <p><strong>Задача:</strong> 60 животни консумират месо (М) или растения (Р). 42 консумират месо, 35 консумират растения. Колко консумират и месо, и растения?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 17 животни</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateEulerTheory();
        
    } else if (topic === 'combinatorics') {
        content.innerHTML = `
            <h3>📊 Комбинаторика</h3>
            <p><strong>Пермутации:</strong> Начини за подреждане на N различни елемента</p>
            <p style="font-size: 1.1em; color: #667eea; font-weight: bold;">P(N) = N! = N × (N-1) × (N-2) × ... × 1</p>
            <p><strong>Комбинации:</strong> Начини за избор на K елемента от N без отношение на реда</p>
            <p style="font-size: 1.1em; color: #667eea; font-weight: bold;">C(N,K) = N! / (K! × (N-K)!)</p>
            <p><strong>Вариации:</strong> Начини за избор на K елемента от N с отношение на реда</p>
            <p style="font-size: 1.1em; color: #667eea; font-weight: bold;">A(N,K) = N! / (N-K)!</p>
            <p><strong>Примери:</strong><br>
            • 3 цвята подредени: 3! = 6 начина<br>
            • Избор 2 от 5 ученици: C(5,2) = 10 начина<br>
            • Избор 2 ученика за председател и касиер от 5: A(5,2) = 20 начина
            </p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Общо елементи (N):</label>
                    <input type="number" id="comb-n" value="5" min="1" max="10" oninput="updateCombinatoricsTheory()">
                </div>
                <div class="control-item">
                    <label>Избор елементи (K):</label>
                    <input type="number" id="comb-k" value="2" min="1" max="10" oninput="updateCombinatoricsTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateCombinatoricsTheory()">🔄 Обновай</button>
                </div>
            </div>
            <div class="simulator-result" id="combinatorics-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ (с подробно решение)</h4>
            
            <div class="example-card">
                <h4>Пример 1: Подреждане на букви</h4>
                <p><strong>Задача:</strong> По колко начина можеш да подредиш буквите А, Б, В?</p>
                <div class="step"><strong>Решение:</strong><br>
                P(3) = 3! = 3 × 2 × 1 = 6<br>
                АБВ, АВБ, БАВ, БВА, ВАБ, ВБА
                </div>
                <div class="answer">✅ Отговор: 6 начина</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Избор от екип</h4>
                <p><strong>Задача:</strong> От 5 ученици трябва да изберем 2 за проект. По колко начина?</p>
                <div class="step"><strong>Решение:</strong><br>
                C(5,2) = 5! / (2! × 3!) = (5 × 4) / (2 × 1) = 10
                </div>
                <div class="answer">✅ Отговор: 10 начина</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Класирание (внимание на реда!)</h4>
                <p><strong>Задача:</strong> От 5 ученици избираме първо място и второ място. По колко начина?</p>
                <div class="step"><strong>Решение:</strong><br>
                A(5,2) = 5! / 3! = 5 × 4 = 20<br>
                (Различава ако Ученик1 е първи или втори)
                </div>
                <div class="answer">✅ Отговор: 20 начина</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Подреждане от 4 цвята</h4>
                <p><strong>Задача:</strong> Колко различни триколорни флага можеш да направиш от 4 различни цвята (редът е важен)?</p>
                <div class="step"><strong>Решение:</strong><br>
                A(4,3) = 4! / (4-3)! = 4! / 1! = 4 × 3 × 2 = 24<br>
                (Първи ред: 4 избора, втори ред: 3 избора, трети ред: 2 избора)
                </div>
                <div class="answer">✅ Отговор: 24 флага</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА (само отговори - опитай сам!)</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Подреждане на книги</h4>
                <p><strong>Задача:</strong> По колко начина можеш да подредиш 4 различни книги на рафт?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 24 начина</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Избор от отбор</h4>
                <p><strong>Задача:</strong> От отбор от 8 футболисти трябва да изберем 3 за специална мисия. По колко начина можем да го направим?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 56 начина</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateCombinatoricsTheory();
        
    } else if (topic === 'sequences') {
        content.innerHTML = `
            <h3>📈 Числови редици</h3>
            <p><strong>Аритметична прогресия:</strong> Редица, където разлика между съседни членове е константна</p>
            <p style="font-size: 1.1em; color: #667eea; font-weight: bold;">a_n = a_1 + (n-1)d</p>
            <p style="font-size: 0.95em;">където d е разликата (диференцата)</p>
            <p><strong>Геометрична прогресия:</strong> Редица, където отношението между съседни членове е константно</p>
            <p style="font-size: 1.1em; color: #667eea; font-weight: bold;">a_n = a_1 × q^(n-1)</p>
            <p style="font-size: 0.95em;">където q е коефициентът (квотата)</p>
            <p><strong>Примери:</strong><br>
            • Аритметична: 2, 4, 6, 8, 10... (d = 2)<br>
            • Геометрична: 2, 4, 8, 16, 32... (q = 2)
            </p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label for="seq-type">Тип редица:</label>
                    <select id="seq-type" onchange="updateSequencesTheory()">
                        <option value="arithmetic">Аритметична</option>
                        <option value="geometric">Геометрична</option>
                    </select>
                </div>
                <div class="control-item">
                    <label>Първи член (a₁):</label>
                    <input type="number" id="seq-first" value="2" min="-20" max="20" oninput="updateSequencesTheory()">
                </div>
                <div class="control-item" id="seq-param-container">
                    <label>Разлика (d):</label>
                    <input type="number" id="seq-param" value="2" min="-10" max="10" oninput="updateSequencesTheory()">
                </div>
                <div class="control-item">
                    <label>Колко члена (N):</label>
                    <input type="number" id="seq-count" value="10" min="1" max="20" oninput="updateSequencesTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateSequencesTheory()">🔄 Обновай</button>
                </div>
            </div>
            <div class="simulator-result" id="sequences-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ (с подробно решение)</h4>
            
            <div class="example-card">
                <h4>Пример 1: Аритметична редица</h4>
                <p><strong>Задача:</strong> Намери 7-ия член на редицата 3, 7, 11, 15, ...</p>
                <div class="step"><strong>Решение:</strong><br>
                a₁ = 3, d = 4<br>
                a_n = a_1 + (n-1)d<br>
                a_7 = 3 + (7-1) × 4 = 3 + 24 = 27
                </div>
                <div class="answer">✅ Отговор: 27</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Геометрична редица</h4>
                <p><strong>Задача:</strong> Намери 5-ия член на редицата 2, 6, 18, 54, ...</p>
                <div class="step"><strong>Решение:</strong><br>
                a₁ = 2, q = 3<br>
                a_n = a_1 × q^(n-1)<br>
                a_5 = 2 × 3^(5-1) = 2 × 3^4 = 2 × 81 = 162
                </div>
                <div class="answer">✅ Отговор: 162</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Намиране на разлика</h4>
                <p><strong>Задача:</strong> В аритметична редица a₁ = 10 и a_7 = 40. Намери разликата d.</p>
                <div class="step"><strong>Решение:</strong><br>
                a_7 = a_1 + (7-1)d<br>
                40 = 10 + 6d<br>
                6d = 30<br>
                d = 5
                </div>
                <div class="answer">✅ Отговор: d = 5</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Геометрична с намаление</h4>
                <p><strong>Задача:</strong> Намери 4-ия член на редицата 48, 24, 12, 6, ... (намаляваща геометрична)</p>
                <div class="step"><strong>Решение:</strong><br>
                a₁ = 48<br>
                q = 24/48 = 1/2<br>
                a_4 = 48 × (1/2)^(4-1) = 48 × (1/2)^3 = 48 × 1/8 = 6
                </div>
                <div class="answer">✅ Отговор: 6</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА (само отговори - опитай сам!)</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Аритметична редица</h4>
                <p><strong>Задача:</strong> Намери 10-ия член на редицата 5, 10, 15, 20, ... (Намек: d = 5)</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 50</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Геометрична редица</h4>
                <p><strong>Задача:</strong> Намери 6-ия член на редицата 1, 2, 4, 8, ... (Намек: q = 2)</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 32</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateSequencesTheory();
        
    } else if (topic === 'induction') {
        content.innerHTML = `
            <h3>🔄 Математическа индукция</h3>
            <p><strong>Определение:</strong> Метод за доказване на твърдения за естествени числа.</p>
            <p><strong>Принцип:</strong> Ако твърдението P(n) е вярно за n=1 (базисна стъпка) и ако P(k) е вярно, то P(k+1) също е вярно (индуктивна стъпка), тогава P(n) е вярно за всички n ≥ 1.</p>
            <p><strong>Аналогия:</strong> Домино - падането на първото домино + правило че ако пада едно, пада и следващото = всички паднали</p>
            <p><strong>Формула (пример):</strong> Докажи че 1+2+3+...+n = n(n+1)/2</p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Брой членове (N):</label>
                    <input type="number" id="induction-n" value="5" min="1" max="20" oninput="updateInductionTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateInductionTheory()">🔄 Провери</button>
                </div>
            </div>
            <div class="simulator-result" id="induction-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ</h4>
            
            <div class="example-card">
                <h4>Пример 1: Сума на първите N числа</h4>
                <p><strong>Докажи:</strong> 1+2+3+...+n = n(n+1)/2</p>
                <div class="step"><strong>Решение (Индукция):</strong><br>
                <strong>Базисна стъпка:</strong> n=1 → 1 = 1(1+1)/2 = 1 ✓<br>
                <strong>Индуктивна стъпка:</strong> Приемаме че за n=k важи: 1+2+...+k = k(k+1)/2<br>
                Доказваме за n=k+1:<br>
                1+2+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2 ✓
                </div>
                <div class="answer">✅ По принципа на индукцията формулата е вярна за всички n ≥ 1</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Парност на сбора</h4>
                <p><strong>Докажи:</strong> За всяко n ≥ 1 числото 2n е четно</p>
                <div class="step"><strong>Решение (Индукция):</strong><br>
                <strong>Базисна:</strong> n=1 → 2(1) = 2 (четно) ✓<br>
                <strong>Индуктивна:</strong> Ако 2k е четно, тогава 2(k+1) = 2k + 2, което е сума на две четни числа = четно ✓
                </div>
                <div class="answer">✅ По принципа на индукцията твърдението е доказано</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Степени на 2</h4>
                <p><strong>Докажи:</strong> 1 + 2 + 4 + 8 + ... + 2^(n-1) = 2^n - 1</p>
                <div class="step"><strong>Решение (Индукция):</strong><br>
                <strong>Базисна:</strong> n=1 → 1 = 2^1 - 1 = 1 ✓<br>
                <strong>Индуктивна:</strong> Ако 1+2+4+...+2^(k-1) = 2^k - 1, то<br>
                (1+2+4+...+2^(k-1)) + 2^k = (2^k - 1) + 2^k = 2·2^k - 1 = 2^(k+1) - 1 ✓
                </div>
                <div class="answer">✅ По индукция формулата е вярна за всички n</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Произведение на последователни числа</h4>
                <p><strong>Докажи:</strong> 1·2 + 2·3 + 3·4 + ... + n(n+1) = n(n+1)(n+2)/3</p>
                <div class="step"><strong>Решение (Индукция):</strong><br>
                <strong>Базисна:</strong> n=1 → 1·2 = 1(1+1)(1+2)/3 = 1·2·3/3 = 2 ✓<br>
                <strong>Индуктивна:</strong> Ако сумата за k е вярна, добавяме (k+1)(k+2):<br>
                Получаваме (k+1)(k+2)(k+3)/3 ✓
                </div>
                <div class="answer">✅ По принципа на индукцията формулата е вярна</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Сума на нечетни числа</h4>
                <p><strong>Докажи:</strong> 1 + 3 + 5 + ... + (2n-1) = n²</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> Базисна: n=1 → 1=1². Индуктивна: (n+1)² след добавяне на 2(n+1)-1</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Делимост</h4>
                <p><strong>Докажи:</strong> За всяко n ≥ 1 числото 3^n - 1 е делимо на 2</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> 3-1=2 (делимо). Ако 3^k - 1 е четно, то 3^(k+1) - 1 = 3·3^k - 1 е също четно</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateInductionTheory();
        
    } else if (topic === 'parity') {
        content.innerHTML = `
            <h3>📋 Принцип на паритета (Четност/Нечетност)</h3>
            <p><strong>Определение:</strong> Числата се разделят на два класа: четни (делимо на 2) и нечетни (остатък 1 при деление на 2).</p>
            <p><strong>Свойства:</strong></p>
            <ul>
                <li>Четно + Четно = Четно</li>
                <li>Нечетно + Нечетно = Четно</li>
                <li>Четно + Нечетно = Нечетно</li>
                <li>Четно × Всяко число = Четно</li>
                <li>Нечетно × Нечетно = Нечетно</li>
            </ul>
            <p><strong>Идея:</strong> Следим паритета на резултата при различни операции, за да докажем че задача няма решение или че имаме противоречие.</p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Първо число:</label>
                    <input type="number" id="parity-num1" value="5" min="-100" max="100" oninput="updateParityTheory()">
                </div>
                <div class="control-item">
                    <label>Второ число:</label>
                    <input type="number" id="parity-num2" value="8" min="-100" max="100" oninput="updateParityTheory()">
                </div>
                <div class="control-item">
                    <label>Операция:</label>
                    <select id="parity-op" onchange="updateParityTheory()">
                        <option value="add">Събиране (+)</option>
                        <option value="sub">Изваждане (-)</option>
                        <option value="mul">Умножение (×)</option>
                    </select>
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateParityTheory()">🔄 Провери паритета</button>
                </div>
            </div>
            <div class="simulator-result" id="parity-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ</h4>
            
            <div class="example-card">
                <h4>Пример 1: Невъзможен преход</h4>
                <p><strong>Задача:</strong> Може ли шахматната дъска със премахнати два противоположни ъгъла да бъде покрита с домино (2×1 плочки)?</p>
                <div class="step"><strong>Решение:</strong><br>
                Шахматната дъска има 32 черни и 32 бели квадратчета<br>
                Премахване на два противоположни ъгъла оставя 30 черни и 32 бели (или обратно)<br>
                Всяко домино покрива точно 1 черно и 1 бяло квадратче<br>
                Но имаме неравен брой черни и бели → <strong>Невъзможно!</strong>
                </div>
                <div class="answer">✅ Решението използва паритет (черно-бяло)</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Парност при монети</h4>
                <p><strong>Задача:</strong> Имаш 10 монети, 5 с лице Х и 5 с лице О. Оборот ги всички в произволен ред. Доказ че винаги ще имаш четен брой лица Х.</p>
                <div class="step"><strong>Решение:</strong><br>
                Всяко обръщане на монета променя паритета на нечетните монети<br>
                Начален: 5 Х (нечетно) + 5 О (нечетно)<br>
                След всяко обръщане: паритета се променя за един брой<br>
                Нечетно - Нечетно винаги дава четно число различие → <strong>Четен брой разлика</strong>
                </div>
                <div class="answer">✅ По принципа на паритета винаги има четен брой лица Х</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Дасоревни числа при събиране</h4>
                <p><strong>Задача:</strong> Може ли сборът на 7 нечетни числа да е четен?</p>
                <div class="step"><strong>Решение:</strong><br>
                Нечетно + Нечетно = Четно<br>
                Четно + Нечетно = Нечетно<br>
                Нечетно + Нечетно = Четно (първи две)<br>
                Четно + Нечетно = Нечетно (добавяме третия)<br>
                Нечетно + Нечетно = Четно (четвърти)<br>
                Четно + Нечетно = Нечетно (пети)<br>
                Нечетно + Нечетно = Четно (шести)<br>
                Четно + Нечетно = <strong>НЕЧЕТНО (седмия)</strong>
                </div>
                <div class="answer">✅ Отговор: НЕ! Сборът на нечетен брой нечетни числа е винаги нечетен</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Поговорка с числа</h4>
                <p><strong>Задача:</strong> Произведението на четирите последователни целя числа е винаги делимо на 24. Защо?</p>
                <div class="step"><strong>Решение:</strong><br>
                Четирите последователни числа е n, n+1, n+2, n+3<br>
                Поне две са четни → произведение делимо поне на 2 × 2 = 4<br>
                Едно число е делимо на 3 (всеки третия брой) → произведение делимо на 3<br>
                Поне едно е четно, а ако n четно, то n и n+2 са четни, едното делимо на 4 → на 8 общо<br>
                 8 × 3 = 24 → <strong>всегда делимо на 24</strong>
                </div>
                <div class="answer">✅ Паритет и делимост на 3 гарантира делимост на 24</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Сбор от числа</h4>
                <p><strong>Задача:</strong> Може ли събор на 15 четни числа да е нечетен?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> НЕ! Четно + Четно = Четно, 15 четни числа → четен сбор</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Нечетни множители</h4>
                <p><strong>Задача:</strong> Може ли произведението на 6 нечетни числа да е четно?</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> НЕ! Нечетно × Нечетно = Нечетно, 6 нечетни → нечетно произведение</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateParityTheory();
        
    } else if (topic === 'diophantine') {
        content.innerHTML = `
            <h3>➗ Диофантови уравнения</h3>
            <p><strong>Определение:</strong> Уравнения от вида ax + by = c, където a, b, c са целя числа и ищаме целите решения (x, y).</p>
            <p><strong>Теорема:</strong> Уравнението ax + by = c има целo решение тогава и само тогава, когато gcd(a, b) дели c.</p>
            <p><strong>Метод:</strong> Използваме Евклидов алгоритъм за намиране на gcd, после намираме частно решение, а общото решение е частното + хомогенното.</p>
            <p><strong>Пример:</strong> 3x + 5y = 11 → Има решение? gcd(3,5) = 1, който дели 11 → ДА!</p>
        `;
        
        simulatorContent.innerHTML = `
            <div class="simulator-controls">
                <div class="control-item">
                    <label>Коефициент A:</label>
                    <input type="number" id="dio-a" value="3" min="1" max="20" oninput="updateDiophantineTheory()">
                </div>
                <div class="control-item">
                    <label>Коефициент B:</label>
                    <input type="number" id="dio-b" value="5" min="1" max="20" oninput="updateDiophantineTheory()">
                </div>
                <div class="control-item">
                    <label>Констант C:</label>
                    <input type="number" id="dio-c" value="11" min="1" max="100" oninput="updateDiophantineTheory()">
                </div>
                <div class="control-item">
                    <button class="btn-check" onclick="updateDiophantineTheory()">🔄 Провери решение</button>
                </div>
            </div>
            <div class="simulator-result" id="diophantine-result"></div>
        `;
        
        examplesContent.innerHTML = `
            <h4 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📚 РЕШЕНИ ПРИМЕРИ</h4>
            
            <div class="example-card">
                <h4>Пример 1: Монети</h4>
                <p><strong>Задача:</strong> По колко начина можеш да получиш точно 20 копейки с монети по 3 и 5?</p>
                <div class="step"><strong>Решение:</strong><br>
                3x + 5y = 20<br>
                Пробваме: x=0: 5y=20 → y=4 ✓<br>
                x=5: 3(5) + 5y = 20 → 15 + 5y = 20 → y=1 ✓<br>
                Решения: (0,4), (5,1)
                </div>
                <div class="answer">✅ Отговор: 2 начина</div>
            </div>

            <div class="example-card">
                <h4>Пример 2: Възрасти</h4>
                <p><strong>Задача:</strong> Мама и син имат съответно 7 и 2 години повече от някое число. Общо имат 42 години. Намери възрастите.</p>
                <div class="step"><strong>Решение:</strong><br>
                Мама: a + 7, Син: b + 2<br>
                (a+7) + (b+2) = 42 → a + b = 33<br>
                Възможни решения имат различни a и b, където a+b=33
                </div>
                <div class="answer">✅ Решението зависи от други условия</div>
            </div>

            <div class="example-card">
                <h4>Пример 3: Брой животни</h4>
                <p><strong>Задача:</strong> Нужни са 100 животни общо, мини коне по 10 лева и кокошки по 1 лев, за 100 лева. По колко от всяко?</p>
                <div class="step"><strong>Решение:</strong><br>
                x коне + y кокошки = 100 (брой)<br>
                10x + 1y = 100 (цена)<br>
                От второто: y = 100 - 10x<br>
                Във първото: x + (100 - 10x) = 100 → x = 100 - 100 = невъзможно<br>
                Поправка: Прави решение е нечетко - трябва y = 100 - 10x и x + y = 100<br>
                x + (100 - 10x) = 100 → -9x = 0 → x = 0 → y = 100
                </div>
                <div class="answer">✅ Решение: 0 коне, 100 кокошки</div>
            </div>

            <div class="example-card">
                <h4>Пример 4: Евклидов алгоритъм за НОД</h4>
                <p><strong>Задача:</strong> Намери НОД(48, 18) и определи дали 7x + 11y = 25 има решение</p>
                <div class="step"><strong>Решение (НОД):</strong><br>
                48 = 18 × 2 + 12<br>
                18 = 12 × 1 + 6<br>
                12 = 6 × 2 + 0<br>
                НОД(48, 18) = 6<br>
                <strong>За уравнението:</strong> НОД(7, 11) = 1, който дели 25 → <strong>ДА, има решение!</strong>
                </div>
                <div class="answer">✅ Отговор: НОД = 6, и 7x + 11y = 25 има решения</div>
            </div>

            <h4 style="color: #f97316; margin-top: 25px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">📝 ЗАДАЧИ ЗА САМОСТОЯТЕЛНА РАБОТА</h4>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 1: Просто уравнение</h4>
                <p><strong>Задача:</strong> Намери едно целo решение на 2x + 3y = 1</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> x = 2, y = -1 (проверка: 2(2) + 3(-1) = 4 - 3 = 1 ✓)</div>
            </div>

            <div class="example-card" style="background: #fff7ed; border-left: 5px solid #f97316;">
                <h4>Упражнение 2: Възможност</h4>
                <p><strong>Задача:</strong> Може ли 6x + 9y = 5 да има целo решение? (Намек: Изчисли НОД(6,9))</p>
                <div class="answer" style="background: #dcfce7; border-left: 5px solid #22c55e;">💡 <strong>Отговор:</strong> НЕ! НОД(6,9) = 3, а 3 не дели 5</div>
            </div>
        `;
        
        simulator.style.display = 'block';
        examples.style.display = 'block';
        updateDiophantineTheory();
    }
}

// ===== ИГРИ =====
// Игра 1: Числова редица
function checkGame1() {
    const sequence = [2, 4, 6, 8];
    const answer = parseInt(document.getElementById('game1-answer').value);
    const feedback = document.getElementById('game1-feedback');
    
    const correct = (answer === 10);
    
    if (correct) {
        feedback.style.background = '#dcfce7';
        feedback.style.borderLeft = '5px solid #10b981';
        feedback.innerHTML = '✅ <strong>Браво!</strong><br>Редицата е 2, 4, 6, 8, 10 - всяко число е с 2 повече.';
    } else {
        feedback.style.background = '#fef2f2';
        feedback.style.borderLeft = '5px solid #ef4444';
        feedback.innerHTML = '❌ Опитай пак! Следващото число е 10 (всяко число е с 2 повече от предходното).';
    }
    feedback.style.display = 'block';
}

// Игра 2: Логически пъзел
function checkGame2() {
    const answer = document.getElementById('game2-answer').value;
    const feedback = document.getElementById('game2-feedback');
    
    const correct = (answer === 'Bobi');
    
    if (correct) {
        feedback.style.background = '#dcfce7';
        feedback.style.borderLeft = '5px solid #10b981';
        feedback.innerHTML = `✅ <strong>Браво!</strong><br>
        • Чарли има куче<br>
        • Боби няма папагал, значи има куче или котка. Но куче има Чарли.<br>
        • Значи Боби има котка<br>
        • Али има папагала`;
    } else {
        feedback.style.background = '#fef2f2';
        feedback.style.borderLeft = '5px solid #ef4444';
        feedback.innerHTML = '❌ Опитай пак! Следи внимателно уликите.';
    }
    feedback.style.display = 'block';
}

// Игра 3: Комбинаторика
function checkGame3() {
    const answer = parseInt(document.getElementById('game3-answer').value);
    const feedback = document.getElementById('game3-feedback');
    
    const correct = (answer === 6); // 3! = 6
    
    if (correct) {
        feedback.style.background = '#dcfce7';
        feedback.style.borderLeft = '5px solid #10b981';
        feedback.innerHTML = '✅ <strong>Браво!</strong> 3 цвята могат да се подредят по 3! = 3 × 2 × 1 = 6 начина.';
    } else {
        feedback.style.background = '#fef2f2';
        feedback.style.borderLeft = '5px solid #ef4444';
        feedback.innerHTML = '❌ Опитай пак! Първо място: 3 варианта, второ: 2 варианта, трето: 1 вариант. Общо: 3 × 2 × 1 = 6.';
    }
    feedback.style.display = 'block';
}

// ===== ТЕОРИЯ - СИМУЛАЦИИ =====

function updateDirichletTheory() {
    const n = parseInt(document.getElementById('dirichlet-items').value) || 1;
    const k = parseInt(document.getElementById('dirichlet-boxes').value) || 1;
    
    if (k < 1) return;
    
    const minGuaranteed = Math.ceil(n / k);
    const result = document.getElementById('dirichlet-result');
    
    result.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
                <p><strong>Дадено:</strong></p>
                <p>N (предмети) = <strong>${n}</strong></p>
                <p>K (кутии) = <strong>${k}</strong></p>
            </div>
            <div>
                <p><strong>Решение:</strong></p>
                <p>Гарантиран минимум = ⌈${n}/${k}⌉ = <span style="color: #ef4444; font-size: 1.2em; font-weight: bold;">${minGuaranteed}</span></p>
                <p style="font-size: 0.9em; color: #666;">Поне едната кутия ще има найне ${minGuaranteed} предмета</p>
            </div>
        </div>
    `;
}

function updateEulerTheory() {
    const a = parseInt(document.getElementById('euler-a').value) || 0;
    const b = parseInt(document.getElementById('euler-b').value) || 0;
    const intersection = Math.min(parseInt(document.getElementById('euler-intersection').value) || 0, Math.min(a, b));
    
    document.getElementById('euler-intersection').value = intersection;
    
    const onlyA = a - intersection;
    const onlyB = b - intersection;
    const union = onlyA + onlyB + intersection;
    
    // Рисуване на диаграма
    const canvas = document.getElementById('euler-theory-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Кръг A
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#667eea';
    ctx.stroke();
    
    // Кръг B
    ctx.beginPath();
    ctx.arc(350, 150, 80, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(118, 75, 162, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#764ba2';
    ctx.stroke();
    
    // Числа
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(onlyA, 100, 155);
    ctx.fillText(intersection, 250, 155);
    ctx.fillText(onlyB, 400, 155);
    
    // Етикети
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Множество A', 100, 50);
    ctx.fillStyle = '#764ba2';
    ctx.fillText('Множество B', 400, 50);
    
    const result = document.getElementById('euler-result');
    result.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
                <p><strong>Дадено:</strong></p>
                <p>|A| = <strong>${a}</strong></p>
                <p>|B| = <strong>${b}</strong></p>
                <p>|A ∩ B| = <strong>${intersection}</strong></p>
            </div>
            <div>
                <p><strong>Решение:</strong></p>
                <p>|A ∪ B| = ${a} + ${b} - ${intersection} = <span style="color: #ef4444; font-size: 1.2em; font-weight: bold;">${union}</span></p>
                <p style="font-size: 0.9em;">• Само A: ${onlyA} | И двете: ${intersection} | Само B: ${onlyB}</p>
            </div>
        </div>
    `;
}

function updateCombinatoricsTheory() {
    const n = parseInt(document.getElementById('comb-n').value) || 1;
    let k = parseInt(document.getElementById('comb-k').value) || 1;
    
    if (k > n) k = n;
    document.getElementById('comb-k').value = k;
    
    // Факториел функция
    function factorial(x) {
        if (x <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= x; i++) result *= i;
        return result;
    }
    
    const permutations = factorial(n);
    const combinations = factorial(n) / (factorial(k) * factorial(n - k));
    const variations = factorial(n) / factorial(n - k);
    
    const result = document.getElementById('combinatorics-result');
    result.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
                <p><strong>Пермутации P(${n})</strong></p>
                <p style="font-size: 1.3em; color: #10b981; font-weight: bold;">${permutations}</p>
                <p style="font-size: 0.85em; color: #666;">= ${n}!</p>
            </div>
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                <p><strong>Комбинации C(${n},${k})</strong></p>
                <p style="font-size: 1.3em; color: #f59e0b; font-weight: bold;">${Math.round(combinations)}</p>
                <p style="font-size: 0.85em; color: #666;">= ${n}! / (${k}! × ${n-k}!)</p>
            </div>
            <div style="background: #fce7f3; padding: 15px; border-radius: 8px;">
                <p><strong>Вариации A(${n},${k})</strong></p>
                <p style="font-size: 1.3em; color: #ec4899; font-weight: bold;">${Math.round(variations)}</p>
                <p style="font-size: 0.85em; color: #666;">= ${n}! / ${n-k}!</p>
            </div>
        </div>
    `;
}

function updateSequencesTheory() {
    const type = document.getElementById('seq-type').value;
    const a1 = parseInt(document.getElementById('seq-first').value) || 0;
    const param = parseInt(document.getElementById('seq-param').value) || 1;
    const n = parseInt(document.getElementById('seq-count').value) || 10;
    
    // Обновяване на етикета
    const paramLabel = document.querySelector('#seq-param-container label');
    paramLabel.textContent = type === 'arithmetic' ? 'Разлика (d):' : 'Коефициент (q):';
    
    // Генериране на редица
    let sequence = [];
    for (let i = 1; i <= n; i++) {
        if (type === 'arithmetic') {
            sequence.push(a1 + (i - 1) * param);
        } else {
            sequence.push(a1 * Math.pow(param, i - 1));
        }
    }
    
    const result = document.getElementById('sequences-result');
    const sequenceString = sequence.map(x => Math.round(x * 100) / 100).join(', ');
    
    result.innerHTML = `
        <div style="margin-bottom: 15px;">
            <p><strong>Редица:</strong></p>
            <p style="font-size: 1.1em; color: #667eea; font-family: monospace; word-break: break-word;">
                ${sequenceString}${n < 20 ? '...' : ''}
            </p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
                <p><strong>Параметри:</strong></p>
                <p>a₁ = <strong>${a1}</strong></p>
                <p>${type === 'arithmetic' ? 'd' : 'q'} = <strong>${param}</strong></p>
            </div>
            <div>
                <p><strong>n-ти член:</strong></p>
                <p style="color: #ef4444; font-size: 1.2em; font-weight: bold;">
                    a_n = ${type === 'arithmetic' ? `${a1} + (n-1)×${param}` : `${a1} × ${param}^(n-1)`}
                </p>
            </div>
        </div>
    `;
}

// ===== НОВИ МОДУЛИ: ИНДУКЦИЯ, ПАРИТЕТ, ДИОФАНТ =====

function updateInductionTheory() {
    const n = parseInt(document.getElementById('induction-n').value) || 1;
    const result = document.getElementById('induction-result');
    const actualSum = (n * (n + 1)) / 2;
    
    result.innerHTML = `<div><p><strong>Сума на първите ${n} числа:</strong><br>1 + 2 + ... + ${n} = <span style="color: #ef4444; font-weight: bold;">${actualSum}</span> (формула: n(n+1)/2)</p></div>`;
}

function updateParityTheory() {
    const num1 = parseInt(document.getElementById('parity-num1').value) || 0;
    const num2 = parseInt(document.getElementById('parity-num2').value) || 0;
    const op = document.getElementById('parity-op').value;
    
    let result_value = op === 'add' ? num1 + num2 : op === 'sub' ? num1 - num2 : num1 * num2;
    const parity_result = result_value % 2 === 0 ? 'четно' : 'нечетно';
    
    document.getElementById('parity-result').innerHTML = `<div><p>${num1} ${op === 'add' ? '+' : op === 'sub' ? '−' : '×'} ${num2} = <span style="font-weight: bold; color: #10b981;">${result_value}</span> (${parity_result})</p></div>`;
}

function updateDiophantineTheory() {
    const a = parseInt(document.getElementById('dio-a').value) || 1;
    const b = parseInt(document.getElementById('dio-b').value) || 1;
    const c = parseInt(document.getElementById('dio-c').value) || 1;
    
    function gcd(x, y) {
        while (y !== 0) {
            let temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    }
    
    const g = gcd(a, b);
    const has_solution = c % g === 0;
    
    document.getElementById('diophantine-result').innerHTML = `<div><p><strong>${a}x + ${b}y = ${c}</strong> → НОД(${a},${b})=${g} ${has_solution ? 'дели' : 'НЕ дели'} ${c} → <span style="font-weight: bold; ${has_solution ? 'color: #10b981;' : 'color: #ef4444;'}">${has_solution ? '✅ ДА!' : '❌ НЕ!'}</span></p></div>`;
}
