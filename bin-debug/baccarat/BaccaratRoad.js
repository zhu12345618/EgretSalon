/**
 * 百家乐路单
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratRoad = (function (_super) {
    __extends(BaccaratRoad, _super);
    function BaccaratRoad(gridWidth, gridHeight) {
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.tableID = 0;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        _this.width = gridWidth * 12 + gridWidth / 2 * 28;
        _this.height = gridHeight * 6;
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    BaccaratRoad.prototype.setTableID = function (tableID) {
        this.tableID = tableID;
    };
    BaccaratRoad.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.UPDATE_GAME_WAYBILL, this.getGameWayInfo, this);
    };
    BaccaratRoad.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.UPDATE_GAME_WAYBILL, this.getGameWayInfo, this);
    };
    BaccaratRoad.prototype.init = function () {
        this.iniRoadScene();
        this.initAskRoad();
    };
    BaccaratRoad.prototype.iniRoadScene = function () {
        this.leftGroup = this.addStageNum(80, this.height);
        this.addChild(this.leftGroup);
        var bigLineNum = 26;
        var group = new eui.Group();
        group.mask = new egret.Rectangle(0, 0, this.gridWidth * 12 + this.gridWidth / 2 * bigLineNum, this.gridHeight * 6);
        this.markRoadScene = new MarkRoadScene(this.gridWidth, this.gridHeight, 12, 6);
        this.markRoadScene.setGameType(Game.gameType);
        group.addChild(this.markRoadScene);
        this.bigRoadScene = new BigRoadScene(this.gridWidth / 2, this.gridHeight / 2, bigLineNum, 6);
        this.bigRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        function onBigRoadSceneClick() {
            console.info("onBigRoadSceneClick");
        }
        this.bigRoadScene.addEventListener(egret.TouchEvent.TOUCH_TAP, onBigRoadSceneClick, this);
        group.addChild(this.bigRoadScene);
        this.jyRoadScene = new JyRoadScene(this.gridWidth / 2, this.gridHeight / 2, bigLineNum, 3);
        this.jyRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.jyRoadScene.y = this.bigRoadScene.y + this.bigRoadScene.height;
        function onJyRoadSceneClick() {
            if (this.jyRoadScene.scaleX > 1) {
                egret.Tween.get(this.jyRoadScene).to({ scaleX: 1, scaleY: 1 }, 200).
                    call(group.setChildIndex, group, [this.jyRoadScene, 1]);
                this.jyRoadScene.lineNum *= 2;
            }
            else {
                egret.Tween.get(this.jyRoadScene).to({ scaleX: 2, scaleY: 2 }, 200);
                group.setChildIndex(this.jyRoadScene, 10);
                this.jyRoadScene.lineNum /= 2;
            }
            this.jyRoadScene.moveAll();
        }
        this.jyRoadScene.addEventListener(egret.TouchEvent.TOUCH_TAP, onJyRoadSceneClick, this);
        group.addChild(this.jyRoadScene);
        this.smallRoadScene = new SmallRoadScene(this.gridWidth / 2, this.gridHeight / 2, bigLineNum / 2, 3);
        this.smallRoadScene.x = this.markRoadScene.x + this.markRoadScene.width;
        this.smallRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        function onSmallRoadSceneClick() {
            if (this.smallRoadScene.scaleX > 1) {
                egret.Tween.get(this.smallRoadScene).
                    to({ y: this.jyRoadScene.y + this.jyRoadScene.height, scaleX: 1, scaleY: 1 }, 200).
                    call(group.setChildIndex, group, [this.smallRoadScene, 1]);
                this.smallRoadScene.lineNum *= 2;
            }
            else {
                egret.Tween.get(this.smallRoadScene).
                    to({ y: this.jyRoadScene.y, scaleX: 2, scaleY: 2 }, 200);
                group.setChildIndex(this.smallRoadScene, 10);
                this.smallRoadScene.lineNum /= 2;
            }
            this.smallRoadScene.moveAll();
        }
        this.smallRoadScene.addEventListener(egret.TouchEvent.TOUCH_TAP, onSmallRoadSceneClick, this);
        group.addChild(this.smallRoadScene);
        this.zlRoadScene = new ZlRoadScene(this.gridWidth / 2, this.gridHeight / 2, bigLineNum / 2, 3);
        this.zlRoadScene.x = this.smallRoadScene.x + this.smallRoadScene.width;
        this.zlRoadScene.y = this.jyRoadScene.y + this.jyRoadScene.height;
        function onZlRoadSceneClick() {
            if (this.zlRoadScene.scaleX > 1) {
                egret.Tween.get(this.zlRoadScene).
                    to({ x: this.smallRoadScene.x + this.smallRoadScene.width, y: this.jyRoadScene.y + this.jyRoadScene.height, scaleX: 1, scaleY: 1 }, 200).
                    call(group.setChildIndex, group, [this.zlRoadScene, 1]);
                this.zlRoadScene.lineNum *= 2;
            }
            else {
                egret.Tween.get(this.zlRoadScene).
                    to({ x: this.markRoadScene.x + this.markRoadScene.width, y: this.jyRoadScene.y, scaleX: 2, scaleY: 2 }, 200);
                group.setChildIndex(this.zlRoadScene, 10);
                this.jyRoadScene.lineNum /= 2;
            }
            this.zlRoadScene.moveAll();
        }
        this.zlRoadScene.addEventListener(egret.TouchEvent.TOUCH_TAP, onZlRoadSceneClick, this);
        group.addChild(this.zlRoadScene);
        this.addChild(group);
    };
    BaccaratRoad.prototype.initAskRoad = function () {
        this.askRoadLayer = new BaccaratAskRoadLayer();
        this.askRoadLayer.right = 0;
        this.askRoadLayer.scaleX = 0.88;
        this.askRoadLayer.scaleY = 0.88;
        this.askRoadLayer.bankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.info("bankerGroup");
            this.addNextWay("a");
        }, this);
        this.askRoadLayer.playerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.info("playerGroup");
            this.addNextWay("e");
        }, this);
        this.addChild(this.askRoadLayer);
        this.setChildIndex(this.askRoadLayer, 100);
    };
    BaccaratRoad.prototype.getGameWayInfo = function (event) {
        var data = event.data;
        if (this.tableID == data.tableID) {
            var ways = data.getWay();
            this.addWays(ways);
            this.setResult(data.counts);
            this.askRoadLayer.setResult(this.getNextCode());
        }
    };
    BaccaratRoad.prototype.getNextCode = function () {
        return this.jyRoadScene.getNextCode("a") +
            this.smallRoadScene.getNextCode("a") +
            this.zlRoadScene.getNextCode("a");
    };
    BaccaratRoad.prototype.addWays = function (ways) {
        this.markRoadScene.addWithString(ways);
        this.bigRoadScene.addWithString(ways);
        this.jyRoadScene.addWithString(ways);
        this.smallRoadScene.addWithString(ways);
        this.zlRoadScene.addWithString(ways);
    };
    BaccaratRoad.prototype.addNextWay = function (way) {
        this.markRoadScene.addNextString(way);
        this.bigRoadScene.addNextString(way);
        this.jyRoadScene.addNextString(way);
        this.smallRoadScene.addNextString(way);
        this.zlRoadScene.addNextString(way);
    };
    BaccaratRoad.prototype.setResult = function (counts) {
        var countArray = counts.split("^");
        this.playerNumLabel.text = countArray[0];
        this.bankerNumLabel.text = countArray[1];
        this.tieNumLabel.text = countArray[2];
    };
    //初始化局数
    BaccaratRoad.prototype.addStageNum = function (width, height) {
        var group = new eui.Group();
        group.x = -width;
        group.width = width;
        group.height = height;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, width, height);
        bg.graphics.beginFill(0xff0000);
        bg.graphics.drawCircle(width * 2 / 3, height / 2 - 45, width / 4);
        bg.graphics.beginFill(0x3a40fa);
        bg.graphics.drawCircle(width * 2 / 3, height / 2, width / 4);
        bg.graphics.beginFill(0x19910d);
        bg.graphics.drawCircle(width * 2 / 3, height / 2 + 45, width / 4);
        bg.graphics.endFill();
        group.addChild(bg);
        var arrow = new eui.Image(RES.getRes("chipArrow_png"));
        arrow.rotation = 90;
        arrow.x = 24;
        arrow.verticalCenter = 0;
        function addLabel(y) {
            var label = new eui.Label("00");
            label.width = width / 2;
            label.height = width / 2;
            label.anchorOffsetX = label.width / 2;
            label.anchorOffsetY = label.height / 2;
            label.x = width * 2 / 3;
            label.y = y;
            label.size = width / 3;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            group.addChild(label);
            return label;
        }
        this.bankerNumLabel = addLabel(height / 2 - 45);
        this.playerNumLabel = addLabel(height / 2);
        this.tieNumLabel = addLabel(height / 2 + 45);
        group.addChild(arrow);
        return group;
    };
    return BaccaratRoad;
}(eui.Component));
__reflect(BaccaratRoad.prototype, "BaccaratRoad");
//# sourceMappingURL=BaccaratRoad.js.map