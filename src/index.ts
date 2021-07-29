type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Iconfig {
  container: any;
  base: string;
  threshold: number;
  scrollOffset: number;
  scrollTime: number;
  activeClass: string;
  showClass: string;
  isToggleShow: boolean;
  onNavChange: (el: Element) => void;
}

interface Nav {
  id: string;
  config: Partial<Iconfig>;
}

class DefaultConfig implements Partial<Iconfig> {
  container: object = window;
  base = 'center';
  threshold = 0;
  scrollOffset = 0;
  activeClass = 'active';
  showClass = 'show';
  isToggleShow = true;
}

class Floornav implements Nav {
  id: string;
  config: Partial<Iconfig>;
  navContainerId: string | undefined;
  navContainerEl: HTMLElement | null;
  navItems: NodeListOf<Element> | null;
  floorItmes: Array<Element | null> = [];
  update: () => void;

  private defaultConfig: Partial<Iconfig> = new DefaultConfig();

  constructor(id: string, config?: Partial<Iconfig>) {
    this.id = id;
    this.defaultConfig = new DefaultConfig();
    this.config = {
      ...this.defaultConfig,
      ...config,
    };

    const navContainerEl = document.getElementById(this.id);
    this.navContainerEl = navContainerEl;
    this.navItems = this.id
      ? document.querySelectorAll(`#${this.id} a[href]`)
      : null;

    // nodelist foreach
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg): void {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }

    this.update = (): void => {
      this._initItems();
      this.init();
    };

    this.init();
  }

  init(): void {
    if (!this.navContainerEl) {
      console.warn(
        "[Floornav warning]: can't find the wrapper element of the floor navigation"
      );
      return;
    }

    this._initItems();
    this._initJump();
    this._initCheck();

    // check start
    this._check();
  }

  private _initItems(): void  {
    this.floorItmes = [];

    this.navItems &&
      this.navItems.forEach(elem => {
        const href = elem.getAttribute('href');
        if (href) {
          const floorItem = document.getElementById(href.slice(1));
          this.floorItmes.push(floorItem);
        }
      });
  }

  private _setItemActive(elem: Element): void  {
    const { activeClass = 'active', onNavChange } = this.config;
    const activeNavItem = document.querySelector(
      `#${this.id} a.${activeClass}[href]`
    );
    if (activeNavItem) {
      activeNavItem.classList.remove(activeClass);
    }
    elem.classList.add(activeClass);
    onNavChange && onNavChange(elem);
  }

  private _check(): void  {
    const { threshold, base, container } = this.config;
    const height = container.innerHeight;
    let baseline: number;
    let containerTop = 0;

    if (container !== window) {
      const containerEl = document.getElementById(container);
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
      const firstFloorEl = this.floorItmes[0];

      if (
        firstFloorEl &&
        firstFloorEl.getBoundingClientRect().top <= baseline + threshold
      ) {
        this.navContainerEl && (this.navContainerEl.style.display = 'block');
        setTimeout(() => {
          this.navContainerEl && this.navContainerEl.classList.add('show');
        }, 0);
      } else {
        this.navContainerEl && (this.navContainerEl.style.display = 'none');
        this.navContainerEl && this.navContainerEl.classList.remove('show');
      }
    }

    for (let i = this.floorItmes.length - 1; i >= 0; i--) {
      const currentFloorItem = this.floorItmes[i];
      // 注：getBoundingClientRect().top 和 offsetTop 计算出来的位置有偏差，base 为 top 时能体现，暂时多加1像素
      if (
        currentFloorItem &&
        currentFloorItem.getBoundingClientRect().top <= baseline + threshold + 1
      ) {
        const id = currentFloorItem.getAttribute('id');
        const $item = document.querySelector(`#${this.id} a[href="#${id}"]`);
        if ($item && !$item.classList.contains(`${this.config.activeClass}`)) {
          this._setItemActive($item);
        }
        break;
      }
    }
  }

  private _fnCheck = (): void  => {
    this._check();
  };

  private _initJump(): void  {
    const { container, scrollOffset, scrollTime } = this.config;

    this.navItems &&
      this.navItems.forEach(item => {
        item.addEventListener('click', (e: Event) => {
          const event = e || window.event;
          event.preventDefault();

          const navItem = item;

          if (!navItem) {
            return;
          }

          // 获取对应楼层
          const href = navItem.getAttribute('href');
          let floorItem: Element;
          if (href) {
            floorItem = document.getElementById(href.slice(1));
          }

          // 高亮当前导航项
          this._setItemActive(navItem);

          // 计算距离，滚动显示导航器对应的楼层
          let containerTop = 0;
          if (container !== window) {
            const rectTop = container.getBoundingClientRect().top;
            const pageYOffset =
              (window.pageYOffset || document.documentElement.scrollTop) -
              (document.documentElement.clientTop || 0);
            const offsetTop = rectTop + pageYOffset;
            containerTop = offsetTop - container.scrollTop;
          }
          if (floorItem) {
            const rectTop = floorItem.getBoundingClientRect().top;
            const pageYOffset =
              (window.pageYOffset || document.documentElement.scrollTop) -
              (document.documentElement.clientTop || 0);
            const offsetTop = rectTop + pageYOffset;
            const scrollTo = offsetTop - (scrollOffset || 0) - containerTop;

            this._scrollTo(floorItem, scrollTo, scrollTime);
          }
        });
      });
  }

  private _initCheck(): void {
    this.config.container.addEventListener('scroll', this._fnCheck);
    this.config.container.addEventListener('resize', this._fnCheck);
  }

  private _scrollTo(target: Element, scrollTo: number, time = 300): void {
    if (!target) {
      return;
    }

    const { container } = this.config;

    container.removeEventListener('scroll', this._fnCheck);
    container.removeEventListener('resize', this._fnCheck);

    const scrollFrom =
      document.documentElement.scrollTop || document.body.scrollTop;
    let i = 0;
    const runEvery = 5;
    time /= runEvery;
    const interval = setInterval(() => {
      i++;
      const targetValue = ((scrollTo - scrollFrom) / time) * i + scrollFrom;
      document.documentElement.scrollTop = document.body.scrollTop =
        targetValue;
      if (i >= time) {
        clearInterval(interval);
        setTimeout(() => {
          // 延迟激活滑动检测
          this._initCheck();
        }, 20);
      }
    }, runEvery);
  }

  public destroy(): void {
    this.config.container.removeEventListener('scroll', this._fnCheck);
    this.config.container.removeEventListener('resize', this._fnCheck);
  }
}

export default Floornav;
