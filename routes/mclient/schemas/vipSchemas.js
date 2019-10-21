const mongoose = require("mongoose");

// 定义模板（表结构）
const VipSchema = new mongoose.Schema(
  {
    name: String, // 单位名称
    code: String, // 统一社会代码
    level: String, // 会员级别：理事  会员
    type: String, // 单位类型 例：安全厂商
    introduction: String, // 单位简介
    contact: {
      // 联系人
      name: String, // 姓名
      mobile: String, // 手机
      email: String // 邮箱
    }
  },
  { collection: "vip_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("vip", VipSchema);
