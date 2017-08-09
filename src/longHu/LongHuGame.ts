/**
 * 龙虎游戏
 */

class LongHuGame extends BaccaratGame {
	public constructor() {
		super();
	}
    /**
	 * 初始化赌桌
	 */
	public initBet() {
		this._bet = new LongHuBet(BaccaratGame.tableId);
		this.addChild(this._bet);
	}
}