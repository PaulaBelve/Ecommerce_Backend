import { cartsModel } from "../models/carts.model.js"
import { NotFoundError, ValidationError } from "../../utils/index.js";

export class CartManager {

   // Creamos el carrito

   createCart = async () => {

  

      const newCart = {

        products: []
      };

      const result = await cartsModel.create(newCart)

      return result



}

// Mostramos los carritos

  getCarts = async () => {

  


      const carts = await cartsModel.find();

      if (!carts) {

        throw new ValidationError('NOT FOUND CART DB');
      }

      console.log(carts)
      return carts

     

   
  }

  // Muestra el carrito

  getCartsById = async (cid) => {

const cart = await cartsModel
      
      .findById(cid)
      .populate("products.product")
      .lean();

      if (!cart) {

        throw new ValidationError('NOT FOUND CART')

      };

      return cart



  }

  // Agregar producto al carrito

  addCart = async (cid, pid) => {
    
      const addProductInCart = await cartsModel.findOne({
        _id: cid,
        "products.product": pid,
      });

      if (addProductInCart) {
        const upgradeCart = await cartsModel.updateOne(
          { "products.product": pid },
          {
            $inc: {
              "products.product.quantity": 1,
              
            },
          }
        );

        return upgradeCart;
      }

      const result = await cartsModel.updateOne(
        { _id: cid },

        {
          $push: {
            products: { product: pid, quantity: 1 },
          },
        }
      );

      return result;
   
  };

  // Actualizar la cantidad de un producto

updateQuantityProduct = async (quantity,cid, pid) => {

findCart = await cartsModel.findById({cid
  
})

if (!findCart) {

  throw new ValidationError('CART NOT FOUND')
}


const upgradeQuantity = await cartsModel.updateOne(
  { "products.product": pid,
},

{
$inc: {

  "products.$.quantity": quantity,
    }
}

)

if(!upgradeQuantity) {

  throw new ValidationError('PRODUCT NOT FOUND IN CAR')

}

console.log(upgradeQuantity)
return upgradeQuantity

}

// Traer un array dentro del carrito

arrayProduct = async (cid, products) => {


const mapProducts = products.map((product) => {

  return {product : product._id}
});

console.log(products)

const result = await cartsModel.updateOne(
  
  {_id:cid },

  {
    $push:{

      carts: {$each: mapProducts},

    },
});

console.log(result)
return result
  
 }

// Eliminar un producto

deleteProductToCart = async (cid, pid) => {

  const deleteOne = await cartsModel.updateOne(
    { _id: cid },

    // Eliminar un producto determinado
    {
      $pull: {products: {product: pid },} 
    }
  );

  return deleteOne;

}

// Vaciar carrito

emptyCart = async (cid) => {



const emptyCart = await cartsModel.updateOne(
{ 
  _id:cid
},

// Reemplaza al carrito con un array vacio
{
  $set: {
    
    products: []
  
  }
}
);

return emptyCart

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

 



