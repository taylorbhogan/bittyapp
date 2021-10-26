/*
Features:
- display
  - each item has an image of the item, price, 'buy' button
  - buy button => adds item to cart
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

const wares = [
  {
    name: 'one',
    price: 10
  },
  {
    name: 'two',
    price: 20
  },
  {
    name: 'three',
    price: 30
  }
]
const cart = [

]

const generateShop = () => {
  let total = 0;

  const shop = document.createElement('div')
  shop.id = 'shop'
  shop.style.border = `4px solid ${apps[0].color}`;
  display.append(shop);

  wares.forEach(ware => {
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
    shop.append(shelf)
  })

  const cartButton = document.createElement('button');
  cartButton.innerText = `$ ${total}`
  options.append(cartButton)

}
