const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

//connect to the backend
const routes = require('./backend/api/routes.js')
app.use("/api/", routes)
//

app.use(logger("dev"));//mestra las peticiones por pantalla
app.use(express.json());//permite enviar json files
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send("test");
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;