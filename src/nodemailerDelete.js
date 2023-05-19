import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailDelete {

    constructor() {


        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {

                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD,
            },

        });

    }


    sendDelete = async (email, subject, text) => {
        const result = await this.transport.sendMail({
            from: process.env.NODE_EMAIL,
            to: email,
            subject,
            text,
            /*subject: 'Caducidad de la cuenta',*/
            html: `
            <div> 
           
            <p>Su cuenta de Delfos Cocina ha caducado, ingrese al siguiente link para crear una cuenta nueva</p>
           
           <p><a href="http://localhost:8080/register">http://localhost:8080/register</a></p>
            
            </div>
            
            `,
        });

        console.log(result)

        return result;
    }

}

const sendMailDelete = new MailDelete();

export default sendMailDelete;

