const generateGrave = () => {
  document.body.style.transition = 'all 500ms';
  document.body.style.color = '#757575';
  document.body.style.backgroundColor = '#000000';

  const bones = {
    issData: {
      name: 'iss data',
      site: 'https://iss-data.vercel.app/',
    },
  }

  const display = document.getElementById('display')
  const ul = document.createElement('ul')
  Object.keys(bones).forEach(bone => {
    const li = document.createElement('li')
    ul.append(li)
    const a = document.createElement('a')
    a.href = bones[bone].site
    a.innerText = bones[bone].name
    a.style.color = apps[0].color
    li.append(a)
  })

  display.append(ul)
};
