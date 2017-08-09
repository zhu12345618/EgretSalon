/**
 * 弹出层管理器
 */
class AlertZorderManager extends eui.Component {
    public static instance:AlertZorderManager;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AlertZorderManager();
        }
        return this.instance;
    }

    private invisibleBg:eui.Image;

    constructor() {
        super();

        this.width = GameConfig.width;
        this.height = GameConfig.height;
        this.addInvisibleBg();
	}

    /**
     * 增加透明背景
     */
    private addInvisibleBg() {
        this.invisibleBg = new eui.Image(RES.getRes("blackBackground_png"));
        this.invisibleBg.alpha = 0.5;
        this.invisibleBg.width = GameConfig.width;
        this.invisibleBg.height = GameConfig.height;
    }

    /**
     * 重写addChild
     */
    public addChildToManager(child:egret.DisplayObject) {
        this.addChild(child);
    }

    /**
     * 重写removeChild
     */
    public removeChildToManager(child:egret.DisplayObject) {
        this.removeChild(child);
    }
}