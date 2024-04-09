const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
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
    to_location: {lat: Number, lng: Number},
    active_delivery_id:{
        type: String,
        default: null
    }
}, { toJSON: { virtuals: true } });

packageSchema.virtual('package_id').get(function() {
    return this._id;
});
module.exports = mongoose.model('Package', packageSchema);
