const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
client.connect();

app.use(programRoutes);

app.post('/sendEmail', (req,res)=> {
    const {name, email, message} = req.body.data
    console.log(name, email, message)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'laivictor510@gmail.com',
            pass: process.env.GMAILPASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'laivictor510@gmail.com',
        to: 'laivictor510@gmail.com',
        subject: 'Message from FitHub',
        text: "From: "+ name+ "\nEmail: " + email+ "\nMessage: " + message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).json(err)
        }
        else {
            console.log('Email sent' + info.response);
            res.status(200).json('sent email')
        }
    })
})

app.use(authRoutes);


app.listen(3300, () => {
    console.log("Server is now listening on port 3300");
});