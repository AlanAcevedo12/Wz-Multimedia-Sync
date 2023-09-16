require('dotenv').config();
const dgram = require('node:dgram');
const { PORT, BULB_IP } = process.env;

function sendMessage(message, ip) {
    // console.log(message)
    const socket = dgram.createSocket("udp4");
    let recivedMessage;
    try{
        socket.bind(
            () => {
                socket.setBroadcast(true)
                socket.send(message, PORT, ip)
                socket.on("message", (msg, rinfo) => {
                    recivedMessage = JSON.parse(msg.toString("utf-8"));
                })
            }
        )
    }catch(e){
        console.log(e);
    }
}

module.exports = { sendMessage };