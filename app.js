var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose"); // mongodb数据组件
const bodyParser = require("body-parser");

// 上传文件
const multer = require("multer");
const storage = multer.diskStorage({
  destination: `D:\\public`
});
// 设置保存上传文件路径
const upload = multer({ storage });

var imManageRouter = require("./routes/im-manage");
var mclientRouter = require("./routes/mclient");
var usersRouter = require("./routes/users");

// 连接数据库（vueData为数据库的名字）
mongoose.connect("mongodb://localhost:27017/mockData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// connect()返回一个状态待定（pending）的接连，接着加上成功提醒和失败警告；
mongoose.connection.on("error", console.error.bind(console, "数据库连接失败!"));
mongoose.connection.once("open", function() {
  console.log("数据库连接成功!");
});
mongoose.connection.on("disconnected", function() {
  console.log("数据库断开!");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

// 上传文件
app.use(upload.any());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Content-Type", "application/json;charset=utf-8");
  // 携带cookie
  res.header("Access-Control-Allow-Credentials", true);

  // console.log(req["Access-Control-Allow-Headers"]);
  next();
});

app.use("/api/im-manage", imManageRouter);
app.use("/api/mclient", mclientRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
