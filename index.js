const setDisplay = () => {
  const selectedApp = apps[0]
  const display = document.getElementById('display')
  const options = document.getElementById('options')
  const appTitle = document.getElementById('app-name')

  display.innerHTML = ''
  options.innerHTML = ''
  document.body.style.color = '#000000';
  document.body.style.backgroundColor = '#FFFFFF';
  appTitle.innerHTML = selectedApp.name;
  appTitle.style.color = selectedApp.color;
  appTitle.style.fontFamily = selectedApp.font;
  document.title = selectedApp.title;
  document.querySelector('link[rel="shortcut icon"]').href = selectedApp.favicon

  switch (selectedApp.name) {
    case ('app'):
      generateApp();
      break
    case ('blog'):
      generateBlog();
      break
    case ('shop'):
      generateShop();
      break
    case ('art'):
      makeArt();
      break
    case ('game'):
      generateGame();
      break
    case ('note'):
      generateNotes();
      break
    case ('math'):
      generateMath();
      break
    case ('grave'):
      generateGrave();
      break
    default:
      break
  }
}

const rotateRight = () => {
  apps.push(apps.shift())
  setDisplay()
  return apps;
}

const rotateLeft = () => {
  apps.unshift(apps.pop())
  setDisplay()
  return apps;
}

// const navigate = (e) => {
//   while (apps[0].name !== e.target.id){
//     rotateRight()
//   }
// }

// const links = document.querySelectorAll('.nav-link')
// links.forEach(link => link.addEventListener('click', navigate))

document.getElementById('right-button').onclick = rotateRight;
document.getElementById('left-button').onclick = rotateLeft;

const keyDown = (e) => {
  switch(e.keyCode){
    case(37):
      return rotateLeft();
    case(39):
      return rotateRight();
    default:
      break;
  }
}

document.addEventListener('keydown', keyDown)

document.addEventListener('DOMContentLoaded', setDisplay)
