import { cartsModel } from "../dao/models/carts.model.js"
import { productModel } from "../dao/models/products.model.js" // AGREGAR productsModel
import userModel from '../dao/models/user.model.js'
import ticketModel from '../dao/models/ticket.model.js'
import ProductsService from "../services/products.service.js";


export default class CartService {

    constructor() {

        this.productsService = new ProductsService();
    }

    // Creamos el carrito

    createCart = async () => {
        try {
            const newCart = {

                products: []
            };

            const result = await cartsModel.create(newCart)

            return result

        } catch (error) {
            console.log(error)

        }
    }

    // Mostramos todos los carritos

    getCarts = async () => {

        try {
            const carts = await cartsModel.find();


            return carts

        } catch (error) {

            console.log(error)
        }

    }

    // Muestra el carrito x id

    getCartsById = async (cid) => {

        try {
            const cart = await cartsModel

                .findById(cid)
                .populate("products.product")
                .lean();

            if (!cart) {

                throw new Error('cart not found')

            };

            return cart

        } catch (error) {

            console.log(error)
        }

    }

    // Agregar producto al carrito

    // VERIFICAR SI EL PRODUCTO EXISTE

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getCartsById(cid);

            if (!cart) throw new Error('cart not found');

            const product = await productModel.findById(pid).lean();

            if (!product) throw new Error('product not found');

            const productToCart = await cartsModel.findOne({ "products.product": pid });

            if (!productToCart) throw new Error('product not found in cart');

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

        } catch (error) {

            console.log(error)
        }

    };

    // Actualizar la cantidad de un producto

    updateQuantityProduct = async (quantity, cid, pid) => {

        try {

            const cart = await this.getCartsById(cid)

            if (!cart) throw new Error('cart not found')

            const product = await cartsModel.findOne({ "products.product": pid })

            if (!product) throw new Error('product not found in cart')

            const updateQuantity = await cartsModel.updateOne(
                {
                    _id: cid, "products.product": pid,
                },


                {
                    $inc: {
                        "products.$.quantity": quantity,

                    },

                });



            return updateQuantity
        } catch (error) {

            console.log(error)

        }

    }

    // Traer un array dentro del carrito

    arrayProduct = async (cid, products) => {

        try {
            const cart = await this.getCartsById(cid)

            if (!cart) throw new Error('cart not found')


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


            return result

        } catch (error) {

            console.log(error)
        }

    }

    // Eliminar un producto

    deleteProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getCartsById(cid)

            if (!cart) throw new Error('cart not found')

            const deleteOne = await cartsModel.updateOne(
                { _id: cid },

                // Eliminar un producto determinado
                {
                    $pull: { products: { product: pid }, }
                }
            );

            return deleteOne;

        } catch (error) {

            console.log(error)
        }

    }

    // Vaciar carrito

    emptyCart = async (cid) => {

        try {

            const cart = await this.getCartsById(cid)

            if (!cart) throw new Error('cart not found')

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
        } catch (error) {

            console.log(error)
        }
    }

    purchaseProducts = async (cid) => {

        try {


            const cart = await this.getCartsById(cid);

            if (!cart) throw new Error("Cart Not Found");

            const arrayProducts = Array.from(cart.products);

            const purchaser = await userModel.findOne({ cart: cid }).lean().exec();

            const total = await this.removeProductFromStock(cid, arrayProducts)

            const reduceTotal = total.reduce((acc, curr) => acc + curr, 0);

            const ticket = await this.generateTicket(purchaser.email, reduceTotal);

            return ticket;
        } catch (error) {
            console.log(error);
        }
    };

    generateTicket = async (purchaser, total) => {
        try {
            const result = await ticketModel.create({
                amount: total,
                purchaser: purchaser,
            });

            return result;
        } catch (error) {
            console.log(error);
        }
    };

    removeProductFromStock = async (cid, products) => {
        try {

            const totalProducts = Promise.all(
                products.map(async (product) => {

                    const producWithStock = await this.productsService.updateStock(

                        product._id,
                        product.quantity
                    );

                    if (producWithStock) {

                        await this.deleteProductToCart(cid, product.product._id);

                        return product.product.price * product.quantity;

                    }

                    return 0

                })


            );

            return totalProducts


        } catch (error) {
            console.log(error);
        }
    };


}

