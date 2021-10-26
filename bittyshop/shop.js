/*
Features:
- in options
  - cart button innerHTML = Cart: $0.00
  - as you add to your cart, update innerHTML to reflect total value of the cart
  - clicking cart button => replace display wiht items in the cart
    - cart button => 'Back to Shop'
    - when clicked again, flips back to original text
  - Checkout button in shoppint cart that just clears the cart! - maybe display an alert/message

Out of Scope
- backend persists and serces shop items
- not process cart, sign up users, etc.

Stack:
- HTML, CSS, JS => test using local storage
- in production => DB (document based, NoSQL), backend - serves us the items (serverless), image storage (AWS S3)
*/

let wares = {
  1: {
    id: 1,
    name: 'one',
    price: 10
  },
  2: {
    id: 2,
    name: 'two',
    price: 20
  },
  3: {
    id: 3,
    name: 'three',
    price: 30
  },
  4: {
    id: 4,
    name: 'four',
    price: 40
  }
}

let cart = {
  total: 0
};

let showCart = true;

const generateShop = () => {

  const shop = document.createElement('div')
  shop.id = 'shop'
  shop.style.border = `4px solid ${apps[0].color}`;
  display.append(shop);

  const savedwares = JSON.parse(localStorage.getItem('wares'))
  if (savedwares) {
    wares = savedwares
  }

  const savedCart = JSON.parse(localStorage.getItem('cart'))
  if (savedCart) {
    cart = savedCart
  }


  const buy = e => {
    const wareId = e.target.id;

    if (cart[wareId] === undefined) {
      cart[wareId] = {
        ...wares[wareId],
        qty: 1
      }
    } else {
      ++cart[wareId].qty;
    }
    cart.total += wares[wareId].price
    localStorage.setItem('cart', JSON.stringify(cart))
    cartButton.innerText = `$ ${cart.total}`
  }

  const sell = e => {
    const wareId = e.target.id;
    --cart[wareId].qty;

    if (cart[wareId] === 0) {
      cart[wareId] = undefined
    }
    cart.total -= wares[wareId].price
    localStorage.setItem('cart', JSON.stringify(cart))
    cartButton.innerText = `$ ${cart.total}`
  }

  const shelfMaker = (ware, cartShelf) => {
    const shelf = document.createElement('div')
    shelf.classList.add('shelf')

    const image = document.createElement('div')
    image.classList.add('image')

    const name = document.createElement('p')
    name.innerText = ware.name
    name.classList.add('name')

    const price = document.createElement('p')
    price.innerText = `$${ware.price}`
    price.classList.add('price')
    price.classList.add('bittyFont')



    shelf.append(image)
    shelf.append(name)
    shelf.append(price)

    if (cartShelf) {
      const qtyDiv = document.createElement('div')
      qtyDiv.classList.add('qtyDiv')

      const decrementButton = document.createElement('button')
      decrementButton.id = ware.id
      decrementButton.innerText = '-'
      decrementButton.onclick = e => {
        sell(e)
        qty.innerText = ware.qty
      }

      const qty = document.createElement('p')
      qty.innerText = ware.qty

      const incrementButton = document.createElement('button')
      incrementButton.id = ware.id
      incrementButton.innerText = '+'
      incrementButton.onclick = e => {
        buy(e)
        qty.innerText = ware.qty
      }


      qtyDiv.append(decrementButton)
      qtyDiv.append(qty)
      qtyDiv.append(incrementButton)


      shelf.append(qtyDiv)
    } else {
      const buyButton = document.createElement('button')
      buyButton.id = ware.id
      buyButton.classList.add('buyButton')
      buyButton.innerText = 'add to cart'
      buyButton.onclick = e => buy(e)
      shelf.append(buyButton)
    }

    return shelf;
  }

  const renderShop = () => {
    showCart = !showCart
    while (shop.firstChild) {
      shop.removeChild(shop.lastChild)
    }
    if (!showCart) {
      Object.values(wares).forEach(ware => {
        const shelf = shelfMaker(ware, false)
        shop.append(shelf)
      })
    } else {
      Object.values(cart).filter(ware => typeof ware === 'object').forEach(ware => {
        const shelf = shelfMaker(ware, true)
        shop.append(shelf)
      })
    }
  }

  renderShop()

  const cartButton = document.createElement('button');
  cartButton.innerText = `$ ${cart.total}`
  cartButton.onclick = () => renderShop()
  options.append(cartButton)
}
