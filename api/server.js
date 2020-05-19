const express = require("express")

require("dotenv").config();

const app = express()
require("./startup/logging")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})