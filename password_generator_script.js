const password = document.querySelector("[password]");
const password_length = document.querySelector("[password-length]");
const passGenBtn = document.querySelector(".generate-btn");
const slider = document.querySelector("[slider]");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const copyBtn = document.querySelector("[copy-btn]");

let defaultPasswordLength = 10;
let passLength = defaultPasswordLength;
const symbolList = ">@]#{[$(}_)<";
let checkBoxFuncs = [];
let checkBoxCount = 0;
let passwordStr = "";

handleSlider();
function handleSlider() {
	// set the value of slider
	// display the value to the ui
	//update the password length
	slider.value = passLength;
	password_length.innerText = passLength;
}

slider.addEventListener("input", (e) => {
	passLength = e.target.value;
	handleSlider();
});

function getRandomNumber() {
	return getRandomDigit(0, 9);
}
// to generate random num in range
function getRandomDigit(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

//generate random lowecase letter
function getRandomLowerCase() {
	// let min = "a";
	// let max = "z";
	// let charCode = getRandomNumber(min.charCodeAt(0), max.charCodeAt(0));
	// return String.fromCharCode(charCode);
	return getRandomChar("a", "z");
}

function getRandomUpperCase() {
	// let min = "A";
	// let max = "Z";
	// let charCode = getRandomNumber(min.charCodeAt(0), max.charCodeAt(0));
	// return String.fromCharCode(charCode);
	return getRandomChar("A", "Z");
}

function getRandomChar(from = "a", to = "z") {
	return String.fromCharCode(
		getRandomDigit(from.charCodeAt(0), to.charCodeAt(0))
	);
}
async function copyText() {
	let text = password.textContent;
	await navigator.clipboard.writeText(text);
	console.log(text);
}

copyBtn.addEventListener("click", () => {
	copyText();
	copyBtn.style.backgroundColor = "green";
	setTimeout(() => {
		copyBtn.style.backgroundColor = "white";
	}, 2000);
});

//to shuffel the string
function shuffelString(input) {
	let len = input.length;
	let chars = Array.from(input);
	for (let i = 0; i < len; i++) {
		let j = getRandomNumber(0, len);
		let temp = chars[i];
		chars[i] = chars[j];
		chars[j] = temp;
	}
	// this joins the chars and convert it to the string
	return chars.join("");
}

// to get random symbol

function getRandomSymbol() {
	let symbolIndex = getRandomDigit(0, symbolList.length);
	return symbolList.charAt(symbolIndex);
}
// allCheckBoxes.addEventListener("click", () => {
// 	console.log("checkbox is clicked");
// });
function handleCheckboxChange() {
	checkBoxCount = 0;
	allCheckBoxes.forEach((checkbox) => {
		if (checkbox.checked) {
			checkBoxCount++;
		}
	});
	if (passLength < checkBoxCount) {
		passLength = checkBoxCount;
		handleSlider();
	}
}

// handling checkbox check event
allCheckBoxes.forEach((checkbox) => {
	checkbox.addEventListener("change", handleCheckboxChange);
});

function generatePassword() {
	// generate nesessary chars
	passwordStr = "";

	if (uppercaseCheck.checked) {
		checkBoxFuncs.push(getRandomUpperCase);
	}
	if (lowercaseCheck.checked) {
		checkBoxFuncs.push(getRandomLowerCase);
	}
	if (numberCheck.checked) {
		checkBoxFuncs.push(getRandomNumber);
	}
	if (symbolCheck.checked) {
		checkBoxFuncs.push(getRandomSymbol);
	}

	// generate required chars
	for (let i = 0; i < checkBoxFuncs.length; i++) {
		passwordStr += checkBoxFuncs[i]();
	}

	while (passwordStr.length < passLength) {
		let index = getRandomDigit(0, checkBoxFuncs.length);
		passwordStr += checkBoxFuncs[index]();
	}
	checkBoxFuncs = [];
	return shuffelString(passwordStr);
}

passGenBtn.addEventListener("click", () => {
	password.value = generatePassword();
	console.log(password.textContent);
});
