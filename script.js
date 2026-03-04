// ============================================================
// FSDL Assignment 3 - Form Validation using JavaScript
// Author: Yash Ladlapure | MIT-WPU, Pune
// ============================================================

// ---------- Helper Functions ----------
function showError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.remove('valid');
  inputEl.classList.add('invalid');
}

function showSuccess(inputEl, errorEl) {
  errorEl.textContent = '';
  inputEl.classList.remove('invalid');
  inputEl.classList.add('valid');
}

// ---------- Validation Rules ----------
function validateRequired(value) {
  return value.trim().length > 0;
}

function validateName(name) {
  return /^[A-Za-z\s]{3,50}$/.test(name.trim());
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile.trim());
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password);
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword && confirmPassword.length > 0;
}

// ---------- Get DOM Elements ----------
const form          = document.getElementById('regForm');
const fullnameInput = document.getElementById('fullname');
const emailInput    = document.getElementById('email');
const mobileInput   = document.getElementById('mobile');
const passwordInput = document.getElementById('password');
const confirmInput  = document.getElementById('confirmPassword');
const courseSelect  = document.getElementById('course');
const termsCheck    = document.getElementById('terms');
const successMsg    = document.getElementById('successMsg');

const nameError    = document.getElementById('nameError');
const emailError   = document.getElementById('emailError');
const mobileError  = document.getElementById('mobileError');
const passError    = document.getElementById('passError');
const confirmError = document.getElementById('confirmError');
const courseError  = document.getElementById('courseError');
const genderError  = document.getElementById('genderError');
const termsError   = document.getElementById('termsError');

// ---------- Live Validation ----------
fullnameInput.addEventListener('input', function () {
  if (!validateRequired(this.value)) showError(this, nameError, 'Full name is required.');
  else if (!validateName(this.value)) showError(this, nameError, 'Only letters allowed, min 3 characters.');
  else showSuccess(this, nameError);
});

emailInput.addEventListener('input', function () {
  if (!validateRequired(this.value)) showError(this, emailError, 'Email is required.');
  else if (!validateEmail(this.value)) showError(this, emailError, 'Enter a valid email (e.g. user@example.com).');
  else showSuccess(this, emailError);
});

mobileInput.addEventListener('input', function () {
  if (!validateRequired(this.value)) showError(this, mobileError, 'Mobile number is required.');
  else if (!validateMobile(this.value)) showError(this, mobileError, 'Enter valid 10-digit mobile number.');
  else showSuccess(this, mobileError);
});

passwordInput.addEventListener('input', function () {
  if (!validateRequired(this.value)) showError(this, passError, 'Password is required.');
  else if (!validatePassword(this.value)) showError(this, passError, 'Min 8 chars: uppercase, lowercase, number & special char.');
  else showSuccess(this, passError);
  if (confirmInput.value) {
    if (!validateConfirmPassword(this.value, confirmInput.value)) showError(confirmInput, confirmError, 'Passwords do not match.');
    else showSuccess(confirmInput, confirmError);
  }
});

confirmInput.addEventListener('input', function () {
  if (!validateRequired(this.value)) showError(this, confirmError, 'Please confirm your password.');
  else if (!validateConfirmPassword(passwordInput.value, this.value)) showError(this, confirmError, 'Passwords do not match.');
  else showSuccess(this, confirmError);
});

courseSelect.addEventListener('change', function () {
  if (!this.value) showError(this, courseError, 'Please select a course.');
  else showSuccess(this, courseError);
});

// ---------- Form Submit ----------
form.addEventListener('submit', function (e) {
  e.preventDefault();
  successMsg.textContent = '';
  let isValid = true;

  if (!validateRequired(fullnameInput.value) || !validateName(fullnameInput.value)) {
    showError(fullnameInput, nameError, !validateRequired(fullnameInput.value) ? 'Full name is required.' : 'Only letters allowed, min 3 characters.');
    isValid = false;
  } else showSuccess(fullnameInput, nameError);

  if (!validateRequired(emailInput.value) || !validateEmail(emailInput.value)) {
    showError(emailInput, emailError, !validateRequired(emailInput.value) ? 'Email is required.' : 'Enter a valid email.');
    isValid = false;
  } else showSuccess(emailInput, emailError);

  if (!validateRequired(mobileInput.value) || !validateMobile(mobileInput.value)) {
    showError(mobileInput, mobileError, !validateRequired(mobileInput.value) ? 'Mobile is required.' : 'Enter valid 10-digit mobile.');
    isValid = false;
  } else showSuccess(mobileInput, mobileError);

  if (!validateRequired(passwordInput.value) || !validatePassword(passwordInput.value)) {
    showError(passwordInput, passError, !validateRequired(passwordInput.value) ? 'Password is required.' : 'Min 8 chars with uppercase, lowercase, number & special char.');
    isValid = false;
  } else showSuccess(passwordInput, passError);

  if (!validateConfirmPassword(passwordInput.value, confirmInput.value)) {
    showError(confirmInput, confirmError, 'Passwords do not match.');
    isValid = false;
  } else showSuccess(confirmInput, confirmError);

  if (!courseSelect.value) {
    showError(courseSelect, courseError, 'Please select a course.');
    isValid = false;
  } else showSuccess(courseSelect, courseError);

  if (!document.querySelector('input[name="gender"]:checked')) {
    genderError.textContent = 'Please select your gender.';
    isValid = false;
  } else genderError.textContent = '';

  if (!termsCheck.checked) {
    termsError.textContent = 'You must agree to Terms & Conditions.';
    isValid = false;
  } else termsError.textContent = '';

  if (isValid) {
    successMsg.textContent = 'Registration successful! Welcome, ' + fullnameInput.value.trim() + '!';
    form.reset();
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('valid', 'invalid'));
  }
});
