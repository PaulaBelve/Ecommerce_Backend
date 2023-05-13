import MyRouter from "./router.js"
import ViewsController from "../controllers/views.controllers.js";
import cartControllers from "../controllers/carts.controllers.js";
import { passportCall } from "../utils/jwt.js";


const viewsController = new ViewsController();
const cartsController = new cartControllers();


export default class ViewsRouter extends MyRouter {

    init() {


        // Vista de los productos

        this.get('/product', passportCall('jwt'), viewsController.viewsProducts)


        // Product Detail

        this.get('/product/:pid', passportCall('jwt'), viewsController.viewProductDetail)

        // Vista del carrito carrito

        this.get('/cart/:cid', viewsController.getCartPage)

        // Ticket
        // Manda el ticket pero no toma el fetch

        this.post("/cart/:cid/purchase", cartsController.purchaseCart);

        // Vista Admin - VISTA SOLO PARA EL ADMINISTRADOR

        this.get('/admin', viewsController.viewsAdmin)

    }
}



