//refs
const daysRef = document.querySelector("[data-value='days']");
const hoursRef = document.querySelector("[data-value='hours']");
const minsRef = document.querySelector("[data-value='mins']");
const secsRef = document.querySelector("[data-value='secs']");

//main class
class CountdownTimer { 
    constructor({ selector, targetDate, onTick }) { 
        this.targetDate = targetDate;
        this.selector = selector;
        this.onTick = onTick;
    }
    start() {
        //basic logic
        setInterval(() => {
            const currentTime = Date.now();
            const time = this.targetDate - currentTime;

            //milliseconds in days/hours/minutes/seconds
            const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
            const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

            //update HTML
            this.onTick(days, hours, mins, secs)

        }, 1000)
        //function for standardization number format
        function pad(value) {
            return String(value).padStart(2, '0');
        }
    }
}


// function for update HTML out of class
function updateTimer(days, hours, mins, secs) { 
    if (secs < 0) { //проверка на "прошлое"
        daysRef.textContent = '00';
            hoursRef.textContent = '00';
            minsRef.textContent = '00';
            secsRef.textContent = '00';
    } else {
            daysRef.textContent = days;
            hoursRef.textContent = hours;
            minsRef.textContent = mins;
            secsRef.textContent = secs;
}}

// new copy of class
const newYearTimer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Jan 01, 2021'),
    onTick: updateTimer
});

newYearTimer.start()