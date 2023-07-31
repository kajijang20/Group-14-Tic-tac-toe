let btn = document.querySelectorAll(".button-option");
let popUp = document.querySelector(".popup");
//let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msg = document.getElementById("message");
let undo = document.getElementById("undo");
let redo = document.getElementById("redo");
let moveHistory = [];

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2], [0, 3, 6], [2, 5, 8],
  [6, 7, 8], [3, 4, 5], [1, 4, 7],
  [0, 4, 8], [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;
let moves = 0;

// Disable All Buttons
const disableButtons = () => {
  btn.forEach((element) => (element.disabled = true));
  //enable popup
  popUp.classList.remove("hide");
};

// Enable all buttons (For Undo, Redo and Restart)
const enableButtons = () => {
  btn.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  //disable undo or redo based on moves
  if (count >= moveHistory.length-1) {
    redo.disabled = true;
  } else {
    redo.disabled = false;
  }
  
  if (count > 0) {
    undo.disabled = true;
  } else {
    undo.disable = false;
  }
  
  //disable popup
  popUp.classList.add("hide");
};

// Win Function
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msg.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msg.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msg.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// Restart
restartBtn.addEventListener("click", () => {
  count = 0; moves = 0;
  undo.style.visibility = 'hidden';
  redo.style.visibility = 'hidden';
  enableButtons();
});

// Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btn[i[0]].innerText,
      btn[i[1]].innerText,
      btn[i[2]].innerText,
    ];
    //Check if elements are filled, if 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Undo & Redo
//const undoRedo = () => {
  // Undo
  //  if (count > 0) {
  //    undo.addEventListener("click", () => {
  //    count--;
  //    enableButtons();
  //    }
  //  });
  //}
  // Redo
  //if (count < moves){
  //  redo.addEventListener("click", () => {
  //  currentHistory[count+1] = moveHistory[count+1];
  //  count++;
  //  }
  //});
//};

// Display X/O on click
btn.forEach((element) => {
  element.addEventListener("click", () => {
    undo.style.visibility = 'visible';
    redo.style.visibility = 'visible';
    if (xTurn) {
      xTurn = false;
      // Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      // Display O
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    //moveHistory[moves] = element.innerText;
    count += 1; moves += 1;
    
    if (count == 9) {
      drawFunction();
    }
    //Undo and redo function
    //undoRedo();
    //Check for win on every click
    winChecker();
  });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;