require('dotenv').config();
const dgram = require('node:dgram');
const { PORT } = process.env;
const { LocalStorage, JSONStorage } = require('node-localstorage')

function searchBulbs() {
    let localStorage = new LocalStorage("./src/localstorage");
    localStorage.clear();
    const message = '{ "method": "getSystemConfig", "params": {} }';
    try {
        const socket = dgram.createSocket("udp4");
        socket.bind(() => {
            socket.setBroadcast(true);
            sendMsg(socket, message);
            socket.on("message", (msg, rinfo) => {
                let resMsg = msg.toString("utf-8");
                localStorage.setItem(rinfo.address, resMsg);
            })
        })
    } catch (e) {

    }
}

function sendMsg(socket, message) {
    let counter = 1;
    const maxTries = 5;
    const delay = 10;

    const interval = setInterval(() => {
        if (counter > maxTries) {
            clearInterval(interval);
            return;
        }
        socket.send(message, PORT, "255.255.255.255")
        counter++;
    }, delay);
}

module.exports = searchBulbs;
