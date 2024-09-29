const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    value: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,    
    },
    
    actions:{
        timerId: setInterval(randonSquare, 1000),
        countDownTimerId: setInterval(countdown, 1000),
    }
};

function countdown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime <= 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    // Remover listeners de clique
    state.view.squares.forEach((square) => {
        square.replaceWith(square.cloneNode(true)); // Remove os listeners
    });

    alert("Game over! O seu resultado foi " + state.value.result);
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.4;
    audio.play();
}

function randonSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function main() {
    addListenerHitBox();
}

main();
