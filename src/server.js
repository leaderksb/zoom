// BE
import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

// 앱의 뷰 엔진으로 Pug 사용
app.set("view engine", "pug");
// 뷰 파일이 있는 디렉토리 설정
// __dirname은 현재 스크립트 파일의 디렉토리
app.set("views", __dirname + "/views");
// /public 하위로 들어오는 요청에 대해 제공할 정적 파일의 주소 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// / URL 접근 시 home 뷰를 랜더링
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
// HTTP Server 위에 WebSocket Server를 만듦
const wss = new WebSocket.Server({ server });

// socket 변수에는 클라이언트와의 WebSocket 연결에 대한 정보가 담김
wss.on("connection", (socket) => {
    // console.log(socket);
    console.log("Connected to Browser V");
    socket.on("close", () => {
        console.log("Disconnected from the Browser X");
    });
    // 수신된 데이터를 버퍼에서 문자열로 변환하여 출력하는 코드
    socket.on("message", (message) => {
        const decodedMessage = message.toString(); // 버퍼를 문자열로 변환
        console.log(decodedMessage);
    });
    socket.send("Hello!");
    socket.send("Good!");
});

// PORT 3000번에서 HTTP, WS 2개의 프로토콜 처리 가능
server.listen(3000, handleListen);
