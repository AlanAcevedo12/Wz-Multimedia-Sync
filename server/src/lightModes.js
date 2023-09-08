
const msgGet = JSON.stringify({ method: "getPilot"});

const coldWhite = JSON.stringify({
  "method": "setPilot",
  "params": {
      "state": true,
      "sceneId": 13,
      "dimming": 100
    }
  });

  const warmWhite = JSON.stringify({
    "method": "setPilot",
    "params": {
        "state": true,
        "sceneId": 11,
        "dimming": 100
      }
    });

  const red = JSON.stringify({method: "setPilot", params:{state: true, r: 255}});

  const green = JSON.stringify({method: "setPilot", params:{state: true, g: 255}});

  const blue = JSON.stringify({method: "setPilot", params:{state: true, b: 255}});

  const yellow = JSON.stringify({method: "setPilot", params:{state: true, r: 240, g: 210, b: 2}})
  
  const pink = JSON.stringify({method: "setPilot", params:{state: true, r: 255, g: 50, b: 50}})

  const orange = JSON.stringify({method: "setPilot", params:{state: true, r: 255, g: 70, b: 0}})

  const purple = JSON.stringify({method: "setPilot", params:{state: true, r: 170, g: 0, b: 255}})

  const aqua = JSON.stringify({method: "setPilot", params:{state: true, r: 0, g: 255, b: 255}})
  
  module.exports = {msgGet, coldWhite, warmWhite, red, green, blue, yellow, pink, orange, purple, aqua}