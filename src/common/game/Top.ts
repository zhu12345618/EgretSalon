class Top extends eui.Component{
	private roomBtn : eui.Image;

	private userNameLabel:eui.Label;
	private userName:string = "";

	private balanceNumLabel:eui.Label;
	private balanceNum:number = 0;

	private isStop:boolean = false;

	private topInfoBtn :eui.Image;
	private topVideoRefreshBtn : eui.Image;
	private topSetBtn : eui.Image;
	private exitBtn : eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/common/top/TopSkin.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

	private onAddtoStage(event:egret.Event) {

		this.setUserGameInfo();
		this.updateLanguage();
		this.roomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoomBtn, this);
		this.topInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTopInfoBtn, this);
		this.topVideoRefreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRefreshVideoBtn, this);
		this.topSetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSetBtn, this);
		this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickExitBtn, this);
		EventDispatcher.getInstance().addEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().addEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
		EventDispatcher.getInstance().addEventListener(Events.CHANGE_TOP_INFO_TEXTURE, this.setInfoTexture, this);
		EventDispatcher.getInstance().addEventListener(Events.CHANGE_TOP_SET_TEXTURE, this.setSetTexture, this);
	}

	private onRemoveFromStage(event:egret.Event) {
		EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().removeEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
		EventDispatcher.getInstance().removeEventListener(Events.CHANGE_TOP_INFO_TEXTURE, this.setInfoTexture, this);
		EventDispatcher.getInstance().removeEventListener(Events.CHANGE_TOP_SET_TEXTURE, this.setSetTexture, this);
	}

	/**
	 * 获取用户游戏信息
	 */
	private getUserInfo(event:egret.Event) {
		var hallUserInfo = event.data;

		this.setUserName(hallUserInfo.getName());
		this.setBalanceNum(hallUserInfo.getBalance());
	}

	/**
	 * 设置用户游戏信息
	 */
	private setUserGameInfo() {
		var hallUserInfo:HallUserInfo = HallUserInfo.getInstance();
		var userName = hallUserInfo.getName();
		this.userName = userName;
		this.userNameLabel.text = userName;

		var balanceNum = hallUserInfo.getBalance();
		this.balanceNum = balanceNum;
		this.balanceNumLabel.text = balanceNum.toString();;
	}

	/**
	 * 设置用户名
	 */
	private setUserName(userName:string) {
		this.userName = userName;
		this.userNameLabel.text = userName;
	}

	/**
	 * 设置余额
	 */
	private setBalanceNum(balanceNum:number) {
		this.balanceNum = balanceNum;
		this.balanceNumLabel.text = balanceNum.toString();
	}

    /**
     * 更新语言
     */
    private updateLanguage() {
        // this.userNameText.text = Lang.getStr('TEXT_USERNAME')+":";
        // this.balanceNumText.text = Lang.getStr('TEXT_BALANCE')+":";
    }

	//换桌按钮
	private onClickRoomBtn() {
		EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_ROOM_BTN);
	}

	//信息按钮
	private onClickTopInfoBtn() {
		EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_INFO_BTN);
	}

	//视频刷新
	private onClickRefreshVideoBtn() {
		EventDispatcher.getInstance().sendNormalEvent(Events.UPDATE_LIVEVIDEO);
	}

	//设置
	private onClickSetBtn(event : egret.TouchEvent) {
		EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_SET_BTN);
	}

	//退出游戏
	private onClickExitBtn(event : egret.TouchEvent) {
		EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_EXIT_BTN);
	}

	private setInfoTexture(event) {
		this.topInfoBtn.source = event.data;
	}

	private setSetTexture(event) {
		this.topSetBtn.source = event.data;
	}
}