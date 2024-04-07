const Delivery = require('../models/delivery');
const DeliveryDTO = require('../models/DTO/DeliveryDTO');
const eventEmitter = require('../events/eventHandler');
// const eventEmitter = new EventEmitter();

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.getAllDeliveries = (req, res, next) => {
    Delivery.find()
        .then(deliveries => {
            res.status(200).json(DeliveryDTO.fromArray(deliveries));
        }).catch(error => {
            res.status(400).json({error});
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
        delivery_id: req.params.id
    })
        .then(delivery => {
            if (!delivery) {
                return res.status(404).json({message: 'Delivery not found'});
            }
            res.status(200).json(DeliveryDTO.fromDeliverySchema(delivery));
        })
        .catch(error => {
            res.status(400).json({error});
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
        delivery_id: req.body.delivery_id,
        package_id: req.body.package_id,
        pickup_time: req.body.pickup_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: req.body.location,
        status: req.body.status
    });

    delivery.save()
        .then((delivery) => {
            res.status(201).json({
                message: 'Delivery created successfully',
                delivery: DeliveryDTO.fromDeliverySchema(delivery)
            });
        })
        .catch(error => {
            res.status(400).json({error});
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
    Delivery.updateOne({
        delivery_id: req.params.id
    }, {
        $set: delivery
    })
        .then( () => {
            if (delivery.status) {
                eventEmitter.emit('status_changed', {delivery_id: req.params.id, status: delivery.status});
            }

            res.status(200).json({message: 'Delivery updated successfully'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.deleteDelivery = (req, res, next) => {
    Delivery.deleteOne({delivery_id: req.params.id})
        .then(() => {
            res.status(200).json({message: 'Delivery deleted successfully'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
}
