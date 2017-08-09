/**
 * 界面层管理器
 */
class WaitingDataZorderManager extends egret.DisplayObjectContainer {
    public static instance:WaitingDataZorderManager;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new WaitingDataZorderManager();
        }
        return this.instance;
    }

    private bg:eui.Image;

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
        this.bg = new eui.Image(RES.getRes("blackBackground_png"));
        this.bg.alpha = 0.5;
        this.bg.width = GameConfig.width;
        this.bg.height = GameConfig.height;
    }

    /**
     * 重写addChild
     */
    public addChildToManager(child:egret.DisplayObject) {
        if(!this.parent) {
            UIManager.getStage().addChild(this);
            this.parent.setChildIndex(this, 3);
            this.visible = false;
            egret.setTimeout(function() {
                this.visible = true;
            }, this, 200);
        }
        if (!this.bg.parent) {
            this.addChild(this.bg);
        }

        this.addChild(child);
    }

    /**
     * 重写removeChild
     */
    public removeChildToManager(child:egret.DisplayObject) {
        this.removeChild(child);
        if (this.numChildren == 1) {
            this.removeChild(this.bg);
            this.parent.removeChild(this);
        }
        
        
    }

    /**
     * 添加等待数据界面
     */
    public addWaitingDataLayer() {
        if(!this.getChildByName("waiting")) {
            var waiting = new eui.Image(RES.getRes("loading_png"));
            waiting.name = "waiting";
            waiting.anchorOffsetX = 92/2;
            waiting.anchorOffsetY = 92/2;
            egret.Tween.get(waiting, {loop:true}).to({rotation:-360}, 1500);
            this.addChildToManager(waiting);
            waiting.x = this.width/2;
            waiting.y = this.height/2;
        }
    }

    /**
     * 移除等待数据界面
     */
    public removeWaitingDataLayer() {
        var waiting = this.getChildByName("waiting");
        if(waiting && waiting.parent) {
            this.removeChildToManager(waiting);
        }
    }
}