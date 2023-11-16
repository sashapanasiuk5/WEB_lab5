let x = document.querySelector(".discount-banner");
let y = document.querySelector("footer .title");

let xContent = x.innerHTML;
let yContent = y.innerHTML;

x.innerHTML = yContent;
y.innerHTML = xContent;

let addValueButton = document.querySelector("#addValueButton");
let findMaxButton = document.querySelector("#findMax");
findMax
let valueInput = document.querySelector(".value");
let valueTextBox = document.querySelector(".values");
let array = [];

function showValues(array, textBox) {
	textBox.innerText = "Значення: ";
	array.forEach((element)=>{
		textBox.innerText += (" "+ element);
	});
}

function countMax(array){
	let sorted = array.toSorted(function(a, b){return b - a});
	let max = sorted[0];
	let count = 0;
	sorted.forEach((element)=>{
		if(element == max){
			count++;
		}
	});
	return count;
}

addValueButton.addEventListener("click", function (e) {
	let value = valueInput.value;
	array.push(parseInt(value));
	showValues(array, valueTextBox);
	valueInput.value = "";
});

findMaxButton.addEventListener("click", function (e) {
	let countOfMax = countMax(array);
	alert(countOfMax);
	document.cookie = "countOfMax="+countOfMax;
});
