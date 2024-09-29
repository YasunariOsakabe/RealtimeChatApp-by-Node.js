 const express = require("express");
 const app = express();
 const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
    //__dirnameが今いる階層を表している。今いる階層にindex.htmlが存在しているため、以下のような書き方
    res.sendFile(__dirname + "/index.html");
});

//クライアントサイドのioインスタンス化を受け取り: onメソッド
//2. connectionで接続を受け取る(サーバーへの接続を検知)
io.on("connection", (socket) => {1
    console.log("ユーザーが接続しました")

    //チャットテキストを受け取る: socket.on
    //4. クライアントサイドから送られてきたチャットメッセージを"chat message"と言うキーで受け取る
    socket.on("chat message", (msg) => {
        console.log("メッセージ:" + msg)
        //サーバー側で受け取ったメッセージをクライアント側に表示して送ったチャットメッセージを見れるようにする。
        //5. 受け取ったチャットメッセージをクライアントサイドに表示するために再送信
        io.emit("chat message", msg)
    })
});

server.listen(PORT, () => {
    console.log("listning on 3000")
});