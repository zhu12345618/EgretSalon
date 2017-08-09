var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnionBaccaratList = (function (_super) {
    __extends(UnionBaccaratList, _super);
    function UnionBaccaratList() {
        var _this = _super.call(this) || this;
        _this.baccaratList = [];
        _this.width = GameConfig.width;
        _this.height = GameConfig.height;
        for (var i = 0; i < 3; i++) {
            var unionBaccarat = new UnionBaccarat();
            unionBaccarat.x = (unionBaccarat.width + 5) * i;
            _this.addChild(unionBaccarat);
            _this.baccaratList.push(unionBaccarat);
            unionBaccarat.setTableID(i + 1);
            GameServerManager.getInstance().joinTable(i + 1, ProtobufManager.JoinType.Chain);
        }
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    UnionBaccaratList.prototype.onAddtoStage = function (event) {
        this.initUserInfo();
        EventDispatcher.getInstance().addEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
    };
    UnionBaccaratList.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
    };
    UnionBaccaratList.prototype.init = function () {
        this.addUserInfo();
        this.addChips();
        this.addSet();
        this.addLine();
    };
    UnionBaccaratList.prototype.addUserInfo = function () {
        var group = new eui.Group();
        group.bottom = 0;
        group.height = 47;
        this.addChild(group);
        var userInfoBg = new eui.Image("unionBaccaratBottom_png");
        userInfoBg.width = GameConfig.width / 3;
        userInfoBg.horizontalCenter = egret.HorizontalAlign.CENTER;
        userInfoBg.verticalCenter = egret.VerticalAlign.MIDDLE;
        group.addChild(userInfoBg);
        var infoBg = new eui.Image("unionUserInfoBg_png");
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
        this.balanceLabel.text = UserGameInfo.getInstance().getBalance() + "";
        group.addChild(this.balanceLabel);
        this.chipSet = new eui.Image("unionChipSet_png");
        this.chipSet.x = 330;
        this.chipSet.verticalCenter = 0;
        group.addChild(this.chipSet);
    };
    UnionBaccaratList.prototype.addChips = function () {
        var group = new eui.Group();
        group.width = GameConfig.width / 3;
        group.height = 47;
        group.x = this.baccaratList[1].x;
        group.bottom = 0;
        this.addChild(group);
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(0, 0, GameConfig.width / 3, 47);
        rect.graphics.endFill();
        group.addChild(rect);
        for (var i = 0; i < 5; i++) {
            var button = new Button();
            button.setSize(51, 43);
            button.setNormalTexture("unionChip" + (i + 1) + "_png");
            button.setLabel((HallUserInfo.getInstance().getOtherChipTable()[i]) + "", 0x000000);
            button.setLabelSize(15);
            button.setLabelPosition(button.width / 2, button.height / 2 - 3);
            button.x = 15 + i * 70;
            button.verticalCenter = 0;
            group.addChild(button);
        }
    };
    UnionBaccaratList.prototype.addSet = function () {
        var group = new eui.Group();
        group.right = 0;
        group.bottom = 0;
        this.addChild(group);
        var setBg = new eui.Image("unionBaccaratBottom_png");
        setBg.width = GameConfig.width / 3;
        setBg.right = 0;
        setBg.verticalCenter = egret.VerticalAlign.MIDDLE;
        group.addChild(setBg);
        var setBtn = new eui.Image("unionSetBtn_png");
        setBtn.x = 300;
        setBtn.verticalCenter = 0;
        function onClickSetBtn() {
        }
        setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickSetBtn, this);
        group.addChild(setBtn);
        var exitBtn = new eui.Image("unionExitBtn_png");
        exitBtn.x = 340;
        exitBtn.verticalCenter = 0;
        function onClickExitBtn() {
            if (this.parent) {
                this.parent.removeChild(this);
                ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
                GameServerManager.getInstance().gameExit(ProtobufManager.GameType.Baccarat);
            }
        }
        exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClickExitBtn, this);
        group.addChild(exitBtn);
    };
    UnionBaccaratList.prototype.addLine = function () {
        var line = new eui.Image(RES.getRes("unionBaccaratBottomLine_png"));
        line.bottom = 0;
        line.scale9Grid = new egret.Rectangle(5, 0, 5, 3);
        line.width = this.width;
        this.addChild(line);
    };
    UnionBaccaratList.prototype.initUserInfo = function () {
        this.nameLabel.text = UserGameInfo.getInstance().getName();
        this.balanceLabel.text = UserGameInfo.getInstance().getBalance() + "";
    };
    /**
     * 获取游戏状态信息
     */
    UnionBaccaratList.prototype.getUserInfo = function (event) {
        var gameUserInfo = event.data;
        this.nameLabel.text = gameUserInfo.getName();
        this.balanceLabel.text = gameUserInfo.getBalance();
    };
    return UnionBaccaratList;
}(eui.Component));
__reflect(UnionBaccaratList.prototype, "UnionBaccaratList");
//# sourceMappingURL=UnionBaccaratList.js.map