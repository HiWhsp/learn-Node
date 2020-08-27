const express = require("express");
const router = express.Router();
const { getResult } = require("../getSendResult");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //null表示没有错误  文件保存到服务器哪个文件夹中
    cb(null, path.resolve(__dirname, "../../myfiles/upload"));
  },
  // 文件名称 时间戳-随机六位字符.文件名后缀
  filename: function (req, file, cb) {
    const timeStamp = Date.now();
    const randomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timeStamp}-${randomStr}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("img"), (req, res, next) => {
  const url = `/upload/${req.file.filename}`;
  res.send(getResult(url));
});

module.exports = router;
