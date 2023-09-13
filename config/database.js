
require('dotenv').config()
const mysql = require('mysql2');

// Create MySQL connection
const connection = mysql.createConnection({  
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    multipleStatements:false
});

//Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;