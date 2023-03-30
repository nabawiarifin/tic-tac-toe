const boxElements = document.querySelectorAll('[data-box]')
const xClass = 'x'
const oClass = 'o'
const winning_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const board = document.getElementById('board')
const winMessage = document.querySelector('[data-win-popup]')
const winMessageElement = document.getElementById('winPopup')
const restartBtn = document.getElementById('restartBtn')
let playerTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    playerTurn = false
    boxElements.forEach(box => {
        box.classList.remove(xClass)
        box.classList.remove(oClass)
        box.removeEventListener('click', boxClick)
        box.addEventListener('click', boxClick, { once: true  }) //can only press box once
    })
    setBoardHover()
    winMessageElement.classList.remove('show')
}

function boxClick(e) {
    const box = e.target
    const currentClass = playerTurn ? oClass : xClass
    placeMark(box, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHover()
    }
    
}

function endGame(draw) {
    if (draw) {
        winMessageElement.innerText = 'Draw!'
    } else {
        winMessage.innerText = `${playerTurn ? "O's" : "X's"} Wins!`
    } 
    winMessageElement.classList.add('show')
}

function isDraw() {
    return [...boxElements].every(box => { //array destructuring so we can use every method
        return box.classList.contains(xClass) || box.classList.contains(oClass)
    })
}


function placeMark(box, currentClass) {
    box.classList.add(currentClass)
}

function swapTurns() {
    playerTurn = !playerTurn
}

function setBoardHover() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (playerTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winning_combos.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentClass)
        })
    })
}