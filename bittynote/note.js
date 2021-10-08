const generateNotes = () => {
  const display = document.getElementById('display')
  const canvas = document.createElement('canvas')
  canvas.id = 'note'
  canvas.height = '400'
  canvas.width = '400'
  canvas.style.border = '4px solid #13e7dd'
  display.append(canvas)
}
