const fs = require("fs");
const path = require("path");

const filename = path.resolve(__dirname, "./file/index.txt"); // 复制的文件路径
const tofilename = path.resolve(__dirname, "./file/index2.txt"); // 目标文件路径

// const ws = fs.createWriteStream(tofilename);
// const rs = fs.createReadStream(filename);

// 方式1 全读，全写
// async function test() {
//   const content = await fs.promises.readFile(filename, "utf-8");
//   await fs.promises.writeFile(tofilename, content);
//   console.log("copy over");
//   console.timeEnd("用时：");
// }

// 方式2 读一部分，写一部分
// function test() {
//   const ws = fs.createWriteStream(tofilename);
//   const rs = fs.createReadStream(filename);

//   // 读取文件
//   rs.on("data", (chuck) => {
//     const flags = ws.write(chuck); // 写入流的队列满了之后返回false
//     if (!flags) rs.pause(); // 暂停读取
//   });

//   // 当对列清空后 继续读取
//   ws.on("drain", () => {
//     rs.resume(); // 启动读取
//   });

//   rs.on("close", () => {
//     console.log("copy over");
//     console.timeEnd("用时：");
//   });
// }

console.time("用时：");
function test() {
    const ws = fs.createWriteStream(tofilename);
    const rs = fs.createReadStream(filename);
    rs.pipe(ws);
    console.timeEnd("用时：");
}
test();
