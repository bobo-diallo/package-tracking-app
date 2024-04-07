const Package = require('../models/package');
const PackageDTO = require('../models/DTO/PackageDTO');
const eventEmitter = require('../events/eventHandler');

/**
 * Get all packages
 * @param req
 * @param res
 * @param next
 */
module.exports.getAllPackages = (req, res, next) => {
    Package.find()
        .then(packages => {
            res.status(200).json(PackageDTO.fromArray(packages));
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

/**
 * Get a single package
 * @param req
 * @param res
 * @param next
 */
module.exports.getPackage = (req, res, next) => {
    Package.findOne({
        package_id: req.params.id
    })
        .then(package => {
            if (!package) {
                return res.status(404).json({message: 'Package not found'});
            }
            res.status(200).json(PackageDTO.fromPackageSchema(package));
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

/**
 * Create a package
 * @param req
 * @param res
 * @param next
 */
module.exports.createPackage = (req, res, next) => {
    const newPackage = new Package({
        description: req.body.description,
        active_delivery_id: req.body.active_delivery_id,
        weight: req.body.weight,
        width: req.body.width,
        height: req.body.height,
        depth: req.body.depth,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
        from_location: req.body.from_location,
        to_name: req.body.to_name,
        to_address: req.body.to_address,
        to_location: req.body.to_location
    });

    newPackage.save()
        .then((package) => {
            res.status(201).json({
                message: 'Package created successfully',
                package: PackageDTO.fromPackageSchema(package)
            });
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

/**
 * Update a package
 * @param req
 * @param res
 * @param next
 */
module.exports.updatePackage = (req, res, next) => {
    const package = req.body;
    Package.findOneAndUpdate({
        package_id: req.params.id
    }, {
        $set: package
    }, {new: true})
        .then((packageUpdated) => {
            if (package.to_location && packageUpdated.active_delivery_id) {
                eventEmitter.emit('location_changed', {
                    delivery_id: packageUpdated.active_delivery_id,
                    location: package.to_location
                });
            }

            res.status(200).json({message: 'Package updated successfully'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

/**
 * Delete a package
 * @param req
 * @param res
 * @param next
 */
module.exports.deletePackage = (req, res, next) => {
    Package.deleteOne({package_id: req.params.id})
        .then(() => {
            res.status(200).json({message: 'Package deleted successfully'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
}
