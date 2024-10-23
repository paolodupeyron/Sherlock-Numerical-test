//generate random number to guess
let secretNumber = Math.floor(Math.random() * 100) + 1;
//initialize attempts counter.
let attempts = 0;
//create numbers tried array
let numbersTried = [];

//create play again button element
let buttn = document.createElement('button');
buttn.innerHTML = 'Play Again';
buttn.id = "play-again";


// styling buttn

// created div element
let buttnDivEL = document.createElement('div');
//stylying the div
buttnDivEL.classList.add(
    'flex',
    'justify-center'
);

//adding buttn to div parent
buttnDivEL.append(buttn);


//button styling
buttn.classList.add(
    'bg-blue-600',
    'text-white',
    'font-bold',
    'py-3',
    'px-6',
    'my-4',
    'rounded-full',
    'hover:bg-blue-700',
    'shadow-md',
    'hover:shadow-lg',
    'transition-all',
    'duration-300'
);

//gets div element form html
let div = document.querySelector('div');
//crete variable to assign button element later
let playAgainBtn; 
//assign the element with the guess-input id to the variable
let guessInput = document.getElementById("guess-input");

let triedNumb;
let storedNumbers;



// function to compare the entered number with the randomly generated one.
function checkGuess() {

    let guess = document.getElementById("guess-input").value.trim();

   //verifies tha the text entered is not a letter or special char, and it is between 1 and 100
    if (!/^\d+$/.test(guess) || guess < 1 || guess > 100) {
        displayMessage("Please enter a valid whole number.");
        guessInput.value = "";
        return;
    }

    guess = parseInt(document.getElementById("guess-input").value);
    attempts++;

    //checks if the entered number has been tried previously during the current game
    if (numbersTried.includes(guess)) {
        displayMessage("You've already tried this number. Try a different one.");
        guessInput.value = "";
        return;
    }

    //adds the number entered to an array
    numbersTried.push(guess); 

    // compares guessed number with the generated number
    if (guess === secretNumber) {
        displayMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
        document.getElementById("guess-button").disabled = true; //disables guess button so it cannot be press after winning
        div.append(buttnDivEL); //adds button to play again.
        playAgainBtn = document.getElementById('play-again');
        playAgainBtn.addEventListener("click", clearGame);
        updateAttemptsDisplay();
       
    
    } else if (guess < secretNumber) {
        displayMessage("Too low! Try again."); //compares the guessed number and if it is too low it shows a message
        guessInput.value = "";
        updateAttemptsDisplay();
        
    } else {
        displayMessage("Too high! Try again.");//compares the guessed number and if it is high low it shows a message
        guessInput.value = "";
        updateAttemptsDisplay();
        
    }
    
    //gets the element with the id attempts-dispay
    triedNumb = document.getElementById("attempts-display");
    //saves the 
    localStorage.setItem('numbersTried', JSON.stringify(numbersTried));
}

//function to add the text of too high/low to the html
function displayMessage(message) 
 {
    document.getElementById("message").textContent = message;

}

//shows the numbers attempted
function updateAttemptsDisplay() {
    let attemptsDisplay = document.getElementById("attempts-display");
    if (!attemptsDisplay) {
        attemptsDisplay = document.createElement("p");
        attemptsDisplay.id = "attempts-display";
        div.append(attemptsDisplay);
    }
    attemptsDisplay.textContent = `Numbers tried: ${numbersTried.join(", ")}`;
    
    

}

//sets the game to original value + shows the numbers attempted on the last game
function clearGame (){

    document.getElementById("guess-button").disabled = false;
    attempts = 0;
    numbersTried = [];
    displayMessage("");
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessInput.value = "";
    playAgainBtn.remove();
    triedNumb.remove();

    storedNumbers = JSON.parse(localStorage.getItem('numbersTried'));

    displayMessage(`the numbers tried on the last game were: ${storedNumbers}`);

}

//allows to submit the guess with the enter key
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("guess-button").click();
    }
  });

// calls the checkGuess function when the button is clicked
document.getElementById("guess-button").addEventListener("click", checkGuess);

