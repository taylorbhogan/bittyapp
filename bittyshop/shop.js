const generateShop = () => {
  const display = document.getElementById('display')
  const p = document.createElement('p')
  p.textContent = 'coming soon'
  p.classList.add('coming-soon')
  display.append(p)
}
