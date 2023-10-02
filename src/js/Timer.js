let min = 0;
let hour = 0;
let sec;
let timerId;

export default class Timer {
  init() {
    document.querySelector('.timer').innerHTML = '00:00:00';
    sec = 0;
    timerId = setInterval(this.tick, 1000);
  }

  tick() {
    sec++;
    if (sec >= 60) {
      min++;
      sec -= 60;
    }
    if (min >= 60) {
      hour++;
      min -= 60;
    }
    if (sec < 10) {
      if (min < 10) {
        if (hour < 10) {
          document.querySelector('.timer').innerHTML = `0${hour}:0${min}:0${sec}`;
        } else {
          document.querySelector('.timer').innerHTML = `${hour}:0${min}:0${sec}`;
        }
      } else if (hour < 10) {
        document.querySelector('.timer').innerHTML = `0${hour}:${min}:0${sec}`;
      } else {
        document.querySelector('.timer').innerHTML = `${hour}:${min}:0${sec}`;
      }
    } else if (min < 10) {
      if (hour < 10) {
        document.querySelector('.timer').innerHTML = `0${hour}:0${min}:${sec}`;
      } else {
        document.querySelector('.timer').innerHTML = `${hour}:0${min}:${sec}`;
      }
    } else if (hour < 10) {
      document.querySelector('.timer').innerHTML = `0${hour}:${min}:${sec}`;
    } else {
      document.querySelector('.timer').innerHTML = `${hour}:${min}:${sec}`;
    }
  }

  stop() {
    clearInterval(timerId);
  }
}
