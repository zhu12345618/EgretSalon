class OneRoadMap extends eui.Component {
	private group_road : eui.Group;
	private markRoadScene: MarkRoadScene;
	private bigRoadScene: BigRoadScene;
	private jyRoadScene: JyRoadScene;
	private smallRoadScene: SmallRoadScene;
	private zlRoadScene: ZlRoadScene;

	private bgLineColor : number = 0x333333;

	private label_red: eui.Label = new eui.Label();
	private label_blue: eui.Label = new eui.Label();
	private label_tie: eui.Label = new eui.Label();

	private shoeIdPreLabel : eui.Label;
	private shoeIdLabel : eui.Label;
	private limitLabel : eui.Label;

	private tableIDLabel: eui.Label;
	private tableID: number;

	private gameType;

	public constructor(gameType) {
		super();
		this.skinName = "resource/baccarat/OneRoadMapSkin.exml";
		
		this.setGameType(gameType);
		this.initRoad();
		this.initBg();
		this.initTableID();
		this.initShoeId();
		this.initCount(this.label_red, 1000, 0xff0000);
		this.initCount(this.label_blue, 1040, 0x2e3192);
		this.initCount(this.label_tie, 1080, 0x19910d);
		this.updateLang();
		
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
	}

	private onAddtoStage(event:egret.Event) {
		
		EventDispatcher.getInstance().addEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().addEventListener(Events.GET_HALL_STATE_INFO, this.getHallStateInfo, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickBtnEnter, this);
	}

	private onRemoveStage() {
		EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
		EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_STATE_INFO, this.getHallStateInfo, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickBtnEnter, this);
	}

	private initBg() {
		var roadBg = new egret.Bitmap();
		roadBg.texture = RES.getRes("baccaratHallRoadBg_png");
		roadBg.fillMode = egret.BitmapFillMode.REPEAT;
		roadBg.width *=1116/45;
		
		this.addChild(roadBg);

		this.drawRect(0, 0, this.width, this.height)
	}

	private initTableID() {
		this.tableIDLabel = new eui.Label();
		this.tableIDLabel.x = 5;
		this.tableIDLabel.y = 4;
		this.addChild(this.tableIDLabel);
	}

	private initShoeId() {
		this.shoeIdPreLabel = new eui.Label();
		this.shoeIdPreLabel.x = 560;
		this.shoeIdPreLabel.y = 4;
		this.shoeIdPreLabel.anchorOffsetX = 200;
		this.shoeIdPreLabel.textAlign = egret.HorizontalAlign.RIGHT;
		this.shoeIdPreLabel.width = 200;
		this.shoeIdPreLabel.height = 36;
		this.shoeIdPreLabel.size = 30;
		this.addChild(this.shoeIdPreLabel);

		this.shoeIdLabel = new eui.Label();
		this.shoeIdLabel.x = 570;
		this.shoeIdLabel.y = 4;
		this.shoeIdLabel.textAlign = egret.HorizontalAlign.LEFT;
		this.shoeIdLabel.width = 200;
		this.shoeIdLabel.height = 36;
		this.shoeIdLabel.size = 30;
		this.shoeIdLabel.text = "0-0";
		this.addChild(this.shoeIdLabel);

		this.limitLabel = new eui.Label();
		var userInfo = HallUserInfo.getInstance()
		var limitText = userInfo.getOtherMinBetLimit() + "-" + userInfo.getOtherMaxBetLimit();
		this.limitLabel.x = 580;
		this.limitLabel.text = limitText;
		//测试性移除
		// this.addChild(this.limitLabel);
	}

	private getUserInfo() {
		var userInfo = HallUserInfo.getInstance();
		var limitText = userInfo.getOtherMinBetLimit() + "-" + userInfo.getOtherMaxBetLimit();
		this.limitLabel.text = limitText;
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

	public initHallstateInfo() {
		if(this.tableID) {
			var data = HallTableInfoManager.getInstance().getHallOneTableInfo(this.getGameType(), this.tableID);

			this.shoeIdLabel.text = data.stage + "-" + data.inning;
			this.tableIDLabel.text = data.tableID+"";
			this.addWays(data.allWays);
			this.setResult(data.counts);
		}
	}

	private getHallStateInfo(event) {
		var data : HallTableInfo = event.data;
		if(this.tableID == data.tableID && data.gameType == this.getGameType()) {
			this.shoeIdLabel.text = data.stage + "-" + data.inning;
			this.tableIDLabel.text = data.tableID+"";
			var ways = data.getWays();
			this.addWays(ways);
			this.setResult(data.counts);
		}
	}

	private initCount(label : eui.Label, x, bgColor) {
		var width = 16;
		var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawCircle(x, width+1, width);
        shape.graphics.endFill();
		this.addChild(shape);
		label.x = x;
		label.y = width;
		label.size = width;
		label.anchorOffsetX = width;
		label.anchorOffsetY = width/2;
		label.textAlign = egret.HorizontalAlign.CENTER;
		label.width = width*2;
		label.height = width;
		label.text = "0";
		this.addChild(label);
	}

	private drawRect(x, y, width, height, size = 3) {
		var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( size, this.bgLineColor );
        shp.graphics.moveTo( x, y );
		shp.graphics.lineStyle( size*2, this.bgLineColor );
        shp.graphics.lineTo( width, y );
		shp.graphics.lineStyle( size*2, this.bgLineColor );
        shp.graphics.lineTo( width, height - size );
		shp.graphics.lineStyle( size, this.bgLineColor );
		shp.graphics.moveTo( width, height );
        shp.graphics.lineTo( x, height );
		shp.graphics.lineStyle( size*2, this.bgLineColor );
		shp.graphics.moveTo( x, height - size );
        shp.graphics.lineTo( x, y );
        shp.graphics.endFill();
        this.addChild( shp );
	}

	private initRoad() {
		var width = 34.9;
		this.markRoadScene = new MarkRoadScene(width, width, 12, 6);
		this.markRoadScene.setGameType(this.getGameType());
		this.group_road.addChild(this.markRoadScene);

		this.bigRoadScene = new BigRoadScene(width/2, width/2, 40, 6);
		this.bigRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
		this.group_road.addChild(this.bigRoadScene);

		this.jyRoadScene = new JyRoadScene(width/2, width/2, 40, 3);
        this.jyRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.jyRoadScene.y = this.bigRoadScene.y + this.bigRoadScene.height;
        this.group_road.addChild(this.jyRoadScene);

        this.smallRoadScene = new SmallRoadScene(width/2, width/2, 20, 3);
        this.smallRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.smallRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        this.group_road.addChild(this.smallRoadScene);

        this.zlRoadScene = new ZlRoadScene(width/2, width/2, 20, 3);
        this.zlRoadScene.x = this.smallRoadScene.x + this.smallRoadScene.width;
        this.zlRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        this.group_road.addChild(this.zlRoadScene);
	}
	
	private updateLang() {
		this.shoeIdPreLabel.text = Lang.getStr('TEXT_SHOEID');
	}
	private onClickBtnEnter() {
		var tableId: number = this.tableID;
		Game.gameType = this.getGameType();
		BaccaratGame.baccaratType = ProtobufManager.JoinType.VipTable;
		BaccaratGame.tableId = tableId;
		GameServerManager.getInstance().gameLogin(this.getGameType(), tableId);
	}

	public setTableID(tableID) {
		this.tableID = tableID;
	}

	private addWays(ways) {
		this.markRoadScene.addWithString(ways);
		this.bigRoadScene.addWithString(ways);
		this.jyRoadScene.addWithString(ways);
		this.smallRoadScene.addWithString(ways);
		this.zlRoadScene.addWithString(ways);
	}

	private setResult(counts) {
		var countArray: string[] = counts.split("^");
		if (countArray.length >= 2) {
			this.label_blue.text = countArray[0];
			this.label_red.text = countArray[1];
			this.label_tie.text = countArray[2];
		} else {
			this.label_blue.text = "0";
			this.label_red.text = "0";
			this.label_tie.text = "0";
		}
	}
}