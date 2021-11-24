const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'c', 'ENTER']
const ops = ['add', 'sub', 'mul', 'div']

const defaultState = {
  currentInput: '',
  total: 0,
  currentOp: null,
}



const generateMath = () => {
  // declare state - a reminder
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
      if (state.currentInput.length) return calculate()
      return;
    }

    if (numInput === 'c') {
      state = { ...defaultState }
      return lcd.innerHTML = 0
    }

    state.currentInput += numInput
    // console.log(state);
    lcd.innerHTML = state.currentInput;
  }


  // handle calculations
  // // switch statement for operation
  const calculate = () => {
    let currentValue = parseFloat(state.currentInput)

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


  // if operation selected => calculate()
  // else set total to currentInout, reset currentInput, set operation

  // handle operation input
  const handleOpInput = opInput => {
    options.childNodes.forEach(op => {
      if (op.innerHTML === opInput) {
        op.style.color = apps[0].color
      } else {
        op.style.color = '#000000'
      }
    })

    // console.log('state.currentInput', state.currentInput);
    // console.log('state.currentOp', state.currentOp);
    // console.log('opInput', opInput);
    if (!state.currentInput.length) return state.currentOp = opInput

    if (state.currentOp) {
      calculate()
    } else {
      state.total = parseFloat(state.currentInput)
      state.currentInput = ''
    }
    state.currentOp = opInput;
    return
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


  math.append(numbers)
  display.append(math)


  const keyDown = e => {
    console.log(e.key);
    switch (e.key) {
      case ('.'):
        return handleNumInput('.');
      case ('c'):
        return handleNumInput('c');
      case ('Enter'):
        console.log('problem starting now');
        return handleNumInput('ENTER');
      case ('+'):
        handleOpInput('add');
        break;
      case ('-'):
        handleOpInput('sub');
        break;
      case ('*'):
        handleOpInput('mul');
        break;
      case ('/'):
        handleOpInput('div');
        break;
      default:
        if (e.key in nums) handleNumInput(e.key)
    }

  }
  document.addEventListener('keydown', keyDown)
}
