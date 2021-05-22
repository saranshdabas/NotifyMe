"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _server = _interopRequireDefault(require("./config/server"));

require("./config/database");

require("./services/CowinService");

var PORT = process.env.PORT || 5000;

_server["default"].listen(PORT, function () {
  console.log("app running on port ".concat(PORT));
});