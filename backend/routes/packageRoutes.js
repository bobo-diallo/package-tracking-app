const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');


router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackage);
router.post('/', packageController.createPackage);
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;
