window.addEventListener('DOMContentLoaded', (e) => {

  const pages = [
    ['tiny app'],
    ['tiny blog'],
    ['tiny shop'],
    ['tiny note'],
    ['tiny game'],
    ['tiny grave']
  ]


  const currentPageNumber = 0
  const currentPage = pages[currentPageNumber]

  const leftButton = document.querySelector('#left')
  const rightButton = document.querySelector('#right')


  leftButton.addEventListener('click', (e) => {
    currentPageNumber--
  })
  rightButton.addEventListener('click', (e) => {
    currentPageNumber++
  })
})
