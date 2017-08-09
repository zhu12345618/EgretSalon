/**
 * 时间倒计时
 */
class CountDownTimer extends eui.Component {
    private timerBg:eui.Image;
    private timerLabel:eui.Label;
    private timer

    public constructor() {
        super();
        this.initTimerBg();
        this.initTimerLabel();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
	}

	private onAddtoStage(event:egret.Event) {
		EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
	}

	private onRemoveStage(event:egret.Event) {
		EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
	}

    /**
     * 初始化时间背景
     */
    private initTimerBg() {
        this.timerBg = new eui.Image(RES.getRes("timerBg_png"));
        this.addChild(this.timerBg);
    }

    /**
     * 初始化时间
     */
    private initTimerLabel() {
        this.timerLabel = new eui.Label("0");
        this.timerLabel.size = 50;
        this.timerLabel.horizontalCenter = 0;
        this.timerLabel.verticalCenter = 0;
        this.addChild(this.timerLabel);
    }

	/**
	 * 获取游戏状态信息
	 */
	private getGameState(event:egret.Event) {
		
		var data:GameStateInfo = event.data;
		this.timerLabel.text = data.getTime().toString();
	}
}