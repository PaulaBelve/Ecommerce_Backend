import { connect, set } from "mongoose";
import credentials from "../config/credentials.js"


export default class MongoConnection {
    static #instance;

    constructor() {
        set("strictQuery", false);
        connect(credentials.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: credentials.DB_NAME,
        });
    }

    static getInstance = () => {
        if (this.#instance) {
            console.log("Already connected to MongoDB");

            return this.#instance;
        }

        this.#instance = new MongoConnection();
        console.log("Connected to MongoDB");

        return this.#instance;
    };
}


// Conexion a DB Mongo Atlas

export const connectDB = async () => {
    try {
        set("strictQuery", false);
        await connect("mongodb+srv://Delfos:8Q1KqRE6Yj8Bo2fz@cluster0.8q2zhr1.mongodb.net/?retryWrites=true&w=majority", { dbName: "Ecommerce" });

        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
};



