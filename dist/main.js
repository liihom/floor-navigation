/*!
 * @autots/floornav v0.0.1
 * Last Modified @ 2021/7/29下午8:00:57
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Floornav"] = factory();
	else
		root["AutoTs"] = root["AutoTs"] || {}, root["AutoTs"]["Floornav"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);



var DefaultConfig = function DefaultConfig() {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DefaultConfig);

  this.container = window;
  this.base = 'center';
  this.threshold = 0;
  this.scrollOffset = 0;
  this.activeClass = 'active';
  this.showClass = 'show';
  this.isToggleShow = true;
};

var Floornav = /*#__PURE__*/function () {
  function Floornav(id, config) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Floornav);

    this.floorItmes = [];
    this.defaultConfig = new DefaultConfig();

    this._fnCheck = function () {
      _this._check();
    };

    this.id = id;
    this.defaultConfig = new DefaultConfig();
    this.config = Object.assign(Object.assign({}, this.defaultConfig), config);
    var navContainerEl = document.getElementById(this.id);
    this.navContainerEl = navContainerEl;
    this.navItems = this.id ? document.querySelectorAll("#".concat(this.id, " a[href]")) : null; // nodelist foreach

    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }

    this.update = function () {
      _this._initItems();

      _this.init();
    };

    this.init();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(Floornav, [{
    key: "init",
    value: function init() {
      if (!this.navContainerEl) {
        console.warn("[Floornav warning]: can't find the wrapper element of the floor navigation");
        return;
      }

      this._initItems();

      this._initJump();

      this._initCheck(); // check start


      this._check();
    }
  }, {
    key: "_initItems",
    value: function _initItems() {
      var _this2 = this;

      this.floorItmes = [];
      this.navItems && this.navItems.forEach(function (elem) {
        var href = elem.getAttribute('href');

        if (href) {
          var floorItem = document.getElementById(href.slice(1));

          _this2.floorItmes.push(floorItem);
        }
      });
    }
  }, {
    key: "_setItemActive",
    value: function _setItemActive(elem) {
      var _this$config = this.config,
          _this$config$activeCl = _this$config.activeClass,
          activeClass = _this$config$activeCl === void 0 ? 'active' : _this$config$activeCl,
          onNavChange = _this$config.onNavChange;
      var activeNavItem = document.querySelector("#".concat(this.id, " a.").concat(activeClass, "[href]"));

      if (activeNavItem) {
        activeNavItem.classList.remove(activeClass);
      }

      elem.classList.add(activeClass);
      onNavChange && onNavChange(elem);
    }
  }, {
    key: "_check",
    value: function _check() {
      var _this3 = this;

      var _this$config2 = this.config,
          threshold = _this$config2.threshold,
          base = _this$config2.base,
          container = _this$config2.container;
      var height = container.innerHeight;
      var baseline;
      var containerTop = 0;

      if (container !== window) {
        var containerEl = document.getElementById(container);
        containerTop = containerEl ? containerEl.getBoundingClientRect().top : 0;
      }

      if (base === 'top') {
        baseline = containerTop;
      } else if (base === 'bottom') {
        baseline = containerTop + height;
      } else {
        baseline = containerTop + height / 2;
      }

      if (!this.config.isToggleShow) {
        this.navContainerEl && (this.navContainerEl.style.display = 'block');
        this.navContainerEl && this.navContainerEl.classList.add('show');
      } else {
        var firstFloorEl = this.floorItmes[0];

        if (firstFloorEl && firstFloorEl.getBoundingClientRect().top <= baseline + threshold) {
          this.navContainerEl && (this.navContainerEl.style.display = 'block');
          setTimeout(function () {
            _this3.navContainerEl && _this3.navContainerEl.classList.add('show');
          }, 0);
        } else {
          this.navContainerEl && (this.navContainerEl.style.display = 'none');
          this.navContainerEl && this.navContainerEl.classList.remove('show');
        }
      }

      for (var i = this.floorItmes.length - 1; i >= 0; i--) {
        var currentFloorItem = this.floorItmes[i]; // 注：getBoundingClientRect().top 和 offsetTop 计算出来的位置有偏差，base 为 top 时能体现，暂时多加1像素

        if (currentFloorItem && currentFloorItem.getBoundingClientRect().top <= baseline + threshold + 1) {
          var id = currentFloorItem.getAttribute('id');
          var $item = document.querySelector("#".concat(this.id, " a[href=\"#").concat(id, "\"]"));

          if ($item && !$item.classList.contains("".concat(this.config.activeClass))) {
            this._setItemActive($item);
          }

          break;
        }
      }
    }
  }, {
    key: "_initJump",
    value: function _initJump() {
      var _this4 = this;

      var _this$config3 = this.config,
          container = _this$config3.container,
          scrollOffset = _this$config3.scrollOffset,
          scrollTime = _this$config3.scrollTime;
      this.navItems && this.navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var event = e || window.event;
          event.preventDefault();
          var navItem = item;

          if (!navItem) {
            return;
          } // 获取对应楼层


          var href = navItem.getAttribute('href');
          var floorItem;

          if (href) {
            floorItem = document.getElementById(href.slice(1));
          } // 高亮当前导航项


          _this4._setItemActive(navItem); // 计算距离，滚动显示导航器对应的楼层


          var containerTop = 0;

          if (container !== window) {
            var rectTop = container.getBoundingClientRect().top;
            var pageYOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            var offsetTop = rectTop + pageYOffset;
            containerTop = offsetTop - container.scrollTop;
          }

          if (floorItem) {
            var _rectTop = floorItem.getBoundingClientRect().top;

            var _pageYOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

            var _offsetTop = _rectTop + _pageYOffset;

            var scrollTo = _offsetTop - (scrollOffset || 0) - containerTop;

            _this4._scrollTo(floorItem, scrollTo, scrollTime);
          }
        });
      });
    }
  }, {
    key: "_initCheck",
    value: function _initCheck() {
      this.config.container.addEventListener('scroll', this._fnCheck);
      this.config.container.addEventListener('resize', this._fnCheck);
    }
  }, {
    key: "_scrollTo",
    value: function _scrollTo(target, scrollTo) {
      var _this5 = this;

      var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;

      if (!target) {
        return;
      }

      var container = this.config.container;
      container.removeEventListener('scroll', this._fnCheck);
      container.removeEventListener('resize', this._fnCheck);
      var scrollFrom = document.documentElement.scrollTop || document.body.scrollTop;
      var i = 0;
      var runEvery = 5;
      time /= runEvery;
      var interval = setInterval(function () {
        i++;
        var targetValue = (scrollTo - scrollFrom) / time * i + scrollFrom;
        document.documentElement.scrollTop = document.body.scrollTop = targetValue;

        if (i >= time) {
          clearInterval(interval);
          setTimeout(function () {
            // 延迟激活滑动检测
            _this5._initCheck();
          }, 20);
        }
      }, runEvery);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.config.container.removeEventListener('scroll', this._fnCheck);
      this.config.container.removeEventListener('resize', this._fnCheck);
    }
  }]);

  return Floornav;
}();

/* harmony default export */ __webpack_exports__["default"] = (Floornav);

/***/ })
/******/ ])["default"];
});