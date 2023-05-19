import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailDeletePremium {

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


    sendDeletePremium = async (user, subject, text) => {
        const result = await this.transport.sendMail({
            from: process.env.NODE_EMAIL,
            to: user,
            subject,
            text,


        });

        console.log(result)

        return result;
    }

}

const sendMailDeletePremium = new MailDeletePremium();

export default sendMailDeletePremium;