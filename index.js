const apps = [
  'app',
  'blog',
  'shop',
  'note',
  'game',
  'grave'
]

let appName = document.getElementById('app-name')
appName.innerHTML = apps[0]

const toggleDark = () => {
  document.body.style.backgroundColor = '#000000'
  document.body.style.color = '#FFFFFF'
  appName.style.color = '#e013e7'
}
const toggleLight = () => {
  document.body.style.backgroundColor = '#FFFFFF'
  document.body.style.color = '#000000'
  appName.style.color = '#13e7dd'
}

const rotateRight = () => {
  if (apps[0] === 'grave') {
    toggleLight()
  }
  apps.push(apps.shift())
  appName.innerHTML = apps[0]
  apps[0] === 'grave' ? toggleDark() : null;
  return apps;
}

const rotateLeft = () => {
  if (apps[0] === 'grave') {
    toggleLight()
  }
  apps.unshift(apps.pop())
  appName.innerHTML = apps[0]
  apps[0] === 'grave' ? toggleDark() : null;
  return apps;
}

document.getElementById('right-button').onclick = rotateRight;
document.getElementById('left-button').onclick = rotateLeft;
