document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('show');
    });
    const breathingCircle = document.getElementById('breathing-circle');
    const instructionText = document.getElementById('instruction');
    const timerText = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    let intervalId = null;

    startButton.addEventListener('click', startBreathingExercise);

    function startBreathingExercise() {
        startButton.disabled = true; // Poistetaan käytöstä harjoituksen ajaksi
        const totalTime = 120; // Harjoituksen kokonaiskesto sekunneissa
        let timeElapsed = 0;

        intervalId = setInterval(() => {
            if (timeElapsed < totalTime) {
                timerText.textContent = `Aikaa jäljellä: ${totalTime - timeElapsed} s`;
                timeElapsed++;
            } else {
                clearInterval(intervalId);
                instructionText.textContent = "Harjoitus päättyi";
                timerText.textContent = "";
                startButton.disabled = false;
            }
        }, 1000);

        breathingAnimation();
    }

    function breathingAnimation(stage = 'inhale', timeElapsed = 0) {
        const phases = {
            'inhale': { next: 'hold', duration: 5, text: 'Hengitä sisään' },
            'hold': { next: 'exhale', duration: 2, text: 'Pidä hengitystä' },
            'exhale': { next: 'inhale', duration: 8, text: 'Hengitä ulos' }
        };

        const currentPhase = phases[stage];
        let phaseTime = currentPhase.duration;
        instructionText.textContent = currentPhase.text;

        if (stage === 'inhale') {
            breathingCircle.style.transform = 'scale(1.5)';
        } else if (stage === 'exhale') {
            breathingCircle.style.transform = 'scale(1)';
        }

        clearInterval(intervalId);  // Clear the global interval to manage specific phase timing
        intervalId = setInterval(() => {
            if (phaseTime > 0) {
                timerText.textContent = `${currentPhase.text}: ${phaseTime--} s`;
            } else {
                clearInterval(intervalId);
                breathingAnimation(currentPhase.next);  // Start next phase
            }
        }, 1000);
    }
});
