function appendValue(value) {
  const display = document.getElementById("display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  const display = document.getElementById("display");
  let expression = display.value;

  if (expression.trim() === "") {
    display.value = "Input kosong";
    return;
  }

  // Tangani input huruf/lucu
  if (/^[a-zA-Z\s\+\-\*\/%]+$/.test(expression)) {
    const sanitized = expression.toLowerCase().replace(/\s/g, "");
    if (sanitized === "riko+riko") {
      display.value = "Error";
      return;
    } else {
      display.value = "Error";
      return;
    }
  }

  try {
    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    const result = eval(expression);

    if (result === Infinity || result === -Infinity) {
      display.value = "Tidak bisa dibagi 0";
    } else if (isNaN(result)) {
      display.value = "Input tidak valid";
    } else {
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}

// Susun tombol dari array saat halaman dibuka
window.onload = function () {
  const buttonContainer = document.querySelector(".button");
  buttonContainer.innerHTML = "";

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "%", "+"],
    ["=", "HAPUS"],
  ];

  buttons.forEach((row) => {
    row.forEach((label) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.className = "btn";

      if (["+", "-", "*", "/", "%"].includes(label)) {
        btn.classList.add("operator");
        btn.onclick = () => appendValue(label);
      } else if (label === "=") {
        btn.classList.add("operator", "equal");
        btn.onclick = calculate;
      } else if (label === "HAPUS") {
        btn.classList.add("clear");
        btn.onclick = clearDisplay;
      } else {
        btn.onclick = () => appendValue(label);
      }

      buttonContainer.appendChild(btn);
    });
  });
};

// Keyboard support: angka, simbol, dan huruf a-z
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const allowed =
    "0123456789.+-*/%abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

  if (allowed.includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    clearDisplay();
  }
});
