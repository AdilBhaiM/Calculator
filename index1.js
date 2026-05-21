const exp_input = document.querySelector('.exp');
const output = document.querySelector('.output');
const equalButton = document.querySelector('.equal');
const numbers = document.querySelectorAll('.num');
const resetExp = document.querySelector('.reset');
const operators = document.querySelectorAll('.op');
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const AllowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '^', '√', '(', ')', 'sin', 'cos', 'tan'];
const allOperators = [ '+', '-', '*', '/', '^', '√', '(', ')', 'sin', 'cos', 'tan'];
const restrictedPreviousOperators = ['+', '-', '*', '/', '^', '√', '('];
const restrictedNextOperators = ['+', '-', '*', '/', '^', ')'];
let userInput = []
let currNum = '';

const checkExpression = () => {
    console.log("check")
    let stack = [];
    // console.log(expression);
    for(let i = 0; i < userInput.length; i++) {
        if(userInput[i] === '(') {
            if(i == userInput.length-1){
                console.log("Error by Paranthesis")
                return false
            }
            stack.push('(');
        } else if (userInput[i] === ')') {
            if(stack.length === 0){
                console.log("Error by Paranthesis")
                return false
            }
            stack.pop()
        }
    }

    return true;
};

const calculateValue = () => {
    while(allOperators.some(char => userInput.includes(char))){
        if(userInput.findIndex(char => char === "^") !== -1){
            const ind = userInput.indexOf("^");
            const nextNum = Number(userInput[ind + 1]);
            const prevNum = Number(userInput[ind - 1]);
            const result = prevNum ** nextNum;
            userInput.splice(ind - 1, 3, result);
            console.log(userInput)
        }
        if(userInput.findIndex(char => char === "√") !== -1){
            const ind = userInput.indexOf("√");
            const nextNum = Number(userInput[ind + 1]);
            const result = Math.sqrt(nextNum);
            userInput.splice(ind, 2, result);
            console.log(userInput)
        }
        if(userInput.findIndex(char => char === "sin") !== -1){
            const ind = userInput.indexOf("sin");
            const nextNum = Number(userInput[ind + 1]);
            console.log(userInput[ind + 1])
            const result = Math.sin(nextNum);
            userInput.splice(ind, 2, result);
            console.log(userInput)
        }

        if(userInput.findIndex(char => char === "cos") !== -1){
            const ind = userInput.indexOf("cos");
            const nextNum = Number(userInput[ind + 1]);
            const result = Math.cos(nextNum);
            userInput.splice(ind, 2, result);
            console.log(userInput)
        }
        if(userInput.findIndex(char => char === "tan") !== -1){
            const ind = userInput.indexOf("tan");
            const nextNum = Number(userInput[ind + 1]);
            const result = Math.tan(nextNum);
            userInput.splice(ind, 2, result);
            console.log(userInput)
        }


        if(userInput.findIndex(char => char === "/") !== -1){
            const ind = userInput.indexOf("/");
            const nextNum = Number(userInput[ind + 1]);
            const prevNum = Number(userInput[ind - 1]);
            const result = prevNum / nextNum;
            userInput.splice(ind - 1, 3, result);
            console.log(userInput)
        }

        if(userInput.findIndex(char => char === "*") !== -1){
            const ind = userInput.indexOf("*");
            const nextNum = Number(userInput[ind + 1]);
            const prevNum = Number(userInput[ind - 1]);
            const result = prevNum * nextNum;
            userInput.splice(ind - 1, 3, result);
            console.log(userInput)
        }

        if(userInput.findIndex(char => char === "+") !== -1){
            const ind = userInput.indexOf("+");
            const nextNum = Number(userInput[ind + 1]);
            const prevNum = Number(userInput[ind - 1]);
            const result = prevNum + nextNum;
            userInput.splice(ind - 1, 3, result);
            console.log(userInput)
        }
        if(userInput.findIndex(char => char === "-") !== -1){
            const ind = userInput.indexOf("-");
            const nextNum = Number(userInput[ind + 1]);
            const prevNum = Number(userInput[ind - 1]);
            const result = prevNum - nextNum;
            userInput.splice(ind - 1, 3, result);
            console.log(userInput)
        }
    }

    return userInput[0];
}

equalButton.addEventListener('click', () => {
    if(currNum) {
        userInput.push(currNum);
        if (!checkExpression()) {
            output.textContent = "Invalid Expression";
            output.style.color = 'red';
        }else{
            output.textContent = Math.round(calculateValue());
            output.style.color = 'black';
        }
    }
});

resetExp.addEventListener('click', () => {
    userInput = [];
    currNum = '';
    exp_input.value = '';
    output.textContent = 'Output';
    output.style.color = 'black';
});

numbers.forEach(num => {
    num.addEventListener('click', () => {
        currNum += num.innerHTML[0];
        exp_input.value += num.innerHTML[0];
        console.log(userInput);
        console.log(currNum);
    });
});

operators.forEach(op => {
        op.addEventListener('click', () => {
            if (currNum) {
                userInput.push(currNum);
                currNum = '';
                userInput.push(op.innerHTML.toLowerCase());
                exp_input.value += op.innerHTML.toLowerCase();
                console.log(userInput);
                console.log(currNum);
            }else if (op.innerHTML === "Sin" || op.innerHTML === "Cos" || op.innerHTML === "Tan" || op.innerHTML === "√" || op.innderHTML === "(" ) {
                userInput.push(op.innerHTML.toLowerCase());
                exp_input.value += op.innerHTML.toLowerCase();
                console.log(userInput);
                console.log(currNum);
            }
        });
});