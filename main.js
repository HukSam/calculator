let fisrtNum = '';
let secondNum = '';
let numberSign = '';
historyArray = [{}];
done = false;
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.' ];
const actions = ['-', '+','x', '/', '%', '^', '√']

const screen = document.querySelector('.display')
let history = document.getElementById('history')
//console.log(history);
function AC () {
    fisrtNum = '';
    secondNum = '';
    numberSign = '';
    screen.textContent = 0;
    location.reload();
}
document.querySelector('.clear').onclick = AC;

function updLocaleStorage(signKey) {
    if(localStorage.length < 100) {
        localStorage.setItem(`${localStorage.length+1}`, signKey.toString())
    }
    else {
        for(let i = localStorage.length; i >= 2; i--) {
            localStorage.setItem(`${i}`, localStorage[i-1])
        }
        localStorage.setItem('1', signKey.toString())
    }
    
    document.querySelector('.history-list').innerHTML = ''
    for(let i = 1; i <= localStorage.length; i++) {
        document.querySelector('.history-list').innerHTML += 
            `<div class="resultItem">
                ${localStorage[i]}
            </div>\n`
    }
}

for(let i = 1; i <= localStorage.length; i++) {
    document.querySelector('.history-list').innerHTML += 
        `<div class="resultItem">
            ${localStorage[i]}
        </div>\n`
}

let result = 0;

document.querySelector('.calculator').onclick = (e) => {
    if (!e.target.classList.contains('btns')) return; 
    screen.textContent = result;
    let tempResult = null;
    const signKey = e.target.textContent; 
    tempZero = null;

    if (digits.includes(signKey)) {
        if (secondNum === '' && numberSign === ''){
            fisrtNum+=signKey;
            screen.textContent = fisrtNum;
        }
        else if ( fisrtNum !== '' && secondNum !== '' && done){
            secondNum+=signKey;
            screen.textContent = secondNum; 
        }
        else if ( fisrtNum !== '' && secondNum === '' && done){
            secondNum+=signKey;
            screen.textContent = secondNum; 
        }
        else {
            secondNum+= signKey;
            screen.textContent = secondNum;
        }
    }

    if (actions.includes(signKey)) {
        numberSign = signKey;
        screen.textContent = numberSign;
    } else if (signKey === '√') {
        screen.textContent = 'sqrt'
    }

    if (signKey === '=') {
        //let tempHistory = fisrtNum;
        switch (numberSign) {
            case "+":
                result = (+fisrtNum) + (+secondNum);
                updLocaleStorage(`${+fisrtNum} + ${+secondNum} = ${result}`)
                break;
            case "-":
                result = (+fisrtNum) - (+secondNum);
                updLocaleStorage(`${+fisrtNum} - ${+secondNum} = ${result}`)
                break;
            case "/":
                result = (+fisrtNum) / (+secondNum);
                updLocaleStorage(`${+fisrtNum} / ${+secondNum} = ${result}`)
                break;
            case "x":
                result = (+fisrtNum) * (+secondNum);
                updLocaleStorage(`${+fisrtNum} * ${+secondNum} = ${result}`)
                break;  
            case "%":
                result = (+fisrtNum) / 100 * (+secondNum);
                updLocaleStorage(`${+fisrtNum} % ${+secondNum} = ${result}`)
                break;
            case "^":
                result = Math.pow(+fisrtNum, +secondNum);
                updLocaleStorage(`${+fisrtNum} ^ ${+secondNum} = ${result}`)
                break;
            case "√":
                result = (+fisrtNum)**(0.5);
                console.log(result);
                updLocaleStorage(`√${+fisrtNum} = ${result}`)
                break;
        }
        tempResult = result;
        fisrtNum = result;
        screen.textContent = fisrtNum;
        console.log(fisrtNum);
        done = true;
        history = [];
    }

    const button = document.getElementById('clearHistory')
    button.addEventListener('click', () => {
        AC();
        localStorage.clear();
        location.reload();
      });    
}
