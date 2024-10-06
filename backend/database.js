require('dotenv').config();
const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PGPASSWORD,
    database: "fithub"
})

module.exports = client
