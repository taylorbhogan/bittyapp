const generateGame = () => {
  ///// Prepare playing space
  const display = document.getElementById('display')
  const options = document.getElementById('options')
  const canvas = document.createElement('canvas')

  canvas.id = 'game'
  canvas.height = '500'
  canvas.width = '500'
  canvas.style.border = `4px solid ${apps[0].color}`

  display.append(canvas)
  ctx = canvas.getContext('2d');

  const easyButton = document.createElement('button')
  easyButton.textContent = 'easy'
  easyButton.id = 'easyButton'
  const normalButton = document.createElement('button')
  normalButton.textContent = 'normal'
  normalButton.id = 'normalButton'
  normalButton.classList.add('activeButton')
  const hardButton = document.createElement('button')
  hardButton.textContent = 'hard'
  hardButton.id = 'hardButton'
  const arcadeButton = document.createElement('button')
  arcadeButton.textContent = 'arcade'
  arcadeButton.id = 'arcadeButton'


  const difficultyButtons = [easyButton, normalButton, hardButton, arcadeButton]
  difficultyButtons.forEach(button => {
    button.classList.add('difficultyButton')
    button.style.fontFamily = apps[0].font
  })

  options.append(easyButton, normalButton, hardButton, arcadeButton)


  ///// Initial game state
  posX = posY = 10;      // head positionX, Y - later used to reference each segment

  gridScale = 25;        // boundaries - sets playable area size via # pixels per square
  tableSize = 20;
  aplX = aplY = 15;      // apple position

  moveX = moveY = 0;     // the only game values manipulated by our keys (directional indicators)

  body = [];             // on load snake has just a head, no body. body appears on keydown body will contain segments of form: { x: posX, y: posY }
  segments = 5;


  score = 0;

  savedScore = JSON.parse(localStorage.getItem('highScore'))
  highScore = savedScore ? savedScore : 0

  ///// D-pad Controls
  const keyDown = e => {
    switch (e.keyCode) {
      case (83):      // left
        moveX = -1
        moveY = 0
        break
      case (69):      // up
        moveX = 0
        moveY = -1
        break
      case (70):      // right
        moveX = 1
        moveY = 0
        break
      case (68):      // down
        moveX = 0
        moveY = 1
        break
      default:
        break
    }
  }
  document.addEventListener('keydown', keyDown);

  ////// Game logic
  const game = () => {
    posX += moveX;
    posY += moveY;

    ctx.fillStyle = '#333333'                           // gameboard color
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (posX < 0) posX = tableSize - 1;                 // portal the snake when it goes off screen
    if (posX > tableSize - 1) posX = 0;
    if (posY < 0) posY = tableSize - 1;
    if (posY > tableSize - 1) posY = 0;

    for (let i = 0; i < body.length; i++) {             // render the snake one body[i] (containing x & y values) segment at a time
      ctx.fillStyle = `${apps[0].color}`
      ctx.fillRect(body[i].x * gridScale, body[i].y * gridScale, gridScale - 2, gridScale - 2)

      if (body[i].x === posX && body[i].y === posY) {   // if the head hits the body, you lose! & we reset the game
        segments = 5
        score = 0
      }
    }

    body.push({ x: posX, y: posY });                    // on load, sets the snake's head

    while (body.length > segments) {                    // if we reset the game (segments = 5), shift off body segments to reflect that
      body.shift()
    }


    if (aplX === posX && aplY === posY) {               // if apple & snake head overlap
      segments++;
      score += 10;
      if (score > highScore) {
        highScore = score
        localStorage.setItem('highScore', JSON.stringify(highScore))
      }

      setGameSpeed()

      aplX = Math.floor(Math.random() * tableSize)      // generate new apple elsewhere within the bounds of the game
      aplY = Math.floor(Math.random() * tableSize)
    }

    ctx.fillStyle = '#FF0000'                           // apple color
    ctx.fillRect(aplX * gridScale, aplY * gridScale, gridScale - 2, gridScale - 2)

    ctx.font = '20px Typewriter'
    ctx.fillStyle = 'white'
    ctx.fillText(`Score: ${score}`, 10, 25)
    ctx.fillText(`High Score: ${highScore}`, 360, 25)

    if (document.querySelector('.activeButton')) {
      if (document.querySelector('.activeButton').id === 'arcadeButton') ctx.fillText(`Level: ${score / 10}`, 200, 25)
    }
  }

  ///// Defaulting to 'normal', use inputted difficulty value to determine gameplay cadence, then start game
  let speedInterval;

  const setGameSpeed = () => {
    let speedButton = document.querySelector('.activeButton')

    clearInterval(speedInterval)

    switch (speedButton.id) {
      case ('easyButton'):
        speedInterval = setInterval(game, 1000 / 8);
        break
      case ('normalButton'):
        speedInterval = setInterval(game, 1000 / 15);
        break
      case ('hardButton'):
        speedInterval = setInterval(game, 1000 / 30);
        break
      case ('arcadeButton'):
        speedInterval = setInterval(game, 1000 / (15 + score))
        break
    }
  }

  ///// Set activeButton class on the selected button to be used by setGameSpeed
  const setDifficulty = (e) => {
    // reset the active button
    document.querySelector('.activeButton').classList.remove('activeButton')

    // add the active class to the pushed button
    switch (e.target.id) {
      case ('easyButton'):
        document.querySelector('#easyButton').classList.add('activeButton')
        break
      case ('normalButton'):
        document.querySelector('#normalButton').classList.add('activeButton')
        break
      case ('hardButton'):
        document.querySelector('#hardButton').classList.add('activeButton')
        break
      case ('arcadeButton'):
        document.querySelector('#arcadeButton').classList.add('activeButton')
        break
    }
    setGameSpeed()
  }

  const buttons = document.querySelectorAll('.difficultyButton')
  buttons.forEach(button => button.addEventListener('click', (e) => setDifficulty(e)))

  setGameSpeed()
}
