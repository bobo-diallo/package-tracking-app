const DeliveryDTO = require('./deliveryDTO');
const {mongoose} = require('mongoose');

class PackageDTO {
    constructor(
        package_id,
        active_delivery,
        description,
        weight,
        width,
        height,
        depth,
        from_name,
        from_address,
        from_location,
        to_name,
        to_address,
        to_location
    ) {
        this.package_id = package_id;
        this.active_delivery = active_delivery;
        this.description = description;
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.from_name = from_name;
        this.from_address = from_address;
        this.from_location = from_location;
        this.to_name = to_name;
        this.to_address = to_address;
        this.to_location = to_location;
    }


    /**
     *
     * @param packageSchema
     * @returns {PackageDTO}
     */
    static fromPackageSchema(packageSchema, deliverySchema = null) {
        const activeDelivery = (deliverySchema) ? DeliveryDTO.fromDeliverySchema(deliverySchema) : null;

        try {
            return new PackageDTO(
                packageSchema._id,
                activeDelivery,
                packageSchema.description,
                packageSchema.weight,
                packageSchema.width,
                packageSchema.height,
                packageSchema.depth,
                packageSchema.from_name,
                packageSchema.from_address,
                packageSchema.from_location,
                packageSchema.to_name,
                packageSchema.to_address,
                packageSchema.to_location
            );
        } catch (e) {
            throw new Error('Invalid packageSchema');
        }
    }

    /**
     *
     * @param packages
     * @returns {*}
     */
    static fromArray(packages) {
        return packages.map(p => {
            return PackageDTO.fromPackageSchema(p);
        });
    }
}

module.exports = PackageDTO;
