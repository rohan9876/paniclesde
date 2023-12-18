const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const createController = require("./controllers/createController");
const readController = require("./controllers/readController");
const updateController = require("./controllers/updateController");
const deleteController = require("./controllers/deleteController");

const app = express();
const port = 8080;
const password = "1UBFNxoifpjhgoya"; 
const conn_str = `mongodb+srv://rohan:1UBFNxoifpjhgoya@cluster0.bxhgu8x.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(conn_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
 
db.once("open", () => {
    console.log("Connected to MongoDB");
  });

app.use("/employees/create", createController);
app.use("/employees/read", readController);
app.use("/employees/update", updateController);
app.use("/employees/delete", deleteController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 