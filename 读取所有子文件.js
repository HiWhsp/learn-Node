const fs = require("fs");
const path = require("path");

class File {
  constructor(filename, name, ext, isFile, size, createTime, updataTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updataTime = updataTime;
  }

  // 读取文件内容
  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.filename);
      } else {
        return await fs.promises.readFile(this.filename, "utf-8");
      }
    }
    return null;
  }

  async getChildren() {
    if (this.isFile) {
      return [];
    }
    let children = await fs.promises.readdir(this.filename);
    children = children.map((name) => {
      const result = path.resolve(this.filename, name);
      return File.getFile(result);
    });
    return Promise.all(children);
  }

  // 静态方法 返回一个文件信息对象
  static async getFile(filename) {
    const stat = await fs.promises.stat(filename);
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = new Date(stat.ctime).toLocaleDateString();
    const updataTime = new Date(stat.mtime).toLocaleDateString();
    return new File(filename, name, ext, isFile, size, createTime, updataTime);
  }
}

// 生成目录下所有子文件
async function readDir(dirname) {
  const file = await File.getFile(dirname);
  return file.getChildren();
}

async function test() {
  const filename = path.resolve(__dirname, "./myfiles/");
  const result = await readDir(filename);
  const datas = await result[0].getChildren();
  console.log(datas);
}
test();
