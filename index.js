const apps = [
  {
    'name': 'app',
    'color': '#13e7dd',
  },
  {
    'name': 'blog',
    'color': 'blue',
  },
  {
    'name': 'shop',
    'color': 'blue',
  },
  {
    'name': 'note',
    'color': 'blue',
  },
  {
    'name': 'game',
    'color': 'blue',
  },
  {
    'name': 'art',
    'color': 'blue',
  },
  {
    'name': 'grave',
    'color': '#e013e7',
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

document.getElementById('right-button').onclick = rotateRight;
document.getElementById('left-button').onclick = rotateLeft;
document.addEventListener('DOMContentLoaded', setDisplay)
