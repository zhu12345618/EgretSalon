class Game extends eui.Component{
	public static gameType;
	protected isStart = false;
	protected isStop = false;

	protected _top:Top;
	protected _timer:CountDownTimer;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
	}

    /**
     * 虚拟函数 需要重写
     */
	protected onAddtoStage(event:egret.Event) {
		EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
	}

    /**
     * 虚拟函数 需要重写
     */
	protected onRemoveStage(event:egret.Event) {
		EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
		
	}

	/**
	 * 初始化顶部
	 */
	public initTop() {
		this._top = new Top();
		this.addChild(this._top);
	}

	/**
	 * 初始化色宝的时间倒计时
	 */
	public initTimer() {
		this._timer = new CountDownTimer();
		this._timer.x = 200;
		this._timer.y = 1000;
		this.addChild(this._timer);
	}

	/**
	 * 获取游戏状态信息
	 */
	private getGameState(event:egret.Event) {
		
		var gameStateInfo:GameStateInfo = event.data;
		

		switch(gameStateInfo.getStatus()) {

		case GAMESTATE.SHUFFLE:
			this.getGameStateShuffle();
			break;
		case GAMESTATE.START:
			this.getGameStateStart();
			break;
		case GAMESTATE.STOP:
			console.info(gameStateInfo,"gameStateInfo");
			this.getGameStateStop(gameStateInfo.getPoker());
			break;
		case GAMESTATE.PAYOUT:
			this.getGameStateResult(gameStateInfo.getResult());
			break;
		case GAMESTATE.OK:
			this.getGameStateOK();
			break;
		case GAMESTATE.INVALIED:
			this.getGameStateInvalid();
			break;
		}
		var stageEvent = egret.Event.create(egret.Event, Events.GET_GAME_STAGE)
		stageEvent.data = gameStateInfo.getStage();
		EventDispatcher.getInstance().dispatchEvent(stageEvent);

		var inningEvent = egret.Event.create(egret.Event, Events.GET_GAME_ROUND)
		inningEvent.data = gameStateInfo.getInning();
		EventDispatcher.getInstance().dispatchEvent(inningEvent);
	}

	/**
	 * 洗牌
	 */
	private getGameStateShuffle() {
		this.alertView("洗牌");
	}

	/**
	 * 开始下注
	 */
	private getGameStateStart() {
		if (!this.isStart) {
			this.isStart = true;
			this.isStop = false;
			Utils.alertView(Lang.getStr("TEXT_MESSAGE_1"));
			var event = egret.Event.create(egret.Event, Events.GAME_STATE_START);
			EventDispatcher.getInstance().dispatchEvent(event);

			var removeBetAreaAndBetAmountEvent = egret.Event.create(egret.Event, Events.REMOVE_BETAREA_AND_BETAMOUT);
			EventDispatcher.getInstance().dispatchEvent(removeBetAreaAndBetAmountEvent);

			var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
			setBetBtnCanClickEvent.data = true;
			EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);
			

			var shrinkLiveVideo = egret.Event.create(egret.Event, Events.SHRINK_LIVEVIDEO);
			EventDispatcher.getInstance().dispatchEvent(shrinkLiveVideo);
			SoundEffectMgr.playSound("Betting_Start_mp3");
		} else {
			SoundEffectMgr.playSound("Countdown_mp3");
		}
		
	}

	/**
	 * 停止下注
	 */
	private getGameStateStop(poker : string) {
		if (!this.isStop) {
			this.isStart = false;
			this.isStop = true;
			Utils.alertView(Lang.getStr("TEXT_MESSAGE_2"));
			var event = egret.Event.create(egret.Event, Events.GAME_STATE_TOP);
			EventDispatcher.getInstance().dispatchEvent(event);

			var removeAllMaskEvent = egret.Event.create(egret.Event, Events.REMOVE_ALL_MASK);
			EventDispatcher.getInstance().dispatchEvent(removeAllMaskEvent);

			var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
			setBetBtnCanClickEvent.data = false;
			EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);

			SoundEffectMgr.playSound("Betting_Stopped_mp3");
		}
		if(poker != "") {
			EventDispatcher.getInstance().sendDataEvent(Events.SHOW_POKER, poker);
		}
	}

	/**
	 * 获取结果
	 */
	protected getGameStateResult(result) {
		// var event = egret.Event.create(egret.Event, Events.GET_GAME_RESULT);
		// event.data = result;
		// EventDispatcher.getInstance().dispatchEvent(event);
		SoundEffectMgr.playSound("Display_Result_mp3");
	}

	/**
	 * 完成
	 */
	private getGameStateOK() {
		
	}

	/**
	 * 完成
	 */
	private getGameStateInvalid() {
		this.alertView("无效");
	}

	/**
	 * 弹出弹框
	 */
	public alertView(msg:string) {
		Utils.alertView(msg);
	}
}