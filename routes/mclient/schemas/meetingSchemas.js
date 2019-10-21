const mongoose = require("mongoose");

// 定义模板（表结构）
const MeetingSchema = new mongoose.Schema(
  {
    title: String, // 会议主题/名称
    instroduction: String, // 简介
    address: {
      province: String, // 省份
      city: String, // 城市
      detail: String // 详细地址
    },
    applyClosingDate: Number, // 报名截止时间
    startDate: Number, // 会议开始时间
    endDate: Number, // 会议结束时间
    redFilePath: String // 红头文件地址
  },
  { collection: "meeting_list" }
);
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

// 把schema编译成一个model，model是我们构造document的Class；
module.exports = mongoose.model("meeting", MeetingSchema);
