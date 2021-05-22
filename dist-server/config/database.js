"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var mongoose = require('mongoose');

var Connection = function Connection() {
  (0, _classCallCheck2["default"])(this, Connection);
  var url = process.env.MONGODB_URI || 'mongodb+srv://saransh:Saransh@321@cluster0.chqmt.mongodb.net/test';
  mongoose.Promise = global.Promise;
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(url).then(function () {
    console.log('connected to db');
  })["catch"](function (error) {
    console.log(error);
  });
};

var _default = new Connection();

exports["default"] = _default;