import { ProductManager } from './products.js'
import { CartManager } from './carts.js'

export const budines = new ProductManager("../src/DBS/products.json")

export const cartManager = new CartManager("../src/DBS/cart.json")