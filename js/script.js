// Global Declarations
    // selectors
const clear = document.querySelector('#clear');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const point = document.querySelector('#point');
const equals = document.querySelector('#equals');
const deelete = document.querySelector('#delete');

    // variables for calculation
let firstValue; let secondValue; let operation; let solution;

    // toggle for after equals has been pressed to continue operations
let equalsOn = 0;

// Executable
buildCalculator();

// Functions
function buildCalculator() {
    codeClear();
    codeNumbers();
    codePoint();
    codeOperators();
    codeEquals();
    codeDelete();
}

function codeDelete() {
    deelete.addEventListener('click', () => {
        if (display.textContent[1] === undefined && equalsOn === 0) {
            display.textContent = "0";
        } else
        if (display.textContent[1] !== undefined && equalsOn === 0) {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        } else
            // reset everything if delete is pressed when solution is onscreen
        if (equalsOn === 1) {
            equalsOn = 0;
            display.textContent = "0";
            operation = undefined; firstValue = undefined; secondValue = undefined;
             solution = undefined;
        }
    });
}


function codeClear() {
    clear.addEventListener('click', () => {
        display.textContent = "0";  // reset display
            // reset variables
        operation = undefined; firstValue = undefined; secondValue = undefined; 
         solution = undefined;
    })
}

function codeNumbers() {
    numbers.forEach((button) => {
        button.addEventListener('click', () => {
                // change display after first number pressed
            if (display.textContent === "0") {
                display.textContent = button.textContent;
            } else
                // change display after number already pressed
            if (display.textContent !== "0" && equalsOn === 0) {
                display.textContent += button.textContent;
            } else
                // if after solution, reset variables and start over
            if (equalsOn === 1) {
                equalsOn = 0;
                firstValue = undefined; 
                secondValue = undefined;
                operation = undefined;
                solution = undefined;
                display.textContent = button.textContent;
            }
        });
    });
}

function codePoint() {
        point.addEventListener('click', () => {
            if (display.textContent !== "0") {
                display.textContent += point.textContent;
            }
        });
}

function codeOperators() {
    operators.forEach((button) => {
        button.addEventListener('click', () => {
                // first time pressed
            if (operation === undefined) {
                operation = button.textContent;
                firstValue = display.textContent;   // capture A
                display.textContent = "0";          // reset display first time pressed
            } else
                // update operation value if no numbers entered for B
            if (firstValue !== undefined && display.textContent === "0") {
                operation = button.textContent;
            } else
                // move solution to A and reset other variables to prep for next operation
            if (equalsOn === 1) {
                equalsOn = 0;
                firstValue = solution;
                secondValue = undefined;
                solution = undefined;
                operation = button.textContent;
                display.textContent = "0";
            }
        });
    });
}

function codeEquals() {
    equals.addEventListener('click', () => {
        if (firstValue !== undefined) {
            secondValue = display.textContent;      // capture B
            solution = operate(operation, firstValue, secondValue);
            display.textContent = solution;         // display solution
            equalsOn = 1;
        }
    })
}

// Math Functions
function operate(operator, a, b) {
    let answer;
    a = Number(a); b = Number(b);
    if (operator === "+") {
        answer = (Math.round((a + b) * 100000) / 100000);
    }
    else if (operator === "-") {
        answer = (Math.round((a - b) * 100000) / 100000);
    }
    else if (operator === "x") {
        answer = (Math.round((a * b) * 100000) / 100000);
    }
    else if (operator === "/") {
        answer = (Math.round((a / b) * 100000) / 100000);
    }
    else {answer = "OPERATION ERROR";}
    return answer;
}


