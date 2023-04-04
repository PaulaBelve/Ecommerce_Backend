import nodemailer from "nodemailer";

class MailManager {

    constructor() {


        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {

                user: "pau.belve@gmail.com",
                pass: "123456789",
            },

        })

    }
}

const sendMail = new MailManager();


export default sendMail;