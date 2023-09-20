const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '150120',
  database: 'shopbangiayuimy'
})

module.exports = connection;