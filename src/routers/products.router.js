import { query, Router } from "express";
import { ERRORS } from "../const/error.js";
import { productsManager } from "../dao/managers/index.js";


const router = Router()

// Base de datos, que devuelve formato json



//Todos los productos 
// Get conectado con Managers

router.get('/', async (req, res) => {

    try {

        const { sort, query, page, limit } = req.query;

        const options = {

            limit: limit || 5,
            page: page || 1,
            sort: { price: sort } || { price: 1 },
            lean: true,
        };

        const products = await productsManager.getProducts(query, options);


        res.send({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage
                ? `/api/products?page=${products.prevPage}`
                : null,
            nextLink: products.hasNextPage
                ? `/api/products?page=${products.nextPage}`
                : null,

        })


    } catch (error) {

        console.log(error)

        res.send({ succes: false, error: "ha ocurrido un error" })


    }

})

// Traer un solo producto por id

router.get('/:pid', async (req, res) => {

    try {

        const { pid } = req.params

        const product = await productsManager.getProductById(pid)


        res.send({
            status: "succes",
            payload: product
        })


    } catch (error) {

        console.log("error")
        console.log(error)

        res.send({ succes: false, error: "ha ocurrido un error" })


    }

})

// Agregar un producto

router.post('/', async (req, res) => {

    try {

        const newProduct = req.body

        if (!newProduct) {

            return res.send({
                status: "error",
                error: "EMPTY PRODUCT",
            });
        }

        const result = await productsManager.addProduct(newProduct)

        res.send({
            status: "succes",
            payload: result,
        });


    } catch (error) {

        console.log("error")
        console.log(error)

        res.send({ succes: false, error: "ha ocurrido un error" })



    }
})


// Actualizar un producto

router.put('/:pid', async (req, res) => {

    try {

        const { pid } = req.params

        const productToReplace = req.body

        const result = await productsManager.updateProduct(pid, productToReplace)

        res.send({
            status: 'success',
            payload: result
        })

    } catch (error) {

        console.log('error')

        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })

    }


})

// Eliminar un producto

router.delete('/:pid', async (req, res) => {
    try {

        const { pid } = req.params

        const result = await productsManager.deleteProduct(pid)

        res.send({ status: 'success', payload: result })

    } catch (error) {

        console.log('error')
        if (error.name === ERRORS.NOT_FOUND_ERROR) {

            return res.send({
                succes: false,
                error: `${error.name}: ${error.message}`

            })
        }

        res.send({ succes: false, error: 'Ha ocurrido un error!' })
    }
})



export default router






