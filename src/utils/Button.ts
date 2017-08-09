//自定义按钮

class Button extends eui.Component {
    protected normalTexture : eui.Image;
    protected pressedTexture : eui.Image;
    protected label : eui.Label;
    constructor(texture = "", text = "") {
        super();
        this.init();
        if(texture != "") {
            this.setNormalTexture(texture);
        }

        if(text != "") {
            this.setLabel(text);
        }
        
    }

    public init() {
        
        this.normalTexture = new eui.Image();
        this.addChild(this.normalTexture);

        this.label = new eui.Label();
              
        this.addChild(this.label);
    }

    public setSize(width, height) {
        this.width = width;
        this.height = height;
        this.normalTexture.width = this.width;
        this.normalTexture.height = this.height;
    }

    public setNormalTexture(texture : string) {
        this.normalTexture.texture = RES.getRes(texture);
        this.normalTexture.width = this.width;
        this.normalTexture.height = this.height;
        this.normalTexture.anchorOffsetX = this.width*0.5;
        this.normalTexture.anchorOffsetY = this.height*0.5;
        this.normalTexture.x = this.width*0.5;
        this.normalTexture.y = this.height*0.5;
    }

    public setScale9Rect(rect : egret.Rectangle) {
        this.normalTexture.scale9Grid = rect;
    }

    public setLabel(text : string, color = 0xffffff) {
        this.label.x = this.width/2;
        this.label.y = this.height/2;
        this.label.width = this.width;
        this.label.height = this.height;
        this.label.anchorOffsetX = this.width/2;
        this.label.anchorOffsetY = this.height/2;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.label.textColor = color;  
        this.label.text = text;
    }

    public setLabelPosition(x, y) {
        this.label.x = x;
        this.label.y = y;
    }

    public setLabelSize(size) {
        this.label.size = size;
    }
}