const generateGrave = () => {
  document.body.style.transition = 'all 500ms';
  document.body.style.color = '#757575';
  document.body.style.backgroundColor = '#000000';

  const bones = {
    issData: {
      name: 'iss data',
      site: 'https://iss-data.vercel.app/',
    },
    miniExpressBackend: {
      name: 'Mini Express Backend',
      site: 'https://recapp-express.herokuapp.com/api/questions',
    },
  }

  const display = document.getElementById('display')
  const ul = document.createElement('ul')
  Object.keys(bones).forEach(bone => {
    const li = document.createElement('li')
    li.classList.add('bone')
    ul.append(li)
    const a = document.createElement('a')
    a.href = bones[bone].site
    a.innerText = bones[bone].name
    a.style.color = apps[0].color
    a.rel='noopener noreferrer'
    a.target='_blank'
    li.append(a)
  })

  display.append(ul)
};
