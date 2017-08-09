var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OneRoadMap = (function (_super) {
    __extends(OneRoadMap, _super);
    function OneRoadMap(gameType) {
        var _this = _super.call(this) || this;
        _this.bgLineColor = 0x333333;
        _this.label_red = new eui.Label();
        _this.label_blue = new eui.Label();
        _this.label_tie = new eui.Label();
        _this.skinName = "resource/baccarat/OneRoadMapSkin.exml";
        _this.setGameType(gameType);
        _this.initRoad();
        _this.initBg();
        _this.initTableID();
        _this.initShoeId();
        _this.initCount(_this.label_red, 1000, 0xff0000);
        _this.initCount(_this.label_blue, 1040, 0x2e3192);
        _this.initCount(_this.label_tie, 1080, 0x19910d);
        _this.updateLang();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveStage, _this);
        return _this;
    }
    OneRoadMap.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_HALL_STATE_INFO, this.getHallStateInfo, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickBtnEnter, this);
    };
    OneRoadMap.prototype.onRemoveStage = function () {
        EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_STATE_INFO, this.getHallStateInfo, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickBtnEnter, this);
    };
    OneRoadMap.prototype.initBg = function () {
        var roadBg = new egret.Bitmap();
        roadBg.texture = RES.getRes("baccaratHallRoadBg_png");
        roadBg.fillMode = egret.BitmapFillMode.REPEAT;
        roadBg.width *= 1116 / 45;
        this.addChild(roadBg);
        this.drawRect(0, 0, this.width, this.height);
    };
    OneRoadMap.prototype.initTableID = function () {
        this.tableIDLabel = new eui.Label();
        this.tableIDLabel.x = 5;
        this.tableIDLabel.y = 4;
        this.addChild(this.tableIDLabel);
    };
    OneRoadMap.prototype.initShoeId = function () {
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
        var userInfo = HallUserInfo.getInstance();
        var limitText = userInfo.getOtherMinBetLimit() + "-" + userInfo.getOtherMaxBetLimit();
        this.limitLabel.x = 580;
        this.limitLabel.text = limitText;
        //测试性移除
        // this.addChild(this.limitLabel);
    };
    OneRoadMap.prototype.getUserInfo = function () {
        var userInfo = HallUserInfo.getInstance();
        var limitText = userInfo.getOtherMinBetLimit() + "-" + userInfo.getOtherMaxBetLimit();
        this.limitLabel.text = limitText;
    };
    /**
     * 设置游戏类型
     */
    OneRoadMap.prototype.setGameType = function (gameType) {
        this.gameType = gameType;
    };
    OneRoadMap.prototype.getGameType = function () {
        return this.gameType;
    };
    OneRoadMap.prototype.initHallstateInfo = function () {
        if (this.tableID) {
            var data = HallTableInfoManager.getInstance().getHallOneTableInfo(this.getGameType(), this.tableID);
            this.shoeIdLabel.text = data.stage + "-" + data.inning;
            this.tableIDLabel.text = data.tableID + "";
            this.addWays(data.allWays);
            this.setResult(data.counts);
        }
    };
    OneRoadMap.prototype.getHallStateInfo = function (event) {
        var data = event.data;
        if (this.tableID == data.tableID && data.gameType == this.getGameType()) {
            this.shoeIdLabel.text = data.stage + "-" + data.inning;
            this.tableIDLabel.text = data.tableID + "";
            var ways = data.getWays();
            this.addWays(ways);
            this.setResult(data.counts);
        }
    };
    OneRoadMap.prototype.initCount = function (label, x, bgColor) {
        var width = 16;
        var shape = new egret.Shape();
        shape.graphics.beginFill(bgColor);
        shape.graphics.drawCircle(x, width + 1, width);
        shape.graphics.endFill();
        this.addChild(shape);
        label.x = x;
        label.y = width;
        label.size = width;
        label.anchorOffsetX = width;
        label.anchorOffsetY = width / 2;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.width = width * 2;
        label.height = width;
        label.text = "0";
        this.addChild(label);
    };
    OneRoadMap.prototype.drawRect = function (x, y, width, height, size) {
        if (size === void 0) { size = 3; }
        var shp = new egret.Shape();
        shp.graphics.lineStyle(size, this.bgLineColor);
        shp.graphics.moveTo(x, y);
        shp.graphics.lineStyle(size * 2, this.bgLineColor);
        shp.graphics.lineTo(width, y);
        shp.graphics.lineStyle(size * 2, this.bgLineColor);
        shp.graphics.lineTo(width, height - size);
        shp.graphics.lineStyle(size, this.bgLineColor);
        shp.graphics.moveTo(width, height);
        shp.graphics.lineTo(x, height);
        shp.graphics.lineStyle(size * 2, this.bgLineColor);
        shp.graphics.moveTo(x, height - size);
        shp.graphics.lineTo(x, y);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    OneRoadMap.prototype.initRoad = function () {
        var width = 34.9;
        this.markRoadScene = new MarkRoadScene(width, width, 12, 6);
        this.markRoadScene.setGameType(this.getGameType());
        this.group_road.addChild(this.markRoadScene);
        this.bigRoadScene = new BigRoadScene(width / 2, width / 2, 40, 6);
        this.bigRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.group_road.addChild(this.bigRoadScene);
        this.jyRoadScene = new JyRoadScene(width / 2, width / 2, 40, 3);
        this.jyRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.jyRoadScene.y = this.bigRoadScene.y + this.bigRoadScene.height;
        this.group_road.addChild(this.jyRoadScene);
        this.smallRoadScene = new SmallRoadScene(width / 2, width / 2, 20, 3);
        this.smallRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.smallRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        this.group_road.addChild(this.smallRoadScene);
        this.zlRoadScene = new ZlRoadScene(width / 2, width / 2, 20, 3);
        this.zlRoadScene.x = this.smallRoadScene.x + this.smallRoadScene.width;
        this.zlRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        this.group_road.addChild(this.zlRoadScene);
    };
    OneRoadMap.prototype.updateLang = function () {
        this.shoeIdPreLabel.text = Lang.getStr('TEXT_SHOEID');
    };
    OneRoadMap.prototype.onClickBtnEnter = function () {
        var tableId = this.tableID;
        Game.gameType = this.getGameType();
        BaccaratGame.baccaratType = ProtobufManager.JoinType.VipTable;
        BaccaratGame.tableId = tableId;
        GameServerManager.getInstance().gameLogin(this.getGameType(), tableId);
    };
    OneRoadMap.prototype.setTableID = function (tableID) {
        this.tableID = tableID;
    };
    OneRoadMap.prototype.addWays = function (ways) {
        this.markRoadScene.addWithString(ways);
        this.bigRoadScene.addWithString(ways);
        this.jyRoadScene.addWithString(ways);
        this.smallRoadScene.addWithString(ways);
        this.zlRoadScene.addWithString(ways);
    };
    OneRoadMap.prototype.setResult = function (counts) {
        var countArray = counts.split("^");
        if (countArray.length >= 2) {
            this.label_blue.text = countArray[0];
            this.label_red.text = countArray[1];
            this.label_tie.text = countArray[2];
        }
        else {
            this.label_blue.text = "0";
            this.label_red.text = "0";
            this.label_tie.text = "0";
        }
    };
    return OneRoadMap;
}(eui.Component));
__reflect(OneRoadMap.prototype, "OneRoadMap");
//# sourceMappingURL=OneRoadMap.js.map