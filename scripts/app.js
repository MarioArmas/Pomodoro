const audio = new Audio("assets/song.mp3")
const status_element = document.getElementById('status')
const WORK_TIME = 1500
const CHILL_TIME = 300
const start_btn = document.getElementById('start')
const pause_btn = document.getElementById('pause')
const restart_btn = document.getElementById('restart')

function restart() {
    pause()
    timePassed = 0
    timeLeft = TIME_LIMIT
    timerInterval = null
    style()
}

function start() {
    start_btn.style.display = 'none'
    pause_btn.style.display = 'block'
    TIME_LIMIT = WORK_TIME
    timerInterval ?? null ? {} : startTimer()
}

function startAudio() {
    document.getElementById('stop-audio').style.display = 'block'
    audio.play()
}

function stopAudio() {
    document.getElementById('stop-audio').style.display = 'none'
    audio.pause()
}

function pause() {
    start_btn.style.display = 'block'
    pause_btn.style.display = 'none'
    clearInterval(timerInterval);
    timerInterval = null
}

// timer
// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

var TIME_LIMIT = WORK_TIME;
var timePassed = 0;
var timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

const style = () => {
    document.getElementById("timer").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
    </div>
    `;
}

style()

function onTimesUp() {
  clearInterval(timerInterval);
  startAudio()
  TIME_LIMIT = TIME_LIMIT === WORK_TIME ? CHILL_TIME : WORK_TIME
  timePassed = 0
  startTimer()
}

function startTimer() {
    status_element.innerHTML = TIME_LIMIT === WORK_TIME ? 'Work time!' : 'Chill time!'
    style()
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}
