"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _require = require('googleapis'),
    google = _require.google;

var OAuth2 = google.auth.OAuth2;

var EmailService = function EmailService() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, EmailService);
  (0, _defineProperty2["default"])(this, "createTransporter", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var oauth2Client, accessToken, smtpTransport;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            oauth2Client = new OAuth2(process.env.CLIENT_ID, // ClientID
            process.env.CLIENT_SECRET, // Client Secret
            'https://developers.google.com/oauthplayground' // Redirect URL
            );
            oauth2Client.setCredentials({
              refresh_token: process.env.REFRESH_TOKEN
            });
            accessToken = oauth2Client.getAccessToken();
            smtpTransport = _nodemailer["default"].createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
              }
            });
            return _context.abrupt("return", smtpTransport);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2["default"])(this, "sendEmail", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, emailContent) {
      var emailTransporter, mailOptions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this.createTransporter();

            case 3:
              emailTransporter = _context2.sent;
              mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Vaccine Slot Available!',
                html: emailContent
              };
              emailTransporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log('Email could not sent: ' + error);
                  return;
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var _default = EmailService;
exports["default"] = _default;