const mongoose = require("mongoose");

// 定义模板（表结构）
const groupSchema = new mongoose.Schema(
  {
    id: String, // id
    name: String, // 群组名称
    create_time: Number, // 创建时间
    create_user: String, // 创建人
    dp_id: String, // 部门id
    tencent_id: String // 订阅号id
  },
  { collection: "group_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("group", groupSchema);
