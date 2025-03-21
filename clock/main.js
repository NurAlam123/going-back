// Digital Clock
const dateSpan = document.querySelector(".watch__digital-date");
const hourSpan = document.querySelector(".watch__digital-hour");
const minuteSpan = document.querySelector(".watch__digital-minute");

// Analog Clock
const analogHourHand = document.querySelector(".watch__analog-hour");
const analogMinuteHand = document.querySelector(".watch__analog-minute");
const analogSecondHand = document.querySelector(".watch__analog-second");

const HAND_ANGLE = 6;
const TICK = 5;
const DEFAULT_ANGLE = 180;

let lastSecond = -1;

const changeTime = () => {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  // Set digital time
  dateSpan.textContent = currentTime.toDateString();
  hourSpan.textContent = currentHours.toString().padStart(2, "0");
  minuteSpan.textContent = currentMinutes.toString().padStart(2, "0");

  // Set analog time
  const analogHour = currentHours > 12 ? currentHours - 12 : currentHours;
  const hourAngle = analogHour * HAND_ANGLE * TICK + DEFAULT_ANGLE;
  const minuteAngle = currentMinutes * HAND_ANGLE + DEFAULT_ANGLE;

  analogHourHand.style.setProperty("--rotation", `${hourAngle}deg`);
  analogMinuteHand.style.setProperty("--rotation", `${minuteAngle}deg`);

  if (currentSeconds === 0 && lastSecond === 59) {
    const fullRotationAngle = DEFAULT_ANGLE + 360;

    analogSecondHand.style.setProperty("--rotation", `${fullRotationAngle}deg`);

    setTimeout(() => {
      analogSecondHand.style.transition = "none";
      analogSecondHand.style.setProperty("--rotation", `${DEFAULT_ANGLE}deg`);

      analogSecondHand.offsetHeight;

      analogSecondHand.style.transition =
        "rotate 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)";
    }, 200);
  } else {
    const secondAngle = currentSeconds * HAND_ANGLE + DEFAULT_ANGLE;
    analogSecondHand.style.setProperty("--rotation", `${secondAngle}deg`);
  }

  lastSecond = currentSeconds;
};

changeTime();

setInterval(changeTime, 1000);
