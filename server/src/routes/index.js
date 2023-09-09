const { Router } = require('express');
const router = Router();
const setColor = require("../controllers/setColor");
const getBulbData = require("../controllers/getBulbData");
const searchBulbs = require('../utilities/searchBulbs');
const { LocalStorage, JSONStorage } = require('node-localstorage')

searchBulbs()

router.use("/", setColor);
router.use("/", getBulbData);


module.exports = router;