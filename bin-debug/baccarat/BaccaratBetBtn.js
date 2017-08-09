/**
 * 百家乐下注按钮
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratBetBtn = (function (_super) {
    __extends(BaccaratBetBtn, _super);
    function BaccaratBetBtn(key, text, width, labelSize, labelColor) {
        var _this = _super.call(this) || this;
        _this.isBetting = false;
        _this.currentBetChip = 0;
        _this.betInfoGroup = new eui.Group();
        _this.setKey(key);
        _this.setText(text);
        _this.width = width;
        _this.height = 195;
        _this.init(labelSize, labelColor);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    BaccaratBetBtn.prototype.onAddtoStage = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().addEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateChips, this);
        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().addEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_CURRENT_BET_CHIP_NUM, this.getCurrentBetChipNumEvent, this);
    };
    BaccaratBetBtn.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().removeEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateChips, this);
        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_START, this.gameStateStart, this);
        EventDispatcher.getInstance().removeEventListener(Events.GAME_STATE_TOP, this.gameStateStop, this);
        EventDispatcher.getInstance().removeEventListener(Events.GET_CURRENT_BET_CHIP_NUM, this.getCurrentBetChipNumEvent, this);
    };
    BaccaratBetBtn.prototype.setText = function (text) {
        this.text = text;
    };
    BaccaratBetBtn.prototype.getText = function () {
        return this.text;
    };
    BaccaratBetBtn.prototype.setKey = function (key) {
        this.key = key;
    };
    BaccaratBetBtn.prototype.getKey = function () {
        return this.key;
    };
    BaccaratBetBtn.prototype.onClick = function () {
        if (this.isBetting) {
            this.addbetMoney(this.getKey(), this.currentBetChip);
        }
    };
    //更新下注筹码
    BaccaratBetBtn.prototype.updateChips = function (event) {
        var table = event.data;
        this.betInfoGroup.touchEnabled = false;
        this.betInfoGroup.touchChildren = false;
        this.betInfoGroup.removeChildren();
        function addUserNameLabel(text, x, width, height, color, size) {
            if (color === void 0) { color = 0xd8be72; }
            var label = new eui.Label(text);
            label.size = size;
            label.textAlign = egret.HorizontalAlign.RIGHT;
            label.anchorOffsetX = width;
            label.anchorOffsetY = height / 2;
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
        for (var i = 0; i < table.maxSeatNum; i++) {
            var seat = table.seats[i + 1];
            if (seat.isSeat) {
                var isSelf = HallUserInfo.getInstance().getName() == seat.uname;
                var size = isSelf ? 20 : 15;
                var color = isSelf ? 0xffecb6 : 0xd8be72;
                var oneInfoGroup = addGroup(0, (seat.seatID - 1) * (150 / 6) + 5, group.width - 6, 25);
                oneInfoGroup.horizontalCenter = 0;
                oneInfoGroup.addChild(addOneInfoBg(oneInfoGroup.width, oneInfoGroup.height));
                oneInfoGroup.addChild(addBetInfoImage(seat.seatID, oneInfoGroup.width / 2 - 75));
                //闲=101,庄=102,和=103,闲对=104,庄对=105,s6=126
                var betInfo = seat.betinfo[this.getKey()];
                var label = addUserNameLabel(this.textAbbreviation(seat.uname), oneInfoGroup.width / 2, oneInfoGroup.width / 2, size, color, size);
                oneInfoGroup.addChild(label);
                oneInfoGroup.addChild(addBanlanceLabel(betInfo, oneInfoGroup.width / 2 + 10, size));
                group.addChild(oneInfoGroup);
                this.betInfoGroup.addChild(group);
            }
        }
    };
    //将文本省略化
    BaccaratBetBtn.prototype.textAbbreviation = function (text) {
        var abbrText = text.substr(text.length - 2, text.length);
        return "***" + abbrText;
    };
    //增加下注金额
    BaccaratBetBtn.prototype.addbetMoney = function (key, value) {
        EventDispatcher.getInstance().sendDataEvent(Events.ADD_BETAREA_AND_BETAMOUNT, { key: key, value: value });
    };
    /**
     * 更新语言
     */
    BaccaratBetBtn.prototype.updateLanguage = function () {
        this.label.text = Lang.getStr(this.getText());
    };
    BaccaratBetBtn.prototype.init = function (labelSize, labelColor) {
        this.initBetBtn(labelSize, labelColor);
        this.initBetInfoGroup();
    };
    BaccaratBetBtn.prototype.initBetBtn = function (labelSize, labelColor) {
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
        this.label.bottom = (32 - labelSize) / 2;
        this.label.horizontalCenter = 0;
        this.label.textColor = labelColor;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.betBtn.addChild(this.label);
        this.addChild(this.betBtn);
    };
    BaccaratBetBtn.prototype.initBetInfoGroup = function () {
        this.addChild(this.betInfoGroup);
    };
    //获取筹码的值
    BaccaratBetBtn.prototype.getCurrentBetChipNumEvent = function (event) {
        this.currentBetChip = event.data;
    };
    //获取游戏开始状态
    BaccaratBetBtn.prototype.gameStateStart = function () {
        this.isBetting = true;
    };
    //获取游戏结束状态
    BaccaratBetBtn.prototype.gameStateStop = function () {
        this.isBetting = false;
    };
    return BaccaratBetBtn;
}(eui.Component));
__reflect(BaccaratBetBtn.prototype, "BaccaratBetBtn");
//# sourceMappingURL=BaccaratBetBtn.js.map