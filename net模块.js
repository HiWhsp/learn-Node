const net = require("net");
const fs = require("fs");
const path = require("path");

const serve = net.createServer();

serve.listen(9527); // 监听服务器9527端口

serve.on("listening", () => {
  console.log("服务器连接成功！");
});

serve.on("connection", (socket) => {
  console.log("有客户端连接到服务器");
  socket.on("data", async (chuck) => {
    const filename = path.resolve(__dirname, "./file/1.jpg");
    const bodyBuffer = await fs.promises.readFile(filename)
    const headBuffer = Buffer.from(`HTTP/1.1 200 OK
content-Type: image/jpeg

`, "utf-8");
    const result = Buffer.concat([headBuffer, bodyBuffer]);
    socket.write(result);
    socket.end();
  });

  socket.on("end", () => {
    console.log("断开了");
  });
});
