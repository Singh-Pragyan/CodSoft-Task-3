document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let currentOperator = "";
    let previousInput = "";
    let shouldClearDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonText = button.textContent;

            if (buttonText >= '0' && buttonText <= '9') {
                if (shouldClearDisplay) {
                    currentInput = buttonText;
                    shouldClearDisplay = false;
                } else {
                    currentInput += buttonText;
                }
            } else if (buttonText === '.') {
                if (shouldClearDisplay) {
                    currentInput = "0.";
                    shouldClearDisplay = false;
                } else if (currentInput.indexOf('.') === -1) {
                    currentInput += ".";
                }
            } else if (buttonText === 'C') {
                currentInput = "0";
                currentOperator = "";
                previousInput = "";
            } else if (buttonText === '←') {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === "") {
                    currentInput = "0";
                }
            } else if (buttonText === "=") {
                if (currentOperator && previousInput) {
                    currentInput = operate(parseFloat(previousInput), currentOperator, parseFloat(currentInput)).toString();
                    previousInput = "";
                    currentOperator = "";
                }
            } else {
                if (currentOperator && previousInput) {
                    currentInput = operate(parseFloat(previousInput), currentOperator, parseFloat(currentInput)).toString();
                    previousInput = currentInput;
                } else {
                    previousInput = currentInput;
                }
                currentOperator = buttonText;
                shouldClearDisplay = true;
            }

            updateDisplay();
        });
    });

    function operate(a, operator, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    return "Error";
                }
                return a / b;
        }
    }
});
