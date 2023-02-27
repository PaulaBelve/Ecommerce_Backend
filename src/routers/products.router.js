import MyRouter from "./router.js"
import ProductsController from "../controllers/products.controllers.js";

const productsController = new ProductsController();

export default class ProductsRouter extends MyRouter {

    init() {

        // Ver productos

        this.get('/', productsController.getAllProductsCtr);

        // Traer un solo producto por id

        this.get('/:pid', productsController.getProductByIdCtr);

        // Agregar un producto

        this.post('/', productsController.addNewProductCtr);


        // Actualizar un producto

        this.put('/:pid', productsController.updateProductCtr);

        // Eliminar un producto

        this.delete('/:pid', productsController.deleteProductCtr);

    }
}








