/**
 * 百家乐下注按钮
 */

class BaccaratBetBtn extends eui.Component {
    private betBtn : eui.Component;
    private label : eui.Label;
    private text : string;

    private key : number;
    private isBetting : boolean = false;
    public currentBetChip : number = 0;

    private betInfoGroup : eui.Group = new eui.Group();

    constructor(key : number, text : string, width : number, labelSize, labelColor) {
        super();
        this.setKey(key);
        this.setText(text);
        this.width = width;
        this.height = 195;
        this.init(labelSize, labelColor);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        
	}

    private onAddtoStage(event:egret.Event) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().addEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateChips, this);
        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_CURRENT_BET_CHIP_NUM, this.getCurrentBetChipNumEvent, this);
	}

    private onRemoveFromStage(event:egret.Event) {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().removeEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateChips, this);
        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().removeEventListener(Events.GET_CURRENT_BET_CHIP_NUM, this.getCurrentBetChipNumEvent, this);
	}

    private setText(text : string) {
        this.text = text;
    }

    private getText() {
        return this.text;
    }

    private setKey(key : number) {
        this.key = key;
    }

    private getKey() {
        return this.key;
    }

    private onClick() {
        if(this.isBetting) {
            this.addbetMoney(this.getKey(), this.currentBetChip);
        }
    }


    //更新下注筹码
    private updateChips(event) {
        var table = event.data;
        this.betInfoGroup.touchEnabled = false;
        this.betInfoGroup.touchChildren = false;
        this.betInfoGroup.removeChildren();

        function addUserNameLabel(text, x, width, height, color = 0xd8be72, size) {
            var label = new eui.Label(text);
            label.size = size;
            label.textAlign = egret.HorizontalAlign.RIGHT;
            
            label.anchorOffsetX = width;
            label.anchorOffsetY = height/2;
            label.width = width;
            label.height = height;
            
            label.x = x;
            label.textColor = color;

            label.verticalCenter = 0;

            return label;
        }

        function addBanlanceLabel(text, x, size) {
            text = text || "0";
            var label = new eui.Label(text);
            
            label.size = size;
            label.x = x;

            label.verticalCenter = 0;
            return label;
        }

        function addGroup(x, y, width, height) {
            var group = new eui.Group();
            group.touchEnabled = false;
            group.touchChildren = false;
            group.x = x;
            group.y = y;
            group.width = width;
            group.height = height;

            return group;
        }

        function addOneInfoBg(width, height) {
            var rect = new egret.Shape();
            rect.graphics.beginFill(0x000000, 0.9);
            rect.graphics.drawRoundRect(0, 0, width, height, 20, 20);
            rect.graphics.endFill();
            return rect;
        }

        function addBetInfoImage(index, x) {
            var image = new eui.Image(RES.getRes("betInfo" + index + "_png"));
            image.x = x;
            return image;
        }
        var group = addGroup(0, 0, this.width, this.height);
        for(var i = 0; i < table.maxSeatNum; i++) {
            var seat = table.seats[i+1];
            if(seat.isSeat) {
                var isSelf = HallUserInfo.getInstance().getName() == seat.uname;
                var size = isSelf ? 20 : 15;
                var color = isSelf ? 0xffecb6 : 0xd8be72;

                var oneInfoGroup = addGroup(0, (seat.seatID - 1)*(150/6) + 5, group.width-6, 25);
                oneInfoGroup.horizontalCenter = 0;
                oneInfoGroup.addChild(addOneInfoBg(oneInfoGroup.width, oneInfoGroup.height));
                oneInfoGroup.addChild(addBetInfoImage(seat.seatID, oneInfoGroup.width/2 - 75));
                
                //闲=101,庄=102,和=103,闲对=104,庄对=105,s6=126
                var betInfo = seat.betinfo[this.getKey()];
                var label = addUserNameLabel(this.textAbbreviation(seat.uname), oneInfoGroup.width/2, oneInfoGroup.width/2, size, color, size);
                oneInfoGroup.addChild(label);
                oneInfoGroup.addChild(addBanlanceLabel(betInfo, oneInfoGroup.width/2+10, size));
                group.addChild(oneInfoGroup);
                this.betInfoGroup.addChild(group);
            }
        }
    }

    //将文本省略化
    private textAbbreviation(text : string) {
        var abbrText = text.substr(text.length - 2, text.length);
        return "***"+abbrText;
    }

    //增加下注金额
    private addbetMoney(key, value : number) {
        EventDispatcher.getInstance().sendDataEvent(Events.ADD_BETAREA_AND_BETAMOUNT, {key : key, value : value});
    }

    /**
     * 更新语言
     */
    private updateLanguage() {
        this.label.text = Lang.getStr(this.getText());
    }

    private init(labelSize, labelColor) {
        this.initBetBtn(labelSize, labelColor);
        this.initBetInfoGroup();
    }

    private initBetBtn(labelSize, labelColor) {
        this.betBtn = new eui.Component();
        this.betBtn.width = this.width;
        this.betBtn.height = this.height;
        var betBtnBg = new eui.Image(RES.getRes("betBtnBg_png"));
        betBtnBg.scale9Grid = new egret.Rectangle(5, 5, 5, 5);
        betBtnBg.width = this.width;
        betBtnBg.height = this.height;
        this.betBtn.addChild(betBtnBg);

        this.label = new eui.Label();
        this.label.text = Lang.getStr(this.getText());
        this.label.size = labelSize;
        this.label.bottom = (32 - labelSize)/2;
        this.label.horizontalCenter = 0;
        this.label.textColor = labelColor;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.betBtn.addChild(this.label);
        this.addChild(this.betBtn);
    }

    private initBetInfoGroup() {
        this.addChild(this.betInfoGroup);
    }
    
    //获取筹码的值
    private getCurrentBetChipNumEvent(event) {
        this.currentBetChip = event.data;
    }

    //获取游戏开始状态
    private gameStateStart() {
        this.isBetting = true;
    }

    //获取游戏结束状态
    private gameStateStop() {
        this.isBetting = false;
    }
}