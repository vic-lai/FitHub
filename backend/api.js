const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./middleware/authMiddleware')
require('dotenv').config();

const allowedOrigins = ['https://fithubprograms.xyz','http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));



app.use(express.json());
app.use(cookieParser());
client.connect();
app.use(express.static(path.join(__dirname, '../build')));

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(3300, () => {
    console.log("Server is now listening on port 3300");
});