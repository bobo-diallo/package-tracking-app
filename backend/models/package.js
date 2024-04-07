const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const packageSchema = mongoose.Schema({
    package_id: {type: Number, unique: true},
    active_delivery_id: {type: Number},
    description: String,
    weight: Number,
    width: Number,
    height: Number,
    depth: Number,
    from_name: String,
    from_address: String,
    from_location: {lat: Number, lng: Number},
    to_name: String,
    to_address: String,
    to_location: {lat: Number, lng: Number}
});

packageSchema.plugin(AutoIncrement, {inc_field: 'package_id'});
module.exports = mongoose.model('Package', packageSchema);
