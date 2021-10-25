const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'c', 'ENTER']
const ops = ['add', 'sub', 'mul', 'div']

const defaultState = {
  currentInput: '',
  total: 0,
  currentOp: null,
}



const generateMath = () => {
  // declare state
  // they would become the same object because we're just pointing.
  // its contents have updated, but the object itself is the same. you need to have a NEW object
  // we want to persist the defaultState and only work with a copy of it
  let state = { ...defaultState };

  let decimal = false;

  // draw calculator
  const math = document.createElement('div')
  math.id = 'math'
  math.style.border = `4px solid ${apps[0].color}`

  // draw "lcd display"
  const lcd = document.createElement('span')
  lcd.id = 'lcd'
  lcd.className = 'math-module'
  lcd.innerHTML = state.total;

  math.append(lcd)

  // draw keypad display

  const numbers = document.createElement('div')
  numbers.id = 'numbers'



  // handle number inputs
  const handleNumInput = numInput => {
    if (numInput === '.' && decimal) return;

    // TODO: implement decimal input
    if (numInput === '.' && !decimal) return;

    if (numInput === 'ENTER') {
      if (state.currentInput.length > 0) return calculate();
      return;
    }

    if (numInput === 'c') {
      state = { ...defaultState }
      return lcd.innerHTML = 0
    }

    state.currentInput += numInput
    console.log(state);
    lcd.innerHTML = state.currentInput;
  }

  // handle calculations
  // switch statement for operation
  const calculate = () => {
    let currentValue = parseFloat(state.currentInput)
    console.log(state.currentInput);
    console.log(parseFloat(state.currentInput));
    console.log(typeof currentValue);
    console.log(typeof state.total);
    console.log(state.currentOp);
    switch (state.currentOp) {
      case ('add'):
        state.total += currentValue;
        break
      case ('sub'):
        state.total -= currentValue;
        break
      case ('mul'):
        state.total *= currentValue;
        break
      case ('div'):
        state.total /= currentValue;
        break
      default:
        break
    }
    state.currentInput = ''
    lcd.innerHTML = state.total;
  }


  // handle operation input

  // handle color change

  // if operation selected => calculate()
  // else set total to currentInout, reset currentInput, set operation


  // FIND THE BUG AND GET ADD AND SUBTRACT WORKING
  const handleOpInput = opInput => {
    options.childNodes.forEach(op => {
      if (op.innerHTML === opInput) {
        op.style.color = apps[0].color
      } else {
        op.style.color = '#000000'
      }
    })

    if (state.currentOp) {
      calculate()
      state.currentOp = opInput
      return
    } else {
      state.total = parseFloat(state.currentInput)
      state.currentInput = ''
      state.currentOp = opInput;
      return
    }
    console.log(state);
  }

  // draw numbers buttons
  nums.forEach(num => {
    const button = document.createElement('button')
    button.classList.add('bittyFont')
    button.innerHTML = num;
    if (num === 'c') button.style.color = apps[0].color
    if (num === 'ENTER') button.style.fontFamily = apps[0].font
    button.onclick = () => handleNumInput(num)
    numbers.append(button)

  })


  //draw ops button
  ops.forEach(op => {
    const button = document.createElement('button')
    button.innerHTML = op;
    button.onclick = () => handleOpInput(op);
    options.append(button)
  })

  // append
  math.append(numbers)
  display.append(math)


  const keyDown = e => {
    console.log(e.keyCode);
    console.log(e.key);
  }
  document.addEventListener('keydown', keyDown)
}
