/*function gradientColor(){ 
    let regexExp = /\d\.\d/g; //regex expression matches (digit.digit) ex: 0.1
    gridHover.forEach(el =>{
       el.setAttribute('style', `background-color: rgba(255,255,255,0.1)`);            
        el.addEventListener('mouseover', () =>{
            let opacityString = el.style.backgroundColor;
            let result = opacityString.match(regexExp);
            console.log(result);
            let opacityAdder = parseFloat(result[0]);
            opacityAdder += 0.1;
            el.style.backgroundColor = "rgba(0, 0, 0," + opacityAdder + ")";                 
        });
    });
}*/


/*const randColor = () => {
    let rBlue = randC();
    let rRed = randC();
    let rGreen = randC();
    gridHover.forEach(el =>{
        el.addEventListener('mouseover', function rC(){
            el.setAttribute('style', `background-color: rgb(${randC()},${randC()},${randC()})`);
        });
    });
}*/

/*const blackHover = () => {
    gridHover.forEach(el =>{
        el.addEventListener('mouseover', () =>{
            el.setAttribute('style', 'background-color: rgba(0,0,0,1.0)');
        });
    });
}*/