const makeArt = () => {
  // const bittyart = document.getElementById('bittyart')
  const canvas = document.createElement('canvas')
  canvas.id = 'art'
  canvas.height = '500'
  canvas.width = '500'

  canvas.style.background = '#000000'
  canvas.style.border = '4px solid #13e7dd'

  const context = canvas.getContext('2d')  // working in a 2d environment


  // smooth gradiant
  for (let x = -1; x < 255; x++) {
    for (let y = -1; y < 255; y++) {
      context.fillRect(x * 4, y * 4, 4, 4)
      context.fillStyle = `rgb(255, ${x}, ${y})`
    }
  }
  for (let x = -2; x < 500; x++) {
    for (let y = -2; y < 500; y++) {
      if ((x ^ y) % 3) {

        context.fillRect(x/((x ^ y) % 13), y / ((x ^ y) % 13), 4, 4)
        context.fillStyle = `rgb(1, ${x}, ${y})`
      }
    }
    const display = document.querySelector('#display')
    display.append(canvas)
  }


  // neat squared overlay
  // for (let x = -2; x < 255; x++) {
  //   for (let y = -2; y < 255; y++) {
  //     if ((x ^ y) % 3) {

  //       context.fillRect(x*((x ^ y) % 13), y * ((x ^ y) % 13), 4, 4)
  //       context.fillStyle = `rgb(1, ${x}, ${y})`
  //     }
  //   }
  // }

  // green drs office
  // for (let x = -1; x < 255; x++) {
  //   for (let y = -1; y < 255; y++) {
  //     if ((x ^ y) % 10) {
  //       context.fillRect((x ^ y) * 4, y * 4, 4, 4)
  //       context.fillStyle = `rgb(${(x ^ y)}, ${x}, ${y})`
  //     }
  //   }
  // }

  // doctor's office
  // for (let x = -1; x < 255; x++) {
  //   for (let y = -1; y < 255; y++) {
  //     if ((x ^ y) % 10) {
  //       context.fillRect((x ^ y) * 4, y * 4, 4, 4)
  //       context.fillStyle = `rgb(255, ${x}, ${y})`
  //     }
  //   }
  // }

  // my first
  // for (let x = 0; x < 255; x++) {
  //   for (let y = 0; y < 255; y++) {
  //     if ((x ^ y) % 3) {
  //       context.fillRect(x * 4, y * 4, 4, 4)
  //       context.fillStyle = `rgb(255, ${x}, ${y})`
  //     }
  //   }
  // }

  // marks
  // for (let x=0; x < 255; x++) {
  // 	for (let y=0; y < 255; y++) {
  // 		if ((x ^ y) % 10) {
  // 			context.fillRect(x*((x ^ y) % 210), y*((x ^ y) % 210), x, y);
  // 			context.fillStyle = `rgb(${(x ^ y) % 210}, ${y} ,${x} `;
  // 		};
  // 	};
  // };
  // }

}
// document.addEventListener('DOMContentLoaded', makeArt)
