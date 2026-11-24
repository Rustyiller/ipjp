document.addEventListener('DOMContentLoaded', () => {
    // Referencje ekranów
    const mainScreen = document.getElementById('main-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const quizResultsScreen = document.getElementById('quiz-results-screen');
    const mapScreen = document.getElementById('map-screen');

    // Przyciski nawigacyjne ekranu głównego
    const btnQuiz = document.getElementById('btn-quiz');
    const btnMap = document.getElementById('btn-map');

    // Przyciski powrotu
    const quizBack = document.getElementById('quiz-back');
    const resultsHomeBtn = document.getElementById('results-home-btn');
    const mapBack = document.getElementById('map-back');
    const retryBtn = document.getElementById('retry-btn');

    // Elementy quizu
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const progressIndicator = document.getElementById('progress-indicator');

    // Elementy podsumowania
    const scoreNumber = document.getElementById('score-number');
    const totalQuestionsNum = document.getElementById('total-questions-num');
    const scorePercentage = document.getElementById('score-percentage');

    // Odtwarzacz wideo
    const localVideo = document.getElementById('local-video');

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // Funkcja przełączania ekranów
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');

        // Jeśli wychodzimy z mapy, zatrzymaj wideo
        if (screen !== mapScreen) {
            localVideo.pause();
            localVideo.currentTime = 0;
        }
    }

    // Nasłuchiwanie przycisków głównych
    btnQuiz.addEventListener('click', () => {
        startQuiz();
        showScreen(quizScreen);
    });

    btnMap.addEventListener('click', () => {
        showScreen(mapScreen);
    });

    // Powrót do menu głównego
    quizBack.addEventListener('click', () => showScreen(mainScreen));
    resultsHomeBtn.addEventListener('click', () => showScreen(mainScreen));
    mapBack.addEventListener('click', () => {
        localVideo.pause();
        localVideo.currentTime = 0;
        showScreen(mainScreen);
    });

    // Logika Quizu
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    function loadQuestion() {
        answered = false;
        const q = quizData[currentQuestionIndex];
        progressIndicator.textContent = `Pytanie ${currentQuestionIndex + 1} z ${quizData.length}`;
        questionText.textContent = q.question;
        
        optionsContainer.innerHTML = '';
        explanationBox.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = opt;
            btn.addEventListener('click', () => selectOption(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, selectedBtn) {
        if (answered) return;
        answered = true;

        const q = quizData[currentQuestionIndex];
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');

        if (selectedIndex === q.correct) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
            optionButtons[q.correct].classList.add('correct');
        }

        // Zablokuj wszystkie przyciski opcji
        optionButtons.forEach(btn => btn.disabled = true);

        // Pokaż wyjaśnienie i przycisk następnego pytania
        explanationText.textContent = q.explanation;
        explanationBox.classList.remove('hidden');
        nextQuestionBtn.classList.remove('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    retryBtn.addEventListener('click', () => {
        startQuiz();
        showScreen(quizScreen);
    });

    function showResults() {
        scoreNumber.textContent = score;
        totalQuestionsNum.textContent = quizData.length;
        const percentage = Math.round((score / quizData.length) * 100);
        scorePercentage.textContent = `${percentage}%`;
        showScreen(quizResultsScreen);
    }
});