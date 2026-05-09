let startTime = 0;
let elapsedTime = 0;
let timerInterval = 0;
let isRunning = false;
let lapCountt = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function start() {
    if(!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(tick,0);

        isRunning = true;
        startBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    }
    else {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;

        isRunning = false;
        startBtn.textContent = 'Resume';
    }
}

function tick() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function reset() {
    clearInterval(timerInterval);

    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;

    display.textContent = '00:00:00';
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapList.innerHTML = '';
}

function lap() {
    lapCount++;

    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;
    lapList.insertBefore(li,lapList.firstChild);
}

function formatTime(ms){
    const minutes = Math.floor(ms/60000);
    const seconds = Math.floor((ms%60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return (
        String(minutes).padStart(2,'0') + ':' + 
        String(seconds).padStart(2,0) + ':' +
        String(centiseconds).padStart(2,'0')
    );
}
