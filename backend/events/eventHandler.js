const EventEmitter = require('events');
const Delivery = require('../models/delivery');
const eventEmitter = new EventEmitter();


/**
 * Update the location of a delivery if package's location changes
 */
eventEmitter.on('location_changed', eventData => {
    console.log('Location changed event received:', eventData);

    const {delivery_id, location} = eventData;
    try {
        Delivery.findOneAndUpdate({delivery_id}, {location: location}).exec();
    } catch (error) {
        console.error('Error updating delivery location:', error);
    }
});

/**
 * Update properties {pickup_time, start_time, end_time} of a delivery if status changes
 */
eventEmitter.on('status_changed', eventData => {
    console.log('Status changed event received:', eventData);

    const {delivery_id, status} = eventData;

    switch (status) {
        case 'picked-up':
            Delivery.findOneAndUpdate({delivery_id}, {pickup_time: Date.now()});
            break;
        case 'in-transit':
            Delivery.findOneAndUpdate({delivery_id}, {start_time: Date.now()});
            break;
        case 'delivered':
        case 'failed':
            Delivery.findOneAndUpdate({delivery_id}, {end_time: Date.now()});
            break;
        default:
            console.error('Invalid status:', status);
            break;

    }
});

module.exports = eventEmitter;
