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

function calculateCircleSquare(radius){
	let square = Math.pow(radius,2)+Math.PI;
	let block = document.getElementById('3');
	block.innerHTML += "Площа кола: "+square;
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
}


feedbackBlock.style.background = localStorage.getItem("blockColor");

feedbackBlock.addEventListener("blur", function (e) {
	feedbackBlock.style.background = backgroundColorInput.value;
	localStorage.setItem("blockColor", backgroundColorInput.value);
},true);


function ShowForm(element){
	
		let contentInput;
		if(element.classList.contains("hastextarea")){
			contentInput = document.createElement("textarea");
		}else{
			contentInput = document.createElement("input");
		}
		contentInput.classList.add("edititng-input");

		let elementContent = element.innerHTML;
		let saveButton = document.createElement("button");
		contentInput.setAttribute("type", "text");
		saveButton.textContent ="Зберегти";
		contentInput.value = elementContent;
		element.appendChild(contentInput);
		element.appendChild(saveButton);

		saveButton.addEventListener("click", (e)=>{
			localStorage.setItem("block_"+element.id, contentInput.value);
			localStorage.setItem("block_"+element.id+"_prev", elementContent);
			element.innerHTML = contentInput.value;
			element.style.background="rgb(172, 56, 214)";
			addRestoreButton(element);
		});
	
}

let editableBlocks = document.querySelectorAll(".editable");

editableBlocks.forEach((element)=>{
	element.addEventListener("dblclick",(e)=>{
			ShowForm(element);
	},true);
});


function addRestoreButton(block){
	let restoreContentButton = document.createElement("button");
	restoreContentButton.textContent = "Відновити початковий вміст";

	restoreContentButton.addEventListener("click", (e)=>{
		let blockID = block.id;
		block.innerHTML = localStorage.getItem("block_"+blockID+"_prev");
		localStorage.removeItem("block_"+blockID+"_prev");
		localStorage.removeItem("block_"+blockID);
	});

	block.appendChild(restoreContentButton);
}

for (var i = 1; i <= 6; i++) {
	let blockContent = localStorage.getItem("block_"+i);
	if(blockContent != null){
		let block = document.getElementById(i);
		block.innerHTML = blockContent;
		addRestoreButton(block);
	}
}