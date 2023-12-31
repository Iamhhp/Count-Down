const inputValueMin = document.querySelector('input');
const eleParaTimer = document.querySelector('p');
const BtnsTimer = document.querySelectorAll('button');

let timer;
inputValueMin.addEventListener('keypress', (e) => {
  e.preventDefault();
  const { key } = e;
  const charCodeKey = key.charCodeAt(0);

  if (charCodeKey < 47 || charCodeKey > 57) {
    window.alert('Please Enter Number!');
    return;
  }

  inputValueMin.value += key;
});

function countDownTimer() {
  const time = eleParaTimer.innerText;
  let hour = Number(time.slice(0, 2));
  let min = Number(time.slice(3, 5));
  let sec = Number(time.slice(6));

  sec = (Math.floor((sec - 0.1) * 10) / 10).toFixed(1);
  if (sec < 0) {
    if (hour > 0 || min > 0) {
      sec = 59.9;
      min -= 1;
    } else {
      sec = '00.0';
    }
  }

  if (min < 0) {
    if (hour > 0) {
      min = 59;
      hour -= 1;
    } else {
      min = 0;
    }
  }

  if (hour < 0) {
    hour = 0;
  }

  eleParaTimer.innerText = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(4, '0')}`;

  if (!hour && !min && sec == '00.0') {
    window.alert("Time's up");
    window.clearInterval(timer);
    timer = 0;
  }
}

// Btn Star
BtnsTimer[0].addEventListener('click', () => {
  if (!timer && Number(inputValueMin.value) != 0) {
    const time = Number(inputValueMin.value);
    const hour = Math.floor(time / 60);
    const min = time % 60;
    eleParaTimer.innerText = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00.0`;

    timer = window.setInterval(countDownTimer, 100);
  } else if (timer == -2) {
    timer = window.setInterval(countDownTimer, 100);
  } else {
    window.alert('Enter Value greater zero!');
    inputValueMin.focus();
  }
});

// Btn Reset
BtnsTimer[1].addEventListener('click', () => {
  window.clearInterval(timer);
  timer = 0;
  eleParaTimer.innerText = '00:00:00.0';
  inputValueMin.value = 0;
});

// Btn Stop
BtnsTimer[2].addEventListener('click', () => {
  window.clearInterval(timer);
  timer = -2;
});

window.addEventListener('focus', () => {
  if (timer == -1) {
    timer = window.setInterval(countDownTimer, 100);
  }
});

window.addEventListener('blur', () => {
  if (timer > 0) {
    window.clearInterval(timer);
    timer = -1;
  }
});
