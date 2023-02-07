import { ProductManager } from './products.js'
import { CartManager } from './carts.js'
import { UserManager } from './users.js'

export const productsManager = new ProductManager(/*"../src/DBS/products.json"*/)

export const cartManager = new CartManager(/*"../src/DBS/cart.json"*/)

export const usersManager = new UserManager()

