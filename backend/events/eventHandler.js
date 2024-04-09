const EventEmitter = require('events');
const Delivery = require('../models/delivery');
const DeliveryDTO = require('../models/DTO/deliveryDTO');
const eventEmitter = new EventEmitter();


const updateDelivery = (delivery_id, toUpdate) => {
    Delivery.findByIdAndUpdate(delivery_id, toUpdate, { new: true })
        .then( (updatedDelivery) => {

            eventEmitter.emit('delivery_updated', {
                delivery_id: delivery_id,
                data: DeliveryDTO.fromDeliverySchema(updatedDelivery)
            });
        })
        .catch(error => {
            console.log('Failed to update delivery', error);
        });
}

/**
 * Update the location of a delivery if package's location changes
 */
eventEmitter.on('location_changed', eventData => {
    console.log('Location changed event received:', eventData);

    const {delivery_id, location} = eventData;
    try {
        updateDelivery(delivery_id, {location: location});
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
            updateDelivery(delivery_id, {pickup_time: Date.now()})
            break;
        case 'in-transit':
            updateDelivery(delivery_id, {start_time: Date.now()});
            break;
        case 'delivered':
        case 'failed':
            updateDelivery(delivery_id, {end_time: Date.now()});
            break;
        default:
            console.error('Invalid status:', status);
            break;
    }
});

module.exports = eventEmitter;
