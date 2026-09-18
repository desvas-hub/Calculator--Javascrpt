const display = document.getElementById("display");

let number1 = "";
let number2 = "";
let operator = "";
let justCalculated = false;


// Handle button clicks
document.querySelectorAll("button").forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // Numbers
        if (value >= "0" && value <= "9") {

            if (justCalculated) {
                number1 = "";
                number2 = "";
                operator = "";
                justCalculated = false;
            }

            if (operator === "") {
                number1 += value;
                display.value = number1;
            } else {
                number2 += value;
                display.value = number2;
            }
        }


        // Decimal
        else if (value === ".") {

            if (justCalculated) {
                number1 = "";
                number2 = "";
                operator = "";
                justCalculated = false;
            }

            if (operator === "" && !number1.includes(".")) {
                number1 += ".";
                display.value = number1;
            }

            else if (operator !== "" && !number2.includes(".")) {
                number2 += ".";
                display.value = number2;
            }
        }


        // Operators
        else if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/"
        ) {

            if (number1 !== "") {
                operator = value;
                justCalculated = false;
            }
        }


        // Equals
        else if (value === "=") {

            if (
                number1 === "" ||
                number2 === "" ||
                operator === ""
            ) {
                return;
            }

            const a = Number(number1);
            const b = Number(number2);

            let answer;


            if (operator === "+") {
                answer = a + b;
            }

            else if (operator === "-") {
                answer = a - b;
            }

            else if (operator === "*") {
                answer = a * b;
            }

            else if (operator === "/") {

                if (b === 0) {
                    display.value = "Error";
                    number1 = "";
                    number2 = "";
                    operator = "";
                    return;
                }

                answer = a / b;
            }


            display.value = answer;

            number1 = String(answer);
            number2 = "";
            operator = "";

            justCalculated = true;
        }


        // Clear
        else if (value === "C") {

            number1 = "";
            number2 = "";
            operator = "";

            display.value = "";

            justCalculated = false;
        }


        // Backspace
        else if (value === "←") {

            if (justCalculated) {
                number1 = "";
                display.value = "";
                justCalculated = false;
                return;
            }

            if (operator === "") {

                number1 = number1.slice(0, -1);
                display.value = number1;

            }

            else {

                number2 = number2.slice(0, -1);
                display.value = number2;

            }
        }


        // Percentage
        else if (value === "%") {

            if (operator === "" && number1 !== "") {

                number1 = String(Number(number1) / 100);
                display.value = number1;

            }

            else if (operator !== "" && number2 !== "") {

                number2 = String(Number(number2) / 100);
                display.value = number2;

            }
        }

    });

});


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers, operators and decimal
    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {

        document.querySelectorAll("button").forEach(function(button) {

            if (button.textContent === key) {
                button.click();
            }

        });

    }


    // Enter / =
    else if (key === "Enter" || key === "=") {

        document.querySelectorAll("button").forEach(function(button) {

            if (button.textContent === "=") {
                button.click();
            }

        });

    }


    // Backspace
    else if (key === "Backspace") {

        document.querySelectorAll("button").forEach(function(button) {

            if (button.textContent === "←") {
                button.click();
            }

        });

    }


    // Escape = Clear
    else if (key === "Escape") {

        document.querySelectorAll("button").forEach(function(button) {

            if (button.textContent === "C") {
                button.click();
            }

        });

    }


    // Percentage
    else if (key === "%") {

        document.querySelectorAll("button").forEach(function(button) {

            if (button.textContent === "%") {
                button.click();
            }

        });

    }

});