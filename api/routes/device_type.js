const router = require('express').Router(),
    winston = require("winston");

let DeviceType = require('../models/device_type.model');

// get all information of all supported device
router.route('/').get((req, res) => {
    DeviceType.find().select({ action: 1 })
        .then(deviceTypes => res.json({ code: 200, details: deviceTypes }))
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// add new device type
router.route('/').post((req, res) => {
    const _id = req.body.type;
    const action = req.body.action;

    const newDeviceType = new DeviceType({
        _id,
        action
    });

    newDeviceType.save()
        .then((data) => res.json({ code: 201, id: data._id, message: `Device type is created` }))
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ code: 400, message: "Device type already exists" })
            }
            winston.error(err)
            res.status(400).json({ code: 400, message: 'Unknown Error' })
        });
});

// get specific device information by passing device type
router.route("/:type").get((req, res) => {
    DeviceType.findById(req.params.type).select({ action: 1 })
        .then(deviceType => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "Device type is not found" }) }
            res.json({ code: 200, details: deviceType });
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// delete supported device by passing device type
router.route("/:type").delete((req, res) => {
    DeviceType.findByIdAndDelete(req.params.type)
        .then((deviceType) => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "Device type is not found" }) }
            res.json({ code: 200, message: "Device type is deleted." })
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// update supported device by passing device type
router.route("/:type").put((req, res) => {
    DeviceType.findById(req.params.type)
        .then(deviceType => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "Device type is not found" }) }

            deviceType.action = req.body.action;
            deviceType.save()
                .then(() => res.json({ code: 200, message: "Device type updated" }))
                .catch(err => res.status(400).json({ code: 400, message: err }));
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

module.exports = router;