var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var RoadScene = (function (_super) {
    __extends(RoadScene, _super);
    function RoadScene() {
        // public constructor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //     super()
        //     this.initScene();
        //     this.smallRoad.setInterface(this);
        // }
        _this.theScene = new eui.Group();
        _this.smallRoad = new SmallRoad();
        return _this;
    }
    RoadScene.prototype.initScene = function () {
        this.addChild(this.theScene);
    };
    RoadScene.prototype.onClear = function () {
        this.theScene.removeChildren();
    };
    RoadScene.prototype.clear = function () {
        this.smallRoad.clear();
        this.theScene.removeChildren();
    };
    //视图滚动
    RoadScene.prototype.moveAll = function () {
        this.theScene.x = this.smallRoad.currentX > 8 ? (-(this.smallRoad.currentX - 8) * this.gridWidth) : 0;
    };
    //根据字符来决定
    RoadScene.prototype.addWithString = function (aString) {
        for (var i = 0; i < aString.length; i++) {
            if (aString[i] == "q") {
                this.clear();
                break;
            }
            else {
                this.addWithOneCharacter(aString[i]);
            }
        }
        this.moveAll();
    };
    RoadScene.prototype.addWithOneCharacter = function (aCharacter) {
        var add = this.smallRoad.addWithOne(aCharacter);
        if (add > 0) {
            if (this.smallRoad.ties > 0 && this.theScene.numChildren > 0) {
                this.theScene.removeChildAt(this.theScene.numChildren - 1);
            }
            var circleview = new CircleView();
            console.log(this.smallRoad.currentX + " :" + this.smallRoad.currentY);
            circleview.customView(this.smallRoad.lastWay, this.smallRoad.ties, this.gridWidth - 3, this.gridWidth - 3);
            circleview.x = this.gridWidth * this.smallRoad.currentX;
            circleview.y = this.gridWidth * this.smallRoad.currentY;
            this.theScene.addChild(circleview);
        }
    };
    return RoadScene;
}(GridScene));
__reflect(RoadScene.prototype, "RoadScene");
//# sourceMappingURL=RoadScene.js.map