const mongoose = require("mongoose");

// 定义模板（表结构）
const tencentSchema = new mongoose.Schema(
  {
    id: String, // id
    news_name: String, // 订阅号名称
    coverPicture: String, // 订阅号头像
    dp_id: String, // 部门id
    department: String, // 部门
    cellphone: String, // 联系电话
    news_introduce: String, // 描述
    username: String, // 管理员账户
    password: String, // 管理员密码
    create_time: Number, // 创建时间
    create_user_id: String, // 创建者id
    create_user: String // 创建者
  },
  { collection: "tencent_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("tencent", tencentSchema);
