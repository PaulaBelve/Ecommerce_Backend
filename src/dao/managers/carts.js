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

  updateQuantityProduct = async (quantity, cid, pid) => {

    const findCart = await cartsModel.findById(cid)

    if (!findCart) {

      throw new ValidationError('CART NOT FOUND')
    }


    const updateQuantity = await cartsModel.updateOne(
      {
        _id: cid, "products.product": pid,
      },


      {
        $inc: {
          "products.$.quantity": quantity,

        },

      });


    if (!updateQuantity) {

      throw new ValidationError('PRODUCT NOT FOUND IN CAR')

    }

    console.log(updateQuantity)
    return updateQuantity

  }

  // Traer un array dentro del carrito

  arrayProduct = async (cid, products) => {

    // No me toma el map
    const mapProducts = products.map((product) => {

      return { product: product._id }
    });

    console.log(mapProducts)

    const result = await cartsModel.updateOne(

      { _id: cid },

      {
        $push: {

          products: { $each: mapProducts },

        },
      },
    );

    console.log(result)
    return result

  }

  // Eliminar un producto

  deleteProductToCart = async (cid, pid) => {

    const deleteOne = await cartsModel.updateOne(
      { _id: cid },

      // Eliminar un producto determinado
      {
        $pull: { products: { product: pid }, }
      }
    );

    return deleteOne;

  }

  // Vaciar carrito

  emptyCart = async (cid) => {

    const emptyCart = await cartsModel.updateOne(
      {
        _id: cid
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








