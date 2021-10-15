const generateApp = () => {
  const display = document.getElementById('display')
  const p = document.createElement('p')
  p.textContent = 'welcome'
  p.classList.add('coming-soon')
  display.append(p)
  // console.log('hello world');
}
