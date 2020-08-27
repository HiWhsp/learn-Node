const express = require("express");
const app = express();
const cors = require("cors");

// 使用session 来实现登录验证
// const session = require("express-session");
// app.use(
//   session({
//     secret: "hsp",
//     name: "sessionid",
//   })
// );

// 单页面刷新
const history = require("connect-history-api-fallback");
app.use(
  history({
    index: "index.html",
    rewrites: [
      {
        from: /[^http:\/\/localhost:5008\/data\/api\/movie]/,
        to: "/index.html",
      },
    ],
  })
);

app.use(require("./imgProtoMid"));

// 映射public目录中的静态资源
const path = require("path");
const staticRoot = path.resolve(__dirname, "../myfiles");
app.use(express.static(staticRoot));

// 跨域白名单 爷不要了，全部允许
// const whiteList = ["null", "http://localhost:5008", "http://127.0.0.1:5500"];
app.use(
  cors({
    origin(origin, callback) {
      callback(null, origin);
    },
    credentials: true,
  })
);

// 手写cors 中间件
// app.use(require("./corsMiddleware"));

// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
// 加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 应用token中间件
app.use(require("./tokenMiddleware"));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// 处理 api 的请求
app.use("/api/student", require("./api/student"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/upload", require("./api/upLoad"));

// 处理下载的请求
app.use("/api/res", require("./api/download"));

// 使用代理
app.use(require("./proxyMid"));

// 处理错误的中间件
app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
