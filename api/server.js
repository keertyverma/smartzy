const express = require("express"),
    cors = require("cors");

require("dotenv").config();

const app = express()
require("./startup/logging")(app);
require("./startup/db")();

const port = process.env.PORT || 5000

// cross - origin resource sharing
app.use(cors());
app.use(express.json())

app.use("/", function (req, res) {
    res.send("Hi");
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})