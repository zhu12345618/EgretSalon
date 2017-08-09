var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏配置
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    return GameConfig;
}());
GameConfig.width = 1136;
GameConfig.height = 640;
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map