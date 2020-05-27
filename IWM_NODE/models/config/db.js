let mysql      = require('mysql2');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'node_iwm_test',
  port: 8889
});

connection.connect();

module.exports = connection