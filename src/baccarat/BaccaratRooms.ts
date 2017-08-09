//游戏换桌界面
class BaccaratRooms extends eui.Component {
    private tableId : number = 0;
    constructor(tableId) {
        super();
        this.setTableId(tableId);
        this.width = 342;
        this.height = 640;
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
        
    }

    private onAddtoStage(event:egret.Event) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        
	}

	private onRemoveStage() {
        
	}

    public setTableId(tableId : number) {
        this.tableId = tableId;
    }

    
    private init() {
        this.initBg();
        this.initTableId();
    }

    private initBg() {
        var bg : egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    //初始化桌号
    private initTableId() {
        var i = 0;
        HallTableInfoManager.getInstance().getHallStateInfo(ProtobufManager.GameType.Baccarat).forEach(element => {
            var tableBtn = new Button();
            var tableId = element.getTableId();
            tableBtn.setSize(126, 78);
            if(tableId != this.tableId) {
                tableBtn.setNormalTexture("roomNormalBg_png");
            } else {
                tableBtn.setNormalTexture("roomPressBg_png");
            }
            
            tableBtn.setScale9Rect(new egret.Rectangle(17, 13, 2, 2));
            tableBtn.setLabel(tableId+"", 0x000000);
            tableBtn.x = (i%2)*150+30;
            tableBtn.y = Math.floor(i/2)*90+80;
            function onClickTableBtn() {
                if(tableId != this.tableId) {
                    BaccaratGame.tableId = tableId;
		            GameServerManager.getInstance().gameLogin(ProtobufManager.GameType.Baccarat, tableId);
                }
            }
            tableBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickTableBtn, this);
            this.addChild(tableBtn);
            i++;
        });
        
    }

    private removeSelf() {
        this.parent.removeChild(this);
    }
}