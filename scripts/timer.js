const timer = document.getElementById("time-remaining");
const progress = document.getElementById("progress-circle");
const totalTimeDisplay = document.getElementById("total-time");
const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const sound = new Audio('../public/sounds/timer.mp3');

let totalTimeSec = 0; 
const RADIUS = 85;
const circumference = 2 * Math.PI * RADIUS;

let animationFrameId = null;
let startTime = null;
let pauseTime = null; 

if (progress) {
  progress.style.strokeDasharray = circumference;
  progress.style.strokeDashoffset = circumference;
}

function formatTime(remainingSeconds) {
  const clamped = Math.max(0, Math.ceil(remainingSeconds));
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  if (hours === 0) {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateFrame(timestamp) {
    if (startTime === null) startTime = timestamp;

    const elapsedTime = (timestamp - startTime) / 1000;
    const remaining = Math.max(totalTimeSec - elapsedTime, 0);
    const progressPercent = Math.min(elapsedTime / totalTimeSec, 1);

    if (timer) timer.textContent = formatTime(remaining);
    if (progress) progress.style.strokeDashoffset = circumference * (1 - progressPercent);

    if (remaining > 0) {
        animationFrameId = requestAnimationFrame(updateFrame);
    } else {
        animationFrameId = null;
        sound.play();
        timer.textContent = "Time's up!";
        pauseBtn.classList.add("hidden");
        totalTimeDisplay.classList.add("hide-visbility");
    }
}

function startTimer() {
    // Check that timer isn't already running
    if (animationFrameId) return;
    if (pauseTime != null) {
        startTime = performance.now() - (pauseTime * 1000);
        pauseTime = null;
    } else {
        startTime = null; // will be set on first frame
    }
    const hoursSec = parseInt(hoursInput.value) * 3600 || 0;
    const minutesSec = parseInt(minutesInput.value) * 60 || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTimeSec = hoursSec + minutesSec + seconds;
    totalTimeDisplay.classList.remove("hide-visbility");
    totalTimeDisplay.textContent = `/${formatTime(totalTimeSec)}`;

    if(totalTimeSec <=0) return;

    animationFrameId = requestAnimationFrame(updateFrame);
    document.getElementById("total-time").classList.remove("hidden");
    document.getElementById("timer-select").classList.add("hidden");
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

function pauseTimer() {
    // Check that timer is running
    if (!animationFrameId) return;

    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    const now = performance.now();
    pauseTime = (now - startTime) / 1000;
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    startBtn.textContent = "Resume";
}

function resetTimer() {
    // Stops timer
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    startTime = null;
    pauseTime = null;

    if (timer) timer.textContent = formatTime(totalTimeSec);
    if (progress) progress.style.strokeDashoffset = circumference;

    document.getElementById("timer-select").classList.remove("hidden");
    document.getElementById("total-time").classList.add("hidden");
    startBtn.classList.remove("hidden");
    resetBtn.classList.add("hidden");

    startBtn.textContent = "Start";
    timer.textContent = "Timer";

    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
}

if (startBtn) startBtn.addEventListener("click", startTimer);
if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
if (resetBtn) resetBtn.addEventListener("click", resetTimer);