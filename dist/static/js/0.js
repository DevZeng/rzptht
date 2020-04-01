webpackJsonp([0],{

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(277)
__webpack_require__(278)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(274),
  /* template */
  __webpack_require__(279),
  /* scopeId */
  "data-v-36f6cc14",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__api_api__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      logining: false,
      account: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },

  methods: {

    handleLogin() {
      var that = this;
      that.$refs.AccountFrom.validate(valid => {
        if (valid) {
          var aaaa = { username: that.account.username, password: that.account.pwd };
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_api__["requestLogin"])(aaaa).then(res => {
            // let { msg, data } = res;
            if (res.msg == "ok") {

              sessionStorage.setItem('token', 111);
              sessionStorage.setItem('username', JSON.stringify(res.data.name));

              that.$router.push('/Good/Goodlist');
            } else {
              that.$message({
                message: res.msg,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {}
});

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(271)();
// imports


// module
exports.push([module.i, "body{background-color:#373d41}", ""]);

// exports


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(271)();
// imports


// module
exports.push([module.i, ".login-container[data-v-36f6cc14]{-webkit-border-radius:5px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin:160px auto;width:350px;padding:35px 35px 15px;background:#fff;border:1px solid #eaeaea;background:-ms-linear-gradient(top,#fff,#6495ed);background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);background:-webkit-gradient(linear,0 0,0 100%,from(#b8c4cb),to(#f6f6f8));background:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#6495ed));background:-webkit-linear-gradient(top,#fff,#6495ed,#fff);background:-o-linear-gradient(top,#fff,#6495ed)}.title[data-v-36f6cc14]{margin:0 auto 40px;text-align:center;color:#505458}body[data-v-36f6cc14],html[data-v-36f6cc14]{width:100%;height:100%;margin:0;padding:0;overflow:hidden}.container[data-v-36f6cc14]{width:100％;height:100%;margin:0;padding:0;background-color:#000}", ""]);

// exports


/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(275);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(272)("e9376856", content, true);

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(276);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(272)("7656b4a7", content, true);

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-form', {
    ref: "AccountFrom",
    staticClass: "demo-ruleForm login-container",
    attrs: {
      "model": _vm.account,
      "rules": _vm.rules,
      "label-position": "left",
      "label-width": "0px"
    }
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v("系统登录")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text",
      "auto-complete": "off",
      "placeholder": "账号"
    },
    model: {
      value: (_vm.account.username),
      callback: function($$v) {
        _vm.$set(_vm.account, "username", $$v)
      },
      expression: "account.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "pwd"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "auto-complete": "off",
      "placeholder": "密码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        _vm.handleLogin()
      }
    },
    model: {
      value: (_vm.account.pwd),
      callback: function($$v) {
        _vm.$set(_vm.account, "pwd", $$v)
      },
      expression: "account.pwd"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "primary",
      "loading": _vm.logining
    },
    on: {
      "click": function($event) {
        _vm.handleLogin()
      }
    }
  }, [_vm._v("登录")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});