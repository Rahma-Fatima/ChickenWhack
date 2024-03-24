const holes = document.querySelectorAll('.hole');
const scorboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startbutton = document.querySelector('.startbutton');
const highscoreboard = document.querySelector('.highscore');


let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highscore = localStorage.getItem('gameHighscore') || 0;
highscoreboard.textContent = 'HIGH SCORE:' + highscore;


function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time)
}

popOut();

function startGame() {
    countdown = timeLimit / 1000;
    scorboard.textContent = 0;
    scorboard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown
        if(countdown < 0){
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore()
            countdownBoard.textContent = 'Time is Up! Well done!'
        }
    }, 1000);
}

startbutton.addEventListener('click', startGame);

function starwhack(e) {
    score++;
    this.style.backgroundImage = 'url("chicken1.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("chicken2.png")';
        this.style.pointerEvents = 'all';
    }, 800)
    scorboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', starwhack)); 

function checkHighScore() {
    if(score > localStorage.getItem('gameHighscore')){
        localStorage.setItem('gameHighscore', score);
        highscore = score;
        highscoreboard.textContent = 'HIGH SCORE:' + highscore;
    }
}