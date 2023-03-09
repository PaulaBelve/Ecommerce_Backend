
import express from "express";
import { authPolicies, authToken } from "../utils/jwt.js";
import { getChatPage } from "../controllers/messages.controller.js";

//Uso el router con express x ser un solo middlewear

// SE QUEDA CARGANDO EN UN LUP INFINITO

const Router = express.Router();

Router.get("/", authToken, authPolicies("USER"), getChatPage);

export default Router;