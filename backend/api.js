const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();

// Serve static files from the build directory
app.use(cors());
app.use(express.json());
client.connect();

app.get('/workoutprograms', (req, res) => {
    console.log('inside martin')
    client.query('SELECT * FROM workout_programs', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(result.rows)
        res.send(result.rows);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', '../../public/index.html'));
});

app.listen(3300, () => {
    console.log("Server is now listening on port 3000");
});