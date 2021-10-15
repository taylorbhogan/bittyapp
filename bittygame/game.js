const generateGame = () => {

  // initial state of game layout; 0,0 is top left
  px = py = 10;  // head positionX, Y - later used to ref. ea. segment
  // "boundaries" - sets playable area size via # pixels per square
  gridScale = 25;
  tableSize = 20;
  aplX = aplY = 15;  // apple position
  // arcadeCount = 0;   // used for arcade game speed (DNW)

  // the only game values manipulated by our keys (directional indicators)
  xv = yv = 0;

  // OOP; every segment of the snake will be an object
  // on load snake has just a head, no body. body appears on keydown
  body = [];     // body will contain segments of form: { x: px, y: py }
  segments = 5;

  score = 0;
  highScore = JSON.parse(localStorage.getItem('highScore'))
  if (!highScore){
    localStorage.setItem('highScore', JSON.stringify(0))
  }
  highScore = JSON.parse(localStorage.getItem('highScore'))

  /////////////////////////////////////////////////////////////////////////

  // grab display, create canvas, settings, buttons
  const display = document.getElementById('display')

  const canvas = document.createElement('canvas')
  canvas.id = 'game'
  canvas.height = '500'
  canvas.width = '500'
  // canvas.style.border = '4px solid #13e7dd'
  canvas.style.border = `4px solid ${apps[0].color}`

  const settings = document.createElement('div')
  settings.classList.add('settings')

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

  display.append(canvas, settings)
  settings.append(easyButton, normalButton, hardButton, arcadeButton)

  ctx = canvas.getContext('2d');

  /////////////////////////////////////////////////////////////////////////

  // defaulting to normal, use inputted difficulty value to determine gameplay cadence, then start game
  let speedInterval;
  let arcadeMultiplier = 0;

  const setGameSpeed = () => {
    let speedButton = document.querySelector('.activeButton')

    clearInterval(speedInterval)

    switch (speedButton.id) {
      case ('easyButton'):
        console.log('easy')
        speedInterval = setInterval(game, 1000 / 8);
        break
      case ('normalButton'):
        console.log('normal')
        speedInterval = setInterval(game, 1000 / 15);
        break
      case ('hardButton'):
        console.log('hard')
        speedInterval = setInterval(game, 1000 / 30);
        break
      case ('arcadeButton'):
        console.log('arcade')
        speedInterval = setInterval(game, 1000 / (15 + score))
        break
    }
  }

  /////////////////////////////////////////////////////////////////////////

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


  // /////////////////////////////////////////////////////////////////////////
  // game logic
  const game = () => {
    px += xv;
    py += yv;

    ctx.fillStyle = '#333333'  // gameboard color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `${apps[0].color}`  // snake color

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
        score = 0
        arcadeMultiplier = 0
        // if (px !== 10 && py !== 10) {
        //   document.querySelector('#info').textContent = 'Ahh! You lose!'
        //   document.querySelector('#info').removeAttribute('hidden')
        //   setTimeout(() => {
        //     document.querySelector('#info').setAttribute('hidden', 'true')
        //   }, 1500)
        // }
        // if (document.querySelector('#arcadeButton').classList.contains('activeButton')) {
        //   document.querySelector('#arcadeLevel').textContent = 0

        // }
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
      score += 10;
      // let highScore = JSON.parse(localStorage.getItem('highScore'))
      if (score > highScore) {
        highScore = score
        localStorage.setItem('highScore', JSON.stringify(highScore))
      }
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

    ctx.font = '20px Typewriter'
    ctx.fillStyle = 'white'
    ctx.fillText(`Score: ${score}`, 10, 25)
    ctx.fillText(`High Score: ${highScore}`, 360, 25)

    if (document.querySelector('.activeButton')){
      if (document.querySelector('.activeButton').id === 'arcadeButton') ctx.fillText(`Level: ${score / 10}`, 200, 25)
    }

  }

  /////////////////////////////////////////////////////////////////////////
  // D-pad Controls
  const keyDown = e => {
    // document.querySelector('#info').setAttribute('hidden', 'true')

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
      default:
        break
    }
  }

  document.addEventListener('keydown', keyDown);
  setGameSpeed()
}
