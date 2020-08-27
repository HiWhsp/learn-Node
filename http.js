const http = require("http");
const URL = require("url");
const fs = require("fs");
const path = require("path");

/**
 * 获取文件状态
 * @param {*} filename 文件路径
 */
async function getStat(filename) {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
}

/**
 * 获取文件内容
 * @param {*} URL 地址栏文件地址
 */
async function getFillInfo(url) {
  const urlObj = URL.parse(url);
  let filename = path.resolve(__dirname, "file", urlObj.pathname.substr(1));
  let stat = await getStat(filename);
  if (!stat) {
    // 文件不存在
    return null;
  } else if (stat.isDirectory()) {
    // 可能是目录
    filename = path.resolve(
      __dirname,
      "file",
      urlObj.pathname.substr(1),
      "index.html"
    );
    stat = await getStat(filename);
    if (!stat) {
      return null;
    } else {
      return await fs.promises.readFile(filename);
    }
  } else {
    return await fs.promises.readFile(filename);
  }
}

async function handle(req, res) {
  const info = await getFillInfo(req.url);
  if (info) {
    res.write(info);
  } else {
    res.statusCode = 404;
    res.write("Resource is not exist");
  }
  res.end();
}

const serve = http.createServer(handle);

serve.listen(8023);
