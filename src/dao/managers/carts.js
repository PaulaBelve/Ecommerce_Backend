//import fs from "fs"
import { productModel } from "../models/products.model.js";
import { cartsModel } from "../models/carts.model.js"
import { NotFoundError, ValidationError } from "../../utils/index.js";

export class CartManager {

   // Creamos el carrito

   createCart = async () => {

    try {

      const newCart = {

        products: []
      };

      const result = await cartsModel.create(newCart)

      return result

    } catch (error) {

console.log (error)

    }

}

// Mostramos los carritos

  getCarts = async () => {

    try {


      const carts = await cartsModel.find();

      if (!carts) {

        throw new ValidationError('NOT FOUND CART DB');
      }

      console.log(carts)

    } catch (error) {
      console.log(error)

      return res.send({ success: false, error: 'error!' })

    };
  }

  // Muestra el carrito

  getCartsById = async (cid) => {

    try {

      const cartId = await cartsModel
      .findById({ _id: cid })
      .populate("cart.product")
      .lean();

      if (!cartId) {

        throw new ValidationError('NOT FOUND CART')

      };

      return cartId

    } catch (error) {

      console.log(error)
    }

  }

    // Agregar un producto al carrito

    addCart = async (cid , pid) => {

      try {
      
        const addProductInCart = await cartsModel.findOne(
          
          {"cart.product": pid,

        })

        if (addProductInCart){

          const upgradeCart = await cartsModel.updateOne(

            {"cart.product": pid,

          },
          {
$inc: {

  "cart.$.quantity":1,
}
}
)
  
return upgradeCart

}

const result = await cartsModel.updateOne(
  
  
  {_id:cid
  
  },

  {
  $push: {

    cart: {product:pid}
  }
}
  );

  return result

} catch (error){
      
      console.log(error)
        
      }
      
      }

// Actualizar cantidad de un producto

      updateQuantityProduct = async (quantity, cid, pid) => {

try {

findCart = await cartsModel.findById({_id:cid})

if (!findCart) {

  throw new ValidationError('CART NOT FOUND')
}

const upgradeQuantity = await cartsModel.updateOne(
  { "cart.product":pid,
},

{
$inc: {

     "cart.$.quantity": quantity,
    }
}

)

if(!upgradeQuantity) {

  throw new ValidationError('PRODUCT NOT FOUND IN CAR')

}

return upgradeQuantity


} catch (error){

  console.log(error)

}

}

      // Traer un array dentro del carrito

      arrayProduct = async (cid, products) => {

        try {

const findProduct = products.map ((product) => {

  return {product : product._id}
})

const result = await cartsModel.updateOne(
  
  {_id:cid },

  {
    $push:{

      cart: {$each: findProduct},

    },
}
);

return result
  
  } catch (error) {

console.log(error)

        }
}

// Eliminar un producto

deleteProductToCart = async (cid, pid) => {

try {

  const deleteOne = await cartsModel.updateOne(
    {_id:cid},
    {
$push: {product: pid},
  
    }
    
    );

    return deleteOne

} catch (error) {

console.log(error)

}

}

// Vaciar carrito

emptyCart = async (cid) => {

  try {

const emptyCart = await cartsModel.updateOne({ _id:cid
},

{
  $set: {cart: []}
}
);

return emptyCart

  } catch (error){

    console.log(error)

}
}

}
  /*  constructor(path) {
  
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
    } */

 



 




/* getCartsById = async (id) => {
 
    const buscarId = await this.getCarts()
 
    const idCarrito = buscarId.find((cart) => cart.id === id)
 
    return idCarrito;
 
  } */

  // Creamos el carrito

  /* crearElCarrito = async () => {
 
     const dataBase = await this.getCarts()
 
     const id = await this.CartId()
 
     const crearCarrito = {
 
       id: id,
       product: []
     }
 
     dataBase.push(crearCarrito)
 
     await this.#write(dataBase)
 
     return crearCarrito
 
   } */

  // Agregar productos al carrito

  /*  addCart = async (cartId, productId) => {
  
      const getCarts = await this.getCarts()
      const buscarCart = getCarts.find((cart) => cart.id === cartId)
  
      if (!buscarCart) {
        console.log('No se ha encontrado el carrito!')
      }
  
      // Crear el id del producto para comprobar que exista
  
      const buscarProducto = await productsManager.getProducts();
  
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
  
    };*/

  // Creamos el id automatico del carrito

  /* CartId = async () => {
 
     const dataBase = await this.getCarts();
 
     const count = dataBase.length
 
     return (count > 0) ? dataBase[count - 1].id + 1 : 1
 
 
   }*/

 



