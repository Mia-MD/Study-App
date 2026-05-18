const timer = document.getElementById("time-remaining");
const progress = document.getElementById("progress-circle");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

const sound = new Audio('../public/sounds/timer.mp3');

const totalTimeSec = 10; 
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
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
    animationFrameId = requestAnimationFrame(updateFrame);
}

function pauseTimer() {
    // Check that timer is running
    if (!animationFrameId) return;

    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    const now = performance.now();
    pauseTime = (now - startTime) / 1000;
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
}

if (startBtn) startBtn.addEventListener("click", startTimer);
if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
if (resetBtn) resetBtn.addEventListener("click", resetTimer);