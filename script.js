let btnRef=document.querySelectorAll(".button-option");
let popupRef=document.querySelector(".popup");
let newgameBtn=document.getElementById("new-game");
let restartBtn=document.getElementById("restart"); 
let msgRef=document.getElementById("message");
//winning pattern Array

let winningPattern= [
  [0,1,2],
  [0,3,6],
  [2,5,8],
  [6,7,8],
  [3,4,5],
  [1,4,7],
  [0,4,8],
  [2,4,6],
];

//player 'x' plays first
let xTurn = true;
let count = 0;

//disable all buttons.
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//enable all button for new game and restart.
const enableButton = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  //display popup.
  popupRef.classList.add("hide");
};

// //This function is executed when player wins.
const winFunction = (letter) => {
  disableButtons();
  if(letter == "X"){
    msgRef.innerHTML ="&#x1F389; <br> 'X' Wins";
  }else{
    msgRef.innerHTML="&#x1F389; <br> 'O' Wins";
  }
};

//function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML="&#x1F60E; <br> It's a Draw";
};


//new game.
newgameBtn.addEventListener("click", () =>{
  count =0;
  enableButton();

});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButton();
});

//win Logic.
const winChecker = () => {
  //loop through all win patterns.
  for(let i of winningPattern){
    let[element1,element2,element3] =[
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,

    ];
    //check if element are filled.
    //3 empty elements are same and would  give win as.
    if(element1 !="" && ( element2 !="") && (element3 !="")){
      if(element1 == element2 && element2 == element3){
      
        //if all 3 button are same then pass the value to winFunction.

        winFunction(element1);
      }
    }
  }
};

//display X/O click .
btnRef.forEach((element) => {
 element.addEventListener("click",() =>{
  if(xTurn){
    xTurn=false;
    //display x .
    element.innerText="X";
    element.disabled=true;
  }else{
    xTurn=true;
    //DisplayX .
    element.innerText="O"
    element.disabled=true;
  }
  //increment count on each click .
  count += 1;
  if(count === 9){
  //it's a draw since there are a total of 9 boxed.
    drawFunction();
  }
 //check for win on every click.
  winChecker();
 });
});

//Enable Buttons and disable popup on page load
window.onload=enableButtons;