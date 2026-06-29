// Navigation Logic
function navTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Reset timer if leaving active workout screen
    if(screenId !== 'screen-active-workout') {
        resetTimer();
    }
}

// Timer Logic
let timeLeft = 60;
let timerInterval = null;
let isRunning = false;
const timeDisplay = document.getElementById('timeDisplay');
const playPauseBtn = document.getElementById('playPauseBtn');

function updateDisplay() {
    timeDisplay.innerText = timeLeft;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left:3px;"></i>';
    } else {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left:3px;"></i>';
            }
        }, 1000);
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 60;
    updateDisplay();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}
