const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    pickup_time: Date,
    start_time: Date,
    end_time: Date,
    location: {lat: Number, lng: Number},
    status: {type: String, enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'], default: 'open'},
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }
}, { toJSON: { virtuals: true } });

deliverySchema.virtual('delivery_id').get(function() {
    return this._id;
});
module.exports = mongoose.model('Delivery', deliverySchema);
