import { __assign } from "tslib";
var DefaultConfig = /** @class */ (function () {
    function DefaultConfig() {
        this.container = window;
        this.base = 'center';
        this.threshold = 0;
        this.scrollOffset = 0;
        this.activeClass = 'active';
        this.showClass = 'show';
        this.isToggleShow = true;
    }
    return DefaultConfig;
}());
var Floornav = /** @class */ (function () {
    function Floornav(id, config) {
        var _this = this;
        this.floorItmes = [];
        this.defaultConfig = new DefaultConfig();
        this._fnCheck = function () {
            _this._check();
        };
        this.id = id;
        this.defaultConfig = new DefaultConfig();
        this.config = __assign(__assign({}, this.defaultConfig), config);
        var navContainerEl = document.getElementById(this.id);
        this.navContainerEl = navContainerEl;
        this.navItems = this.id
            ? document.querySelectorAll("#" + this.id + " a[href]")
            : null;
        // nodelist foreach
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
    Floornav.prototype.init = function () {
        if (!this.navContainerEl) {
            console.warn("[Floornav warning]: can't find the wrapper element of the floor navigation");
            return;
        }
        this._initItems();
        this._initJump();
        this._initCheck();
        // check start
        this._check();
    };
    Floornav.prototype._initItems = function () {
        var _this = this;
        this.floorItmes = [];
        this.navItems &&
            this.navItems.forEach(function (elem) {
                var href = elem.getAttribute('href');
                if (href) {
                    var floorItem = document.getElementById(href.slice(1));
                    _this.floorItmes.push(floorItem);
                }
            });
    };
    Floornav.prototype._setItemActive = function (elem) {
        var _a = this.config, _b = _a.activeClass, activeClass = _b === void 0 ? 'active' : _b, onNavChange = _a.onNavChange;
        var activeNavItem = document.querySelector("#" + this.id + " a." + activeClass + "[href]");
        if (activeNavItem) {
            activeNavItem.classList.remove(activeClass);
        }
        elem.classList.add(activeClass);
        onNavChange && onNavChange(elem);
    };
    Floornav.prototype._check = function () {
        var _this = this;
        var _a = this.config, threshold = _a.threshold, base = _a.base, container = _a.container;
        var height = container.innerHeight;
        var baseline;
        var containerTop = 0;
        if (container !== window) {
            var containerEl = document.getElementById(container);
            containerTop = containerEl ? containerEl.getBoundingClientRect().top : 0;
        }
        if (base === 'top') {
            baseline = containerTop;
        }
        else if (base === 'bottom') {
            baseline = containerTop + height;
        }
        else {
            baseline = containerTop + height / 2;
        }
        if (!this.config.isToggleShow) {
            this.navContainerEl && (this.navContainerEl.style.display = 'block');
            this.navContainerEl && this.navContainerEl.classList.add('show');
        }
        else {
            var firstFloorEl = this.floorItmes[0];
            if (firstFloorEl &&
                firstFloorEl.getBoundingClientRect().top <= baseline + threshold) {
                this.navContainerEl && (this.navContainerEl.style.display = 'block');
                setTimeout(function () {
                    _this.navContainerEl && _this.navContainerEl.classList.add('show');
                }, 0);
            }
            else {
                this.navContainerEl && (this.navContainerEl.style.display = 'none');
                this.navContainerEl && this.navContainerEl.classList.remove('show');
            }
        }
        for (var i = this.floorItmes.length - 1; i >= 0; i--) {
            var currentFloorItem = this.floorItmes[i];
            // 注：getBoundingClientRect().top 和 offsetTop 计算出来的位置有偏差，base 为 top 时能体现，暂时多加1像素
            if (currentFloorItem &&
                currentFloorItem.getBoundingClientRect().top <= baseline + threshold + 1) {
                var id = currentFloorItem.getAttribute('id');
                var $item = document.querySelector("#" + this.id + " a[href=\"#" + id + "\"]");
                if ($item && !$item.classList.contains("" + this.config.activeClass)) {
                    this._setItemActive($item);
                }
                break;
            }
        }
    };
    Floornav.prototype._initJump = function () {
        var _this = this;
        var _a = this.config, container = _a.container, scrollOffset = _a.scrollOffset, scrollTime = _a.scrollTime;
        this.navItems &&
            this.navItems.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    var event = e || window.event;
                    event.preventDefault();
                    var navItem = item;
                    if (!navItem) {
                        return;
                    }
                    // 获取对应楼层
                    var href = navItem.getAttribute('href');
                    var floorItem;
                    if (href) {
                        floorItem = document.getElementById(href.slice(1));
                    }
                    // 高亮当前导航项
                    _this._setItemActive(navItem);
                    // 计算距离，滚动显示导航器对应的楼层
                    var containerTop = 0;
                    if (container !== window) {
                        var rectTop = container.getBoundingClientRect().top;
                        var pageYOffset_1 = (window.pageYOffset || document.documentElement.scrollTop) -
                            (document.documentElement.clientTop || 0);
                        var offsetTop = rectTop + pageYOffset_1;
                        containerTop = offsetTop - container.scrollTop;
                    }
                    if (floorItem) {
                        var rectTop = floorItem.getBoundingClientRect().top;
                        var pageYOffset_2 = (window.pageYOffset || document.documentElement.scrollTop) -
                            (document.documentElement.clientTop || 0);
                        var offsetTop = rectTop + pageYOffset_2;
                        var scrollTo_1 = offsetTop - (scrollOffset || 0) - containerTop;
                        _this._scrollTo(floorItem, scrollTo_1, scrollTime);
                    }
                });
            });
    };
    Floornav.prototype._initCheck = function () {
        this.config.container.addEventListener('scroll', this._fnCheck);
        this.config.container.addEventListener('resize', this._fnCheck);
    };
    Floornav.prototype._scrollTo = function (target, scrollTo, time) {
        var _this = this;
        if (time === void 0) { time = 300; }
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
            var targetValue = ((scrollTo - scrollFrom) / time) * i + scrollFrom;
            document.documentElement.scrollTop = document.body.scrollTop =
                targetValue;
            if (i >= time) {
                clearInterval(interval);
                setTimeout(function () {
                    // 延迟激活滑动检测
                    _this._initCheck();
                }, 20);
            }
        }, runEvery);
    };
    Floornav.prototype.destroy = function () {
        this.config.container.removeEventListener('scroll', this._fnCheck);
        this.config.container.removeEventListener('resize', this._fnCheck);
    };
    return Floornav;
}());
export default Floornav;
