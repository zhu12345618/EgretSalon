class UIManager {
	public constructor() {
	}

	public static stage:egret.Stage;
	public static init(stage:egret.Stage) {
		this.stage = stage;

		this.addAlerZorderManager();
		this.addViewZorderManager();
		
	}

	/**
	 * 添加界面层
	 */
	public static addViewZorderManager() {
		this.stage.addChild(ViewZorderManager.getInstance());
		this.stage.setChildIndex(ViewZorderManager.getInstance(), 1);
	}

	/**
	 * 添加弹出层
	 */
	public static addAlerZorderManager() {
		this.stage.addChild(AlertZorderManager.getInstance());
		this.stage.setChildIndex(AlertZorderManager.getInstance(), 2);
	}

	public static getStage() {
		return this.stage;
	}
}