import fs from "fs"
import { NotFoundError, ValidationError } from "../utils/index.js";

export class ProductManager {

    constructor(path) {

        this.path = path
      //  this.#read()
    }

    getProducts = async () => {

        if (fs.existsSync(this.path)) {
            let readFile = await fs.promises.readFile(this.path, "utf-8");
            let guardarFile = JSON.parse(readFile) // Pasar el string a Json
            return guardarFile
        } else {
            return fs.promises.writeFile (this.path, JSON.stringify([])) ; //Retorna un array vacio
        }


    }

/*    #read = () => {

        if (fs.existsSync(this.path)) {

            return fs.promises.readFile(this.path, "utf-8")
            .then(result => JSON.parse(result))

        }
        
        return []
    } */

    #write = (list) => {

        return fs.promises.writeFile(this.path, JSON.stringify(list, null, 3))
    }

   /*  getProducts = async () => {

        const getProduct = await this.#read()
        return getProduct

          }*/


    getProductById = async (id) => {

        const buscarId = await this.getProducts()

        const idEncontrado = buscarId.find((product) => product.id == id)

        return idEncontrado;

    }

    getNextId = async () => {

        const nuevoId = await this.getProducts();

        const count = nuevoId.length

        return (count > 0) ? nuevoId[count - 1].id + 1 : 1


    }

    addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {

        const id = await this.getNextId();

        const nuevoProducto = {
            id: id,
            title: title,
            description: description,
            code: code,
            price: price,
            status: true,
            stock: stock,
            category: category,
            thumbnails: thumbnails

        }

        const checkCode = await this.checkCode(nuevoProducto.code)

        if (checkCode) {

            throw new ValidationError('El código ya existe');
}

const list = await this.getProducts ()

list.push(nuevoProducto);

await this.#write(list);

return nuevoProducto

 } 


 checkCode = async (productCode) => {

    const codeDuplicado = await this.getProducts()

    const checkCode = codeDuplicado.some( (product) => product.code === productCode)

    return checkCode

}

updateProduct = async (id, dataAct ) => {

    const products = await this.getProducts()

    const productIndex = products.findIndex((product) => product.id === id)

    if (productIndex === -1) {

        throw new NotFoundError ('El id solcitado no ha sido encontrado')
}

const buscarProducto = products[productIndex]

products[productIndex] = {...buscarProducto , ...dataAct}

await this.#write(products);

    return products[productIndex]
  
/*  const db = await this.getProducts()

    const productUpdate = db.find((product) => product.id === obj.id)

    if (!productUpdate) {

        throw new NotFoundError ( 'El id solcitado no ha sido encontrado')
    }

    const buscarProducto = db.filter ((product) => product.id !== obj.id)

    const productosConCambios = { id : productUpdate.id, ...obj}
    buscarProducto.push(productosConCambios)

    await this.#write(buscarProducto);

    return productosConCambios */


}

deleteProduct = async (id) => {

    const db = await this.getProducts()

    const buscarProducto = db.filter ((product) => product.id !== id)

    await this.#write(buscarProducto);
}

}