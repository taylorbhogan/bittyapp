// const apps = [
//   'app',
//   'blog',
//   'shop',
//   'note',
//   'game',
//   'art',
//   'grave'
// ]

const apps = [
  {
    'name': 'app',
    'color': 'blue',
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

const display = document.getElementById('display')
const appTitle = document.getElementById('app-name')

const cleanUp = () => {
  display.innerHTML = ''
  document.body.style.color = '#000000';
  document.body.style.backgroundColor = '#FFFFFF';
  appTitle.style.color = apps[0].color;

}

const setDisplay = () => {
  const selectedApp = apps[0]
  appTitle.innerHTML = selectedApp.name;

  cleanUp();
  switch (selectedApp.name) {
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

let appName = document.getElementById('app-name')
appName.innerHTML = apps[0].name

// const toggleDark = () => {
//   document.body.style.backgroundColor = '#000000'
//   document.body.style.color = '#FFFFFF'
//   appName.style.color = apps[0].color
// }
// const toggleLight = () => {
//   document.body.style.backgroundColor = '#FFFFFF'
//   document.body.style.color = '#000000'
//   // appName.style.color = '#13e7dd'
//   appName.style.color = apps[0].color
// }

const rotateRight = () => {
  // if (apps[0].name === 'grave') {
  //   toggleLight()
  // }
  apps.push(apps.shift())
  appName.innerHTML = apps[0].name
  // apps[0].name === 'grave' ? toggleDark() : null;
  setDisplay()
  return apps;
}

const rotateLeft = () => {
  // if (apps[0].name === 'grave') {
  //   toggleLight()
  // }
  apps.unshift(apps.pop())
  appName.innerHTML = apps[0].name
  // apps[0].name === 'grave' ? toggleDark() : null;
  setDisplay()
  return apps;
}

document.getElementById('right-button').onclick = rotateRight;
document.getElementById('left-button').onclick = rotateLeft;
