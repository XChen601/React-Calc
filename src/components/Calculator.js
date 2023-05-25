
export default function Calculator() {
    let prevNum = ""
    let currentNum = ""
    let symbol = ""

    // clear button
    const clearBtn = document.querySelector("#clearBtn")
    clearBtn.addEventListener('click', (e) => {
        clearAll();
    })

    // delete button
    const deleteBtn = document.querySelector('#deleteBtn')
    deleteBtn.addEventListener('click', (e) => {
        currentNum = currentNum.slice(0,-1);
        updateMainDisplay(currentNum);
    })

    function clearAll() {
        prevNum = '';
        currentNum = '';
        symbol = '';
        updateMainDisplay('0');
        updateUpperDisplay();
    }

    // number buttons
    const numbers = document.querySelectorAll(".numbers")
    numbers.forEach(number => number.addEventListener('click', (e) => {
        currentNum += number.textContent
        updateMainDisplay(currentNum)
    }))

    const operationBtns = document.querySelectorAll(".operations")
    operationBtns.forEach(operationBtn => operationBtn.addEventListener('click', (e) => { 
        // if there are 2 values
        if (prevNum !== "" && currentNum !== ""){
            console.log(`${prevNum} ${symbol} ${currentNum}`)
            let answer = calculate();
            console.log(answer);
            updateMainDisplay(answer);
            if (answer ==='Hah No!') {
                prevNum = ""
                currentNum = ""
                symbol = ""
                return;
            }
            prevNum = answer;
        }
        // do nothing if value at prev num, next value will be added and it will calculate
        else if (prevNum !== "") {

        }
        // case if prev num has nothing while current num has value
        else {
            prevNum = currentNum;
        }
        //if no values yet, allow user to use - as negative
        if (prevNum === '' && currentNum === '' && operationBtn.textContent == '-'){
            currentNum += '-';
            console.log(currentNum);
            updateMainDisplay('-');
            return;
        }
        symbol = operationBtn.textContent;
        updateUpperDisplay(symbol)
        currentNum = "";  
    }))

    function updateUpperDisplay(string) {
        if (string === '=') {
            string = '';
        }
        const upperDisplay = document.querySelector("#upperDisplay");
        upperDisplay.textContent = string;
    }

    function updateMainDisplay(string) {
        const display = document.querySelector("#mainDisplay");
        display.textContent = string;
    }

    function calculate() {
        let result = 0
        if(symbol === '+'){
            result = add(prevNum,currentNum);
        }
        else if (symbol === '='){
            result = equal(prevNum, currentNum)
        }
        else if (symbol === '-'){
            result = subtract(prevNum, currentNum)
        }
        else if(symbol === '*'){
            result = multiply(prevNum, currentNum)
        }
        else if (symbol === '/'){
            if (currentNum === '0') {
                return 'Hah No!';
            }
            result = divide(prevNum, currentNum)
        }
        return Math.round( result * 100000) / 100000;
    }


    function add(a, b) {
        return parseFloat(a) + parseFloat(b);
    }

    function subtract(a, b) {
        return parseFloat(a) - parseFloat(b);
    }

    function multiply(a,b) {
        return parseFloat(a) * parseFloat(b);
    }

    function divide(a,b) {
        return parseFloat(a) / parseFloat(b);
    }

    function equal(a,b) {
        return b
    }
    return(
        <div className = "calculator">
        <div className="display">
            <div id="upperDisplay"></div>
            <div id="mainDisplay">0</div>
        </div>
        <div className="middle">
            <div className="left-column">
                <div className="numbers-section">
                    <div className="row1">
                        <button className="numbers">7</button>
                        <button className="numbers">8</button>
                        <button className="numbers">9</button>
                    </div>
                    <div className="row2">
                        <button className="numbers">4</button>
                        <button className="numbers">5</button>
                        <button className="numbers">6</button>
                    </div>
                    <div className="row3">
                        <button className="numbers">1</button>
                        <button className="numbers">2</button>
                        <button className="numbers">3</button>
                    </div> 
                </div>
                <div className="bottom-row">
                    <button className="numbers">0</button>
                    <button className="numbers">.</button>
                    <button className="operations">=</button>
                </div>
            </div>
            <div className="right-column">
                <button className="operations">/</button>
                <button className="operations">*</button>
                <button className="operations">-</button>
                <button className="operations">+</button>
            </div>
        </div>
        <div class="others">
            <button id="clearBtn">Clear</button>
            <button id="deleteBtn">Delete</button>
        </div>
    </div>
    )
    
}