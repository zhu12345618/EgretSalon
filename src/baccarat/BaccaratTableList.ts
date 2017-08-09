class BaccaratTableList extends eui.Component{

	//测试性代码
	private tableListBg : egret.Bitmap;
	private setScene : SetScene;
	private scroller_allRoadMap: eui.Scroller;
	public table_Group: eui.Group;

	private exitBtn : eui.Button;

	private onScrollFunc;

	private gameType;

	public constructor(gameType) {
		super();
		//测试性代码
		
		
		this.setGameType(gameType);
		this.customView();
		this.initTables();
		this.initSetScene();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
	}

	public onAddtoStage(): void {
		this.wheel();
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.onEnterUnionBaccarat, this);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
		EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
		EventDispatcher.getInstance().addEventListener(Events.ADD_HALL_BACCARAT_WAY, this.getAddTablesEvent, this);
	}

	public onRemoveFromStage(): void {
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.onEnterUnionBaccarat, this);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
		EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
		EventDispatcher.getInstance().removeEventListener(Events.ADD_HALL_BACCARAT_WAY, this.getAddTablesEvent, this);
		window.onmousewheel=document.onmousewheel = null;
		this.table_Group.removeChildren();
		this.scroller_allRoadMap.removeChildren();
		this.removeChildren();
	}

	private customView() {
		this.tableListBg = new egret.Bitmap();
		this.tableListBg.texture = RES.getRes("tableListBg_png");
		this.tableListBg.fillMode = egret.BitmapFillMode.REPEAT;
		this.tableListBg.width *=1136/18;
		this.tableListBg.height = GameConfig.height;
		
		this.addChild(this.tableListBg);

		var top : Top = new Top();
		top.top = 0;
		this.addChild(top);

		this.scroller_allRoadMap = new eui.Scroller();
		this.scroller_allRoadMap.width = 1116;
		this.scroller_allRoadMap.height = 550;
		this.scroller_allRoadMap.horizontalCenter = 0;
		this.scroller_allRoadMap.verticalCenter = 40;
		this.addChild(this.scroller_allRoadMap);

		this.scroller_allRoadMap.scrollPolicyH = eui.ScrollPolicy.OFF;
		this.scroller_allRoadMap.scrollPolicyV = eui.ScrollPolicy.ON;


		//this.settingScene.x = 1920;

		var group: eui.Group = new eui.Group();
        group.percentWidth = 100;
        group.percentHeight = 100;
        this.table_Group = group;

		var vLayout: eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.horizontalAlign = eui.TileOrientation.COLUMNS;
		vLayout.gap = 20;
        this.table_Group.layout = vLayout;
		this.scroller_allRoadMap.viewport = this.table_Group;

		//this.addChild(this.settingScene);
	}

	//初始化设置界面
	private initSetScene() {
		this.setScene = new SetScene();
		this.setScene.x = 568;
		this.setScene.y = 58;
	}

	/**
	 * 设置游戏类型
	 */
	public setGameType(gameType) {
		this.gameType = gameType;
	}

	public getGameType() {
		return this.gameType;
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

	private wheel() {
		var self = this;
		function scrollFunc(e) {
			//console.log(e.wheelDelta, self.table_list.scrollV);

			function onScroll(delta) {
				var tempScrollV = self.table_Group.scrollV;
				tempScrollV -= delta;
				var lessThanHeight = tempScrollV + self.scroller_allRoadMap.height <= self.table_Group.contentHeight;
				if(tempScrollV >= 0 && lessThanHeight) {
					self.table_Group.scrollV -= delta;
				} else if(tempScrollV < 0){
					self.table_Group.scrollV = 0;
				} else  if(!lessThanHeight){
					self.table_Group.scrollV = self.table_Group.contentHeight - self.scroller_allRoadMap.height;
				}
			}

			if (e.wheelDelta) {//IE/Opera/Chrome
				onScroll(e.wheelDelta/20);
			}else if (e.detail) {//Firefox
				onScroll(-e.detail * 2);
			}
		}
		this.onScrollFunc = scrollFunc;
		if(document.addEventListener){
			document.addEventListener('DOMMouseScroll',this.onScrollFunc,false);
		}//W3C
		window.onmousewheel=document.onmousewheel=this.onScrollFunc;//IE/Opera/Chrome
	}

	private getAddTablesEvent(event) {
		this.addTables(event.data.tableID);
	}

	private addTables(tableID){
		var oneRoadMap = new OneRoadMap(this.getGameType());
		oneRoadMap.setTableID(tableID);
		oneRoadMap.initHallstateInfo();
		this.table_Group.addChild(oneRoadMap);
	}

	private initTables() {
		var allRooms = HallTableInfoManager.getInstance().getHallStateInfo(this.getGameType());
		for (var key in allRooms) {
			if (allRooms.hasOwnProperty(key)) {
				var element = allRooms[key];
				this.addTables(element.tableID);
			}
		}
	}

	private onEnterUnionBaccarat(event : egret.TouchEvent) {
		BaccaratGame.baccaratType = ProtobufManager.JoinType.Chain;
		GameServerManager.getInstance().gameLogin(this.getGameType(), 0, ProtobufManager.JoinType.Chain);
	}

	//获取退出按钮事件
    public getExitBtnEvent() {
        ViewZorderManager.getInstance().removeChildren();
		ViewZorderManager.getInstance().addChild(new HallScene());
    }

}