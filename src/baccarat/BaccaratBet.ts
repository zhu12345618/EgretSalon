/**
 * 百家乐赌注页面
 */
//闲=101,庄=102,和=103,闲对=104,庄对=105,s6=126
class BaccaratBet extends eui.Component{
    private bg : eui.Image = new eui.Image("videoFristImg_png");

    private liveVideo : cmkj.LiveVideo;

    private tableID : number = 0;

    private chipArr = [];
    private chipsScroller : eui.Scroller;

    private betInfo : number[] = [];
    private betGroup : eui.Group;

    private group_road : BaccaratRoad;

    private isShowRoad : boolean = true;

    private pokerLayer : PokerLayer;

    public constructor(tableID) {
        super();
        this.width = 1136;
        this.height = 640;
        this.setTableID(tableID);
        this.init();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

    public setTableID(tableID) {
        this.tableID = tableID;
    }

    private onAddtoStage(event:egret.Event) {
        this.openLiveVideo("113.10.194.250:81/tpy/mtable3");

        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
        EventDispatcher.getInstance().addEventListener(Events.LOAD_LIVEVIDEO_ERROR, this.loadVideoError, this);
        EventDispatcher.getInstance().addEventListener(Events.LOADED_LIVEVIDEO, this.loadedVideo, this);
        EventDispatcher.getInstance().addEventListener(Events.ADD_BETAREA_AND_BETAMOUNT, this.addbetMoney, this);
        EventDispatcher.getInstance().addEventListener(Events.SHOW_POKER, this.showPoker, this);

        EventDispatcher.getInstance().addEventListener(Events.UPDATE_LIVEVIDEO, this.refreshVideo, this);
	}

    private onRemoveFromStage(event:egret.Event) {
        this.liveVideo.closeLiveVideo();

        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
        EventDispatcher.getInstance().removeEventListener(Events.LOAD_LIVEVIDEO_ERROR, this.loadVideoError, this);
        EventDispatcher.getInstance().removeEventListener(Events.LOADED_LIVEVIDEO, this.loadedVideo, this);
        EventDispatcher.getInstance().removeEventListener(Events.ADD_BETAREA_AND_BETAMOUNT, this.addbetMoney, this);
        
        EventDispatcher.getInstance().removeEventListener(Events.SHOW_POKER, this.showPoker, this);
        EventDispatcher.getInstance().removeEventListener(Events.UPDATE_LIVEVIDEO, this.refreshVideo, this);
	}

    private init() {
        this.addChild(this.bg);
        this.addGradient();
        this.initBottom();
        this.initChips();
        this.initBetBtnLayer();
        this.addRoad();
        this.addConfirmView();
        this.pokerLayer = new PokerLayer(this.width, 320);
    }


    //增加下注界面
    protected initBetBtnLayer() {
        var group = new eui.Component();

        var playerPairBtn = new BaccaratBetBtn(BaccaratBetType.PlayerPair, "TEXT_PLAYER_PAIR", 150, 20, 0x3a40fa);
        group.addChild(playerPairBtn);

        var playerBtn = new BaccaratBetBtn(BaccaratBetType.Player, "TEXT_PLAYER", 200, 25, 0x3a40fa);
        playerBtn.x = 160;
        group.addChild(playerBtn);

        var tieBtn = new BaccaratBetBtn(BaccaratBetType.Tie, "TEXT_TIE", 150, 25, 0x0f6706);
        tieBtn.x = 370;
        group.addChild(tieBtn);

        var bankerBtn = new BaccaratBetBtn(BaccaratBetType.Banker, "TEXT_BANKER", 200, 25, 0xff0000);
        bankerBtn.x = 530;
        group.addChild(bankerBtn);

        var bankerPairBtn = new BaccaratBetBtn(BaccaratBetType.BankerPair, "TEXT_BANKER_PAIR", 150, 20, 0xff0000);
        bankerPairBtn.x = 740;
        group.addChild(bankerPairBtn);
        
        group.x = 130;
        group.y = 370;
        this.addChild(group);
    }

    private addGradient() {
        function createGradientBox(x, y, width, height, alpha, rotation?) {
            rotation = rotation || 0;
            var matrix:egret.Matrix = new egret.Matrix();
            matrix.createGradientBox(width, height, rotation);
            var shape : egret.Shape = new egret.Shape();
            shape.x = x;
            shape.y = y;
            shape.graphics.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000], alpha, [0, 255], matrix);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
            return shape;
        }
        
        this.addChild(createGradientBox(0, 0, 100, this.height, [1,0]));
        this.addChild(createGradientBox(this.width - 100, 0, 100, this.height, [0,1]));
        this.addChild(createGradientBox(0, this.height - 150, this.width, 150, [0,1], Math.PI/180*90));
    }

    //初始化底部
    private initBottom() {
        var group = new BaccaratBottom();
        group.bottom = 0;
        group.width = 1136;
        group.height = 57;
        
        this.addChild(group);
    }
    

    //刷新视频
    private refreshVideo() {
        this.liveVideo.updateLiveVideo();
    }

    //初始化筹码数组
    private initChipArr() {
        for(var i = 0;i < 10; i++) {
            var display = "chip" + (i+1) + "_png";
            var data = {display : display, chip : HallUserInfo.getInstance().getOtherAllChipTable()[i], index : i, currentIndex : 0};
            this.chipArr.push(data);
        }
    }

    //初始化筹码列表
    private initChips() {
        this.initChipArr();
        var vLayout : eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        vLayout.gap = 25;

        var group : eui.Group = new eui.Group();
        group.percentWidth = 100;
        group.percentHeight = 100;
        group.layout = vLayout;
        for(var i = 0; i < HallUserInfo.getInstance().getOtherAllChipTable().length; i++) {
            var button = new ChipButton();
            var display = "chip" + (i+1) + "_png";
            var chip = HallUserInfo.getInstance().getOtherAllChipTable()[i];
            button.setButton(display, chip);
            group.addChild(button);
        }

        this.chipsScroller = new eui.Scroller();
        this.chipsScroller.x = 0;
        this.chipsScroller.verticalCenter = 0;
        this.chipsScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.chipsScroller.scrollPolicyV = eui.ScrollPolicy.ON;
        this.chipsScroller.width = 140;
        this.chipsScroller.height = 96 * 4 + vLayout.gap*3;
        this.chipsScroller.viewport = group;
        this.addChild(this.chipsScroller);

        var chipArrowUp = new eui.Image(RES.getRes("chipArrow_png"));
        chipArrowUp.scaleY = -1;
        chipArrowUp.x = 47;
        chipArrowUp.y = 90;
        this.addChild(chipArrowUp);

        var chipArrowDown = new eui.Image(RES.getRes("chipArrow_png"));
        chipArrowDown.x = 47;
        chipArrowDown.y = 90 + 96 * 4 + vLayout.gap*3 + 3;
        this.addChild(chipArrowDown);

        this.chipsScroller.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveChipsScroller, this);
    }

    private onMoveChipsScroller() {
		
	}

    //打开直播
    public openLiveVideo(url) {
        this.liveVideo = new cmkj.LiveVideo(url, 0, 0, GameConfig.width, GameConfig.height);
    }

    /**
	 * 获取游戏状态信息
	 */
	private getGameState(event:egret.Event) {
		var gameStateInfo:GameStateInfo = event.data;
        this.tableID = gameStateInfo.getTableID();
	}

    //获取游戏开始状态
    private gameStateStart() {
        console.log("gameStateStart");
        this.clearBetInfo();
        this.removePokerLayer();
        this.showBetBtnView();
    }

    //获取游戏结束状态
    private gameStateStop() {
        this.removeBetBtnView();
    }

    //增加下注金额
    private addbetMoney(event) {
        var key = event.data.key;
        var value = event.data.value;
        console.info(key, value, "test");
        if(!this.betInfo[key]) {
            this.betInfo[key] = 0;
        }
        this.betInfo[key] = this.betInfo[key]+value;
    }
    
    //初始化路单
    private addRoad() {
        var gridWidth = 36;
        this.group_road = new BaccaratRoad(gridWidth, gridWidth);
        this.group_road.setTableID(this.tableID);
        this.group_road.x = this.width - this.group_road.width - 1;
        this.group_road.y = 350;
        this.addChild(this.group_road);

        egret.setTimeout(function() {
            egret.Tween.get(this.group_road, { loop: false }).to({x : this.width}, 300);
            this.isShowRoad = false;
        }, this, 1000);

        this.group_road.leftGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGroupRoad, this);
    }

    private onClickGroupRoad() {
        if(this.isShowRoad) {
            egret.Tween.get(this.group_road, { loop: false }).to({x : this.width}, 300);
            this.isShowRoad = false;
        } else {
            egret.Tween.get(this.group_road, { loop: false }).to({x : this.width - this.group_road.width - 1}, 300);
            this.isShowRoad = true;
        }
    }

    //初始化下注界面
    private addConfirmView() {
        this.betGroup = new eui.Group();
        this.betGroup.x = 500;
        this.betGroup.y = 300;
        var betBtn = new Button("comfirmBtn_png");
        var betType;
        if(Game.gameType == ProtobufManager.GameType.Baccarat) {
            betType = ProtobufManager.Subtype.ClassicBaccarat;
        } else if(Game.gameType == ProtobufManager.GameType.LongHu) {
            betType = ProtobufManager.Subtype.LongHu;
        }
        
        function onClickBetBtn() {
            GameServerManager.getInstance().bet(this.tableID, betType, this.betInfo);
            this.clearBetInfo();
        }
        betBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickBetBtn, this);
        this.betGroup.addChild(betBtn);

        var cancelBtn = new Button("cancelBtn_png");
        cancelBtn.x = 100;
        function onClickCancelBtn() {
            this.clearBetInfo();
        }
        cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickCancelBtn, this);
        this.betGroup.addChild(cancelBtn);

        var reBetBtn = new Button("rebetBtn_png");
        reBetBtn.x = 200;
        function onClickRebetBtn() {
            GameServerManager.getInstance().bet(this.tableID, betType, this.betInfo);
            this.clearBetInfo();
        }
        reBetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickRebetBtn, this);
        this.betGroup.addChild(reBetBtn);
    }

    //显示下注界面
    private showBetBtnView() {
        if(!this.betGroup.parent) {
            this.addChild(this.betGroup);
        }
    }

    //移除下注界面
    private removeBetBtnView() {
        if(this.betGroup.parent) {
            this.betGroup.parent.removeChild(this.betGroup);
        }
    }

    //清空下注金额
    private clearBetInfo() {
        this.betInfo = [];
    }

    //加载视频出错
    private loadVideoError() {
        Utils.alertView("加载视频出错");
    }

    //加载视频成功
    private loadedVideo() {
        if(this.bg.parent) {
            this.removeChild(this.bg);
        }
    }

    //添加一张显示的牌
    private addOnePoker(index, color, poker) {
        if(!this.pokerLayer.parent) {
            this.pokerLayer.bottom = 0;
            this.addChild(this.pokerLayer);
        }
        if(poker > 0) {
            switch(Game.gameType) {
                case ProtobufManager.GameType.Baccarat:
                    this.pokerLayer.addOnePoker(index, color, poker);
                    break;
                case ProtobufManager.GameType.LongHu:
                    this.pokerLayer.addOneLonghuPoker(index, color, poker);
                    break;
            }
            
        }
    }

    //显示牌的结果
    private showPoker(event) {
        var pokerString : string = event.data;
        if(pokerString != "") {
            var poker = pokerString.split("@");
            
            for(var i = 0; i < poker.length; i++) {
                var element = poker[i];
                var color = 0;
                var onePoker = 0;
                var onePokerArr = element.split("");
                if(element != "") {
                    var color = 0;
                    var onePoker = 0;
                    var pokerArr = element.split("");
                    if(onePokerArr.length >= 1) {
                        color = Number(onePokerArr[onePokerArr.length - 1]);
                        if(onePokerArr.length >= 3) {
                            onePoker = Number(onePokerArr[0] + onePokerArr[1]);
                        } else {
                            onePoker = Number(onePokerArr[0]);
                        }
                    }
                    this.addOnePoker(i, color, onePoker);
                }
                
            }
        }
    }

    private removePokerLayer() {
        if(this.pokerLayer.parent) {
            this.pokerLayer.removeChildren();
            this.pokerLayer.initShowPokerView();
            this.pokerLayer.reset();
            this.removeChild(this.pokerLayer);
        }
    }
}