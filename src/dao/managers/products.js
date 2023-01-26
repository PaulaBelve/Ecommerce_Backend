import { NotFoundError, ValidationError } from "../../utils/index.js";
import { productModel } from "../models/products.model.js";


export class ProductManager {

    // Mostrar todos los productos con paginación
    
    getProducts = async (query, options) => {

        try {

            if (query === "inStock") {
        const products = await productModel.paginate({ state: true }, options);

        if(!products) {

            throw new ValidationError('NOT FOUND DB')
        }
        return products
    } 

    if (query === "cacao" ||
        query === "citricos" ||
        query === "frutales" ||
        query === "secos"
        
        ) { const products = await productModel.paginate (

           {category:query},

           options
        );

        if(!products) {

            throw new ValidationError('NOT FOUND DB')
        }

        return products
}

const products = await productModel.paginate({}, options)

if(!products) {

    throw new ValidationError('NOT FOUND DB')
}

return products

        } catch (error) {

        console.log(error)

        throw new ValidationError('Se ha producido un error')

    }


    }

   
    // Traer un producto por id

    getProductById = async (pid) => {

        try {
            const product = await productModel.findById({ _id: pid });

            if (!product) {

                throw new ValidationError('PRODUCT NOT FOUND')

            }

            return product
        } catch (error) {

            throw new ValidationError('Se ha producido un error')

        }

    }

    // Agregar productos

    addProduct = async (newProduct) => {

        try {

            if (!newProduct) {

                throw new ValidationError('El código ya existe')


            }

            const result = await productModel.create(newProduct)

            if (!result) {

                throw new ValidationError('FAILED TO ADD TO DATABASE')


            }

            return result

        } catch (error) {

            throw new ValidationError('Se ha producido un error')


        }


    }

    // Actualizar un producto

    updateProduct = async (pid, updateProduct) => {

        try {

            if (!pid) {

                throw new NotFoundError('PRODUCT NOT FOUND')
            }

            const result = await productModel.updateOne(

                { _id: pid },

                updateProduct);

            return result


        } catch (error) {


            throw new NotFoundError('Se ha producido un error')


        }


    }

    // Eliminar un producto

    deleteProduct = async (pid) => {

        try {
            if (!pid) {

                throw new NotFoundError('Producto no encontrado')
            }

            const result = await productModel.deleteOne({ _id: pid })

            return result

        } catch (error) {

            throw new NotFoundError('No se pudo eliminar el producto')


        }

    }

}

   /*   constructor(path) {
   
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
   
       #write = (list) => {
   
           return fs.promises.writeFile(this.path, JSON.stringify(list, null, 3))
       }*/

/*  getProductById = async (id) => {

        const buscarId = await this.getProducts()

        const idEncontrado = buscarId.find((product) => product.id == id)

        return idEncontrado;

    } */

/*  getNextId = async () => {
 
         const nuevoId = await this.getProducts();
 
         const count = nuevoId.length
 
         return (count > 0) ? nuevoId[count - 1].id + 1 : 1
 
 
     } */


/*  addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {
 
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
 
} */


/*checkCode = async (productCode) => {
 
   const codeDuplicado = await this.getProducts()
 
   const checkCode = codeDuplicado.some( (product) => product.code === productCode)
 
   return checkCode
 
} */


/*updateProduct = async (id, dataAct ) => {
    
        const products = await this.getProducts()
    
        const productIndex = products.findIndex((product) => product.id === id)
    
        if (productIndex === -1) {
    
            throw new NotFoundError ('El id solcitado no ha sido encontrado')
    }
    
    const buscarProducto = products[productIndex]
    
    products[productIndex] = {...buscarProducto , ...dataAct}
    
    await this.#write(products);
    
        return products[productIndex]
    
    
    
    } */

/*deleteProduct = async (id) => {

    const products = await this.getProducts()

    const productIndex = products.findIndex((product) => product.id === id)

    if (productIndex === -1) {

        throw new NotFoundError ('Producto no encontrado')
}

const deleteProducts = products.splice(productIndex, 1)

await this.#write(products);

return deleteProducts[0]


  // const buscarProducto = db.filter ((product) => product.id !== id) 

    
} */