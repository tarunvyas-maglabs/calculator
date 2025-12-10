let operator, x, y;
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const operators = "+-/x"; 

function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    if(operator === "+"){
        return add(a, b);
    } else if (operator === "-"){
        return subtract(a, b);
    } else if (operator === "x"){
        return multiply(a, b)
    } else if (operator === "/"){
        if (b === 0) return "ERROR";
        return divide(a, b);
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        let buttonValue = event.target.dataset.value;
        if(operators.includes(buttonValue)){
            handleOperator(buttonValue);
        } else if(buttonValue === "equal"){
            handleEqual();
        } else if(buttonValue === "clear"){
            handleClear();   
        } else if (buttonValue === "backspace"){
            handleBackspace();
        } else {
            handleDigit(buttonValue);
        }
    })
})

function handleBackspace(){
    let currentValue = display.textContent;
    if(!(display.textContent === "0" || display.textContent === "")){
        display.textContent = currentValue.slice(0, -1);
    }
}

function handleClear(){
    display.textContent = "0";
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
}

function handleOperator(buttonValue){
    let currentValue = display.textContent;
    if (currentValue === "") return;
    if (!currentOperator && !firstOperand){
        firstOperand = Number(currentValue);
        currentOperator = buttonValue;
        display.textContent = "";
    } else if (currentOperator && !secondOperand){
        secondOperand = Number(currentValue);
        let result = operate(currentOperator, firstOperand, secondOperand);
        display.textContent = result;
        firstOperand = result;
        secondOperand = null;
        currentOperator = buttonValue;
        shouldResetScreen = true;
    } else {
        currentOperator = buttonValue;
        display.textContent = "";
    }
}


function handleDigit(buttonValue){
    if(display.textContent === "0" || shouldResetScreen){
        display.textContent = buttonValue;
        shouldResetScreen = false;
        if(currentOperator === null){
            firstOperand = null;
        }
    } else {
        display.textContent += buttonValue;
    }
}

function handleEqual(){
    let currentValue = display.textContent;
    if(currentValue === "") return;
    if(currentOperator && firstOperand && !secondOperand){
        secondOperand = Number(currentValue);
        let result = operate(currentOperator, firstOperand, secondOperand);
        display.textContent = result;
        firstOperand = result;
        secondOperand = null;
        currentOperator = null;
        shouldResetScreen = true;
    }
}