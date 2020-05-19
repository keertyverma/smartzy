const router = require('express').Router(),
    winston = require("winston");

let DeviceType = require('../models/device_type.model');
let Device = require('../models/device.model');

// get all information of all paired device
router.route('/').get((req, res) => {
    Device.find().select({ __v: 0 })
        .then(device => res.json({ code: 200, details: device }))
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// pair new device
router.route('/').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const _id = req.body.mac;

    // check if device type is supported
    DeviceType.findById(type).select({ action: 1 })
        .then(deviceTypeInfo => {
            if (!deviceTypeInfo) { return res.status(404).json({ code: 404, message: "Device type is not supported" }) }

            // pair device
            const newDevice = new Device({
                name,
                type,
                _id
            });

            newDevice.save()
                .then((data) => res.json({ code: 201, id: data._id, message: `Device is paired or configured` }))
                .catch(err => {
                    if (err.code === 11000) {
                        return res.status(400).json({ code: 400, message: "Device is already paired" })
                    }
                    winston.error(err)
                    res.status(400).json({ code: 400, message: 'Unknown Error ' })
                });
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// get information of paired device by passing ID
router.route("/:id").get((req, res) => {
    Device.findById(req.params.id).select({ __v: 0 })
        .then(device => {
            if (!device) { return res.status(404).json({ code: 404, message: "Device ID is not found" }) }
            res.json({ code: 200, details: device });
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// delete paired device by passing ID
router.route("/:id").delete((req, res) => {
    Device.findByIdAndDelete(req.params.id)
        .then((device) => {
            if (!device) { return res.status(404).json({ code: 404, message: "Device ID is not found" }) }
            res.json({ code: 200, message: "device type is deleted." })
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// update paired device by passing ID
router.route("/:id").put((req, res) => {
    Device.findById(req.params.id)
        .then(device => {
            if (!device) { return res.status(404).json({ code: 404, message: "Device ID is not found" }) }

            device.name = req.body.name;
            device.save()
                .then(() => res.json({ code: 200, message: "device is updated" }))
                .catch(err => res.status(400).json({ code: 400, message: err }));
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// perfom supported action or operatin on paired devices
router.route('/:id/action').post((req, res) => {
    // check if id is paired
    Device.findById(req.params.id).select({ __v: 0 })
        .then(device => {
            if (!device) { return res.status(404).json({ code: 404, message: "Device ID is not found" }) }
            const deviceType = device.type

            // get device information by type
            DeviceType.findById(deviceType).select({ action: 1 })
                .then(deviceTypeInfo => {
                    // check if action is supported
                    if (deviceTypeInfo.action.includes(req.body.action)) {
                        // perform action on device
                        const action = req.body.action.toUpperCase();
                        const message = `Performed "${action}" action on device with ID ${req.params.id}`
                        res.status(200).json({ code: 200, details: { message: message.replace(/"/g, '\''), timestamp: new Date().toUTCString() } })
                    }
                    else {
                        return res.status(400).json({ code: 404, message: "Action is not supported" });
                    }
                })
                .catch(err => res.status(400).json({ code: 400, message: err }));
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

module.exports = router;