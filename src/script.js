const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultEl = document.getElementById("result");
const messageEl = document.getElementById("message");
const operators = document.querySelectorAll(".op");
const digits = document.querySelectorAll(".digit");
const dotBtn = document.getElementById("dot");
const clearBtn = document.getElementById("clear");

let activeInput = num1;
num1.addEventListener("focus", () => (activeInput = num1));
num2.addEventListener("focus", () => (activeInput = num2));

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    activeInput.value += digit.textContent;
  });
});

dotBtn.addEventListener("click", () => {
  if (!activeInput.value.includes(".")) {
    activeInput.value += ".";
  }
});

clearBtn.addEventListener("click", () => {
  num1.value = "";
  num2.value = "";
  resultEl.textContent = "—";
  messageEl.textContent = "";
});

function validateInputs() {
  const a = parseFloat(num1.value);
  const b = parseFloat(num2.value);

  if (isNaN(a) || isNaN(b)) {
    messageEl.textContent = "Будь ласка, введіть правильні числа!";
    resultEl.textContent = "—";
    return null;
  }

  messageEl.textContent = "";
  return { a, b };
}

operators.forEach((op) => {
  op.addEventListener("click", () => {
    const inputs = validateInputs();
    if (!inputs) return;

    let res;

    switch (op.dataset.op) {
      case "+":
        res = inputs.a + inputs.b;
        break;
      case "-":
        res = inputs.a - inputs.b;
        break;
      case "*":
        res = inputs.a * inputs.b;
        break;
      case "/":
        if (inputs.b === 0) {
          messageEl.textContent = "На нуль ділити не можна!";
          resultEl.textContent = "—";
          return;
        }
        res = (inputs.a / inputs.b).toFixed(2);
        break;
      default:
        return;
    }

    resultEl.textContent = res;
  });
});
