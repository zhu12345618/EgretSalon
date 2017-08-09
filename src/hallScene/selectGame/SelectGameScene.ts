/**
 * 大厅选择游戏
 */
class SelectGameScene extends eui.Component{
	private baccaratEnterBtn:eui.Button;
	private dtEnterBtn:eui.Button;
	private sicboEnterBtn:eui.Button;
	private rouletteEnterBtn:eui.Button;
	private fantanEnterBtn:eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/hallScene/selectGame/SelectGameSceneSkin.exml";

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
	}

	private onAddtoStage(event:egret.Event) {
		this.sicboEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterSicbo, this);
		this.rouletteEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoulette, this);
		this.dtEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterDragonTiger,this);
		this.baccaratEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBaccarat,this);
	}

    /**
     * 从舞台中移除自己
     */
    public removeSelf() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

	/**
	 * 进入轮盘
	 */
	private enterSicbo() {
		this.removeSelf();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.SicBo));
	}

	/**
	 * 进入轮盘
	 */
	private enterRoulette() {
		this.removeSelf();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Roulette));
	}
	/**
	 * 进入百家乐
	 */
	private enterBaccarat(){
		this.removeSelf();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
	}

	/**
	 * 进入龙虎
	 */
	private enterDragonTiger(){
		this.removeSelf();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.LongHu));
	}

	/**
	 * 进入番摊
	 */
	private enterFantan(){
		this.removeSelf();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.FanTan));
	}
}