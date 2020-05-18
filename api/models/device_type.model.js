const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceTypeSchema = new Schema({
    _id: { type: String, required: true },
    action: [{ type: String, required: true }],
}, { _id: false });

const DeviceType = mongoose.model('DeviceType', deviceTypeSchema);

module.exports = DeviceType;