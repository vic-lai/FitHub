const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(cors());
app.use(express.json());
client.connect();

app.get('/workoutprograms', (req, res) => {
    client.query('SELECT * FROM workout_programs', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log("getting all workout programs")
        res.status(200).json(result.rows);
    });
});


app.get('/workoutprograms/:p_id', (req, res) => {
    const p_id = req.params.p_id;
    const query = `
        SELECT week_number, day_number, exercise, num_sets, reps
        FROM program_details WHERE p_id=$1
    `;
    client.query(query, [p_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result.rows)
            res.status(200).json(result.rows)
        }
    });
});


app.post('/createprogram', async (req,res)=> {
    try {
        const { title, p_type, num_weeks, days, weeks, name} = req.body.data
        await client.query('BEGIN');
        const result = await client.query(
          'INSERT INTO workout_programs (title, p_type, author, num_weeks, days_per_week) VALUES ($1, $2, $3, $4, $5) RETURNING p_id',
          [title, p_type, name, num_weeks, days]
        );
        const p_id = result.rows[0].p_id
        const query = `INSERT INTO program_details (p_id,week_number,day_number,exercise,num_sets,reps) VALUES ($1, $2, $3, $4, $5, $6)`
        weeks.forEach((week,week_index) => {
            week.days.forEach((day,day_index)=> {
                day.exercises.forEach((exercise, exercise_index)=> {
                    client.query(query,[p_id,week_index+1,day_index+1,exercise.exercise,exercise.num_sets,exercise.reps])
                })
            })
        })
        await client.query('COMMIT')
        res.status(200).json('inserted into database')
    }catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting workout program:', err);
        res.status(500).json({ error: 'Failed to create workout program' });
      }
})

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


app.listen(3300, () => {
    console.log("Server is now listening on port 3300");
});