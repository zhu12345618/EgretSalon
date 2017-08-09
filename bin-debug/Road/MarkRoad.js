var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var MarkRoad = (function () {
    function MarkRoad() {
        this.currentX = 0;
        this.currentY = 0;
        this.lastType = 0;
    }
    MarkRoad.prototype.addOne = function () {
        if (this.lastType == 0) {
            this.currentX = 0;
            this.currentY = 0;
            this.lastType = 1;
        }
        else if (this.currentY == 5) {
            this.currentX += 1;
            this.currentY = 0;
        }
        else {
            this.currentY += 1;
        }
    };
    MarkRoad.prototype.clear = function () {
        this.currentX = 0;
        this.currentY = 0;
        this.lastType = 0;
    };
    return MarkRoad;
}());
__reflect(MarkRoad.prototype, "MarkRoad");
//# sourceMappingURL=MarkRoad.js.map