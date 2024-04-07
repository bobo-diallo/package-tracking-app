class DeliveryDTO {
    constructor(
        delivery_id,
        package_id,
        pickup_time,
        start_time,
        end_time,
        location,
        status
    ) {
        this.delivery_id = delivery_id;
        this.package_id = package_id;
        this.pickup_time = pickup_time;
        this.start_time = start_time;
        this.end_time = end_time;
        this.location = location;
        this.status = status;
    }

    static fromDeliverySchema(deliverySchema) {
        try {
            return new DeliveryDTO(
                deliverySchema.delivery_id,
                deliverySchema.package_id,
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
