var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 显示结果的牌的层
 */
var PokerLayer = (function (_super) {
    __extends(PokerLayer, _super);
    function PokerLayer(width, height) {
        var _this = _super.call(this) || this;
        _this.currentPokerNum = 0;
        _this.playerNum = 0;
        _this.bankerNum = 0;
        _this.hadShowPokers = [];
        _this.width = width;
        _this.height = height;
        _this.initShowPokerView();
        return _this;
    }
    /**
     * 初始化显示牌的层
     */
    PokerLayer.prototype.initShowPokerView = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, this.width, 300);
        bg.graphics.endFill();
        this.addChild(bg);
        this.playerLabel = new eui.Label();
        switch (Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                this.playerLabel.text = Lang.getStr("TEXT_PLAYER");
                break;
            case ProtobufManager.GameType.LongHu:
                this.playerLabel.text = Lang.getStr("TEXT_DRAGON");
                break;
        }
        this.playerLabel.x = 300;
        this.playerLabel.y = 10;
        this.playerLabel.textColor = 0x6e79d3;
        this.addChild(this.playerLabel);
        this.playerNumLabel = new eui.Label("0");
        this.playerNumLabel.x = 400;
        this.playerNumLabel.y = 10;
        this.playerNumLabel.textColor = 0x6e79d3;
        this.addChild(this.playerNumLabel);
        this.bankerLabel = new eui.Label(Lang.getStr("TEXT_BANKER"));
        switch (Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                this.bankerLabel.text = Lang.getStr("TEXT_BANKER");
                break;
            case ProtobufManager.GameType.LongHu:
                this.bankerLabel.text = Lang.getStr("TEXT_TIGER");
                break;
        }
        this.bankerLabel.x = 700;
        this.bankerLabel.y = 10;
        this.bankerLabel.textColor = 0xff0000;
        this.addChild(this.bankerLabel);
        this.bankerNumLabel = new eui.Label("0");
        this.bankerNumLabel.x = 800;
        this.bankerNumLabel.y = 10;
        this.bankerNumLabel.textColor = 0xff0000;
        this.addChild(this.bankerNumLabel);
    };
    PokerLayer.prototype.setPlayerText = function (text) {
        this.playerLabel.text = text;
    };
    PokerLayer.prototype.setBankerText = function (text) {
        this.bankerLabel.text = text;
    };
    PokerLayer.prototype.setPlayerNumLabel = function (num) {
        if (num > 10) {
            num = 10;
        }
        this.playerNum += num;
        this.playerNumLabel.text = (this.playerNum % 10) + "";
    };
    PokerLayer.prototype.setBankerNumLabel = function (num) {
        if (num > 10) {
            num = 10;
        }
        this.bankerNum += num;
        this.bankerNumLabel.text = (this.bankerNum % 10) + "";
    };
    /**
     * 添加一张显示的牌
     */
    PokerLayer.prototype.addOnePoker = function (index, color, poker) {
        if (!this.hadShowPokers[index]) {
            this.hadShowPokers[index] = [color, poker];
            var image = new eui.Image(RES.getRes("card_bg_png"));
            image.width = 90;
            image.height = 130;
            image.anchorOffsetX = 45;
            image.anchorOffsetY = 65;
            image.verticalCenter = 0;
            if (index <= 2) {
                image.x = (3 + index) * 100;
            }
            else {
                image.x = (4 + index) * 100;
            }
            if (index == 2) {
                image.x = 180;
                image.rotation = 90;
            }
            if (index == 5) {
                image.x = 920;
                image.rotation = 90;
            }
            this.addChild(image);
            var callback = function () {
                if (image.scaleX <= 0.1) {
                    image.source = RES.getRes("card_" + color + "_" + poker + "_png");
                }
                if (index <= 2) {
                    this.setPlayerNumLabel(poker);
                }
                else {
                    this.setBankerNumLabel(poker);
                }
            };
            egret.Tween.get(image).to({ scaleX: 0 }, 800, egret.Ease.quadIn).call(callback, this).to({ scaleX: 1 }, 800, egret.Ease.quadOut);
        }
    };
    PokerLayer.prototype.addOneLonghuPoker = function (index, color, poker) {
        if (!this.hadShowPokers[index]) {
            this.hadShowPokers[index] = [color, poker];
            var image = new eui.Image(RES.getRes("card_bg_png"));
            image.width = 90;
            image.height = 130;
            image.anchorOffsetX = 45;
            image.anchorOffsetY = 65;
            image.verticalCenter = 0;
            if (index == 0) {
                image.x = 3 * 100;
            }
            else {
                image.x = 7 * 100;
            }
            this.addChild(image);
            var callback = function () {
                if (image.scaleX <= 0.1) {
                    image.source = RES.getRes("card_" + color + "_" + poker + "_png");
                }
                if (index == 0) {
                    this.setPlayerNumLabel(poker);
                }
                else {
                    this.setBankerNumLabel(poker);
                }
            };
            egret.Tween.get(image).to({ scaleX: 0 }, 800, egret.Ease.quadIn).call(callback, this).to({ scaleX: 1 }, 800, egret.Ease.quadOut);
        }
    };
    /**
     * 还原数据
     */
    PokerLayer.prototype.reset = function () {
        this.playerNum = 0;
        this.bankerNum = 0;
        this.hadShowPokers = [];
    };
    return PokerLayer;
}(eui.Component));
__reflect(PokerLayer.prototype, "PokerLayer");
//# sourceMappingURL=PokerLayer.js.map