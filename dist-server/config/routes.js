"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _default = function _default(server) {
  //USER routes
  server.get('/api/user', _UserController["default"].getAll);
  server.post('/api/user', _UserController["default"].insert);
  server.put('/api/post/:id', _UserController["default"].update);
  server["delete"]('/api/post/:id', _UserController["default"]["delete"]);
};

exports["default"] = _default;