const btnEl = document.querySelectorAll('button');
const bodyEl = document.querySelector('body')
const btnStart = btnEl[0];
const btnStop = btnEl[1];
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener("click", onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick)

function onBtnStartClick(event) {
    btnStart.disabled = true
    if (btnStop.disabled) {
       btnStop.disabled = false;  
    }
    
    bodyEl.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
};

function onBtnStopClick(event) {
    btnStart.disabled = false;
    btnStop.disabled = true;
    
    clearInterval(timerId)
}


