const resultDisplay = document.querySelector('.result');
let textDisplay = "";

// Add character
function addCharacter(char){
    if(Number.isInteger(parseInt(char))){
       if(textDisplay === '0' && char === '0') return;
       if(textDisplay === '0') textDisplay = '';
        textDisplay += char;
    }
    else if(textDisplay.length > 0 && !isNaN(textDisplay[textDisplay.length-1])){
        if(char === '.'){
            if(textDisplay.includes('.')) return;
            textDisplay += char;
        }
        else textDisplay += `<span id="roy">${char}</span>`
    }
    updateDisplay()
}

// Claculte Result
function calculateResult(){
    let res = removeSpanTags(textDisplay);
    while (res[res.length - 1] === '*' || res[res.length - 1] === '-' || res[res.length - 1] === '+' || res[res.length - 1] === '/') {
        res = res.slice(0, -1);
    }

    res = eval(res);
    console.log(res);

    if(res === undefined) res = 'error';
    textDisplay = res;
    resultDisplay.innerHTML = res;

}

function removeSpanTags(inputString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;
    const spans = tempElement.getElementsByTagName('span');
  
    for (let i = spans.length - 1; i >= 0; i--) {
        const span = spans[i];
        const spanConteudo = span.innerHTML;
        span.parentNode.replaceChild(document.createTextNode(spanConteudo), span);
    }

    return tempElement.innerHTML;
}

function backDelete(){
    textDisplay = textDisplay.slice(0, textDisplay.length-1);
    updateDisplay();
}

// entry value display
function updateDisplay(){
    document.querySelector('.operation').innerHTML = textDisplay;
}

// For the keyboard functionality

window.addEventListener("keydown", async (event) => {
    const key = event.key;

    if(key >= '0' && key <= '9'){
        textDisplay += key;
        updateDisplay()
    }
    else if(key === '.' || key === ',' || key === "Decimal"){
        textDisplay += '.';
        updateDisplay();
    }
    else if(key === '+' || key === '-' || key === '*' || key === '/'){
        textDisplay += `<span id='roy'>${key}</span>`
        updateDisplay();
    }
    else if(key === 'Backspace' || key === 'Delete'){
        textDisplay = textDisplay.slice(0, -1);
        updateDisplay();
    }
    else if(key === 'Return' || key === 'Enter'){
        calculateResult();
    }
})