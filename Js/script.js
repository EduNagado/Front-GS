window.watsonAssistantChatOptions = {
    integrationID: "09d2f796-266f-4e2c-8aa8-4e8c44fd728d",
    region: "us-south", 
    serviceInstanceID: "5b31a3d7-4e66-44fb-82eb-9cac9c8e158c", 
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });

const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const questionText = document.querySelector('.question-text');
const questionTotal = document.querySelector('.question-total');
const headerScoreText = document.querySelector('.header-score');
const scoreText = document.querySelector('.score-text');
const circularProgress = document.querySelector('.circular-progress');
const progressValue = document.querySelector('.progress-value');
const diagnosisText = document.querySelector('.text-diagnosis');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}

function showQuestions(index) {
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '';
    questions[index].options.forEach(option => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    option.forEach(item => {
        item.setAttribute('onclick', 'optionSelected(this)');
    });
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswers = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (correctAnswers.includes(userAnswer)) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
           if(optionList.children[i].textContent ==correctAnswers){}
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    questionTotal.textContent = `${index} de ${questions.length} Perguntas`;
}

function headerScore() {
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    scoreText.textContent = `Seu Score ${userScore} de ${questions.length}`;

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#2a6bf7 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

    displayDiagnosisText(userScore);
}

function displayDiagnosisText(score) {
    if (score === 0) {
        diagnosisText.textContent = " Comece evitando plásticos e reciclando. Juntos, podemos proteger nossos oceanos. Vamos mudar isso!";
    } else if (score <= 2) {
        diagnosisText.textContent = "Continue reduzindo plásticos e participe de ações de limpeza. Cada pequena ação conta";
    } else if (score <= 4) {
        diagnosisText.textContent = "Excelente trabalho. Continue informando-se e participando de campanhas. Juntos, podemos proteger nossos oceanos!";
    } else {
        diagnosisText.textContent = "Seu conhecimento e ações são inspiradores. Continue fazendo a diferença pelos oceanos!";
    }
}
