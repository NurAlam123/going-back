const buttons = document.querySelectorAll(".button");
const digit = document.querySelector(".digit");
const answer = document.querySelector(".answer");

let equation = "";
const operators = ["+", "-", "*", "/", "%"];

const scrollToEndDigit = () => {
  digit.scrollLeft = digit.scrollWidth;
};

const scrollToEndAnswer = () => {
  answer.scrollLeft = answer.scrollWidth;
};

const removeLeftZero = () => {
  if (!equation) return;

  equation.startsWith("0") && (equation = "");
};

const preventDuplicateOp = (value) => {
  if (
    !equation &&
    (value === "*" ||
      value === "/" ||
      value === "%" ||
      value === "+" ||
      value === "=")
  ) {
    return false;
  }

  const lastChar = equation[equation.length - 1];
  if (operators.includes(lastChar) && operators.includes(value)) {
    return false;
  }

  return true;
};

const calculate = (expression) => {
  const validChars = /^[0-9+\-*/.%\s]*$/;
  if (!validChars.test(expression)) {
    return "Error";
  }

  try {
    if (expression.includes("%")) {
      expression = expression.replace(/%/g, "/100");
    }

    const result = eval(expression);

    if (result === undefined || isNaN(result) || !isFinite(result)) {
      return "Error";
    }

    return result;
  } catch (error) {
    return "Error";
  }
};

const calculator = (value) => {
  switch (value.trim()) {
    case "ac":
      equation = "";
      answer.innerText = "Answer";
      break;
    case "del":
      equation = equation.slice(0, -1);
      break;
    case "=":
      if (equation) {
        const result = calculate(equation);
        answer.innerText = `${equation} = ${result}`;
        scrollToEndAnswer();
      }
      break;
    default:
      if (preventDuplicateOp(value)) {
        removeLeftZero();
        equation += value;
      }
  }

  digit.innerText = equation;
  scrollToEndDigit();
};

const buttonClickHandler = (event) => {
  const value = event.target.value;
  calculator(value);
};

const keyDownHandler = (event) => {
  const key = event.key;

  const keyMappings = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    ",": ".",
    Enter: "=",
    "=": "=",
    Backspace: "del",
    Delete: "del",
    Escape: "ac",
    "%": "%",
  };

  if (keyMappings[key] === undefined) return;

  event.preventDefault();
  calculator(keyMappings[key]);
};

// Add event listener to every button
for (const button of buttons) {
  button.addEventListener("click", buttonClickHandler);
}

document.addEventListener("keydown", keyDownHandler);
