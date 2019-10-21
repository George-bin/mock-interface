const mongoose = require("mongoose");

// 定义模板（表结构）
const UserSchema = new mongoose.Schema(
  {
    name: String, // 用户名
    password: String, // 密码
    mobile: String, // 手机
    email: String, // 邮箱
    position: String // 职位
  },
  { collection: "mclient_user_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("user", UserSchema);
