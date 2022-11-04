// GLOBAL VARIABLES
let noOfQuesNeeded = 5;

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const retryButton = document.getElementById('retry-btn');
const questionText = document.getElementById('question-text');
// const answerBlock = document.getElementById('answer-buttons');
const img_container = document.getElementById('img_container');
const container = document.getElementById('container');
const hide_unhide_div = document.getElementById('hide_unhide_div');
const quizImg = document.getElementById('quizImg');
const tickImg = document.getElementById('tickImg');
const wrongImg = document.getElementById('wrongImg');

const ans1 = document.getElementById('ans1');
const ans2 = document.getElementById('ans2');
const ans3 = document.getElementById('ans3');
const ans4 = document.getElementById('ans4');
const ans = [ans1, ans2, ans3, ans4];

let questionCount = 0;
let questionIndex = -1;
let userAnswer = -1;
let score = 0;
let displayedQues = [];

function startQuiz() {
    startButton.classList.add('hide');
    container.style.width = '50%';
    questionText.style.textAlign = 'left';
    img_container.classList.remove('hide');
    for(i = 0; i<ans.length; i++) {
        ans[i].classList.remove('hide');
    }
    questionIndex = Math.floor(Math.random()*quiz.length);
    nextQues();  
}

function showNextButton() {
    nextButton.classList.remove('hide');
}

function choice(index) {
    removeAllBlueColor();
    ans[index].classList.add('blue');
    userAnswer = index;
    showNextButton();
}

function removeAllBlueColor() {
    for(i=0; i<ans.length; i++) {
        ans[i].classList.remove('blue');
    }
}

function nextQues() {
    nextButton.classList.add('hide');  // to remove next-btn displayed on screen due to prev. question
    if(userAnswer !== -1 && questionIndex !==-1 && userAnswer===quiz[questionIndex].answer) {
        score++;
    }
    if(questionCount==noOfQuesNeeded) {
        showSubmit();
        return;
    }
    removeAllBlueColor();
    questionCount++;
    while(displayedQues.includes(questionIndex)) {
        questionIndex = Math.floor(Math.random()*quiz.length);
    }
    displayedQues.push(questionIndex);
    questionText.innerHTML = quiz[questionIndex].q;
    for(i = 0; i < ans.length; i++) {
        ans[i].innerHTML = quiz[questionIndex].options[i];
    }
    quizImg.src = quiz[questionIndex].image_link;
}

function showSubmit() {
    questionText.innerHTML = "Submit your quiz for evaluation!";
    for(i = 0; i < ans.length; i++) {
        ans[i].classList.add("hide");
    }
    questionText.style.textAlign = 'center';
    img_container.classList.add('hide');
    container.style.width = '35%';
    nextButton.classList.add('hide');
    submitButton.classList.remove('hide');
}

function submitQuiz() {
    submitButton.classList.add('hide');
    questionText.innerHTML = `You scored ${score} out of ${noOfQuesNeeded}`;
    if(score >= 4) {
        tickImg.classList.remove('hide');
    }
    else {
        wrongImg.classList.remove('hide');
    }
    retryButton.classList.remove('hide');
}

function retry(){
    location.reload();
}
