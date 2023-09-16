export function sendMessagesColor(message, ip) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/setColor?color=' + message);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({ ip }));
  } catch (e) {
    console.log(e);
  }
}

export function sendMessagesRGB(data) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/setColor');
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    console.log(data)
    xhr.send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}
