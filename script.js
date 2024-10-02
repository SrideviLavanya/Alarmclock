const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const alarmStatus = document.getElementById('alarmStatus');
const alarmSound = document.getElementById('alarmSound');

let alarmTime = null;
let alarmTimeout = null;

// Update current time every second
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTimeDisplay.textContent = `Currents Time: ${hours}:${minutes}:${seconds}`;
    

    // Check if the current time matches the alarm time
    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        triggerAlarm();
        alarmSound.play();
    }
}

function triggerAlarm() {
    alarmStatus.textContent = "⏰ Alarm ringing!";
    alarmSound.play();  // Play the sound

    // Show browser notification
    if (Notification.permission === "granted") {
        new Notification("Alarm", { body: "Wake up! It's time!" });

alarmSound.play(); 
        
    }

    // Clear the alarm
    clearAlarm();
}

// Set alarm function
function setAlarm() {
    if (alarmTimeInput.value) {
        alarmTime = alarmTimeInput.value;
        alarmStatus.textContent = `Alarm set for ${alarmTime}`;
    } else {
        alert("Please set a valid time for the alarm.");
    }
}

// Clear alarm
function clearAlarm() {
    alarmTime = null;
    alarmStatus.textContent = "";
    clearTimeout(alarmTimeout);
}

// Request notification permission on load
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

setAlarmBtn.addEventListener('click', setAlarm);

// Update the time every second
setInterval(updateCurrentTime, 1000);
