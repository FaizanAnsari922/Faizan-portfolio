const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());

app.use(express.json());


// ======================================
// EMAIL SETUP
// ======================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});


// ======================================
// CONTACT ROUTE
// ======================================

app.post("/contact", async (req, res) => {

    // Form se data receive karna

    const {
        name,
        email,
        projectType,
        message
    } = req.body;


    // ==================================
    // BASIC VALIDATION
    // ==================================

    if (!name || !email || !message) {

        return res.status(400).json({
            message: "Please fill all required fields"
        });

    }


    // ==================================
    // EMAIL
    // ==================================

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: `New Contact Form Message - ${projectType}`,

        text: `
Name: ${name}

Email: ${email}

Project Type: ${projectType}

Message:

${message}
        `

    };


    // ==================================
    // SEND EMAIL
    // ==================================

    try {

        await transporter.sendMail(mailOptions);


        res.status(200).json({

            success: true,

            message: "Message sent successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Email could not be sent"

        });

    }

});


// ======================================
// SERVER
// ======================================

module.exports = app;
