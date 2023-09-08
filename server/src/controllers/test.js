const { Router } = require("express");
const lightColors = require("../lightModes.js");
const { sendMessage } = require("../utilities/sendMessage.js")

const router = Router();

router.post('/setColor', async (req, res) => {
    var response;
    const { color } = req.query;
    const { r, g, b, a, ip } = req.body;
    console.log(a, ip)
    if(!ip) res.status(400);
    if (req.body) {
        let color
        if (a) {
            color = JSON.stringify({ method: "setPilot", params: { state: true, r, g, b, dimming: a } });
        } else {     
            color = JSON.stringify({ method: "setPilot", params: { state: true, r, g, b } });   
        }
        response = sendMessage(color, ip);
    }
    if (color) {
        // console.log(color);
        response = sendMessage(lightColors[color], ip);
    }
    res.status(200).send(response);
})

module.exports = router;
