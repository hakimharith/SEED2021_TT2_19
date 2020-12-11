const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

const db = require("./models");

db.sequelize.sync()

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//Include routes here
require("./routes/auth.routes")(app);
require("./routes/homepage.routes")(app);
require("./routes/services.routes")(app);

app.get("/", (req, res) => {
    res.send("Express connection success")
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
});