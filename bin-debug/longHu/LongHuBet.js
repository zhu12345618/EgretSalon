/**
 * 龙虎赌注页面
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LongHuBet = (function (_super) {
    __extends(LongHuBet, _super);
    function LongHuBet(tableID) {
        return _super.call(this, tableID) || this;
    }
    //增加下注界面
    LongHuBet.prototype.initBetBtnLayer = function () {
        var group = new eui.Component();
        var dragonBtn = new BaccaratBetBtn(LhBetType.Dragon, "TEXT_DRAGON", 200, 25, 0x3a40fa);
        dragonBtn.x = 160;
        group.addChild(dragonBtn);
        var tieBtn = new BaccaratBetBtn(LhBetType.Tie, "TEXT_TIE", 150, 25, 0x0f6706);
        tieBtn.x = 370;
        group.addChild(tieBtn);
        var tigerBtn = new BaccaratBetBtn(LhBetType.Tiger, "TEXT_TIGER", 200, 25, 0xff0000);
        tigerBtn.x = 530;
        group.addChild(tigerBtn);
        group.x = 130;
        group.y = 370;
        this.addChild(group);
    };
    return LongHuBet;
}(BaccaratBet));
__reflect(LongHuBet.prototype, "LongHuBet");
//# sourceMappingURL=LongHuBet.js.map