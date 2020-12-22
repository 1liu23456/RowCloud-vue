"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Login = _interopRequireDefault(require("@/components/Login"));

var _Home = _interopRequireDefault(require("@/components/Home"));

var _Welcome = _interopRequireDefault(require("@/components/Welcome"));

var _UserList = _interopRequireDefault(require("@/components/admin/UserList"));

var _RightList = _interopRequireDefault(require("@/components/admin/RightList"));

var _BaiduMap = _interopRequireDefault(require("@/components/BaiduMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入Login组件
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  redirect: "/login"
}, {
  path: "/login",
  component: _Login["default"]
}, {
  path: "/home",
  component: _Home["default"],
  redirect: "/welcome",
  children: [{
    path: "/welcome",
    component: _Welcome["default"]
  },
  /**
   * :router="true"  是否使用 vue-router 的模式，
    启用该模式会在激活导航时以 index 作为 path 进行路由跳转 
    可以根据此路径创建对应的 组件在admin里，点击二级按钮跳转哪，就写对应的组件
   */
  {
    path: "/user",
    component: _UserList["default"]
  }, {
    path: "/rights",
    component: _RightList["default"]
  }, {
    path: "/sport",
    component: _BaiduMap["default"]
  }]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
/**
 * 出现问题的时候使用
 * 如果不加上，登陆时会报：
 * vue-router.esm.js?8c4f:2008 Uncaught (in promise) 
 * Error: Redirected when going from "/login" to "/home" via a navigation guard.
 * 意思是：错误:重定向时，从"/login"到"/home"通过导航保护。
 */

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
}; //挂载路由导航守卫


router.beforeEach(function (to, from, next) {
  //to 将要访问
  //from 从哪儿访问
  //    next（）放行， next（'/URL'）强制跳转的路径
  if (to.path == '/login') return next(); //获取user

  var userFlag = window.sessionStorage.getItem("user"); //取出用户

  if (!userFlag) return next('/login'); //为空，返回登录页

  next(); //符合要求放行
});
var _default = router;
exports["default"] = _default;