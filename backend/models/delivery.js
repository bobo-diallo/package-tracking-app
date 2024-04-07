const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const deliverySchema = mongoose.Schema({
    delivery_id: {type: Number, unique: true},
    package_id: {type: Number, required: true},
    pickup_time: Date,
    start_time: Date,
    end_time: Date,
    location: {lat: Number, lng: Number},
    status: {type: String, enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'], default: 'open'}
});


deliverySchema.plugin(AutoIncrement, {inc_field: 'delivery_id'});
module.exports = mongoose.model('Delivery', deliverySchema);
