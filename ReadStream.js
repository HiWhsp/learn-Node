const fs = require("fs");
const path = require("path");

const filename = path.resolve(__dirname, "./file/index.txt");

const rs = fs.createReadStream(filename, {
  encoding: "utf-8",
  highWaterMark: 1,
});

rs.on("open", (d) => {
  console.log("open in baek");
});

rs.on("error", (err) => {
  console.log("err:" + err);
});

rs.on("close", () => {
  console.log("文件关闭了");
});

rs.on("data", (chuck) => {
  console.log("读取了：" + chuck);
  rs.pause();
});

rs.on("pause", ()=>{
  console.log("stop in data");
  setTimeout(_=>{
    rs.resume();
  },500)
});

rs.on("resume",()=>{
  console.log("go go go");
})

rs.on("end", ()=>{
  console.log("读完了");
})
