var newgame = document.getElementById('newGame');
var newhead1 = document.getElementById('newhead');
var inputBox = document.getElementById('input1');
var prevGuess = document.querySelector('.guesses');
var guessRem= document.getElementById('remainingGuess');
var numGuesses = 1;

function startGame(){
    var random1 = Math.round(Math.random()*100);
    random = random1;
    
    function compare(x,y){
        if(x===y){
            newhead1.classList.add('heading1');
            newhead1.innerHTML="You Guessed Correctly!!🎉🎉";
            inputBox.setAttribute('disabled', '');
            newgame.classList.add('buttons');
            newgame.innerHTML="Start New Game!";       
        }
        else if (x < y){
            newhead1.classList.add('heading1');
            newhead1.innerHTML="Too low! Guess again!";
        }
        else if (x > y){
            newhead1.classList.add('heading1');
            newhead1.innerHTML="Too high! Guess again!";
        }
    }

    function limitnum(){
        newhead1.classList.add('heading1');
        newhead1.innerHTML="Oh! You couldn't guess the right number!!! The real number was " + `${random}`;
        inputBox.setAttribute('disabled', '');
        newgame.classList.add('buttons');
        newgame.innerHTML="Start New Game!";
    }
    
    function displayGuesses(){
        numGuesses++;
        guessRem.innerHTML = `${11 - numGuesses}  `;
        if (numGuesses === 11){
            limitnum();
        }
    }

    function myfunc(event){
        var input12 = inputBox.value;
        input2=Number(input12);
        if(input2<1 || input2>100 ){
            alert("Please Enter a Valid Number");
        }
        else{
            compare(input2, random);
            inputBox.value="";
            prevGuess.innerHTML+=`${input2} `;
            displayGuesses();
        }
    }
    document.getElementById('button').addEventListener('click',myfunc);
    document.getElementById("input1").addEventListener('keypress',function(e){
        console.log("I am in input");
        if(e.key=='Enter'){
            e.preventDefault();
            myfunc();
        }
    });
}
startGame();

document.getElementById('newGame').addEventListener('click',function(){
    startGame();
    newgame.innerHTML="";
    newgame.classList.remove('buttons');
    newhead1.innerHTML="";
    newhead1.classList.remove('heading1');
    numGuesses = 1;
    guessRem.innerHTML = `${11 - numGuesses}  `;
    prevGuess.innerHTML = "";
    inputBox.removeAttribute('disabled');
})