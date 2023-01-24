import { ProductManager } from './products.js'
import { CartManager } from './carts.js'

export const productsManager = new ProductManager(/*"../src/DBS/products.json"*/)

export const cartManager = new CartManager(/*"../src/DBS/cart.json"*/) 

/*import { ProductManager } from "./products.js";
import { CartManager } from "./carts.js";

const productsManager = new ProductManager();
const cartsManager = new CartManager();

export default {
  productsManager,
  cartsManager,
}; */