var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DropDownList = (function (_super) {
    __extends(DropDownList, _super);
    function DropDownList() {
        var _this = _super.call(this) || this;
        //列表是否展开了
        _this.isShow = false;
        //创建滚动区域和列表
        var arr = ["ZH", "EN", "JA", "KR"];
        // for (var i = 0; i < 16; i++) {
        //     arr.push("项目：" + i);
        // }
        var list = new eui.List();
        list.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onSelect, _this);
        //list.width = 140;
        list.dataProvider = new eui.ArrayCollection(arr);
        list.itemRenderer = OneLang;
        var scroller = new eui.Scroller();
        scroller.height = 400;
        scroller.viewport = list;
        _this.addChild(scroller);
        var btn = new eui.Image();
        btn.width = 83;
        btn.height = 83;
        btn.texture = RES.getRes("lang_" + Lang.kind + "_png");
        _this.addChild(btn);
        //列表上面的遮罩
        var spMask = new egret.Rectangle(0, 0, 170, 400);
        spMask.y = btn.height - 40;
        scroller.mask = spMask;
        _this.btn = btn;
        _this.scroller = scroller;
        return _this;
    }
    DropDownList.prototype.onSelect = function (evt) {
        var dataList = evt.target;
        this.btn.texture = RES.getRes("lang_" + dataList.selectedItem + "_png");
        this.changeListType();
        Lang.changeLang(dataList.selectedItem);
    };
    DropDownList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //设置消失点坐标
        this.posScrollerClose = this.scroller.y = -this.scroller.height;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
    };
    DropDownList.prototype.changeListType = function () {
        if (!this.isShow) {
            egret.Tween.get(this.scroller).to({ y: this.btn.height }, 300);
            this.isShow = true;
        }
        else {
            egret.Tween.get(this.scroller).to({ y: this.posScrollerClose }, 300);
            this.isShow = false;
        }
    };
    return DropDownList;
}(eui.Component));
__reflect(DropDownList.prototype, "DropDownList");
//# sourceMappingURL=DropDownList.js.map