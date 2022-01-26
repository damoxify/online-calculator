"use strict";
let inputEl = document.getElementById("input-el")
let number = document.querySelectorAll(".numbers div")
let operator = document.querySelectorAll(".operators div")
let resultEl = document.getElementById("result-el")
let clearButton = document.getElementById("clear")



let resultDisplayed = false

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        let currentString = inputEl.innerHTML
        let lastChar = currentString[currentString.length - 1]
        if (resultDisplayed === false) {
            inputEl.innerHTML += e.target.innerHTML
        } else if (resultDisplayed === true && 
                                 lastChar === "+" || lastChar === "-" 
                                        || lastChar === "&times;" || lastChar === "&divide;") {
                                            resultDisplayed = false
                                            inputEl.innerHTML = e.target.innerHTML
        } else {
            resultDisplayed =false
            inputEl.innerHTML = ""
            inputEl.innerHTML = e.target.innerHTML

        }
    })
}

for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        let currentString = inputEl.innerHTML
        let lastChar  = [currentString.length - 1]
        if (lastChar === "+" || lastChar === "-" || lastChar === "&times;" || lastChar === "&divide;") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML
            inputEl.innerHTML = newString
        } else if (currentString.length === 0) {
            console.log("Enter a number first")
        } else {
            inputEl.innerHTML += e.target.innerHTML
        }
    })
}

resultEl.addEventListener("click", function() {
    let inputString = inputEl.innerHTML
    let number = inputString.split("/\+|\-|\&multiply;|\&divide;/g")
    let operator = inputString.replace("/[0-9]|\./g, ''")
    console.log(inputString)
    console.log(operator)
    console.log(number)
    console.log("---------------------------------------------------")

    let divide = operator.indexOf("&divide;")
    while (divide != -1) {
        number.splice(divide, 2, number[divide] / number[divide + 1])
        operator.slice(divide, 1)
        divide = operator.indexOf("&divide;")
    }
    let multiply = operator.indexOf("&multiply;")
    while (multiply != -1) {
        number.splice(multiply, 2, number[multiply] * number[multiply + 1])
        operator.slice(multiply, 1)
        multiply = operator.indexOf("&multiply;")
    }
    let subtract = operator.indexOf("-")
    while(subtract != -1) {
        number.splice(subtract, 2, subtract[number] - number[subtract + 1])
        operator.slice(subtract, 1)
        subtract = operator.indexOf("-")
    }
    let add = operator.indexOf("+")
    while(add != -1) {
        number.splice(add, 2, parseFloat(number[add]) + parseFloat(number[add + 1]))
        operator.slice(add, 1)
        add = operator.indexOf("+")
    }

    inputEl.innerHTML = number[0]
    resultDisplayed = true
})

clearButton.addEventListener("click", function() {
    inputEl.innerHTML = ""
})
