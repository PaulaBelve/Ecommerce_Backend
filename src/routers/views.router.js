import { Router } from "express";
import { cartManager, productsManager } from "../dao/managers/index.js";
import { messageModel } from "../dao/models/message.model.js";

// DONDE SE VISUALIZA LA BASO DE DATOS

const router = Router()


// Vista de los productos

router.get('/product', async (req, res) => {

    try {

        const { sort, query, page, limit } = req.query;

        const options = {

            limit: limit || 5,
            page: page || 1,
            sort: { price: sort } || { price: 1 },
            lean: true,
        };

        const result = await productsManager.getProducts(query, options);

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/product?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/product?page=${result.nextPage}` : null,

        }

        console.log(result)

        res.render("index", {
            style: "style.css",
            test: "Prueba",
            ...response,
        });




    } catch (error) {

        console.log(error)


        res.send({ succes: false, error: "ha ocurrido un error" })

    }

})


// Product Detail

router.get('/products/:pid', async (req, res) => {

    try {

        const { pid } = req.params

        const product = await productsManager.getProductById(pid)

        console.log(product)

        res.render("detail", {

            style: "Css/style.css",
            product
        });



    } catch (error) {

        console.log(error)
        return res.send({ success: false, error: 'error!' })

    }
})


// Vista de un carrito

router.get('/cart/:cid', async (req, res) => {

    try {

        const { cid } = req.params

        const result = await cartManager.getCartsById(cid)

        const cart = result.cart

        console.log(cart)

        res.render("cart", {
            style: "Css/style.css",
            ...cart,

        });

    } catch (error) {

        console.log(error)
        return res.send({ success: false, error: 'error!' })

    }

})

// Chat vacio

router.get('/chat', async (req, res) => {

    res.render('chat', {})


})

// Vista del chat

router.post('/chat', async (req, res) => {

    const nuevoMessage = req.body

    const messageGenerated = new messageModel(nuevoMessage);
    await messageGenerated.save();

    console.log(messageGenerated);

    res.redirect('/message/' + messageGenerated.User)

    //res.render('create' , {})
    //res.render("one" , {nuevoProducto})
    // const result = await productModel.create(nuevoProducto)
    //console.log(result) 

})

// Vista description x title

/*router.get ('/:title' , async  (req, res) => {

    const title = req.params.title

    const product = await productModel.findOne({ title: title }).lean().exec()
console.log (product)
res.render("detail" , {product})

})*/


export default router