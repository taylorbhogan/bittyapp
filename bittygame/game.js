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

  level = 'normal'
  arcadeOn = false;

  const levels = ['easy', 'normal', 'hard', 'arcade']
  levels.forEach(level => {
    const button = document.createElement('button')
    button.innerHTML = level
    if (level === 'normal') button.style.color = apps[0].color
    button.addEventListener('click', e => setDifficulty(e))
    options.append(button)
  })

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
    if (arcadeOn) {
      ctx.fillText(`Level: ${score / 10}`, 200, 25)
    }
  }

  ///// Defaulting to 'normal', use inputted difficulty value to determine gameplay cadence, then start game
  let speedInterval;

  const setGameSpeed = () => {
    clearInterval(speedInterval)

    switch (level) {
      case ('easy'):
        speedInterval = setInterval(game, 1000 / 8);
        break
      case ('normal'):
        speedInterval = setInterval(game, 1000 / 15);
        break
      case ('hard'):
        speedInterval = setInterval(game, 1000 / 30);
        break
      case ('arcade'):
        speedInterval = setInterval(game, 1000 / (15 + score));
        break
    }
  }

  ///// Set activeButton class on the selected button to be used by setGameSpeed
  const setDifficulty = (e) => {
    level = e.target.innerHTML
    if (level === 'arcade') arcadeOn = true;
    options.childNodes.forEach(button => {
      button.style.color = button.innerHTML === e.target.innerHTML ? apps[0].color : '#000000'
    })
    setGameSpeed()
  }

  setGameSpeed()
}
