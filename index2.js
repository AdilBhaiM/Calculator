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
let openingBracketInd = []

const checkExpression = () => {

    let brackets = userInput.filter(char => char === '(' || char === ')');
    brackets.join('');
    console.log("check")
    let stack = [];
    console.log(brackets)
    for(let i = 0; i < brackets.length; i++) {
        if(brackets[i] === '(') {
            if(i == brackets.length-1){
                console.log("Error by Paranthesis")
                return false
            }
            stack.push('(');
            console.log("Stack - ", stack)
        } else if (brackets[i] === ')') {
            if(stack.length === 0){
                console.log("Error by Paranthesis")
                return false
            }
            console.log("Stack - ", stack)
            stack.pop();
        }
        console.log("Main Stack - ", stack)
    }

    return stack.length === 0;
};

const calculateValue = (exp) => {
    console.log("Calculating Value = ", exp)
    while(allOperators.some(char => exp.includes(char))){
        if(exp.findIndex(char => char === "^") !== -1){
            const ind = exp.indexOf("^");
            const nextNum = Number(exp[ind + 1]);
            const prevNum = Number(exp[ind - 1]);
            const result = prevNum ** nextNum;
            exp.splice(ind - 1, 3, result);
            console.log(exp)
        }
        if(exp.findIndex(char => char === "√") !== -1){
            const ind = exp.indexOf("√");
            const nextNum = Number(exp[ind + 1]);
            const result = Math.sqrt(nextNum);
            exp.splice(ind, 2, result);
            console.log(exp)
        }
        if(exp.findIndex(char => char === "sin") !== -1){
            const ind = exp.indexOf("sin");
            const nextNum = Number(exp[ind + 1]);
            console.log(exp[ind + 1])
            const result = Math.sin(nextNum);
            exp.splice(ind, 2, result);
            console.log(exp)
        }

        if(exp.findIndex(char => char === "cos") !== -1){
            const ind = exp.indexOf("cos");
            const nextNum = Number(exp[ind + 1]);
            const result = Math.cos(nextNum);
            exp.splice(ind, 2, result);
            console.log(exp)
        }
        if(exp.findIndex(char => char === "tan") !== -1){
            const ind = exp.indexOf("tan");
            const nextNum = Number(exp[ind + 1]);
            const result = Math.tan(nextNum);
            exp.splice(ind, 2, result);
            console.log(exp)
        }


        if(exp.findIndex(char => char === "/") !== -1){
            const ind = exp.indexOf("/");
            const nextNum = Number(exp[ind + 1]);
            const prevNum = Number(exp[ind - 1]);
            const result = prevNum / nextNum;
            exp.splice(ind - 1, 3, result);
            console.log(exp)
        }

        if(exp.findIndex(char => char === "*") !== -1){
            const ind = exp.indexOf("*");
            const nextNum = Number(exp[ind + 1]);
            const prevNum = Number(exp[ind - 1]);
            const result = prevNum * nextNum;
            exp.splice(ind - 1, 3, result);
            console.log(exp)
        }

        if(exp.findIndex(char => char === "+") !== -1){
            const ind = exp.indexOf("+");
            const nextNum = Number(exp[ind + 1]);
            const prevNum = Number(exp[ind - 1]);
            const result = prevNum + nextNum;
            exp.splice(ind - 1, 3, result);
            console.log(exp)
        }
        if(exp.findIndex(char => char === "-") !== -1){
            const ind = exp.indexOf("-");
            const nextNum = Number(exp[ind + 1]);
            const prevNum = Number(exp[ind - 1]);
            const result = prevNum - nextNum;
            exp.splice(ind - 1, 3, result);
            console.log("CurrExp = ", exp)
        }
    }

    return exp[0];
}

equalButton.addEventListener('click', () => {
    if(currNum||userInput[userInput.length - 1]===")") {
        if(currNum) {
            userInput.push(currNum);
            currNum = '';
        }
        console.log('Check Parentheses')
        if (!checkExpression()) {
            console.log("If")
            output.textContent = "Invalid Expression";
            output.style.color = 'red';
        }else{
            console.log("Else")
            console.log(userInput)
            let currVal = [];
            for (let i = 0; i<userInput.length; i++) {
                if (userInput[i]==="(") {
                    openingBracketInd.push(i);
                    console.log("Opening Brackets - ", openingBracketInd);
                }
                console.log(i, userInput[i])
            }
            console.log(openingBracketInd, currVal);
            while(openingBracketInd.length>0) {
                for (let i=Math.max(...openingBracketInd); i< userInput.length; i++){
                    if(userInput[i]===')'){
                        currVal = userInput.slice(Math.max(...openingBracketInd) + 1, i);
                        const result = calculateValue(currVal);
                        userInput.splice(Math.max(...openingBracketInd), i - Math.max(...openingBracketInd) + 1, result);
                        console.log("CurrVal - ", currVal);
                        openingBracketInd.pop();
                    }
                    console.log("Opening Brackets - ", openingBracketInd);
                    console.log("UserInputArr - ", userInput)
                }
            }
            output.textContent = Math.round(calculateValue(userInput));
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
        if(userInput[userInput.length-1] !== ')')
        currNum += num.innerHTML[0];
        exp_input.value += num.innerHTML[0];
        console.log(userInput);
        console.log(currNum);
    });
});

operators.forEach(op => {
        op.addEventListener('click', () => {
            if ((currNum||userInput[userInput.length-1] ===  ")") &&((op.innerHTML === "+"|| op.innerHTML === "-" || op.innerHTML === "*" || op.innerHTML === "/" || op.innerHTML === "^") && op.innerHTML !== ')') ) {
                if(currNum){
                    console.log("CurrNum Inner = ", currNum);
                    userInput.push(currNum);
                    currNum = '';
                }
                userInput.push(op.innerHTML.toLowerCase());
                exp_input.value += op.innerHTML.toLowerCase();
                console.log(userInput);
                console.log(currNum);
            }else if ((!currNum||op.innerHTML ===  ")") && (op.innerHTML === "Sin" || op.innerHTML === "Cos" || op.innerHTML === "Tan" || op.innerHTML === "√" || op.innerHTML === "(" || op.innerHTML === ")")) {
                if(currNum){
                    console.log("CurrNum Inner = ", currNum);
                    userInput.push(currNum);
                    currNum = '';
                }
                if(userInput[userInput.length-1] === ")" && op.innerHTML === "("){

                }else{
                    userInput.push(op.innerHTML.toLowerCase());
                    exp_input.value += op.innerHTML.toLowerCase();
                    console.log("userInput -- ", userInput);
                    console.log("currNum -- ", currNum);
                }
            }
        });
});