console.log('linked');
let userInput = 0;
let resultDisplay = document.getElementById("Result_Display");
const secondsInYear = 31557600;
let increment = 0;
let currentValue = 0;


function getUserInput(){
    userInput = +document.getElementById("User_Input").value;
    increment = userInput / secondsInYear;
    setInterval(yearCalc, 1000);
}

function yearCalc(){
    currentValue = currentValue + increment;
    resultDisplay.innerHTML = currentValue.toFixed(2);
}
