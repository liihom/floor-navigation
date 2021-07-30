declare type Partial<T> = {
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
declare class Floornav implements Nav {
    id: string;
    config: Partial<Iconfig>;
    navContainerId: string | undefined;
    navContainerEl: HTMLElement | null;
    navItems: NodeListOf<Element> | null;
    floorItmes: Array<Element | null>;
    update: () => void;
    private defaultConfig;
    constructor(id: string, config?: Partial<Iconfig>);
    init(): void;
    private _initItems;
    private _setItemActive;
    private _check;
    private _fnCheck;
    private _initJump;
    private _initCheck;
    private _scrollTo;
    destroy(): void;
}
export default Floornav;
