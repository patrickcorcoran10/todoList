const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
let PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");

require("./routes/api-routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("We are Doing a TO DO on Port: ", PORT);
  });
});
