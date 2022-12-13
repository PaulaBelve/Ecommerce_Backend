import { ProductManager } from '../managers/products.js'
import { CardManager } from './cards.js'

export const budines = new ProductManager("./src/DBS/products.json")

export const cardManager = new CardManager ("./src/DBS/card.json")