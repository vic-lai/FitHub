const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();

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

app.use(express.json());

app.post('/createprogram',(req,res)=> {
    data = req.body.data
    console.log(data.weeks[0].days[0].exercises[0].exercise)
    res.send('received post request')
})


app.listen(3300, () => {
    console.log("Server is now listening on port 3300");
});