const mysql = require("mysql2");

//Create a new MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "bmo_project",
});

//Connect to MySQL database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database: ", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;
