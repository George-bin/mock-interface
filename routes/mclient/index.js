const express = require("express");
const router = express.Router();
const fs = require("fs");

const Meeting = require("./schemas/meetingSchemas");
const Vip = require("./schemas/vipSchemas");
const User = require("./schemas/userSchemas");

router.post("/login", function(req, res, next) {
  let { username, password } = req.body;
  User.find({ name: username, password }, function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    if (data.length) {
      res.send({
        errcode: 0,
        message: "登录成功!"
      });
    } else {
      res.send({
        errcode: 1,
        message: "用户名或密码错误!"
      });
    }
  });
});

// 创建会议
router.post("/meeting", function(req, res, next) {
  // console.log(req.body);
  let meeting = new Meeting({ ...req.body });
  meeting.save(function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "插入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "创建会议成功!",
      meeting: data
    });
  });
});

// 更新会议
router.put("/updateMeeting", function(req, res, next) {
  res.send({
    errcode: 0,
    message: "更新会议成功!"
  });
});

// 获取会议列表
router.get("/getMeetingList", function(req, res, next) {
  Meeting.find({}, function(err, meetingList) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    meetingList = JSON.parse(JSON.stringify(meetingList));
    meetingList.length &&
      meetingList.sort(function(a, b) {
        return b.startDate - a.startDate;
      });
    res.send({
      errcode: 0,
      message: "获取会议列表成功!",
      meetingList
    });
  });
});

// 获取距离最近的一次会议
router.get("/getActiveMeeting", function(req, res, next) {
  Meeting.find({}, function(err, meetingList) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    let time = Date.now();
    let arr = meetingList.filter(item => {
      return item.startDate > time;
    });
    arr.sort(function(a, b) {
      return a.startDate - b.startDate;
    });
    res.send({
      errcode: 0,
      message: "获取会议列表成功!",
      meeting: arr[0] ? arr[0] : null
    });
  });
});

// 创建会员单位
router.post("/createVip", function(req, res, next) {
  // console.log(req.body);
  let vip = new Vip({ ...req.body });
  vip.save(function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "插入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "创建单位成功!",
      vip: data
    });
  });
});

// 获取会员列表
router.get("/getVipList", function(req, res, next) {
  Vip.find({}, function(err, vipList) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "查询数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "获取会员列表成功!",
      vipList
    });
  });
});

// 新建用户
router.post("/user/add", function(req, res, next) {
  let user = new User({ ...req.body });
  user.save(function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "插入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "创建用户成功!",
      user: data
    });
  });
});

// 删除用户
router.post("/user/del", function(req, res, next) {
  User.remove({ _id: req.body._id }, function(err, data) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "插入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "删除用户成功!"
    });
  });
});

// 获取所有用户
router.get("/getAllUser", function(req, res, next) {
  User.find(function(err, userList) {
    if (err) {
      return res.send({
        errcode: 999,
        message: "插入数据库失败!"
      });
    }
    res.send({
      errcode: 0,
      message: "获取用户列表成功!",
      userList: userList
    });
  });
});

// 上传文件
router.post("/uploadfile", function(req, res, next) {
  console.log(req.files[0]);
  let mimetype = req.files[0].mimetype.split("/")[1];
  let filename = `${Date.now()}${parseInt(
    (Math.random() + 1) * 10000
  )}.${mimetype}`;
  let filePath = `D:/public/uploads/files/mclient/${filename}`;
  console.log(req.files[0].path);
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
          filePath: `http://localhost/file/uploads/files/mclient/${filename}`
        });
      });
    }
  });
});

module.exports = router;
