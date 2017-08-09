class BaccaratGame extends Game{
	public static baccaratType = 111;
	public static tableId = 0;

	protected _bet : BaccaratBet;
	private room : BaccaratRooms;
	private limitInfoLayer : BaccaratLimitInfoLayer;
	private setScene : SetScene;
	public constructor() {
		super();
		this.initBet();
		this.initTimer();
		this.initTop();
		this.initSetScene();
	}

	/**
     * 虚拟函数 需要重写
     */
	protected onAddtoStage(event:egret.Event) {
		this.room = new BaccaratRooms(BaccaratGame.tableId);
		this.limitInfoLayer = new BaccaratLimitInfoLayer();
		this.limitInfoLayer.x = 568;
		this.limitInfoLayer.y = 58;

		
		super.onAddtoStage(event);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_INFO_BTN, this.geInfoBtnEvent, this);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.getRoomBtnEvent, this);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
	}
	/**
     * 虚拟函数 需要重写
     */
	protected onRemoveStage(event:egret.Event) {
		super.onRemoveStage(event);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_INFO_BTN, this.geInfoBtnEvent, this);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.getRoomBtnEvent, this);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
	}

	/**
	 * 初始化赌桌
	 */
	public initBet() {
		this._bet = new BaccaratBet(BaccaratGame.tableId);
		this.addChild(this._bet);
	}

	/**
	 * 初始化色宝的时间倒计时
	 */
	public initTimer() {
		this._timer = new CountDownTimer();
		this._timer.x = 980;
		this._timer.y = 80;
		this.addChild(this._timer);
	}

	//初始化设置界面
	public initSetScene() {
		this.setScene = new SetScene();
		this.setScene.x = 568;
		this.setScene.y = 58;
	}

	/**
	 * 获取结果
	 */
	protected getGameStateResult(result:string) {
		super.getGameStateResult(result);
		
		var alertView = new AlertView();
		alertView.addBg(500, 200);
		alertView.addText(Lang.getStr("RESULT"), 0, 65);
		var resultJson;
		switch(Game.gameType) {
			case ProtobufManager.GameType.Baccarat:
				resultJson = RES.getRes("baccaratResult_json");
				break;
			case ProtobufManager.GameType.LongHu:
				resultJson = RES.getRes("longhuResult_json");
				break;
		}
		alertView.addText(resultJson[result], 0, 105);
		alertView.setRemoveTimer(4000);
		AlertZorderManager.getInstance().addChild(alertView);
	}

	//获取换桌事件
	private getRoomBtnEvent() {
		if(this.room.parent) {
			this.room.parent.removeChild(this.room);
		} else {
			this.addChild(this.room);
		}
	}

	
	//获取信息事件
	private geInfoBtnEvent() {
		if(this.limitInfoLayer.parent) {
			this.limitInfoLayer.parent.removeChild(this.limitInfoLayer);
			EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_INFO_TEXTURE, "topInfo_png");
		} else {
			this.addChild(this.limitInfoLayer);
			EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_INFO_TEXTURE, "topInfoPressed_png");
		}
	}

	//获取设置事件
	private getSetBtnEvent() {
		if(this.setScene.parent) {
			this.setScene.parent.removeChild(this.setScene);
			EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_SET_TEXTURE, "topSet_png");
		} else {
			this.addChild(this.setScene);
			EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_SET_TEXTURE, "topSetPressed_png");
		}
	}

	//获取退出按钮事件
    public getExitBtnEvent() {
        ViewZorderManager.getInstance().removeChildren();
		ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
		GameServerManager.getInstance().gameExit(ProtobufManager.GameType.Baccarat);
    }
}