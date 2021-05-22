"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Service = /*#__PURE__*/function () {
  function Service(model) {
    (0, _classCallCheck2["default"])(this, Service);
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this["delete"] = this["delete"].bind(this);
  }

  (0, _createClass2["default"])(Service, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
        var items, total;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //Skipping pagination for now
                //   let {skip, limit} = query;
                //   skip = skip ? Number(skip) : 0;
                //   limit = limit ? Number(limit) : 10;
                //   delete query.skip;
                //   delete query.limit;
                if (query._id) {
                  try {
                    query._id = new _mongoose["default"].mongo.ObjectId(query._id);
                  } catch (error) {
                    console.log('not able to generate mongoose id with content', query._id);
                  }
                }

                _context.prev = 1;
                _context.next = 4;
                return this.model.find(query);

              case 4:
                items = _context.sent;
                _context.next = 7;
                return this.model.count();

              case 7:
                total = _context.sent;
                return _context.abrupt("return", {
                  error: false,
                  statusCode: 200,
                  data: items,
                  total: total
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  error: true,
                  statusCode: 500,
                  errors: _context.t0
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 11]]);
      }));

      function getAll(_x) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var item;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.model.create(data);

              case 3:
                item = _context2.sent;

                if (!item) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", {
                  error: false,
                  item: item
                });

              case 6:
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", {
                  error: true,
                  statusCode: 500,
                  message: _context2.t0.message || 'Not able to create item',
                  errors: _context2.t0.errors
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function insert(_x2) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
        var item;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.model.findByIdAndUpdate(id, data, {
                  "new": true
                });

              case 3:
                item = _context3.sent;
                return _context3.abrupt("return", {
                  error: false,
                  statusCode: 202,
                  item: item
                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _defineProperty2["default"])({
                  error: true,
                  statusCode: 500
                }, "error", _context3.t0));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var item;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.model.findByIdAndDelete(id);

              case 3:
                item = _context4.sent;

                if (item) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", {
                  error: true,
                  statusCode: 404,
                  message: 'Item not found'
                });

              case 6:
                return _context4.abrupt("return", {
                  error: false,
                  deleted: true,
                  statusCode: 202,
                  item: item
                });

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", (0, _defineProperty2["default"])({
                  error: true,
                  statusCode: 500
                }, "error", _context4.t0));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Service;
}();

var _default = Service;
exports["default"] = _default;