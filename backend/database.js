require('dotenv').config();
const {Client} = require('pg')

const client = new Client({
    host: "localHost",
    user: "postgres",
    port: 5432,
    password: process.env.PGPASSWORD,
    database: "FitHub"
})

module.exports = client
