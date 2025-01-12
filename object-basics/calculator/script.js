
calculator = document.querySelector('.calculator');
screen = calculator.querySelector('.screen');
screen.value = '0';

/* Number buttons */

numberButtons = calculator.querySelector('.number-buttons');

buttonsArr = [0,1,2,3,4,5,6,7,8,9].reverse();

for (btnValue of buttonsArr) {
    btn = document.createElement('div');
    btn.classList.add('button', 'number-button');
    btn.setAttribute('value', btnValue);
    btn.textContent = btnValue;

    numberButtons.append(btn);
}

/* Operator buttons */

operatorButtons = calculator.querySelector('.operator-buttons');

operatorsArr = ['+', '-', '*', '/', '=', 'C', '.', 'del']

for (btnValue of operatorsArr) {
    btn = document.createElement('div');
    btn.classList.add('button', 'operator-button');
    btn.setAttribute('value', btnValue);
    btn.textContent = btnValue;

    operatorButtons.append(btn);
}



function evaluate (a, b, operator) {

    let result;

    if (b === undefined) {
        return a; 
    }

    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                result = 'Cholero nie dziel przez zero';
            } else {
                result = a / b;
            } 
            break;
    }

    return result;
}

function write (char) {
    let inputText = screen.value;
    let inputLength = inputText.length;
    let lastChar = inputText[inputLength - 1];

    let firstNumber;
    let secondNumber;
    let currentNumber;

    /* Parse formula */
    let operator = inputText.match(/[\+\-\*\/]/);
    operator = operator === null ? null : operator[0];
    let operands = inputText.split(operator);
    firstNumber = operands[0];

    if (!(operator === null || ['+', '-', '*','/','.'].includes(lastChar))){
        secondNumber = operands[1];
    }

    currentNumber = secondNumber !== undefined ? secondNumber : firstNumber;

    if (inputText === '0' & ['0','1','2','3','4','5','6','7','8','9'].includes(char)) {
        inputText = char;
    } else if (inputText === 'Cholero nie dziel przez zero') {
        inputText = char;
    } else if (['+', '-', '*','/','.'].includes(char) & ['+', '-', '*','/','.'].includes(lastChar)) {
        inputText = inputText.slice(0, inputLength - 1);
        inputText = inputText + char;
    } else if (char === '.' & currentNumber.includes('.')) {
        null;
    } else if (char === '=') { 
        inputText = evaluate (firstNumber, secondNumber, operator);
    } else if (['+', '-', '*','/'].includes(char) & secondNumber !== undefined) {
        inputText = evaluate (firstNumber, secondNumber, operator);
        inputText = inputText + char;
    } else if (char === 'C') {
        inputText = '0';
    } else if (char === 'del') {
        inputText = inputText.slice(0, inputLength - 1);
        if (inputText === '') {
            inputText = '0';
        }
    } else {
        inputText = inputText + char;
    }

    screen.value = inputText;
}

function keyboardInput (key) {

    let button;

    console.log(key);

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', '.', 'Backspace', 'Enter'].includes(key)) {

        if (key === 'Backspace') {
            button = 'del';
        } else if (key === 'Enter') {
            button = '=';
        } else {
            button = key;
        }

        console.log('Button = ', button);
        write(button);

    }    

}

/* Mouse event listener */

calculator.addEventListener('click', function (e) {
        if (e.target.classList.contains('button')) {
            let button = e.target;
            let buttonValue = button.getAttribute('value');
            write(buttonValue);            
        }
    }
)

/* Keyboard support */
document.addEventListener('keyup', function (e) {
        keyboardInput(e.key);
    }
)