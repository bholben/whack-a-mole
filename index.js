(function (window, document, Date, Math) {
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const scoreBoard = document.querySelector('.score');
  const startButton = document.querySelector('button');
  let lastHoleIndex;
  let isTimeRemaining;
  let timerId;

  moles.forEach(mole => mole.addEventListener('click', e => {
    if (!e.isTrusted) return;  // This blocks cheating hackers!
    scoreBoard.textContent++;
    mole.parentElement.classList.remove('up');
  }));

  startButton.addEventListener('click', startGame);

  function startGame() {
    if (!isTimeRemaining) {
      scoreBoard.textContent = 0;
      startTimer(20);
      peep(holes);
    }
  }

  function startTimer(seconds) {
    const timer = document.querySelector('.timer');
    const now = Date.now();
    const then = now + seconds * 1000;
    timer.textContent = seconds;
    isTimeRemaining = true;

    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      const millisecondsLeft = Math.abs(then - Date.now());
      const secondsLeft = Math.round(millisecondsLeft / 1000);
      timer.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        isTimeRemaining = false;
        window.clearInterval(timerId);
      }
    }, 1000);
  }

  function peep(holes) {
    const time = getRandomTime(500, 1300);
    const hole = getRandomHole(holes);
    hole.classList.add('up');
    window.setTimeout(() => {
      hole.classList.remove('up');
      if (isTimeRemaining) peep(holes);
    }, time);
  }

  function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function getRandomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    if (index === lastHoleIndex) return getRandomHole(holes);
    lastHoleIndex = index;
    return holes[index];
  }

})(window, document, Date, Math);
