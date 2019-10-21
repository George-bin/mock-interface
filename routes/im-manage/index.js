const express = require("express");
const router = express.Router();
const fs = require("fs");

const Tencent = require("./schemas/tencentSchemas");
const Group = require("./schemas/groupSchemas");
const News = require("./schemas/newsSchemas");

// 获取订阅号
router.get("/getTencentList", function(req, res, next) {
  Tencent.find({}, function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "获取订阅号列表成功!",
      tencentList: data
    });
  });
});

// 注册订阅号
router.post("/registerTencent", function(req, res, next) {
  console.log(req.body);
  let tencent = new Tencent(JSON.parse(JSON.stringify(req.body)));
  tencent.save(function(err, tencent) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "写入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "新增订阅号成功!",
      tencent: tencent
    });
  });
});

// 更新订阅号
router.put("/updateTencent", function(req, res, next) {
  console.log(req.body);
  let tencent = ({
    id,
    news_name,
    department,
    dp_id,
    news_introduce,
    cellphone,
    coverPicture,
    username,
    password,
    create_time,
    create_user_id,
    create_user
  } = req.body);
  Tencent.findOneAndUpdate(
    { _id: req.body._id },
    { ...tencent },
    {
      // 返回更新后的文档
      new: true
    },
    function(err, tencent) {
      if (err) {
        return res.send({
          errcode: 999,
          message: "写入数据库失败!"
        });
      }
      res.send({
        errcode: 0,
        message: "更新订阅号成功!",
        tencent: tencent
      });
    }
  );
});

// 新增订阅号群组
router.post("/registerTencentGroup", function(req, res, next) {
  let group = new Group(JSON.parse(JSON.stringify(req.body)));
  group.save(function(err, group) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "写入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "新增订阅号群组成功!",
      group: group
    });
  });
});

// 获取订阅号群组
router.get("/getTencentGroupList/:tencentId", function(req, res, next) {
  let { tencentId } = req.params;

  Group.find({ tencent_id: tencentId }, function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "获取订阅号群组列表成功!",
      tencentGroupList: data
    });
  });
});

// 更新订阅号群组
router.put("/updateTencentGroup", function(req, res, next) {
  console.log(req.body);
  let tencentGroup = ({
    id,
    name,
    department,
    create_time,
    create_user,
    dp_id,
    tencent_id
  } = req.body);
  Group.findOneAndUpdate(
    { _id: req.body._id },
    { ...tencentGroup },
    {
      // 返回更新后的文档
      new: true
    },
    function(err, group) {
      if (err) {
        return res.send({
          errcode: 999,
          message: "写入数据库失败!"
        });
      }
      res.send({
        errcode: 0,
        message: "更新订阅号群组成功!",
        group: group
      });
    }
  );
});

// 删除订阅号群组
router.post("/delTencentGroup", function(req, res, next) {
  Group.findOneAndRemove({ _id: req.body._id }, function(err, group) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "删除数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "删除订阅号群组成功!"
    });
  });
});

// 新增新闻
router.post("/addTencentNews", function(req, res, next) {
  let news = new News(JSON.parse(JSON.stringify(req.body)));
  news.save(function(err, news) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "写入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "新增新闻成功!",
      news: news
    });
  });
});

// 获取订阅号新闻
router.get("/getTencentNews/:id", function(req, res, next) {
  console.log(req.params);
  let { id } = req.params;
  News.find({ tencent_id: id }, function(err, newsList) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "获取订阅号新闻列表成功!",
      newsList
    });
  });
});

// 上传图片
router.post("/uploadfile", function(req, res, next) {
  console.log(req.files[0]);
  let mimetype = req.files[0].mimetype.split("/")[1];
  let filename = `${Date.now()}${parseInt(
    (Math.random() + 1) * 10000
  )}.${mimetype}`;
  let filePath = `D:/public/uploads/images/im-manage/${filename}`;
  fs.readFile(req.files[0].path, function(err, data) {
    console.log("啦啦啦");
    if (err) {
      return res.send({
        errcode: 996,
        message: "上传失败!"
      });
    } else {
      console.log("123");
      fs.writeFile(filePath, data, function(err) {
        console.log(`写入文件:${req.files[0].path}`);
        if (err) {
          console.log(err);
          return res.send({
            errcode: 996,
            message: "上传失败!"
          });
        }
        // 删除元文件
        fs.unlink(req.files[0].path, err => {
          if (err) {
            console.log("删除文件失败1");
            console.log(err);
          }
        });
        res.send({
          errcode: 0,
          message: "上传成功!",
          filePath: `http://localhost/file/uploads/images/im-manage/${filename}`
        });
      });
    }
  });
});
module.exports = router;
