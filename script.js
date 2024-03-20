const minutesPoint = document.getElementById("minutes");
const secondsPoint = document.getElementById("seconds");
const millisecondsPoint = document.getElementById("milliseconds");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const clearButton = document.getElementById("clearBUtton");

const history = document.getElementById("history");
const historyList = document.getElementById("history-list");
const historyHeading = document.getElementById("historyHeading");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let buttonVisibility = false;

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds += 1;
    if (seconds === 60) {
      milliseconds = 0;
      seconds = 0;
      minutes += 1;
    }
  }

  minutesPoint.textContent = padTime(minutes);
  secondsPoint.textContent = padTime(seconds);
  millisecondsPoint.textContent = padMilliseconds(milliseconds);
}
function padTime(time) {
  return time.toString().padStart(2, "0");
}

function padMilliseconds(time) {
  return time.toString().padStart(3, "0");
}

function onStart() {
  if (!isRunning) {
    interval = setInterval(updateTime, 10);
    isRunning = true;
    startButton.disabled = true;
  }
}

function onStop() {
  if (isRunning == true) {
    clearInterval(interval);
    isRunning = false;
    startButton.disabled = false;
    // if(!buttonVisibility){
    //   clearButton.classList.toggle("visibleClearButton");
    // }
    // buttonVisibility = true;
    // clearButton.classList.toggle('visibleClearButton');
    historySaved();
  }
}

function historySaved() {
  historyHeading.innerText = "History";
  const clearButton = document.createElement("button");
  clearButton.HTML = `<button class="btn">CLear</button>`;
  const historyItem = `${padTime(minutes)}:${padTime(
    seconds
  )}:${padMilliseconds(milliseconds)}`;
  const listItem = document.createElement("li");
  listItem.textContent = historyItem;
  historyList.appendChild(listItem);
}
function onReset() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  minutesPoint.innerText = `00`;
  millisecondsPoint.innerText = `00`;
  secondsPoint.innerText = `00`;
  historyList.innerHTML = "";
  historyHeading.innerText="";

}

startButton.addEventListener("click", onStart);
stopButton.addEventListener("click", onStop);
resetButton.addEventListener("click", onReset);
