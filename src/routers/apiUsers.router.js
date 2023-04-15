import express from "express"
import UsersController from "../controllers/users.controllers.js"

const usersController = new UsersController()

const Router = express.Router();

Router.get("/", usersController.getAllUser)

Router.get("/premium/:uid", usersController.changeUserRole)

export default Router;