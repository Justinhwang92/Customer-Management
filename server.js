const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get database config
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
// connect to mysql database
connection.connect();

// using multer library, the image file name is prevented duplicates
const multer = require("multer");
// save the image to the destination
const upload = multer({ dest: "./upload" });

// get
app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// usres can access the image that uploded in the upload directory in the image directory
// showing the directory as image, but real paht is uplodad (blocking user to see the real path)
app.use("/image", express.static("./upload"));

// save user submitted information to the database
app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, now(), 0)"; // first one is id that automatically icreased

  // get the values
  let image = "/image/" + req.file.filename; // get the image path and name of the file
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;

  // binding values
  let params = [image, name, email, phone];

  // sending the values
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  // let database know this id is deleted
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
