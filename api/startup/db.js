const mongoose = require("mongoose"),
    winston = require("winston");

module.exports = function () {
    // connect to mongodb
    const dbConnectionUrl = process.env.DB_URI;
    mongoose
        .connect(dbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info("Connected to Database"))
        .catch(err => winston.error("Cannot connect to db !!"));


}