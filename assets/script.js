const hrTxt = document.getElementById('hr');
const minTxt = document.getElementById('min');
const secTxt = document.getElementById('sec');
const countTxt = document.getElementById('count');
const actionLog = document.getElementById('actionLog');
const lapLog = document.getElementById('lapLog');

let hr = 0, min = 0, sec = 0, count = 0;
let timer = false;

function start() {
    timer = true;
    stopwatch();
}

function stop() {
    timer = false;
}

function reset() {
    timer = false;
    hr = min = sec = count = 0;
    updateDisplay();
    lapLog.innerHTML = "";
}

function lap() {
    if (timer) {
        const lapTime = formatTime(hr, min, sec, count);
        logLap("Lap: " + lapTime);
    }
}

function stopwatch() {
    if (timer) {
        count++;
        if (count === 100) { count = 0; sec++; }
        if (sec === 60) { sec = 0; min++; }
        if (min === 60) { min = 0; hr++; }

        updateDisplay();
        setTimeout(stopwatch, 10);
    }
}

function updateDisplay() {
    hrTxt.innerText = hr < 10 ? "0" + hr : hr;
    minTxt.innerText = min < 10 ? "0" + min : min;
    secTxt.innerText = sec < 10 ? "0" + sec : sec;
    countTxt.innerText = count < 10 ? "0" + count : count;
}

function formatTime(h, m, s, c) {
    return `${h < 10 ? '0' + h : h} : ${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s} : ${c < 10 ? '0' + c : c}`;
}

function logLap(lapText) {
    const li = document.createElement('li');
    li.textContent = lapText;
    lapLog.prepend(li);
}

// 💬 User Input Action Logger
function addUserAction() {
    const input = document.getElementById("actionInput");
    const action = input.value.trim();

    if (action !== "") {
        const li = document.createElement("li");
        li.textContent = `${new Date().toLocaleTimeString()} - ${action}`;
        actionLog.prepend(li);
        input.value = "";
    } else {
        alert("Please enter a valid action description.");
    }
}

// 🌙 Theme toggle
const toggle = document.getElementById("toggleTheme");
toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    document.querySelector(".mode-label").innerText =
        document.body.classList.contains("light") ? "Light Mode" : "Dark Mode";
});
