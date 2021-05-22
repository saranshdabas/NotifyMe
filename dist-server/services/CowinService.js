"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

var _User = _interopRequireDefault(require("../models/User"));

var _axios = _interopRequireDefault(require("axios"));

var _EmailService = _interopRequireDefault(require("./EmailService"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cowinResourceUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict';
var userService = new _UserService["default"](new _User["default"]().getInstanceWithoutInit());
var emailService = new _EmailService["default"]();

var CowinService = /*#__PURE__*/function () {
  function CowinService() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, CowinService);
    this.users = [];
    this.notificationSent = {};
    this.refreshUsers();
    setInterval(function () {
      _this.getDataForEachUser();
    }, 600000);
    this.getDataForEachUser();
  }

  (0, _createClass2["default"])(CowinService, [{
    key: "refreshUsers",
    value: function () {
      var _refreshUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return userService.getAll({});

              case 2:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 10;
                  break;
                }

                _context.next = 6;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 60000);
                });

              case 6:
                _context.next = 8;
                return this.refreshUsers();

              case 8:
                _context.next = 15;
                break;

              case 10:
                this.users = response.data;
                _context.next = 13;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 60000);
                });

              case 13:
                _context.next = 15;
                return this.refreshUsers();

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function refreshUsers() {
        return _refreshUsers.apply(this, arguments);
      }

      return refreshUsers;
    }()
  }, {
    key: "getCurrentDate",
    value: function getCurrentDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0".concat(dd);
      }

      if (mm < 10) {
        mm = "0".concat(mm);
      }

      return "".concat(dd, "-").concat(mm, "-").concat(yyyy);
    } //Slots for 18+

  }, {
    key: "giveMe18PlusSlots",
    value: function giveMe18PlusSlots(data) {
      var centerDetails = '';
      data['centers'].forEach(function (center) {
        var centerDetailsTemp = "<h3>Center Name: ".concat(center.name, "<h3> \n        <h3>Address: ").concat(center.state_name, " ").concat(center.district_name, " ").concat(center.address, "<h3>\n        <h3>Fee type: ").concat(center.fee_type, "<h3>\n        ");
        var sessionDetails = '';
        center.sessions.forEach(function (session) {
          if (session.min_age_limit === 18) {
            var slots = '';
            session.slots.forEach(function (slot) {
              slots += "".concat(slot, " <br>");
            });
            sessionDetails += "<h4>Date:  ".concat(session.date, "</h4>\n                <h4>Capacity: ").concat(session.available_capacity, "</h4>\n                <h4>Vaccine: ").concat(session.vaccine, "</h4>\n                <h4>slots: </h4> ").concat(slots, " <br>\n                ");
          }
        });

        if (sessionDetails.length) {
          centerDetails += centerDetailsTemp + sessionDetails;
        }
      });
      return centerDetails;
    }
  }, {
    key: "getDataForEachUser",
    value: function () {
      var _getDataForEachUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _iterator, _step, user, slotsChanged, districtData, _iterator2, _step2, _step2$value, id, payload, res, stringData, emailString;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.users.length === 0)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 3000);
                });

              case 3:
                return _context2.abrupt("return", this.getDataForEachUser());

              case 4:
                _iterator = _createForOfIteratorHelper(this.users);
                _context2.prev = 5;

                _iterator.s();

              case 7:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 47;
                  break;
                }

                user = _step.value;
                slotsChanged = false;
                districtData = [];
                _iterator2 = _createForOfIteratorHelper(user.districts);
                _context2.prev = 12;

                _iterator2.s();

              case 14:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 35;
                  break;
                }

                _step2$value = _step2.value, id = _step2$value.id, payload = _step2$value.payload;
                //Wait for 3s before next api call
                console.log('District Id: ', id);
                _context2.next = 19;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 3000);
                });

              case 19:
                _context2.prev = 19;
                _context2.next = 22;
                return _axios["default"].get("".concat(cowinResourceUrl, "?district_id=").concat(id, "&date=").concat(this.getCurrentDate()), {
                  headers: {
                    'User-Agent': 'Chrome/90.0.4430.93'
                  }
                });

              case 22:
                res = _context2.sent;
                stringData = JSON.stringify(res.data);
                districtData = [].concat((0, _toConsumableArray2["default"])(districtData), [{
                  id: id,
                  payload: stringData
                }]);

                if (stringData !== payload) {
                  emailString = this.giveMe18PlusSlots(res.data);
                  slotsChanged = true;

                  if (emailString.length) {
                    emailService.sendEmail(user.email, emailString);
                  }
                }

                _context2.next = 32;
                break;

              case 28:
                _context2.prev = 28;
                _context2.t0 = _context2["catch"](19);
                console.log(_context2.t0.response.status + ' ' + _context2.t0.response.statusText);
                console.log(_context2.t0.data);

              case 32:
                console.log('District Id: ', districtData.length);

              case 33:
                _context2.next = 14;
                break;

              case 35:
                _context2.next = 40;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](12);

                _iterator2.e(_context2.t1);

              case 40:
                _context2.prev = 40;

                _iterator2.f();

                return _context2.finish(40);

              case 43:
                console.log('Slot changed: ', slotsChanged);

                if (slotsChanged) {
                  userService.update(user._id, {
                    user: user,
                    districts: districtData
                  });
                }

              case 45:
                _context2.next = 7;
                break;

              case 47:
                _context2.next = 52;
                break;

              case 49:
                _context2.prev = 49;
                _context2.t2 = _context2["catch"](5);

                _iterator.e(_context2.t2);

              case 52:
                _context2.prev = 52;

                _iterator.f();

                return _context2.finish(52);

              case 55:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 49, 52, 55], [12, 37, 40, 43], [19, 28]]);
      }));

      function getDataForEachUser() {
        return _getDataForEachUser.apply(this, arguments);
      }

      return getDataForEachUser;
    }()
  }]);
  return CowinService;
}();

var _default = new CowinService();

exports["default"] = _default;