/*
Individual contributions:
 - Scoreboard
 - High score
 - Selectable game difficulty
 - Arcade variable game difficulty
 */

/////////////////////////////////////////////////////////////////////////
// defaulting to normal, use inputted difficulty value to determine gameplay cadence, then start game
let speedInterval;
let arcadeMultiplier = 0;

const setGameSpeed = () => {
  let speedButton = document.querySelector('.activeButton')
  clearInterval(speedInterval)

  if (speedButton.id === 'easyButton') {
    speedInterval = setInterval(game, 1000 / 8);
  }
  if (speedButton.id === 'normalButton') {
    speedInterval = setInterval(game, 1000 / 15);
  }
  if (speedButton.id === 'hardButton') {
    speedInterval = setInterval(game, 1000 / 30);
  }
  if (speedButton.id === 'arcadeButton') {
    speedInterval = setInterval(game, 1000 / (15 + arcadeMultiplier))
    document.querySelector('#arcadeLevel').textContent = arcadeMultiplier
  };

}

//
const init = () => {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keyDown);

  setGameSpeed()
}


// window.onload = init()
// alternatively
document.addEventListener('DOMContentLoaded', init)

/////////////////////////////////////////////////////////////////////////
const setDifficulty = (e) => {
  // reset the active button
  const butts = document.querySelectorAll('.difficultyButton')
  butts.forEach(button => button.classList.remove('activeButton'))

  // add the active class to the pushed button
  if (e.target.id === 'easyButton') {
    document.querySelector('#welcome').textContent = 'Tiny Game'
    document.querySelector('#easyButton').classList.add('activeButton')
  }
  if (e.target.id === 'normalButton') {
    document.querySelector('#welcome').textContent = 'Tiny Game'
    document.querySelector('#normalButton').classList.add('activeButton')
  }
  if (e.target.id === 'hardButton') {
    document.querySelector('#hardButton').classList.add('activeButton')
    document.querySelector('#welcome').textContent = 'Tiny Game'
  }
  if (e.target.id === 'arcadeButton') {
    document.querySelector('#arcadeButton').classList.add('activeButton')

    const welcome = document.querySelector('#welcome')
    welcome.textContent = 'Tiny Game: Level '
    const arcadeLevel = document.createElement('span')
    arcadeLevel.textContent = '0'
    arcadeLevel.setAttribute('id', 'arcadeLevel')
    welcome.append(arcadeLevel)
  }
  setGameSpeed()
}

const buttons = document.querySelectorAll('.difficultyButton')
buttons.forEach(button => button.addEventListener('click', (e) => setDifficulty(e)))

/////////////////////////////////////////////////////////////////////////
// initial state of game layout; 0,0 is top left
px = py = 10;  // head positionX, Y - later used to ref. ea. segment
// "boundaries" - sets playable area size via # pixels per square
gridScale = 20;
tableSize = 20;
aplX = aplY = 15;  // apple position
// arcadeCount = 0;   // used for arcade game speed (DNW)

// the only game values manipulated by our keys (directional indicators)
xv = yv = 0;

// OOP; every segment of the snake will be an object
// on load snake has just a head, no body. body appears on keydown
body = [];     // body will contain segments of form: { x: px, y: py }
segments = 5;

/////////////////////////////////////////////////////////////////////////
// game logic
const game = () => {
  const scoreCard = document.querySelector('#score')
  scoreCard.textContent = (segments - 5) * 10

  const highScore = document.querySelector('#highScore')
  if (+scoreCard.textContent > +highScore.textContent){
    highScore.textContent = scoreCard.textContent;
  }

  px += xv;
  py += yv;

  ctx.fillStyle = '#333333'  // gameboard color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#2ED9EB'  // snake color

  // portal the snake when it goes off screen
  if (px < 0) px = tableSize - 1;
  if (px > tableSize - 1) px = 0;
  if (py < 0) py = tableSize - 1;
  if (py > tableSize - 1) py = 0;

  // render the snake one body[i] (containing x & y values) segment at a time
  for (let i = 0; i < body.length; i++) {
    ctx.fillRect(body[i].x * gridScale, body[i].y * gridScale, gridScale - 2, gridScale - 2)

    // if the head hits the body, you lose! & we reset the game
    if (body[i].x === px && body[i].y === py) {
      segments = 5
      arcadeMultiplier = 0
      if (document.querySelector('#arcadeButton').classList.contains('activeButton')){
        document.querySelector('#arcadeLevel').textContent = 0

      }
    }
  }

  body.push({ x: px, y: py });  // on load, sets the snake's head

  // if we reset the game (segments = 5), shift off body segments to reflect that
  while (body.length > segments) {
    body.shift()
  }

  // if apple & snake head overlap
  if (aplX === px && aplY === py) {
    // add on to body
    segments++;
    arcadeMultiplier++
    if (document.querySelector('#arcadeLevel') !== null) {
      document.querySelector('#arcadeLevel').textContent = arcadeMultiplier

    }
    setGameSpeed()

    // generate new apple elsewhere within the bounds of the game
    aplX = Math.floor(Math.random() * tableSize)
    aplY = Math.floor(Math.random() * tableSize)
  }

  ctx.fillStyle = '#FF0000'  // apple color
  ctx.fillRect(aplX * gridScale, aplY * gridScale, gridScale - 2, gridScale - 2)
}

/////////////////////////////////////////////////////////////////////////
// D-pad Controls
const keyDown = e => {
  switch (e.keyCode) {

    // LEFT
    case (83):
    case (37):
      xv = -1
      yv = 0
      break

    // UP
    case (69):
    case (38):
      xv = 0
      yv = -1
      break

    // RIGHT
    case (70):
    case (39):
      xv = 1
      yv = 0

      // DOWN
      break
    case (68):
    case (40):
      xv = 0
      yv = 1

      break
  }
}
