import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const btnEl = document.querySelector("[data-start]");
const InputEl = document.querySelector('#datetime-picker');
const SpanDaysEl = document.querySelector('[data-days]');
const SpanHoursEl = document.querySelector('[data-hours]');
const SpanMinEl = document.querySelector('[data-minutes]');
const SpanSecEl = document.querySelector('[data-seconds]');

btnEl.disabled = true;
btnEl.addEventListener('click', countTimeStart);

let deadLineDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
            deadLineDate = selectedDates[0];
            btnEl.disabled = false
            
        }  
  },
};


function countTimeStart() {  
    btnEl.disabled = true;
    InputEl.disabled = true;
   
    timerId = setInterval(() => {
        const currentTime = new Date();
        const diff = deadLineDate - currentTime;
        const timeComponents = convertMs(diff);

        timeComponents.days < 10 ? SpanDaysEl.textContent = '0' + `${timeComponents.days}` : SpanDaysEl.textContent = timeComponents.days;
        timeComponents.hours < 10 ? SpanHoursEl.textContent = '0' + `${timeComponents.hours}` : SpanHoursEl.textContent = timeComponents.hours;
        timeComponents.minutes < 10 ? SpanMinEl.textContent = '0' + `${timeComponents.minutes}` : SpanMinEl.textContent = timeComponents.minutes;
        timeComponents.seconds < 10 ? SpanSecEl.textContent = '0' + `${timeComponents.seconds}` : SpanSecEl.textContent = timeComponents.seconds;

   if (diff < 1000) {
       clearInterval(timerId);
           btnEl.disabled = false;
    InputEl.disabled = false;
    }
    }, 1000)
 
}



function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
 
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


flatpickr(InputEl, options)
