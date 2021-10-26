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
  }
}

let cart = {
  total: 0
};

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


  Object.values(wares).forEach(ware => {
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

    const buyButton = document.createElement('button')
    buyButton.id = ware.id
    buyButton.classList.add('buyButton')
    buyButton.innerText = 'add to cart'
    buyButton.onclick = e => buy(e)


    shelf.append(image)
    shelf.append(name)
    shelf.append(price)
    shelf.append(buyButton)
    shop.append(shelf)
  })

  const cartButton = document.createElement('button');
  cartButton.innerText = `$ ${cart.total}`
  cartButton.onclick = () => flipCart()
  options.append(cartButton)

}
