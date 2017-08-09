/**
 * 龙虎赌注页面
 */

class LongHuBet extends BaccaratBet {
    constructor(tableID) {
        super(tableID);
    }
    //增加下注界面
    protected initBetBtnLayer() {
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
    }
}