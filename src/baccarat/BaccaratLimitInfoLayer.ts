
class BaccaratLimitInfoLayer extends eui.Component {
    private maxBetPreLabel : eui.Label;
    private minBetPreLabel : eui.Label;
    private tieMaxBetPreLabel : eui.Label;
    private tieMinBetPreLabel : eui.Label;
    private pairMaxBetPreLabel : eui.Label;
    private pairMinBetPreLabel : eui.Label;

    private maxBetLabel : eui.Label;
    private minBetLabel : eui.Label;
    private tieMaxBetLabel : eui.Label;
    private tieMinBetLabel : eui.Label;
    private pairMaxBetLabel : eui.Label;
    private pairMinBetLabel : eui.Label;

    private maxBetText : string;
    private minBetText : string;
    private tieMaxBetText : string;
    private tieMinBetText : string;
    private pairMaxBetText : string;
    private pairMinBetText : string;
    constructor() {
        super();
        this.width = 432;
        this.height = 215;
        this.init();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    private onAddtoStage() {
        this.setLabelText();
        this.updateLanguage();
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    }

    private onRemoveFromStage() {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    }

    private init() {
        this.initBg();
        this.initPreLabel();
        this.initLabel();
    }

    private initBg() {
        var bg : egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private initPreLabel() {
        this.maxBetPreLabel = new eui.Label();
        this.maxBetPreLabel.x = 110;
        this.maxBetPreLabel.y = 20;
        this.maxBetPreLabel.textColor = 0xa89256;
        this.maxBetPreLabel.size = 20;
        this.addChild(this.maxBetPreLabel);
        
        this.minBetPreLabel = new eui.Label();
        this.minBetPreLabel.x = 110;
        this.minBetPreLabel.y = 50;
        this.minBetPreLabel.textColor = 0xa89256;
        this.minBetPreLabel.size = 20;
        this.addChild(this.minBetPreLabel);

        this.tieMaxBetPreLabel = new eui.Label();
        this.tieMaxBetPreLabel.x = 110;
        this.tieMaxBetPreLabel.y = 80;
        this.tieMaxBetPreLabel.textColor = 0xa89256;
        this.tieMaxBetPreLabel.size = 20;
        this.addChild(this.tieMaxBetPreLabel);

        this.tieMinBetPreLabel = new eui.Label();
        this.tieMinBetPreLabel.x = 110;
        this.tieMinBetPreLabel.y = 110;
        this.tieMinBetPreLabel.textColor = 0xa89256;
        this.tieMinBetPreLabel.size = 20;
        this.addChild(this.tieMinBetPreLabel);

        this.pairMaxBetPreLabel = new eui.Label();
        this.pairMaxBetPreLabel.x = 110;
        this.pairMaxBetPreLabel.y = 140;
        this.pairMaxBetPreLabel.textColor = 0xa89256;
        this.pairMaxBetPreLabel.size = 20;
        this.addChild(this.pairMaxBetPreLabel);

        this.pairMinBetPreLabel = new eui.Label();
        this.pairMinBetPreLabel.x = 110;
        this.pairMinBetPreLabel.y = 170;
        this.pairMinBetPreLabel.textColor = 0xa89256;
        this.pairMinBetPreLabel.size = 20;
        this.addChild(this.pairMinBetPreLabel);
        
    }

    private initLabel() {
        this.maxBetLabel = new eui.Label();
        this.maxBetLabel.x = 250;
        this.maxBetLabel.y = 20;
        this.maxBetLabel.size = 20;
        this.addChild(this.maxBetLabel);
        
        this.minBetLabel = new eui.Label();
        this.minBetLabel.x = 250;
        this.minBetLabel.y = 50;
        this.minBetLabel.size = 20;
        this.addChild(this.minBetLabel);

        this.tieMaxBetLabel = new eui.Label();
        this.tieMaxBetLabel.x = 250;
        this.tieMaxBetLabel.y = 80;
        this.tieMaxBetLabel.size = 20;
        this.addChild(this.tieMaxBetLabel);

        this.tieMinBetLabel = new eui.Label();
        this.tieMinBetLabel.x = 250;
        this.tieMinBetLabel.y = 110;
        this.tieMinBetLabel.size = 20;
        this.addChild(this.tieMinBetLabel);

        this.pairMaxBetLabel = new eui.Label();
        this.pairMaxBetLabel.x = 250;
        this.pairMaxBetLabel.y = 140;
        this.pairMaxBetLabel.size = 20;
        this.addChild(this.pairMaxBetLabel);

        this.pairMinBetLabel = new eui.Label();
        this.pairMinBetLabel.x = 250;
        this.pairMinBetLabel.y = 170;
        this.pairMinBetLabel.size = 20;
        this.addChild(this.pairMinBetLabel);
    }

    private setLabelText() {

        this.maxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit()+"";
        this.minBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit()+"";
        this.tieMaxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit()+"";
        this.tieMinBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit()+"";
        this.pairMaxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit()+"";
        this.pairMinBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit()+"";
    }

    private updateLanguage() {
        this.maxBetPreLabel.text = Lang.getStr('MAX_BET');
        this.minBetPreLabel.text = Lang.getStr('MIN_BET');

        this.tieMaxBetPreLabel.text = Lang.getStr('TIE_BET_MAX');
        this.tieMinBetPreLabel.text = Lang.getStr('TIE_BET_MIN');

        this.pairMaxBetPreLabel.text = Lang.getStr('PAIR_BET_MAX');
        this.pairMinBetPreLabel.text = Lang.getStr('PAIR_BET_MIN');
    }
}