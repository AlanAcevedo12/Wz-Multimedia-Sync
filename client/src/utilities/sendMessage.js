import axios from "axios";

export function sendMessagesColor(message, ip) {
  // axios.post("http://localhost:3001/setColor?color=" + message);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3001/setColor?color=' + message);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify({ip}));
}

export function sendMessagesRGB(data) {
  // axios.post("http://localhost:3001/setColor", color);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3001/setColor');
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  console.log(data)
  xhr.send(JSON.stringify(data));
}
