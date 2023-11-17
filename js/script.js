let x = document.querySelector(".discount-banner");
let y = document.querySelector("footer .title");

let xContent = x.innerHTML;
let yContent = y.innerHTML;

x.innerHTML = yContent;
y.innerHTML = xContent;

let countMaxForm = document.querySelector(".maxvalues_form");
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

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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

function ConfirmDeletingCookie(){
	let text="Cookies: "+document.cookie+"\nВидалити?";
	return confirm(text);
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


let feedbackBlock = document.querySelector(".feedback");
let backgroundColorInput = document.querySelector("#backgroundColor");

window.onload += ()=>{
	let cookie = getCookie("countOfMax");

	if(cookie != ""){
		countMaxForm.style.display = "none";
		if(ConfirmDeletingCookie()){
			document.cookie = "countOfMax= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
			location.reload();
		}
	}

	feedbackBlock.style.background = localStorage.getItem("blockColor");
}

feedbackBlock.addEventListener("blur", function (e) {
	feedbackBlock.style.background = backgroundColorInput.value;
	localStorage.setItem("blockColor", backgroundColorInput.value);
},true);