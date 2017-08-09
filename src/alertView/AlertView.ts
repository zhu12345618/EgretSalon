class AlertView extends eui.Component{
    private removeTimer:egret.Timer;

	constructor() {
		super();
		
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
	}

	private removeFromStage() {
        if(this.removeTimer) {
            this.removeTimer.stop();
        }
	}

	private onAddToStage() {
		this.anchorOffsetX = this.width*0.5;;
		this.anchorOffsetY = this.height*0.5;
		this.x = GameConfig.width/2;
		this.y = GameConfig.height/2;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
	}

    /**
     * 初始化背景
     */
    public addBg(width, height) {
        this.width = width;
        this.height = height;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRoundRect(0, 0, this.width, this.height, 20);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    /**
     * 添加文字
     */
    public addText(text:string, x, y) {
        var label = new eui.Label();
        label.text = text;
        label.x = x;
        label.y = y;
        label.width = this.width;
        label.textAlign = "center";
        this.addChild(label);
    }

	/**
	 * 设置自动消失timer
	 */
	public setRemoveTimer(time:number) {
        console.log("setRemoveTimer");
		this.removeTimer = new egret.Timer(time);
        this.removeTimer.addEventListener(egret.TimerEvent.TIMER, this.removeSelf, this);
		this.removeTimer.start();
	}

	/**
	 * 关闭自己
	 */
	public removeSelf() {
		if (AlertZorderManager.getInstance() == this.parent) {
			AlertZorderManager.getInstance().removeChildToManager(this);
		}
	}
}