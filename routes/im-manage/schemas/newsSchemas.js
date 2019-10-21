const mongoose = require("mongoose");

// 定义模板（表结构）
const newsSchema = new mongoose.Schema(
  {
    id: String, // id
    title: String, // 新闻标题
    public_time: Number, // 发布时间
    cover_picture: String, // 封面图片
    content: String, // 新闻内容
    create_user: String, // 发布用户
    create_user_id: String, // 发布用户id
    create_time: Number, // 创建时间
    pub_type: String, // 发布范围
    pub_user_id: String, // 成员/群组
    dp_id: String, // 部门id
    tencent_id: String // 订阅号id
  },
  { collection: "news_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("news", newsSchema);
