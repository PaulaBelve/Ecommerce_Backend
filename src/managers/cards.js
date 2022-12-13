import fs from "fs"
import { budines } from "./index.js"

export class CardManager {

    constructor(path) {

        this.path = path
   
    } 

    allCarts = async () => {

      if (fs.existsSync(this.path)) {
          let readFile = await fs.promises.readFile(this.path, "utf-8");
          let guardarFile = JSON.parse(readFile) // Pasar el string a Json
          return guardarFile
      } else {
          return fs.promises.writeFile (this.path, JSON.stringify([])) ; //Retorna un array vacio
      }


  }

  #write = (list) => {

    return fs.promises.writeFile(this.path, JSON.stringify(list, null, 3))
}

getCartsById = async (id) => {

  const buscarId = await this.allCarts()

  const idCarrito = buscarId.find((cart) => cart.id === id)

  return idCarrito ;

}

crearCarrito = async () => {

  const dataBase = await this.allCarts()

  const id = await this.getNextCartId()

  const crearCarrito = {

    id: id, 
    product: []
  }

  dataBase.push(crearCarrito)

  await this.#write(dataBase)

}

getNextCartId = async () => {

  const dataBase = await this.allCarts();

  const count = dataBase.length

  return (count > 0) ? dataBase[count - 1].id + 1 : 1


}











}