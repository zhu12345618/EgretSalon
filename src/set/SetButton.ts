
class SetButton extends eui.Component {
    private leftLabel : eui.Label;
    private rightLabel : eui.Label;
    private currentSelected : number = 0;
    private callback : Function;
    constructor(leftText, rightText, callback) {
        super();
        this.callback = callback;
        this.init(leftText, rightText);
    }

    private init(leftText, rightText) {
        this.leftLabel = new eui.Label(leftText);
        this.leftLabel.width = 200;
        this.leftLabel.textAlign = egret.HorizontalAlign.RIGHT;
        this.leftLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLeftLabel, this);
        this.addChild(this.leftLabel);

        var label = new eui.Label("|");
        label.x = 210;
        this.addChild(label);
        
        this.rightLabel = new eui.Label(rightText);
        this.rightLabel.x = 230;
        this.rightLabel.width = 200;
        this.rightLabel.textAlign = egret.HorizontalAlign.LEFT;
        this.rightLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRightLabel, this);
        this.addChild(this.rightLabel);
    }

    private onClickLeftLabel() {
        this.leftLabel.textColor = 0x19910d;
        this.rightLabel.textColor = 0xffffff;
        this.callback(0);
    }

    private onClickRightLabel() {
        this.leftLabel.textColor = 0xffffff;
        this.rightLabel.textColor = 0x19910d;
        this.callback(1);
    }

    public setCurrentSelected(currentSelected) {
        this.currentSelected = currentSelected;
        switch(this.currentSelected) {
            case 0:
                this.onClickLeftLabel();
                break;
            case 1:
                this.onClickRightLabel();
                break;
            default :
                break;
        }
    }
}