const routes = require("../routes"),
    express = require("express"),
    cors = require("cors");

module.exports = function (app) {
    // adding middleware to request process pipeline
    // cross - origin resource sharing
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1/devicetype", routes.deviceTypeRouter);
    // app.use("/api/v1/device", routes.deviceRouter);
    app.use("*", routes.homeRouter);
}