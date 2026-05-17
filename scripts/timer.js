const timer = document.getElementById("time-remaining");
const progress = document.getElementById("progress-circle");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

let totalTimeSec = 10; // Change later dynamic
let timeRemainingSec = totalTimeSec;

const circumference = 2 * Math.PI * 85; // 2 * π * r (r = 85)
progress.style.strokeDasharray = circumference;

function updateTimer() {
    const minutes = Math.floor(timeRemainingSec / 60);
    const seconds = timeRemainingSec % 60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const progressPercent = (totalTimeSec - timeRemainingSec) / totalTimeSec;
    progress.style.strokeDashoffset = circumference * (1 - progressPercent);

    if(timeRemainingSec > 0) {
        timeRemainingSec--;
        setTimeout(updateTimer, 1000);
    }
}

updateTimer();