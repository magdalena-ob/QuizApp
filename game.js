let allQuestions = [
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Bieber',
        'right_answer': 3
    },
    {
        'question': 'Was bedeutet das HTML tag &lt;a&gt?',
        'answer_1': 'Text Fett',
        'answer_2': 'Container',
        'answer_3': 'Ein Link',
        'answer_4': 'Kursiv',
        'right_answer': 3
    },
    {
        'question': 'Wie bindet man eine Website in eine Website ein?',
        'answer_1': '&lt;iframe&gt, &lt;frame&gt, and &lt;frameset&gt',
        'answer_2': '&lt;iframe&gt',
        'answer_3': '&lt;frame&gt',
        'answer_4': '&lt;frameset&gt',
        'right_answer': 2
    },
    {
        'question': 'Wie stellt man Text am BESTEN fett dar?',
        'answer_1': '&lt;strong&gt',
        'answer_2': 'CSS nutzen',
        'answer_3': '&lt;bold&gt',
        'answer_4': '&lt;b&gt',
        'right_answer': 1
    },
    {
        'question': 'Welches Attribut kann man NICHT für Textarea verwenden',
        'answer_1': 'readonly',
        'answer_2': 'max',
        'answer_3': 'form',
        'answer_4': 'spellcheck',
        'right_answer': 3
    },
    {
        'question': 'Wie wählst du alle Elemente vom Typ &lt;a&gt mit dem attribut title aus?',
        'answer_1': 'a[title]{...}',
        'answer_2': 'a > title {...}',
        'answer_3': 'a.title{...}',
        'answer_4': 'a=title {...}',
        'right_answer': 1
    },
    {
        'question': 'Wie definiert man in JavaScript eine Variable?',
        'answer_1': 'let 100 = rate;',
        'answer_2': '100 = let rate;',
        'answer_3': 'rate = 100;',
        'answer_4': 'let rate = 100;',
        'right_answer': 4
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let progress = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function updateHTMLQuiz() {
    document.getElementById('quiz').innerHTML += `
    <div class="bg-img">
        <img src="img/bg b.png"> 
    <div>
    <div class="html-quiz">
     <p><b>Welcome to <br> The Awesome HTML Quiz</b></p>
     <div class="start-btn">
      <button type="button" class="btn btn-primary" onclick="startHTMLQuiz()">Start</button>
     </div>
    </div>
    `;
}

function startHTMLQuiz() {
    document.getElementById('quiz').innerHTML = '';
    document.getElementById('progress-container').classList.remove('d-none');

    if (gameIsOver()) {
        showEndOfGame();
    } else {

        let question = allQuestions[currentQuestion];
        document.getElementById('quiz').innerHTML += showQuestion(question);
        document.getElementById('quiz').innerHTML += showAnswer(question);
        document.getElementById('quiz').innerHTML += `
    <div class="back-and-forth">
        <button class="rounded-circle circle" onclick="previousQuestion()"><img src="icon/left-arrow.png"></button>
        <button class="rounded-circle circle" id="next-button" disabled onclick="nextQuestion()"><img src="icon/right-arrow.png"></button>
    </div>
    `;
    }
}

function gameIsOver() {
    return currentQuestion >= allQuestions.length;
}

function showQuestion(question) {
    return `<div class="question"><b>${question['question']}</b></div>`;
}

function showAnswer(question) {
    return `
    <div class="answer-box">
        <div class="answer" id="1" onclick="answer(1)">
            <div class="answer-choice"><b>A</b></div> 
            ${question['answer_1']}
        </div>
        <div class="answer" id="2" onclick="answer(2)">
            <div class="answer-choice"><b>B</b></div> 
            ${question['answer_2']}
        </div>
        <div class="answer" id="3" onclick="answer(3)">
            <div class="answer-choice"><b>C</b></div> 
            ${question['answer_3']}
        </div>
        <div class="answer" id="4" onclick="answer(4)">
            <div class="answer-choice"><b>D</b></div> 
            ${question['answer_4']}
        </div>
    </div>
    `;
}

function answer(selection) {
    let question = allQuestions[currentQuestion];
    let idOfRightAnswer = question['right_answer'];

    if (selection == question['right_answer']) {
        rightQuestions++;
        document.getElementById(selection).classList.add('bg-right-answer-1');
        document.getElementById(selection).firstElementChild.classList.add('bg-right-answer-2');
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).classList.add('bg-wrong-answer-1');
        document.getElementById(selection).firstElementChild.classList.add('bg-wrong-answer-2');
        document.getElementById(idOfRightAnswer).classList.add('bg-right-answer-1');
        document.getElementById(idOfRightAnswer).firstElementChild.classList.add('bg-right-answer-2');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    updateProgressBar();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
    }
    startHTMLQuiz();
}

function updateProgressBar() {
    progress = Math.round((currentQuestion / allQuestions.length) * 100);
    document.getElementById('progress-bar').style.width = progress + '%';    
    startHTMLQuiz();
}

function showEndOfGame() {
    document.getElementById('quiz').innerHTML += `
    <div class="rounded-circle finish-circle">
        <div><img src="img/Group 5.png"></div>
        <div><b>COMPLETE <br> HTML QUIZ</b></div>
        <div class="score"><b>YOUR SCORE ${rightQuestions}/${allQuestions.length}</b></div>
        <div><button class="share-btn">SHARE</button></div>
        <div class="replay-btn" onclick="restartHTMLQuiz()">REPLAY</div>
    </div>
    `;
}

function restartHTMLQuiz() {
    rightQuestions = 0;
    currentQuestion = 0;
    progress = 0;
    document.getElementById('progress-bar').style.width = progress + '%'; //progress-bar zurück setzen
    startHTMLQuiz();
}