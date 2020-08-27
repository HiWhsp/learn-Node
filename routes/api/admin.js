const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("../getSendResult");
const cryptor = require("../../util/crypt");
const jwt = require("../jwt");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return adminServ.addAdmin(req.body);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
      let value = result.id;
      // value = cryptor.encrypt(value.toString());
      // 登录成功 cookie 模式
      // res.cookie("token", value, {
      //   path: "/",
      //   domain: "localhost",
      //   maxAge: 7 * 24 * 3600 * 1000, //毫秒数
      // });
      // res.header("authorization", value);

      // session 模式
      // req.session.loginUser = result;

      // jwt 模式
      jwt.publish(res, undefined, {
        id: value,
      });
    }
    return result;
  })
);

router.get(
  "/whoami",
  asyncHandler(async (req, res) => {
    return await adminServ.getAdminById(req.userId);
  })
);

module.exports = router;
