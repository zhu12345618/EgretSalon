var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.addPressedTexture = "";
        _this.addPressedWidth = 0;
        _this.addPressedHeight = 0;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickSelf, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        return _this;
    }
    RadioButton.prototype.init = function () {
        this.addPressedImage = new eui.Image();
        this.addChild(this.addPressedImage);
        _super.prototype.init.call(this);
    };
    RadioButton.prototype.setIndex = function (index) {
        this.index = index;
    };
    RadioButton.prototype.getIndex = function () {
        return this.index;
    };
    RadioButton.prototype.setGroupName = function (groupName) {
        this.groupName = groupName;
    };
    RadioButton.prototype.getGroupName = function () {
        return this.groupName;
    };
    RadioButton.prototype.onAddtoStage = function () {
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_RADIOBTN_STATE, this.getUnSelectedEvent, this);
    };
    RadioButton.prototype.onRemoveFromStage = function () {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_RADIOBTN_STATE, this.getUnSelectedEvent, this);
    };
    RadioButton.prototype.getUnSelectedEvent = function (event) {
        if (this != event.data) {
            this.setSelected(false);
            if (this.pressedTexture) {
            }
            else {
                this.removeAddPressedTexture();
            }
        }
    };
    RadioButton.prototype.onClickSelf = function () {
        if (!this.isSelected()) {
            this.setSelected(true);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_RADIOBTN_STATE, this);
            if (this.pressedTexture) {
            }
            else {
                this.setAddPressedImage();
            }
            if (this.callback) {
                this.callback();
            }
        }
    };
    RadioButton.prototype.setSelected = function (selected) {
        this.selected = selected;
    };
    RadioButton.prototype.isSelected = function () {
        return this.selected;
    };
    RadioButton.prototype.setCallback = function () {
    };
    RadioButton.prototype.setAddPressedTexture = function (texture, width, height) {
        this.addPressedTexture = texture;
        this.addPressedWidth = width;
        this.addPressedHeight = height;
    };
    RadioButton.prototype.setAddPressedImage = function () {
        this.addPressedImage.texture = RES.getRes(this.addPressedTexture);
        this.addPressedImage.anchorOffsetX = this.addPressedWidth * 0.5;
        this.addPressedImage.anchorOffsetY = this.addPressedWidth * 0.5;
        this.addPressedImage.x = this.width * 0.5;
        this.addPressedImage.y = this.height * 0.5;
        this.addPressedImage.visible = true;
    };
    RadioButton.prototype.removeAddPressedTexture = function () {
        if (this.addPressedImage && this.addPressedImage.parent) {
            // this.addPressedImage.parent.removeChild(this.addPressedImage);
            this.addPressedImage.visible = false;
        }
    };
    RadioButton.prototype.setPressedTextureSize = function (width, height) {
        this.addPressedImage.width = width;
        this.addPressedImage.height = height;
    };
    RadioButton.prototype.setOnClickCallback = function (callback) {
        this.callback = callback;
    };
    return RadioButton;
}(Button));
__reflect(RadioButton.prototype, "RadioButton");
//# sourceMappingURL=RadioButton.js.map