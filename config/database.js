const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2#051106&Ibra',
  database: 'db_express_api',
});

connection.connect((error) => {
  if (error) {
    console.log('Database connection failed:', error.message);
  } else {
    console.log('Connection successfully established!');
  }
});

module.exports = connection;
