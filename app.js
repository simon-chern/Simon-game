const onBtn = document.getElementById("on")
const strictBtn = document.getElementById("strict") 
const startBtn = document.getElementById("start")
const turnCounter = document.querySelector("#turn")
const topleft = document.getElementById("topleft")
const topright = document.getElementById("topright")
const bottomleft = document.getElementById("bottomleft")
const bottomright = document.getElementById("bottomright")

let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let on = false;
let win;
let noise = false;


strictBtn.addEventListener("click", () => {
  strict = strictBtn.checked;
})

onBtn.addEventListener("click", () => {
  if (onBtn.checked) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = '';
    clearColor()
    clearInterval(intervalId)
  }
});

startBtn.addEventListener("click", () => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0; //it's a color which we need to trigger
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  
  if (flash == turn) { // means amount of flashes is equal to level of dificulty
    clearInterval(intervalId)
    compTurn = false; //computer turn is over 
    clearColor();
    on = true // you can press buttons once again
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200)
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topleft.style.backgroundColor = "lightgreen";
}
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topright.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomleft.style.backgroundColor = "yellow";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play(); //it's just my training of how to work with github pushes and so on.
  }
  noise = true;
  bottomright.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topleft.style.backgroundColor = "darkgreen";
  topright.style.backgroundColor = "darkred";
  bottomleft.style.backgroundColor = "goldenrod";
  bottomright.style.backgroundColor = "darkblue";
}

function flashColor() {
  topleft.style.backgroundColor = "lightgreen";
  topright.style.backgroundColor = "tomato";
  bottomleft.style.backgroundColor = "yellow";
  bottomright.style.backgroundColor = "lightskyblue";
}

topleft.addEventListener("click", (event)=> {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})
topright.addEventListener("click", (event)=> {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})
bottomleft.addEventListener("click", (event)=> {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})
bottomright.addEventListener("click", (event)=> {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
}