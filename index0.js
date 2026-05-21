const exp_input = document.querySelector('.exp');
const output = document.querySelector('.output');
const equalButton = document.querySelector('.equal');
const numbers = document.querySelectorAll('.num');
const resetExp = document.querySelector('.reset');
const operators = document.querySelectorAll('.op');
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const AllowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '^', '√', '(', ')', 's', 'c', 't'];
const allOperators = [ '+', '-', '*', '/', '^', '√', '(', ')', 's', 'c', 't'];
const restrictedPreviousOperators = ['+', '-', '*', '/', '^', '√', '('];
const restrictedNextOperators = ['+', '-', '*', '/', '^', ')'];

const checkExpression = (expression) => {
    console.log("check")
    let stack = [];
    // console.log(expression);
    for(let i = 0; i < expression.length; i++) {
        if(expression[i] === '(') {
            if(i == expression.length-1){
                console.log("Error by Paranthesis")
                return false
            }
            stack.push('(');
        } else if (expression[i] === ')') {
            if(stack.length === 0){
                console.log("Error by Paranthesis")
                return false
            }
            stack.pop()
        }
    }
    for (let char of expression) {
        if (!AllowedChars.includes(char.toLowerCase()) && char !== 'i' && char !== 'n' && char !== 'o' && char !== 'a') {
            console.log("Error by unknown charactor")
            return false;
        }
    }
    for(let i = 0; i < expression.length; i++) {
        switch (expression[i]){
            case "+":
                if (restrictedPreviousOperators.includes(expression[i-1])){
                    console.log("case1 +", expression[i-1])
                    return false
                }else if(restrictedNextOperators.includes(expression[i+1])){
                    console.log("case2 +", expression[i+1])
                    return false
                }
            case "-":
                if (restrictedPreviousOperators.includes(expression[i-1])){
                    console.log("case1 -", expression[i-1])
                    return false
                }else if(restrictedNextOperators.includes(expression[i+1])){
                    console.log("case2 -", expression[i+1])
                    return false
                }
            case '*':
                if (restrictedPreviousOperators.includes(expression[i-1])){
                    console.log("case1 *", expression[i-1])
                    return false
                }else if(restrictedNextOperators.includes(expression[i+1])){
                    console.log("case2 *", expression[i+1])
                    return false
                }
            case '/':
                if (restrictedPreviousOperators.includes(expression[i-1])){
                    console.log("case1 /", expression[i-1])
                    return false
                }else if(restrictedNextOperators.includes(expression[i+1])){
                    console.log("case2 /", expression[i+1])
                    return false
                }
            case '^':
                if (restrictedPreviousOperators.includes(expression[i-1])){
                    console.log("case1 ^", expression[i-1])
                    return false
                }else if(restrictedNextOperators.includes(expression[i+1])){
                    console.log("case2 ^", expression[i+1])
                    return false
                }
            // case '^':
            //     if (restrictedPreviousOperators.includes(expression[i-1])){
            //         console.log("case1 +", expression[i-1])
            //         return false
            //     }else if(restrictedNextOperators.includes(expression[i+1])){
            //         console.log("case1 +", expression[i+1])
            //         return false
            //     }
            case '√':
                const previousOperators1 = ['√', 'n', 's'];
                const nextOperators1 = ['+', '-', '*', '/', '^', '√', '('];
                if (previousOperators1.includes(expression[i-1])){
                    console.log("case1 √", expression[i-1])
                    return false
                }else if(nextOperators1.includes(expression[i+1])){
                    console.log("case2 √", expression[i+1])
                    return false
                }
            case '(':
                const previousOperators2 = ['(', ')'];
                const nextOperators2 = ['+', '-', '*', '/', '^', ')', '('];
                if (previousOperators2.includes(expression[i-1])){
                    console.log("case1 (", expression[i-1])
                    return false
                }else if(nextOperators2.includes(expression[i+1])){
                    console.log("case2 (", expression[i+1])
                    return false
                }
            case ')':
                const previousOperators3 = ['+', '-', '*', '/', '^', ')', '(', '√', 'n', 's'];
                const nextOperators3 = ['(', ')', 's', 'c', 't'];
                if (previousOperators3.includes(expression[i-1])){
                    console.log("case1 )", expression[i-1])
                    return false
                }else if(nextOperators3.includes(expression[i+1])){
                    console.log("case2 )", expression[i+1])
                    return false
                }
        }
    }
    return true;
};
const calculateValue = (expression) => {
    // for (let i = 0; i < expression.length; i++){
    //     switch (expression[i]){
    //         case '+':
    //             const expAdd1 = Number(expression.slice(0, i))
    //             const expAdd2 = Number(expression.slice(i+1, expression.length))
    //             return expAdd1 + expAdd2
    //         case '-':
    //             const expSub1 = Number(expression.slice(0, i))
    //             const expSub2 = Number(expression.slice(i+1, expression.length))
    //             return expSub1 - expSub2
    //         case '*':
    //             const expMul1 = Number(expression.slice(0, i))
    //             const expMul2 = Number(expression.slice(i+1, expression.length))
    //             return expMul1 * expMul2
    //         case '/':
    //             const expDivi1 = Number(expression.slice(0, i))
    //             const expDivi2 = Number(expression.slice(i+1, expression.length))
    //             return expDivi1 / expDivi2
    //         case '^':
    //             const expRTP1 = Number(expression.slice(0, i))
    //             const expRTP2 = Number(expression.slice(i+1, expression.length))
    //             return expRTP1 ** expRTP2
    //         case '√':
    //             const expSqua2 = Number(expression.slice(i+1, expression.length))
    //             return Math.sqrt(expSqua2)
    //         case 's':
    //             const expSin2 = Number(expression.slice(i+3, expression.length))
    //             return Math.sin(expSin2)
    //         case 'c':
    //             const expCos2 = Number(expression.slice(i+3, expression.length))
    //             console.log(expCos2)
    //             return Math.cos(expCos2)
    //         case 't':
    //             const expTan2 = Number(expression.slice(i+3, expression.length))
    //             return Math.tan(expTan2)
    //     }
    // }
    
    
    // let exp = expression;
    // while(allOperators.some(char => exp.includes(char))){
        
    // }
    
    // exp = exp.replace('2+3+4', '12313');
    // console.log(exp)
    // if (exp.includes("/")) {
    //     const ind = exp.indexOf("/");
    //     const nextNum = exp[ind + 1];
    //     const prevNum = exp[ind - 1];
    //     const result = prevNum / nextNum;
    //     exp = exp.splice(ind - 1, 3, result);
    // }
    // if (exp.includes("*")) {
    //     const ind = exp.indexOf("*");
    //     const nextNum = exp[ind + 1];
    //     const prevNum = exp[ind - 1];
    //     const result = prevNum * nextNum;
    //     exp = exp.splice(ind - 1, 3, result)
    // }
    // if (exp.includes("+")) {
    //     const ind = exp.indexOf("+");
    //     const nextNum = exp[ind + 1];
    //     const prevNum = exp[ind - 1];
    //     const result = Number(prevNum) + Number(nextNum);
    //     exp = exp.replace(`${prevNum}+${nextNum}`, result);
    // }
    // if (exp.includes("-")) {
    //     const ind = exp.indexOf("-");
    //     const nextNum = exp[ind + 1];
    //     const prevNum = exp[ind - 1];
    //     const result = prevNum - nextNum;
    //     exp = exp.splice(ind - 1, 3, result);
    // }
    // if (exp.includes("^")) {
    //     const ind = exp.indexOf("^");
    //     const nextNum = exp[ind + 1];
    //     const prevNum = exp[ind - 1];
    //     const result = prevNum ** nextNum;
    //     exp = exp.splice(ind - 1, 3, result);
    // }
    // if (exp.includes("√")) {
    //     const ind = exp.indexOf("√");
    //     const nextNum = exp[ind + 1];
    //     const result = Math.sqrt(nextNum);
    //     exp = exp.splice(ind, 2, result);
    // }
    // if (exp.includes("s")) {
    //     const ind = exp.indexOf("s");
    //     const nextNum = exp[ind + 3];
    //     const result = Math.sin(nextNum);
    //     exp = exp.splice(ind, 4, result);
    // }
    // if (exp.includes("c")) {
    //     const ind = exp.indexOf("c");
    //     const nextNum = exp[ind + 3];
    //     const result = Math.cos(nextNum);
    //     exp = exp.splice(ind, 4, result);
    // }
    // if (exp.includes("t")) {
    //     const ind = exp.indexOf("t");
    //     const nextNum = exp[ind + 3];
    //     const result = Math.tan(nextNum);
    //     exp = exp.splice(ind, 4, result);
    // }

    // return expression;
    return exp;
}

equalButton.addEventListener('click', () => {
    let noSpaces = exp_input.value.replaceAll(' ', '');
    if (!checkExpression(noSpaces)) {
        output.textContent = "Invalid Expression";
        output.style.color = 'red';
    }else{
        output.textContent = calculateValue(noSpaces);
        output.style.color = 'black';
    }
});

resetExp.addEventListener('click', () => {
    exp_input.value = '';
    output.textContent = 'Output';
    output.style.color = 'black';
});

numbers.forEach(num => {
    num.addEventListener('click', () => {
        exp_input.value += num.innerHTML[0].toLowerCase();
    });
});

operators.forEach(op => {
    op.addEventListener('click', () => {
        exp_input.value += op.innerHTML.toLowerCase();
    });
});