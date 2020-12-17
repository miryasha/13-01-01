// Dependencies
const express = require("express");
const mysql = require("mysql");

// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dbpassword",
  database: "wizard_schools_db"
});



// Routes
app.get("/", function(req, res) {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM schools", function(err, result) {
    if (err) throw err;
    const html = /*html*/`
      <h1> Magical Schools </h1>
      <ul>
      ${
        result.map(school => {
          const {id, name} = school;
          return /*html*/`
            <li>
              <p> ID: ${id} </p>
              <p> School: ${name} </p>
            </li>
          `
        }).join("")
      }
      </ul>
    `
    res.send(html);
  });
});

// Initiate MySQL Connection and start the webserver listening
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  
  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});

