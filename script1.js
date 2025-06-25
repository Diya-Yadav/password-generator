const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const copiedText = document.getElementById("copied");
const generateBtn = document.getElementById("generateBtn");
const showPassword = document.getElementById("showPassword");
const strengthMeter = document.getElementById("strengthMeter");
const toggleTheme = document.getElementById("toggleTheme");

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordField.value);
  copiedText.style.display = "inline";
  setTimeout(() => copiedText.style.display = "none", 2000);
});

showPassword.addEventListener("change", () => {
  passwordField.type = showPassword.checked ? "text" : "password";
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function generatePassword() {
  const length = +lengthInput.value;
  let charset = "abcdefghijklmnopqrstuvwxyz";
  if (uppercase.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers.checked) charset += "0123456789";
  if (symbols.checked) charset += "!@#$%^&*()_+{}[]<>?/|";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  passwordField.value = password;
  updateStrength(password);
}

function updateStrength(password) {
  let strength = 0;
  if (password.length > 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  strengthMeter.style.width = `${(strength / 4) * 100}%`;
  strengthMeter.classList.add("fill");
  if (strength <= 1) strengthMeter.style.background = "red";
  else if (strength === 2) strengthMeter.style.background = "orange";
  else if (strength === 3) strengthMeter.style.background = "yellow";
  else strengthMeter.style.background = "green";
}
