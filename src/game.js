let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let buttn = document.createElement('button');
buttn.innerHTML = 'Play Again';
buttn.id = "play-again";
let div = document.querySelector('div');
let playAgainBtn;
let guessInput = document.getElementById("guess-input");



function checkGuess() {
    
    while ((document.getElementById("guess-input").value).NaN )
    {
        displayMessage(`Please enter a valid number`);
        guessInput.value = "";
    }
    
    let guess = parseInt(document.getElementById("guess-input").value);
    attempts++;





    if (guess === secretNumber) {
        displayMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
        document.getElementById("guess-button").disabled = true;
        div.append(buttn);
        playAgainBtn = document.getElementById('play-again');
        playAgainBtn.addEventListener("click", clearGame);
        console.log(playAgainBtn);
       
    
    } else if (guess < secretNumber) {
        displayMessage("Too low! Try again.");
        guessInput.value = "";
        
    } else {
        displayMessage("Too high! Try again.");
        guessInput.value = "";
    }
}

function displayMessage(message) 
 {
    document.getElementById("message").textContent = message;

}

function clearGame (){

    document.getElementById("guess-button").disabled = false;
    attempts = 0;
    displayMessage("");
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessInput.value = "";
    playAgainBtn.remove();

}


document.getElementById("guess-button").addEventListener("click", checkGuess);