import fs from "fs"
import { budines } from "./index.js"

export class CartManager {

  constructor(path) {

    this.path = path

  }

  getCarts = async () => {

    if (fs.existsSync(this.path)) {
      let readFile = await fs.promises.readFile(this.path, "utf-8");
      let guardarFile = JSON.parse(readFile) // Pasar el string a Json
      return guardarFile
    } else {
      return fs.promises.writeFile(this.path, JSON.stringify([])); //Retorna un array vacio
    }


  }

  #write = (list) => {

    return fs.promises.writeFile(this.path, JSON.stringify(list, null, 3))
  }

  // Agregar el carrito por id

  getCartsById = async (id) => {

    const buscarId = await this.getCarts()

    const idCarrito = buscarId.find((cart) => cart.id === id)

    return idCarrito;

  }

  // Creamos el carrito

  crearElCarrito = async () => {

    const dataBase = await this.getCarts()

    const id = await this.CartId()

    const crearCarrito = {

      id: id,
      product: []
    }

    dataBase.push(crearCarrito)

    await this.#write(dataBase)

    return crearCarrito

  }

  // Agregar productos al carrito

  addCart = async (cartId, productId) => {

    const getCarts = await this.getCarts()
    const buscarCart = getCarts.find((cart) => cart.id === cartId)

    if (!buscarCart) {
      console.log('No se ha encontrado el carrito!')
    }

    // Crear el id del producto para comprobar que exista

    const buscarProducto = await budines.getProducts();

    const productoElegido = buscarProducto.find((product) => product.id === productId);

    if (!productoElegido) {

      console.log('No se ha encontrado el producto seleccionado!')
    };

    // Buscamos si el producto ya se encuentra en el carrito

    const verificarProductoEnCarrito = buscarCart.product.find((product) => product.id === productId);

    console.log(verificarProductoEnCarrito);

    if (verificarProductoEnCarrito) {

      verificarProductoEnCarrito.quantity++;

      console.log(getCarts)

      await this.#write(getCarts);


      return buscarCart
    }

    // Agregamos producto al carrito, solo id y cantidad

    buscarCart.product.push({
      id: buscarProducto.id,
      quantity: 1

    });

    console.log(getCarts)

    await this.#write(getCarts);

    return buscarCart;

  };

  // Creamos el id automatico del carrito

  CartId = async () => {

    const dataBase = await this.getCarts();

    const count = dataBase.length

    return (count > 0) ? dataBase[count - 1].id + 1 : 1


  }

}

