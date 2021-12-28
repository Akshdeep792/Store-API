const express = require("express");
const router = express.Router();

const {getAllproductStatic, getAllproduct} = require('../controllers/products');


router.route('/').get(getAllproduct);
router.route('/static').get(getAllproductStatic);

module.exports = router