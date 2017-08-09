/**
 * 大厅场景类
 */
class HallScene extends eui.Component{
	public constructor() {
		super();
		this.skinName = "resource/hallScene/HallSceneSkin.exml";

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

	private onAddtoStage(event:egret.Event) {
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
	}

	private onRemoveFromStage() {
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
    }

	/**
	 * 关闭大厅
	 */
	public closeHall() {
		if(this.parent) {
			this.parent.removeChild(this);
		}
	}

	//获取退出按钮事件
    public getExitBtnEvent() {
		GameServerManager.getInstance().lobbyLogout();
    }

}