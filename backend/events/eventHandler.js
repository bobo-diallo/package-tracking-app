const EventEmitter = require('events');
const Delivery = require('../models/delivery');
const DeliveryDTO = require('../models/DTO/deliveryDTO');
const eventEmitter = new EventEmitter();

/**
 * Update a delivery
 * @param delivery_id
 * @param toUpdate
 */
const updateDelivery = (delivery_id, toUpdate) => {
    Delivery.findByIdAndUpdate(delivery_id, toUpdate, { new: true })
        .populate({
            path: 'package_id',
            model: 'Package'
        })
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
 * Update the location of a delivery from the event data
 */
eventEmitter.on('location_update', eventData => {
    const {delivery_id, location} = eventData;
    Delivery.findOneAndUpdate({_id: delivery_id}, {$set: {location: location}})
        .then(() => {
            console.log('Location updated successfully::::');
        })
        .catch(error => {
           console.error('Error updating delivery location:', error);
        });
});

/**
 * Update properties {pickup_time, start_time, end_time} of a delivery if status changes
 */
eventEmitter.on('status_updated', eventData => {
    console.log('Status changed event received:', eventData);

    const {delivery_id, status} = eventData;

    switch (status) {
        case 'picked-up':
            updateDelivery(delivery_id, {status: status, pickup_time: Date.now()})
            break;
        case 'in-transit':
            updateDelivery(delivery_id, {status: status, start_time: Date.now()});
            break;
        case 'delivered':
        case 'failed':
            updateDelivery(delivery_id, {status: status, end_time: Date.now()});
            break;
        default:
            console.error('Invalid status:', status);
            break;
    }
});

module.exports = eventEmitter;
