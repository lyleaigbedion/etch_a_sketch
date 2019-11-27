//create container for buttons
const body = document.querySelector('body');
const buttonContainer = document.getElementById('buttons');

//create 4 buttons: Black, Random color, 10% Black, Clear
const black = document.createElement('button');
const rand = document.createElement('button');
const opacity = document.createElement('button');
const clear = document.createElement('button');
const custom = document.createElement('button');

//button text
black.innerHTML = 'BLACK';
rand.innerHTML = 'RANDOM COLOR';
opacity.innerHTML = '10% BLACK';
clear.innerHTML = 'CLEAR';
custom.innerHTML = "CUSTOM BOXES";

//append the buttons to the button container using an array, less typing.
let btnArr = [black,rand,opacity,clear, custom];

btnArr.forEach(el=>{
    buttonContainer.appendChild(el);
});

//container for form

const form = document.createElement('div');
form.id = "form";
form.setAttribute('style', 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, 50%);')

//container for grid
const gridContainer = document.getElementById('grid');

//create grid.... make it flexible

//generate the grid no way an i writing this 256 times
//make it a function
let scaler = 1; 
function makeRows(rows, cols) {
    
    if(rows > 22 && rows < 35){
        scaler = .67;
    }if(rows >= 35 && rows < 65){
        scaler = .33;
    }
    gridContainer.style.setProperty('--grid-rows', rows);//setting the property for css to handle grid style.
    gridContainer.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.setAttribute('style',`padding: ${scaler}em !important;`);//note you must include this in all functions because it will be overwritten if not.
      //cell.innerText = (c + 1);
      gridContainer.appendChild(cell).className = `grid-item`;
    };
  };

makeRows(16, 16);

//create form to add new grid size

const input = document.createElement('input');
input.id = "input";
input.type = "text";
input.size = "35";
input.placeholder = "Enter a number between 1-64 to generate a grid ";
input.setAttribute('style','height: 34px; font-size: 16px;');
const submit = document.createElement('button');
submit.id = 'submit';
submit.innerHTML= "Submit";

form.appendChild(input);
form.appendChild(submit);

//create RNG helper method for rgb number...

const randC = () =>{
    return Math.floor(Math.random() *Math.floor(255));
}

let gridHover = document.querySelectorAll(".grid-item");//add the class to

//create div clear function

const clearDiv = () =>{
    removeEvent();
    gridHover.forEach(el =>{
        el.setAttribute('style', `background-color: rgb(255,255,255,0.1); padding: ${scaler}em !important;`);
    });
}

let _bH = function(){
    this.setAttribute('style', `background-color: rgba(0,0,0,1.0); padding: ${scaler}em !important;`);
}

const blackHover = () => {
    removeEvent();
    gridHover.forEach(el =>{
        el.addEventListener('mouseover', _bH);
    });
}

let _rC = function(){
    this.setAttribute('style', `background-color: rgb(${randC()},${randC()},${randC()}); padding: ${scaler}em !important;`);
}

const randColor = () => {
    removeEvent();
    let rBlue = randC();
    let rRed = randC();
    let rGreen = randC();
    gridHover.forEach(el =>{
        el.addEventListener('mouseover', _rC);
    });
}


let _gC = function(){
    let regexExp = /\d\.\d/g; //regex expression matches (digit.digit) ex: 0.1
    let opacityString = this.style.backgroundColor;
    let result = opacityString.match(regexExp);
    if(result === null){
     this.style.backgroundColor = "rgba(0, 0, 0," + 0.1 + ")";
    }
    let opacityAdder = parseFloat(result);
    opacityAdder += 0.1;
    this.style.backgroundColor = "rgba(0, 0, 0," + opacityAdder + ")";   
}

function gradientColor(){ 
    removeEvent();
    gridHover.forEach(el =>{
      // el.setAttribute('style', `background-color: rgba(255,255,255,0.1)`);            
        el.addEventListener('mouseover', _gC);
    });
}

//disable all eventListeners function
//create a function that clears the listeners
const removeEvent = () => {
    gridHover.forEach(el =>{
        el.removeEventListener('mouseover',_bH);
        el.removeEventListener('mouseover', _gC);
        el.removeEventListener('mouseover', _rC);
    })
}

//remove div helper function.

const removeDivs = () => {
    while(gridContainer.firstChild){                        
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

//add listener on cutsom button to remove the divs

custom.addEventListener('click', () =>{
    body.appendChild(form);
    removeDivs();
});

//add a listener on the submit button to capture the entry and generate the new grid...
    
submit.addEventListener('click', ()=>{
    gridSize = document.getElementById('input').value;
    if(isNaN(Number(gridSize))){
        alert("Please enter a number only");
    }else if(Number(gridSize) < 1 || Number(gridSize) > 64){
        alert("Please enter a number between 1 and 64 inclusive.");
    }else{  
        body.removeChild(body.lastChild);
        makeRows(gridSize,gridSize);
        gridHover = document.querySelectorAll(".grid-item");
    }
});


black.addEventListener('click', blackHover);
rand.addEventListener('click', randColor);
opacity.addEventListener('click', gradientColor);
clear.addEventListener('click', clearDiv);


  
 