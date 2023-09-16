const { Router } = require("express");
const lightColors = require("../lightModes.js");
const { sendMessage } = require("../utilities/sendMessage.js")

const router = Router();

router.post('/setColor', async (req, res) => {
    const { color } = req.query;
    const { r, g, b, a, ip } = req.body;
    try {
        if (!ip) throw new Error;
        if (!color && !(r >= 0 && g >= 0 && b >= 0) && !(a >= 0)) {
            throw new Error;
        }
        if (a) {
            let colorRGB = JSON.stringify({ method: "setPilot", params: { state: true, r, g, b, dimming: a } });
            sendMessage(colorRGB, ip);
            res.sendStatus(200);
        }
        if (r >= 0 && g >= 0 && b >= 0) {
            let colorRGB = JSON.stringify({ method: "setPilot", params: { state: true, r, g, b } });
            sendMessage(colorRGB, ip);
            res.sendStatus(200);
        }
        if (color) {
            sendMessage(lightColors[color], ip);
            res.sendStatus(200);
        }
    } catch (e) {
        res.sendStatus(400);
    }
})

module.exports = router;
