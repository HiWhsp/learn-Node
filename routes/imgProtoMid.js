const url = require("url");
const path = require("path");

module.exports = (req, res, next) => {
  let host = req.headers.host;
  let referer = req.headers.referer;

  // 只处理图片
  const extname = path.extname(req.path);
  if (![".jpg", ".jpeg", ".git", ".png"].includes(extname)) {
    next();
    return;
  }

  if (referer) {
    referer = url.parse(referer).host;
  }

  if (referer && host !== referer) {
    req.url = "/img/123.jpg";
  }
  next();
};
