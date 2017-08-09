/**
 *  联合百家乐
 */
class UnionBaccarat extends eui.Component {
    private videoBg : eui.Image;
    private markRoadScene : MarkRoadScene;
    private bigRoadScene : BigRoadScene;
    private smallRoadScene : SmallRoadScene;
    private jyRoadScene : JyRoadScene;
    private zlRoadScene : ZlRoadScene;

    private playerBtn : eui.Image;
    private bankerBtn : eui.Image;
    private playerPBtn : eui.Image;
    private bankerPBtn : eui.Image;
    private tieBtn : eui.Image;
    
    private GameStateInfo : GameStateInfo;

    protected isStart = false;
	protected isStop = false;

    private tableID : number = 0;

    private liveVideo : cmkj.LiveVideo;

    constructor() {
        super();

        this.width = (GameConfig.width-10)/3;
        this.height = 590;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    public onAddtoStage(): void {
        this.init();
        EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
        EventDispatcher.getInstance().addEventListener(Events.UPDATE_GAME_WAYBILL, this.getGameTableHistory, this);
        EventDispatcher.getInstance().addEventListener(Events.LOAD_LIVEVIDEO_ERROR, this.loadVideoError, this);
        EventDispatcher.getInstance().addEventListener(Events.LOADED_LIVEVIDEO, this.loadedVideo, this);
	}

	public onRemoveFromStage(): void {
        this.closeLiveVideo();
        EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
        EventDispatcher.getInstance().addEventListener(Events.LOAD_LIVEVIDEO_ERROR, this.loadVideoError, this);
        EventDispatcher.getInstance().addEventListener(Events.LOADED_LIVEVIDEO, this.loadedVideo, this);
	}

    private init() {
        this.openLiveVideo("tfappa.tf11683.com:81/tpy/mtable3");
        this.addHead();
        this.addBet();
        this.addRoad();
        this.addRight();
    }

    //打开直播
    public openLiveVideo(url) {
        this.videoBg = new eui.Image("videoFristImg_png");
        console.log(this.videoBg.x);
        this.videoBg.y = 55;
        this.videoBg.width = this.width;
        this.videoBg.height = 300;
        this.addChild(this.videoBg);
        this.liveVideo = new cmkj.LiveVideo(url, this.x, 55, this.width, 300);
    }

    //关闭直播
    private closeLiveVideo() {
        this.liveVideo.closeLiveVideo();
    }

    private addHead() {
        var head :eui.Image = new eui.Image(RES.getRes("unionBaccaratHead_png"));
        head.width = this.width;
        this.addChild(head);
    }

    private addBet() {
        var group = new eui.Group();
        group.y = 240;
        this.addChild(group);
        this.playerBtn = new eui.Image();
        this.playerBtn.texture = RES.getRes("unionBaccaratPlayer_png");
        this.playerBtn.x = 28;
        this.playerBtn.width = 157;
        this.playerBtn.height = 40;
        this.playerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPlayerBtn, this);
        group.addChild(this.playerBtn);

        this.bankerBtn = new eui.Image();
        this.bankerBtn.texture = RES.getRes("unionBaccaratBanker_png");
        this.bankerBtn.x = 186;
        this.bankerBtn.width = 160;
        this.bankerBtn.height = 40;
        group.addChild(this.bankerBtn);

        this.playerPBtn = new eui.Image();
        this.playerPBtn.texture = RES.getRes("unionBaccaratPlayerP_png");
        this.playerPBtn.x = 20;
        this.playerPBtn.y = 41;
        this.playerPBtn.width = 110;
        this.playerPBtn.height = 40;
        group.addChild(this.playerPBtn);

        this.tieBtn = new eui.Image();
        this.tieBtn.texture = RES.getRes("unionBaccaratTie_png");
        this.tieBtn.x = 130;
        this.tieBtn.y = 41;
        this.tieBtn.width = 110;
        this.tieBtn.height = 40;
        group.addChild(this.tieBtn);

        this.bankerPBtn = new eui.Image();
        this.bankerPBtn.texture = RES.getRes("unionBaccaratBankerP_png");
        this.bankerPBtn.x = 240;
        this.bankerPBtn.y = 41;
        this.bankerPBtn.width = 110;
        this.bankerPBtn.height = 40;
        group.addChild(this.bankerPBtn);
    }

    private onClickPlayerBtn() {
         var detail = [];
        detail[101] = 500;
        GameServerManager.getInstance().bet(
            2,
            ProtobufManager.Subtype.ChainBaccarat,
            detail);
    }

    private addRight() {
        var group = new eui.Group();
        group.bottom = -1;
        group.right = 0;
        this.addChild(group);

        var bar : eui.Image = new eui.Image(RES.getRes("unionBaccaratRightSideBar_png"));
        bar.width = 17;
        bar.height = 230;
        group.addChild(bar);

        function addComponent(res : string, y) {
            var width = 11.2, height = 11.2;
            var component : eui.Image = new eui.Image(RES.getRes(res));
            component.horizontalCenter = 0;
            component.y = y;
            component.width = width;
            component.height = height;
            group.addChild(component);
        }

        addComponent("unionBaccaratRightSideBanker_png", 60);
        addComponent("unionBaccaratRightSideRedCir1_png", 74);
        addComponent("unionBaccaratRightSideRedCir2_png", 88);
        addComponent("unionBaccaratRightSideRedLine_png", 102);
        addComponent("unionBaccaratRightSidePlayer_png", 120);
        addComponent("unionBaccaratRightSideBlueCir1_png", 134);
        addComponent("unionBaccaratRightSideBlueCir2_png", 148);
        addComponent("unionBaccaratRightSideBlueLine_png", 160);
    }

    /**
     * 增加路单数据
     */
    private addRoad() {
        var gridWidth = 17.8,gridHeight = 19, lineNum = 20, columnNum = 6;

        var group = new eui.Group();
        group.bottom = 0;
        group.width = gridWidth*lineNum;
        group.height = gridHeight*columnNum*2;
        this.addChild(group);

        var way = "abdfgadlifhjfhkk";
        var rect = new eui.Rect(gridWidth*lineNum, gridHeight*columnNum*2, 0xffffff);
        group.addChild(rect);

        this.bigRoadScene = new BigRoadScene(gridWidth, gridHeight, lineNum, columnNum);
        group.addChild(this.bigRoadScene);
        
        this.markRoadScene = new MarkRoadScene(gridWidth, gridHeight, lineNum/2, columnNum);
        this.markRoadScene.y = this.bigRoadScene.y + this.bigRoadScene.height;
        group.addChild(this.markRoadScene);

        this.smallRoadScene = new SmallRoadScene(gridWidth/2, gridHeight/2, lineNum, columnNum);
        this.smallRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.smallRoadScene.y = this.bigRoadScene.y + this.bigRoadScene.height;
        this.smallRoadScene.setRatio(1);
        group.addChild(this.smallRoadScene);

        this.jyRoadScene = new JyRoadScene(gridWidth/2, gridHeight/2, lineNum/2, columnNum);
        this.jyRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.jyRoadScene.y = this.smallRoadScene.y + this.smallRoadScene.height;
        this.jyRoadScene.setRatio(1);
        group.addChild(this.jyRoadScene);

        this.zlRoadScene = new ZlRoadScene(gridWidth/2, gridHeight/2, lineNum/2, columnNum);
        this.zlRoadScene.x = this.jyRoadScene.x + this.jyRoadScene.width;
        this.zlRoadScene.y = this.smallRoadScene.y + this.smallRoadScene.height;
        this.zlRoadScene.setRatio(1);
        group.addChild(this.zlRoadScene);
    }

    public setTableID(tableID : number) {
        this.tableID = tableID;
    }

    public getTableID() : number {
        return this.tableID;
    }

    /**
	 * 获取游戏状态信息
	 */
	private getGameState(event:egret.Event) {
		
		var gameStateInfo:GameStateInfo = event.data;
		console.log(gameStateInfo.getStatus(), "gameStateInfo.getStatus()");
        if(gameStateInfo.getTableID() != this.getTableID()) {
            return ;
        }

		switch(gameStateInfo.getStatus()) {

		case GAMESTATE.SHUFFLE:
			this.getGameStateShuffle();
			break;
		case GAMESTATE.START:
			this.getGameStateStart();
			break;
		case GAMESTATE.STOP:
			this.getGameStateStop();
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
			this.alertView("开始");
			var event = egret.Event.create(egret.Event, Events.GAME_STATE_START);
			EventDispatcher.getInstance().dispatchEvent(event);

			var removeBetAreaAndBetAmountEvent = egret.Event.create(egret.Event, Events.REMOVE_BETAREA_AND_BETAMOUT);
			EventDispatcher.getInstance().dispatchEvent(removeBetAreaAndBetAmountEvent);

			var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
			setBetBtnCanClickEvent.data = true;
			EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);
			this.isStop = false;

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
	private getGameStateStop() {
		if (!this.isStop) {
			this.isStart = false;
			this.alertView("停止");
			var event = egret.Event.create(egret.Event, Events.GAME_STATE_TOP);
			EventDispatcher.getInstance().dispatchEvent(event);

			var removeAllMaskEvent = egret.Event.create(egret.Event, Events.REMOVE_ALL_MASK);
			EventDispatcher.getInstance().dispatchEvent(removeAllMaskEvent);

			var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
			setBetBtnCanClickEvent.data = false;
			EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);

			this.isStop = true;
			SoundEffectMgr.playSound("Betting_Stopped_mp3");
		}
		
	}

	/**
	 * 获取结果
	 */
	protected getGameStateResult(result) {
		var event = egret.Event.create(egret.Event, Events.GET_GAME_RESULT);
		event.data = result;
		EventDispatcher.getInstance().dispatchEvent(event);
		SoundEffectMgr.playSound("Display_Result_mp3");

        var resultJson = RES.getRes("baccaratResult_json");
		this.alertView(resultJson[result]);
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
        
        var rect = new eui.Rect(250, 30, 0x000000);
        rect.alpha = 0.4;
        rect.x = 75;
        rect.y = 300;

        var label : eui.Label = new eui.Label();
        label.size = rect.height*2/3;
        label.width = rect.width;
        label.height = rect.height;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.anchorOffsetX = rect.width/2;
        label.anchorOffsetY = label.size/2;
        label.x = rect.width/2;
        label.y = label.height/2;
        label.text = msg;
        
        rect.addChild(label);
        this.addChild(rect);

        egret.setTimeout(function() {
            if(rect.parent) {
                rect.parent.removeChild(rect);
            }
        }, this, 2000);
	}

    /**
     * 获取游戏路单信息
     */
    private getGameTableHistory(event : egret.Event) {
        var gameTablehistory : GameTableHistory = event.data;
        if(gameTablehistory.getTableID() != this.getTableID()) {
            return ;
        }
        console.log(gameTablehistory, "gameTablehistory");
        this.markRoadScene.addWithString(gameTablehistory.getWay());
        this.bigRoadScene.addWithString(gameTablehistory.getWay());
        this.jyRoadScene.addWithString(gameTablehistory.getWay());
        this.smallRoadScene.addWithString(gameTablehistory.getWay());
        this.zlRoadScene.addWithString(gameTablehistory.getWay());
    }

    //加载视频出错
    private loadVideoError() {
        Utils.alertView("加载视频出错");
    }

    //加载视频成功
    private loadedVideo(event) {
        if(this.videoBg.parent && this.liveVideo.getIframeId() == event.data) {
            this.removeChild(this.videoBg);
        }
    }
}