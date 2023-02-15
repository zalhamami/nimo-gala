const el = elem => document.querySelector(elem);

const countdown = function(_config) {
  const tarDate = el(_config.target).getAttribute('data-date').split('-');
  const day = parseInt(tarDate[2]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[0]);
  let tarTime = el(_config.target).getAttribute('data-time');
  let tarhour, tarmin;

  if (tarTime != null) {
    tarTime = tarTime.split(':');
    tarhour = parseInt(tarTime[0]);
    tarmin = parseInt(tarTime[1]);
  }

  let months = [31, new Date().getFullYear() % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dateNow = new Date();
  let dayNow = dateNow.getDate();
  let monthNow = dateNow.getMonth() + 1;
  let yearNow = dateNow.getFullYear();
  let hourNow = dateNow.getHours();
  let minNow = dateNow.getMinutes();
  let count_day = 0, count_hour = 0, count_min = 0;
  let count_day_isSet = false;
  let isOver = false;

  // Set the date we're counting down to
  const countDownDate = new Date(year, month-1, day, tarhour, tarmin, 0, 0).getTime();

  const dayWord = el(_config.target+' .day .word')
  if (dayWord) {
    dayWord.innerHTML = _config.dayWord;
  }

  const hourWord = el(_config.target+' .hour .word')
  if (hourWord) {
    hourWord.innerHTML = _config.hourWord;
  }

  const minWord =  el(_config.target+' .min .word')
  if (minWord) {
    minWord.innerHTML = _config.minWord;
  }


  const secWord = el(_config.target+' .sec .word')
  if (secWord) {
    secWord.innerHTML = _config.secWord; 
  }

  const updateTime = () => {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;
    if (distance < 0) {
      el(_config.target+' .day .num').innerHTML = 'D';
      el(_config.target+' .hour .num').innerHTML = 'O';
      el(_config.target+' .min .num').innerHTML = 'N';
      el(_config.target+' .sec .num').innerHTML = 'E';
      return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    requestAnimationFrame(updateTime);

    el(_config.target+' .day .num').innerHTML = addZero(days);
    el(_config.target+' .hour .num').innerHTML = addZero(hours);
    el(_config.target+' .min .num').innerHTML = addZero(minutes);
    el(_config.target+' .sec .num').innerHTML = addZero(seconds);
  }

  updateTime();
}

const addZero = (x) => (x < 10 && x >= 0) ? "0"+x : x;
