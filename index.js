const text = document.querySelector("h1");
const input = document.querySelector("input");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const label = document.querySelector("label");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function reset() {
  // resets elements back to default
  input.classList.remove("hidden");
  startButton.classList.remove("hidden");
  resetButton.classList.add("hidden");
  label.classList.remove("hidden");
  text.textContent = "Timer";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startCountdown(seconds) {
  input.classList.add("hidden");
  startButton.classList.add("hidden");
  label.classList.add("hidden");
  resetButton.classList.remove("hidden");

  let startingSeconds = seconds;
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds - minutes * 60;

  ctx.beginPath();
  ctx.arc(250, 250, 140, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgb(253, 85, 85)";
  ctx.stroke();

  setTimerText(minutes, secondsLeft);

  const interval = setInterval(() => {
    seconds--;
    minutes = Math.floor(seconds / 60);
    secondsLeft = seconds - minutes * 60;
    console.log(minutes, secondsLeft);

    setTimerText(minutes, secondsLeft);

    let circlePercent = ((Math.PI * 2) / startingSeconds) * seconds;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(250, 250, 140, 0, circlePercent);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgb(253, 85, 85)";
    ctx.stroke();

    resetButton.addEventListener("click", () => {
      clearInterval(interval);
      reset();
    });

    if (seconds <= 0) {
      clearInterval(interval);
      text.textContent = "Time's up";
    }
  }, 1000);
}

function setTimerText(mins, secsLeft) {
  if (secsLeft < 10) {
    text.textContent = `${mins}:0${secsLeft}`;
  } else {
    text.textContent = `${mins}:${secsLeft}`;
  }
}

startButton.addEventListener("click", () => {
  mins = input.value;
  startCountdown(mins * 60);
});

// startCountdown(3000);
