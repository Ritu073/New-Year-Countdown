// Set the target time for countdown (New Year at midnight)
const targetDate = new Date();
targetDate.setFullYear(new Date().getFullYear(), 11, 31); // Set to December 31st
targetDate.setHours(0, 0, 0, 0); // Set to 00:00:00 (midnight)

// Function to fetch the current time
async function fetchCurrentTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        return new Date(data.datetime);
    } catch (error) {
        console.error("Failed to fetch current time:", error);
        return new Date(); // Fallback to local time if API fails
    }
}

// Function to calculate the countdown
function calculateCountdown(targetDate, currentTime) {
    const difference = targetDate - currentTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

// Function to update the flip clock
function updateFlipClock(id, value) {
    const flip = document.getElementById(id);
    if (flip.textContent !== value.toString()) {
        flip.classList.remove('active');
        setTimeout(() => {
            flip.textContent = value;
            flip.classList.add('active');
        }, 200);
    }
}

// Function to create colorful fireworks
function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    
    // Randomize position and color
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 50 + 'vh';
    
    const colors = ['#ffcc00', '#ff007f', '#00ff00', '#00b3b3', '#ff5733', '#800080'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    firework.style.backgroundColor = randomColor;

    document.getElementById('fireworks-container').appendChild(firework);
    setTimeout(() => firework.remove(), 1500); // Remove after animation
}

// Function to update the countdown every second
async function updateCountdown() {
    const currentTime = await fetchCurrentTime();
    const countdown = calculateCountdown(targetDate, currentTime);

    updateFlipClock('days', countdown.days);
    updateFlipClock('hours', countdown.hours);
    updateFlipClock('minutes', countdown.minutes);
    updateFlipClock('seconds', countdown.seconds);

    // Check if countdown has reached 0
    if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
        clearInterval(interval);
        document.getElementById('greeting').classList.add('show');
        document.getElementById('newYearSound').play();
        setInterval(createFirework, 200); // Start fireworks when countdown reaches 0
    }
}

// Initialize countdown immediately, then update every second
updateCountdown();
const interval = setInterval(updateCountdown, 1000);
