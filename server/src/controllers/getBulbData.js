const { Router } = require("express");
require('dotenv').config();
const dgram = require('node:dgram');
const { PORT, BULB_IP } = process.env;
const { LocalStorage, JSONStorage } = require('node-localstorage');
const searchBulbs = require("../utilities/searchBulbs");

const router = Router();

router.get('/getBulbs', async (req, res) => {
    try {
        let localStorage = new LocalStorage("./src/localstorage");
        let bulbs = [];
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            bulbs.push({ ip: localStorage.key(i), data: JSON.parse(localStorage.getItem(localStorage.key(i))) });
        }
        // console.log(bulbs);
        res.status(200).send(bulbs);
    } catch (e) {
        res.sendStatus(400);
    }
})


module.exports = router;
