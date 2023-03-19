const gameboard = document.querySelector('#gameboard')// grabbing element with ID gameboard
const starCells = ["","","","","","","","",""]//creating an array of empty strings to represent each square cells
let turn = 'circle'//creating a variable with whose turn its gonna be , strating with cirle
const infoDisplay = document.querySelector('#info')
infoDisplay.innerHTML = "Circle goes First"//we are changing the input of the text in div from hi to something else
infoDisplay.style.fontSize = "x-large"//just changing the font size

function createBoard(){//creating a function using array 
    //in js foreeach can accept 3 parameters, current item, index and array
    //current item is the only one that is required. 
    //index parameter is optional
    //aray parameter is also optional
    //can rename current Item, index and array parameters to anything you prefer
    starCells.forEach((cell, index)=>{//cycling thru each cell in each index in the array
        const cellElem = document.createElement('div')//for each of those empty strings we are creating a div
        cellElem.classList.add('square')//adding class to the element square
        cellElem.id = index// this is giving it an id to each square so we can access it
        cellElem.addEventListener('click', takeTurn)//telling it what event to listen for and what function to perform
        gameboard.append(cellElem)//adding that cell elemnt to the gameboard. thats whats putting those squares unto the gamebaord
    })
}
createBoard()// here we are just calling on the function above. 

function takeTurn(event){
    const currentTurn = document.createElement('div')
    currentTurn.classList.add(turn)
    event.target.append(currentTurn)
    if(turn === 'circle'){
        turn = 'x'
    }
    else{
        turn = 'circle';
    }
    infoDisplay.textContent = "It is now " + turn + "'s turn"
    event.target.removeEventListener("click", takeTurn)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square')
    const winners = [
        [0,1,2],[3,4,5],[6,7,8],//horizontal
        [0,3,6],[1,4,7],[2,5,8],//vertical
        [0,4,8],[2,4,6]//diagonal
    ] 
    winners.forEach(array => {
        let circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
        if(circleWins){
            infoDisplay.textContent = "Circle Wins"
            return
        }
    })
    winners.forEach(array => {
        let xWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('x'))
        if(xWins) {
            infoDisplay.innerHTML = "X's Win!"
            return
        }
    })
}