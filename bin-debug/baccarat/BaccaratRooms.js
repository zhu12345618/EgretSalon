var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//游戏换桌界面
var BaccaratRooms = (function (_super) {
    __extends(BaccaratRooms, _super);
    function BaccaratRooms(tableId) {
        var _this = _super.call(this) || this;
        _this.tableId = 0;
        _this.setTableId(tableId);
        _this.width = 342;
        _this.height = 640;
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveStage, _this);
        return _this;
    }
    BaccaratRooms.prototype.onAddtoStage = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    BaccaratRooms.prototype.onRemoveStage = function () {
    };
    BaccaratRooms.prototype.setTableId = function (tableId) {
        this.tableId = tableId;
    };
    BaccaratRooms.prototype.init = function () {
        this.initBg();
        this.initTableId();
    };
    BaccaratRooms.prototype.initBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    //初始化桌号
    BaccaratRooms.prototype.initTableId = function () {
        var _this = this;
        var i = 0;
        HallTableInfoManager.getInstance().getHallStateInfo(ProtobufManager.GameType.Baccarat).forEach(function (element) {
            var tableBtn = new Button();
            var tableId = element.getTableId();
            tableBtn.setSize(126, 78);
            if (tableId != _this.tableId) {
                tableBtn.setNormalTexture("roomNormalBg_png");
            }
            else {
                tableBtn.setNormalTexture("roomPressBg_png");
            }
            tableBtn.setScale9Rect(new egret.Rectangle(17, 13, 2, 2));
            tableBtn.setLabel(tableId + "", 0x000000);
            tableBtn.x = (i % 2) * 150 + 30;
            tableBtn.y = Math.floor(i / 2) * 90 + 80;
            function onClickTableBtn() {
                if (tableId != this.tableId) {
                    BaccaratGame.tableId = tableId;
                    GameServerManager.getInstance().gameLogin(ProtobufManager.GameType.Baccarat, tableId);
                }
            }
            tableBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickTableBtn, _this);
            _this.addChild(tableBtn);
            i++;
        });
    };
    BaccaratRooms.prototype.removeSelf = function () {
        this.parent.removeChild(this);
    };
    return BaccaratRooms;
}(eui.Component));
__reflect(BaccaratRooms.prototype, "BaccaratRooms");
//# sourceMappingURL=BaccaratRooms.js.map