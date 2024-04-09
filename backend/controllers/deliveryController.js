const Delivery = require('../models/delivery');
const Package = require('../models/package');
const DeliveryDTO = require('../models/DTO/DeliveryDTO');
const eventEmitter = require('../events/eventHandler');

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.getAllDeliveries = (req, res, next) => {
    Delivery.find()
        .then(deliveries => {
            return res.status(200).json(DeliveryDTO.fromArray(deliveries));
        }).catch(error => {
            return res.status(400).json({error});
        });
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.getDelivery = (req, res, next) => {
    Delivery.findOne({
        _id: req.params.id
    })
        .populate({
            path: 'package_id',
            model: 'Package'
        })
        .then(delivery => {
            if (!delivery) {
                return res.status(404).json({message: 'Delivery not found'});
            }
            return res.status(200).json(DeliveryDTO.fromDeliverySchema(delivery));
        })
        .catch(error => {
            return res.status(400).json({error});
        });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.createDelivery = (req, res, next) => {
    const delivery = new Delivery({
        pickup_time: req.body.pickup_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: req.body.location,
        status: req.body.status,
        package_id: req.body.package_id,
    });

    delivery.save()
        .then((newDelivery) => {
            if (newDelivery.package_id) {
                Package.findByIdAndUpdate(newDelivery.package_id, {active_delivery_id: newDelivery._id}).exec()
            }
            return res.status(201).json({
                message: 'Delivery created successfully',
                delivery: DeliveryDTO.fromDeliverySchema(newDelivery)
            });
        })
        .catch(error => {
            return res.status(400).json({error});
        });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.updateDelivery = (req, res, next) => {
    const delivery = req.body;
    const delivery_id = req.params.id;
    Delivery.findByIdAndUpdate(delivery_id, delivery, { new: true })
        .then( (updatedDelivery) => {
            if (updatedDelivery) {
                if (delivery.status) {
                    eventEmitter.emit('status_updated', {delivery_id: delivery_id, status: delivery.status});
                }

                eventEmitter.emit('delivery_updated', {
                    delivery_id: delivery_id,
                    data: DeliveryDTO.fromDeliverySchema(updatedDelivery)
                });
                return res.status(200).json({message: 'Delivery updated successfully'});
            } else {
                return res.status(404).json({message: 'Delivery not found'});
            }
        })
        .catch(error => {
            return res.status(400).json({error});
        });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.deleteDelivery = (req, res, next) => {
    Delivery.findOneAndDelete({_id: req.params.id})
        .then((delivery) => {
            if (delivery) {
                return res.status(200).json({message: 'Delivery deleted successfully'});
            } else {
                return res.status(404).json({message: 'Delivery not found'});
            }
        })
        .catch(error => {
            return res.status(400).json({error});
        });
}
