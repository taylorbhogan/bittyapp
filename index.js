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
  appName.style.color = '#F6F6F6'
}
const toggleLight = () => {
  document.body.style.backgroundColor = '#FFFFFF'
  document.body.style.color = '#FFFFFF'
  appName.style.color = '#000000'
}

const rotateRight = () => {
  apps.push(apps.shift())
  appName.innerHTML = apps[0]
  apps[0] === 'grave' ? toggleDark() : toggleLight();
  return apps;
}

const rotateLeft = () => {
  apps.unshift(apps.pop())
  appName.innerHTML = apps[0]
  apps[0] === 'grave' ? toggleDark() : toggleLight();
  return apps;
}

document.getElementById('right-button').onclick = rotateRight;
document.getElementById('left-button').onclick = rotateLeft;
