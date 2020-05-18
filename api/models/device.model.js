const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    ip: { type: String, required: true },
    mac: { type: String, required: true },
});

const Device = mongoose.model('Device', deviceSchema, "device");

module.exports = Device;