var createError = require("http-errors");
var http = require("http");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var wardRouter = require("./routes/ward");
var schema = require('./dao/schema.js')

// knexHandler();
// schema.dropTables();
schema.createTables();

var app = express();

//redirect to https traffic
app.use(function (req, res, next) {
  if (process.env.ENVIRONMENT === "production")
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  else next();
});

app.get('/', (req, res) => {
  res.redirect("/app/#/")
})

// views
app.use("/app", express.static(path.join(__dirname, "public-flutter")));

app.use(express.static(__dirname + "/views", { extensions: ["html", "htm"] }));

app.use(logger("dev"));
//sets express to read strings and json objects
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
if (process.env.ENVIRONMENT === "development") {
  console.log(process.env.ENVIRONMENT);
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authtoken"
    );
    next();
  });
}
app.use("/api/users", usersRouter);
app.use("/api/wards", wardRouter);
app.get("*", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;
app.listen(80, () => console.log(`app listening on port 80!`));
