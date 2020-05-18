const router = require('express').Router(),
    mongoose = require('mongoose'),
    winston = require("winston");

let Device = require('../models/device.model');

router.route('/').get((req, res) => {
    Device.find().select({ __v: 0 })
        .then(device => res.json({ code: 200, details: device }))
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const mac = req.body.mac;
    const ip = req.body.ip;


    const newDevice = new Device({
        name,
        type,
        mac,
        ip
    });

    newDevice.save()
        .then((data) => res.json({ code: 201, id: data._id, message: `Device is configured` }))
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ code: 400, message: "Device is already configured" })
            }
            winston.error(err)
            res.status(400).json({ code: 400, message: 'Unknown Error !!!' })
        });
});

// get by device ID
router.route("/:id").get((req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (err) {
        return res.status(404).json({ code: 404, message: "device ID is not found!!" })
    }

    Device.findById(req.params.id).select({ __v: 0 })
        .then(device => {
            if (!device) { return res.status(404).json({ code: 404, message: "device ID is not found!!" }) }
            res.json({ code: 200, details: device });
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// delete by device ID
router.route("/:id").delete((req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (err) {
        return res.status(404).json({ code: 404, message: "device ID is not found!!" })
    }

    Device.findByIdAndDelete(req.params.id)
        .then((device) => {
            if (!device) { return res.status(404).json({ code: 404, message: "device ID is not found!!" }) }
            res.json({ code: 200, message: "device type is deleted." })
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// update by device ID
router.route("/:id").put((req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (err) {
        return res.status(404).json({ code: 404, message: "device ID is not found!!" })
    }

    Device.findById(req.params.id)
        .then(device => {
            if (!device) { return res.status(404).json({ code: 404, message: "device ID is not found!!" }) }

            device.mac = req.body.mac;
            device.ip = req.body.ip;

            device.save()
                .then(() => res.json({ code: 200, message: "device is updated!" }))
                .catch(err => res.status(400).json({ code: 400, message: err }));
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// Perfom Operatin on devices
router.route('/:id/action').post((req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
    }
    catch (err) {
        return res.status(404).json({ code: 404, message: "device ID is not found!!" })
    }

    const action = req.body.action.toUpperCase();
    const message = `Performed "${action}" action on device with ID ${req.params.id}`
    res.status(200).json({ code: 200, details: { message: message.replace(/"/g, '\'') } })

});

module.exports = router;