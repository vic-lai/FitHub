require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('FitHub', 'postgres', process.env.PGPASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});


module.exports = sequelize;
