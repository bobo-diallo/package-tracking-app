const {mongoose} = require('mongoose');
const PackageDTO = require('./packageDTO');

class DeliveryDTO {
    constructor(
        delivery_id,
        current_package,
        pickup_time,
        start_time,
        end_time,
        location,
        status
    ) {
        this.delivery_id = delivery_id;
        this.current_package = current_package;
        this.pickup_time = pickup_time;
        this.start_time = start_time;
        this.end_time = end_time;
        this.location = location;
        this.status = status;
    }

    static fromDeliverySchema(deliverySchema) {
        let currentPackage = null;

        if (deliverySchema.package_id) {
            currentPackage = (deliverySchema.package_id instanceof mongoose.Types.ObjectId) ?
                deliverySchema.package_id :
                PackageDTO.fromPackageSchema(deliverySchema.package_id);
        }

        try {
            return new DeliveryDTO(
                deliverySchema.delivery_id,
                currentPackage,
                deliverySchema.pickup_time,
                deliverySchema.start_time,
                deliverySchema.end_time,
                deliverySchema.location,
                deliverySchema.status
            );
        } catch (e) {
            throw new Error('Invalid deliverySchema');
        }
    }

    static fromArray(deliveries) {
        return deliveries.map(deliverySchema => DeliveryDTO.fromDeliverySchema(deliverySchema));
    }
}

module.exports = DeliveryDTO;
