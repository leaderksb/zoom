// FE
const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open", () => {
    console.log("Connected to Browser V");
})
socket.addEventListener("message", (message) => {
    console.log("New Message: ", message.data);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from the Server X");
})

// 전송할 데이터를 문자열로 변환하여 전송하는 코드
setTimeout(() => {
    socket.send("Hello from the browser!");
}, 10000);