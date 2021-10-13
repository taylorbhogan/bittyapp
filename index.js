const apps = [
  {
    'name': 'app',
    'color': '#13e7dd',
    'font': 'Audiowide',
  },
  {
    'name': 'blog',
    'color': '#009BFF',
    'font': 'Share Tech Mono',
  },
  {
    'name': 'shop',
    'color': '#bd6bdd',
    'font': 'Monoton',
  },
  {
    'name': 'note',
    'color': 'blue',
    'font': 'Permanent Marker',
  },
  {
    'name': 'game',
    'color': '#13e7dd',
    'font': 'Orbitron',
  },
  {
    'name': 'art',
    'color': '#FF66FF',
    'font': 'Megrim',
  },
  {
    'name': 'grave',
    'color': '#e013e7',
    'font': 'Creepster',
  },
]



const setDisplay = () => {
  const selectedApp = apps[0]
  const display = document.getElementById('display')
  const appTitle = document.getElementById('app-name')

  display.innerHTML = ''
  document.body.style.color = '#000000';
  document.body.style.backgroundColor = '#FFFFFF';
  appTitle.innerHTML = selectedApp.name;
  appTitle.style.color = selectedApp.color;
  appTitle.style.fontFamily = selectedApp.font;

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

const navigate = (e) => {
  while (apps[0].name !== e.target.id){
    rotateRight()
  }
}

const links = document.querySelectorAll('.nav-link')
links.forEach(link => link.addEventListener('click', navigate))






















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
