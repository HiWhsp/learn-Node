const secrect = "hspweb";
const cookieKey = "token";
const jwt = require("jsonwebtoken");

// 颁发jwt
exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
  const token = jwt.sign(info, secrect, {
    expiresIn: maxAge,
  });

  // 将jwt添加到cookie中
  // res.cookie(cookieKey, token, {
  //   maxAge: maxAge * 1000,
  // });
  // 其他情况
  res.header("authorization", token);
};

// 验证jwt
exports.verify = function (req) {
  let token = req.headers.authorization;
  //尝试从cookie中获取
  // token = req.cookies[cookieKey]; //cookie中没有
  if (!token) {
    return null;
  }
  // authorization: bearer token
  token = token.split(" ");
  token = token.length === 1 ? token[0] : token[1];
  try {
    const result = jwt.verify(token, secrect);
    return result;
  } catch (err) {
    return null;
  }
};
