const router = require('express').Router(),
    mongoose = require('mongoose'),
    winston = require("winston");

let DeviceType = require('../models/device_type.model');

router.route('/').get((req, res) => {
    DeviceType.find().select({ action: 1 })
        .then(deviceTypes => res.json({ code: 200, details: deviceTypes }))
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

router.route('/').post((req, res) => {
    const _id = req.body.type;
    const action = req.body.action;

    const newDeviceType = new DeviceType({
        _id,
        action
    });

    newDeviceType.save()
        .then((data) => res.json({ code: 201, id: data._id, message: `Device type is created!` }))
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ code: 400, message: "Device type already exists" })
            }
            winston.error(err)
            res.status(400).json({ code: 400, message: 'Unknown Error !!!' })
        });
});

// get by device type
router.route("/:type").get((req, res) => {
    DeviceType.findById(req.params.type).select({ action: 1 })
        .then(deviceType => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "device type is not found!!" }) }
            res.json({ code: 200, details: deviceType });
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// delete by device type
router.route("/:type").delete((req, res) => {
    // try {
    //     const id = mongoose.Types.ObjectId(req.params.id);
    // }
    // catch (err) {
    //     return res.status(404).json({ code: 404, message: "device type ID is not found!!" })
    // }

    DeviceType.findByIdAndDelete(req.params.type)
        .then((deviceType) => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "device type is not found!!" }) }
            res.json({ code: 200, message: "device type is deleted." })
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

// update by device type
router.route("/:type").put((req, res) => {
    DeviceType.findById(req.params.type)
        .then(deviceType => {
            if (!deviceType) { return res.status(404).json({ code: 404, message: "device type is not found!!" }) }

            deviceType.action = req.body.action;
            deviceType.save()
                .then(() => res.json({ code: 200, message: "device type updated!" }))
                .catch(err => res.status(400).json({ code: 400, message: err }));
        })
        .catch(err => res.status(400).json({ code: 400, message: err }));
});

module.exports = router;