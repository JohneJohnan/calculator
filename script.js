const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const reverseSign = (a) => -a;

let firstArg;
let secondArg;
let operation;
let previousKeyWasAnOperation = false;

const digitClicked = (e) => {
    if (!display.value ||
        display.value == "0" ||
        previousKeyWasAnOperation)
        display.value = e.target.textContent;
    else if (display.value.length != 13)
        display.value += e.target.textContent;
    previousKeyWasAnOperation = false;
};

const funcClicked = (e) => {
    const displayValueSave = display.value;
    switch (e.target.id) {
        case "kClear":
            display.value = 0;
            firstArg = undefined;
            secondArg = undefined;
            operation = undefined;
            break;
        case "kToggleSign":
            if (display.value.length == 13) {
                if (display.value[0] == "-")
                    display.value = reverseSign(display.value);
                else
                    display.value = reverseSign(display.value.slice(0, display.value.length - 1))
            }
            else
                display.value = reverseSign(display.value);
            break;
        case "kBackSpace":
            if (display.value.length == 2 &&
                display.value[0] == "-")
                display.value = 0;
            else if (display.value.length != 1) {
                display.value = display.value
                    .slice(0, display.value.length - 1);
            }
            else
                display.value = 0;
            break;
        case "kDot":
            if (!display.value)
                display.value = "0.";
            else if (display.value.length == 13) {
                if (previousKeyWasAnOperation)
                    display.value = "0.";
            }
            else if (!/\./.test(display.value))
                display.value += ".";
            break;
    }
    if (display.value !== displayValueSave)
        previousKeyWasAnOperation = false;
};

const operatorClicked = (e) => {
    if (operation) {
        secondArg = display.value;
        operate();
    }
    else
        firstArg = display.value;
    operation = e.target.id;
    previousKeyWasAnOperation = true;
};

const equalsClicked = () => {
    if (firstArg != undefined && operation != undefined) {
        secondArg = display.value;
        operate();
        operation = undefined;
    }
    previousKeyWasAnOperation = true;
}

const operate = () => {
    switch (operation) {
        case "kAdd":
            firstArg = add(Number(firstArg), Number(secondArg));
            break;
        case "kSub":
            firstArg = sub(firstArg, secondArg);
            break;
        case "kMultiply":
            firstArg = multiply(firstArg, secondArg);
            break;
        case "kDivide":
            firstArg = divide(firstArg, secondArg);
            break;
        default:
            console.log(`"operate" was called but no cases match to operation: ${operation}`);
            break;
    }
    firstArg = firstArg.toString().slice(0, 13);
    display.value = firstArg;
    secondArg = undefined;
};

const display = document.getElementById("display");
const digitKeys = document.getElementsByClassName("digit");
const funcKeys = document.getElementsByClassName("func");
const operatorKeys = document.getElementsByClassName("operator");
const equalsKey = document.getElementById("kEquals");

Array.from(digitKeys).forEach(element => {
    element.addEventListener("click", digitClicked);
});
Array.from(funcKeys).forEach(element => {
    element.addEventListener("click", funcClicked);
});
Array.from(operatorKeys).forEach(element => {
    element.addEventListener("click", operatorClicked);
});
equalsKey.addEventListener("click", equalsClicked);

display.value = 0;