"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./plugins/element.js");

require("./assets/css/global.css");

require("./assets/font/iconfont.css");

var _vueBaiduMap = _interopRequireDefault(require("vue-baidu-map"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 添加全局样式
// 添加font-icon
//百度地图
_vue["default"].use(_vueBaiduMap["default"], {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'PmElysMiRbpQLb6xPYPrtLrKIkozOZUn'
}); // 导入axios


// 挂载axios 到Vue的原型prototype的$http
_vue["default"].prototype.$http = _axios["default"]; // 设置请求的根路径

_axios["default"].defaults.baseURL = "http://localhost:9000/"; // 全局过滤器  originVal 时间  

_vue["default"].filter('dateFormat', function (originVal) {
  var dt = new Date(originVal);
  var y = dt.getFullYear(); // 转为字符串

  var m = (dt.getMonth() + 1 + '').padStart('2', '0');
  var d = (dt.getDate() + '').padStart(2, '0');
  var hh = (dt.getHours() + '').padStart(2, '0');
  var mm = (dt.getMinutes() + '').padStart(2, '0');
  var ss = (dt.getSeconds() + '').padStart(2, '0'); // return `yyyy-mm-dd hh:mm:ss`

  return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(hh, ":").concat(mm, ":").concat(ss);
}); //用于配置是否在启动项目时生成提示信息，false表示不生成


_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');