// initial state for our game
// head to start, but then also used to reference each individual segment
// to StaticRange, our x and y values are set to the coordinates
px = py = 10;
// "boundaries" - the number of pixels in each square
gs = ts = 20;
// apple
ax = ay = 15;

// these are the only values manipulated by our keys (directional values)
xv = yv = 0;

// we're using OOP, so every segment of the snake will be its own object
// snake starts with just a head, no body. body will appear depending on initial keydown
body = [];     //{x: px, y:py}
segments = 5;

// game logic
const game = () => {
  px += xv;
  py += yv;

  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#666666'
  ctx.fillStyle = '#2ED9EB'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)


  if (px < 0 ){
    px = ts -1
  }
  if (px > ts -1){
    px = 0
  }
  if (py < 0 ) {
    py = ts -1
  }
  if (py > ts -1) {
    py = 0
  }

  for (let i = 0 ; i < body.length; i++ ) {
    // body[i] is one segment
    // gs is a trailing segment
    // here we take position of each ind. segment and fill a rect based on that equation. do the same thing with y value times whatever the gs value is, then we just subtract 2 from each to get the other corner
    // fill in the body we go, if the head is equal to any of the body positions, we reset the game
    ctx.fillRect(body[i].x * gs, body[i].y * gs, gs -2, gs -2)
    if(body[i].x === px && body[i].y === py){
      segments = 5
    }
  }

  // gets the initial object
  body.push({x: px, y: py});

  // we don't want our segments to be different from our body
  // we need to remove any segments off of our body.
  // if we've eaten 10 apples and we're at 15, and we reset our segments back to 5, we need to shift off all our segments so we go back to what we had

  while(body.length > segments) {
    body.shift()
  }

// if on our canvas, the apple and head of snake have overlapped,
  if (ax === px && ay === py){
    // add on to our body
    segments++;
    // generate a brand new apple somewhere else within the bounds of the game
    ax = Math.floor(Math.random() * ts)
    ay = Math.floor(Math.random() * ts)

  }


  ctx.fillStyle = '#FF0000'
  ctx.fillRect(ax * gs, ay * gs, gs -2, gs -2)



}




// Control our D-pad
const keyDown = e => {
  console.log(e.keyCode);
  switch(e.keyCode){
    case(83):
    // console.log('left');
    xv = -1
    yv = 0
    break
    case(69):
    // console.log('up');
    xv = 0
    yv = -1

    break
    case(70):
    // console.log('right');
    xv = 1
    yv = 0

    break
    case(68):
    // console.log('down');
    xv = 0
    yv = 1

    break
  }
}


const init = () => {
  canvas = document.getElementById('game')
  ctx = canvas.getContext('2d')
  document.addEventListener('keydown', keyDown)
  // game fires on this interval
  setInterval(game, 1000/15)

  // alert('This Works')
}


// window.onload = init()

document.addEventListener('DOMContentLoaded', init)
