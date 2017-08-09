class UnionBaccaratList extends eui.Component {
    private nameLabel : eui.Label;
    private balanceLabel : eui.Label;
    private chipSet : eui.Image;
    private baccaratList :UnionBaccarat[] = [];
    
    constructor() {
        super();
        this.width = GameConfig.width;
        this.height = GameConfig.height;
        for(var i = 0; i < 3; i++) {
            var unionBaccarat = new UnionBaccarat();
            unionBaccarat.x = (unionBaccarat.width+5)*i;
            this.addChild(unionBaccarat);
            this.baccaratList.push(unionBaccarat);
            unionBaccarat.setTableID(i+1);
            GameServerManager.getInstance().joinTable(i+1, ProtobufManager.JoinType.Chain);
        }

        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

    private onAddtoStage(event:egret.Event) {
        this.initUserInfo();
        EventDispatcher.getInstance().addEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
	}

    private onRemoveFromStage(event:egret.Event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
	}

    private init() {
        this.addUserInfo();
        this.addChips();
        this.addSet();
        this.addLine();
    }

    private addUserInfo() {
        var group = new eui.Group();
        group.bottom = 0;
        group.height = 47;
        this.addChild(group);
        var userInfoBg : eui.Image = new eui.Image("unionBaccaratBottom_png");
        userInfoBg.width = GameConfig.width/3;
        userInfoBg.horizontalCenter = egret.HorizontalAlign.CENTER;
        userInfoBg.verticalCenter = egret.VerticalAlign.MIDDLE;
        group.addChild(userInfoBg);

        var infoBg : eui.Image = new eui.Image("unionUserInfoBg_png");
        infoBg.x = 25;
        infoBg.y = 7;
        infoBg.verticalCenter = egret.VerticalAlign.MIDDLE;
        group.addChild(infoBg);

        this.nameLabel = new eui.Label();
        this.nameLabel.x = 63;
        this.nameLabel.y = 13;
        this.nameLabel.size = 20;
        this.nameLabel.verticalCenter = egret.VerticalAlign.MIDDLE;
        this.nameLabel.text = UserGameInfo.getInstance().getName();
        group.addChild(this.nameLabel);

        this.balanceLabel = new eui.Label();
        this.balanceLabel.x = 152;
        this.balanceLabel.y = 13;
        this.balanceLabel.size = 20;
        this.balanceLabel.verticalCenter = egret.VerticalAlign.MIDDLE;
        this.balanceLabel.text = UserGameInfo.getInstance().getBalance()+"";
        group.addChild(this.balanceLabel);

        this.chipSet = new eui.Image("unionChipSet_png");
        this.chipSet.x = 330;
        this.chipSet.verticalCenter = 0;
        group.addChild(this.chipSet);
    }

    private addChips() {
        var group = new eui.Group();
        group.width = GameConfig.width/3;
        group.height = 47;
        group.x = this.baccaratList[1].x;
        group.bottom = 0;
        this.addChild(group);
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(0, 0, GameConfig.width/3, 47);
        rect.graphics.endFill();
        group.addChild(rect);

        for(var i = 0; i < 5; i++) {
            var button : Button = new Button();
            button.setSize(51, 43);
            button.setNormalTexture("unionChip" + (i+1) + "_png");
            button.setLabel((HallUserInfo.getInstance().getOtherChipTable()[i])+"", 0x000000);
            button.setLabelSize(15);
            button.setLabelPosition(button.width/2, button.height/2 - 3);
            button.x = 15 + i*70;
            button.verticalCenter = 0;
            group.addChild(button);
        }
    }

    private addSet() {
        var group = new eui.Group();
        group.right = 0;
        group.bottom = 0;
        this.addChild(group);

        var setBg : eui.Image = new eui.Image("unionBaccaratBottom_png");
        setBg.width = GameConfig.width/3;
        setBg.right = 0;
        setBg.verticalCenter = egret.VerticalAlign.MIDDLE;
        group.addChild(setBg);

        var setBtn : eui.Image = new eui.Image("unionSetBtn_png");
        setBtn.x = 300;
        setBtn.verticalCenter = 0;
        function onClickSetBtn() {

        }
        setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickSetBtn, this);
        group.addChild(setBtn);

        var exitBtn : eui.Image = new eui.Image("unionExitBtn_png");
        exitBtn.x = 340;
        exitBtn.verticalCenter = 0;
        function onClickExitBtn() {
            if(this.parent) {
                this.parent.removeChild(this);
                ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
                GameServerManager.getInstance().gameExit(ProtobufManager.GameType.Baccarat);
            }
        }
        exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickExitBtn, this);
        group.addChild(exitBtn);
    }

    private addLine() {
        var line = new eui.Image(RES.getRes("unionBaccaratBottomLine_png"));
        line.bottom = 0;
        line.scale9Grid = new egret.Rectangle(5, 0, 5, 3);
        line.width = this.width;
        this.addChild(line);
    }

    private initUserInfo() {
        this.nameLabel.text = UserGameInfo.getInstance().getName();
        this.balanceLabel.text = UserGameInfo.getInstance().getBalance()+"";
    }

    /**
	 * 获取游戏状态信息
	 */
	private getUserInfo(event:egret.Event) {
		var gameUserInfo = event.data;
		this.nameLabel.text = gameUserInfo.getName();
        this.balanceLabel.text = gameUserInfo.getBalance();
	}
}