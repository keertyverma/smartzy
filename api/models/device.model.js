const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
}, { _id: false });

const Device = mongoose.model('Device', deviceSchema, "device");

module.exports = Device;