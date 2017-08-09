/**
 * 显示结果的牌的层
 */
class PokerLayer extends eui.Component {
    
    private currentPokerNum = 0;

    private playerLabel : eui.Label;
    private playerNum : number = 0;
    private playerNumLabel : eui.Label;

    private bankerLabel : eui.Label;
    private bankerNum : number = 0;
    private bankerNumLabel : eui.Label;

    private hadShowPokers = [];

    public constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.initShowPokerView();
    }

    /**
     * 初始化显示牌的层
     */
    public initShowPokerView() {
        
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, this.width, 300);
        bg.graphics.endFill();
        this.addChild(bg);

        this.playerLabel = new eui.Label();
        switch(Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                this.playerLabel.text = Lang.getStr("TEXT_PLAYER");
                break;
            case ProtobufManager.GameType.LongHu:
                this.playerLabel.text = Lang.getStr("TEXT_DRAGON");
                break;
        }
        this.playerLabel.x = 300;
        this.playerLabel.y = 10;
        this.playerLabel.textColor = 0x6e79d3;
        this.addChild(this.playerLabel);

        this.playerNumLabel = new eui.Label("0");
        this.playerNumLabel.x = 400;
        this.playerNumLabel.y = 10;
        this.playerNumLabel.textColor = 0x6e79d3;
        this.addChild(this.playerNumLabel);

        this.bankerLabel = new eui.Label(Lang.getStr("TEXT_BANKER"));
        switch(Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                this.bankerLabel.text = Lang.getStr("TEXT_BANKER");
                break;
            case ProtobufManager.GameType.LongHu:
                this.bankerLabel.text = Lang.getStr("TEXT_TIGER");
                break;
        }
        this.bankerLabel.x = 700;
        this.bankerLabel.y = 10;
        this.bankerLabel.textColor = 0xff0000;
        this.addChild(this.bankerLabel);

        this.bankerNumLabel = new eui.Label("0");
        this.bankerNumLabel.x = 800;
        this.bankerNumLabel.y = 10;
        this.bankerNumLabel.textColor = 0xff0000;
        this.addChild(this.bankerNumLabel);
    }

    public setPlayerText(text : string) {
        this.playerLabel.text = text;
    }

    public setBankerText(text: string) {
        this.bankerLabel.text = text;
    }

    public setPlayerNumLabel(num : number) {
        if(num > 10) {
            num = 10;
        }
        this.playerNum += num;
        this.playerNumLabel.text = (this.playerNum % 10) + "";
    }

    public setBankerNumLabel(num : number) {
        if(num > 10) {
            num = 10;
        }
        this.bankerNum += num;
        this.bankerNumLabel.text = (this.bankerNum % 10) + "";
    }

    /**
     * 添加一张显示的牌
     */
    public addOnePoker(index, color, poker) {
        if(!this.hadShowPokers[index]) {
            this.hadShowPokers[index] = [color, poker];

            var image = new eui.Image(RES.getRes("card_bg_png"));
            image.width = 90;
            image.height = 130;
            image.anchorOffsetX = 45;
            image.anchorOffsetY = 65;
            
            image.verticalCenter = 0;
            
            if(index <= 2) {
                image.x = (3+index) * 100;
            } else {
                image.x = (4+index) * 100;
            }

            if(index == 2) {
                image.x = 180;
                image.rotation = 90;
            }

            if(index == 5) {
                image.x = 920;
                image.rotation = 90;
            }
            this.addChild(image);
            var callback = function () {
                if(image.scaleX <= 0.1) {
                    image.source = RES.getRes("card_" + color + "_" + poker + "_png");
                }

                if(index <= 2) {
                    this.setPlayerNumLabel(poker);
                } else {
                    this.setBankerNumLabel(poker);
                }
            }
            egret.Tween.get(image).to({scaleX : 0}, 800, egret.Ease.quadIn).call(callback, this).to({scaleX : 1}, 800, egret.Ease.quadOut);
        }
    }

    public addOneLonghuPoker(index, color, poker) {
        if(!this.hadShowPokers[index]) {
            this.hadShowPokers[index] = [color, poker];

            var image = new eui.Image(RES.getRes("card_bg_png"));
            image.width = 90;
            image.height = 130;
            image.anchorOffsetX = 45;
            image.anchorOffsetY = 65;
            
            image.verticalCenter = 0;
            
            if(index == 0) {
                image.x = 3 * 100;
            } else {
                image.x = 7 * 100;
            }
            this.addChild(image);
            var callback = function () {
                if(image.scaleX <= 0.1) {
                    image.source = RES.getRes("card_" + color + "_" + poker + "_png");
                }

                if(index == 0) {
                    this.setPlayerNumLabel(poker);
                } else {
                    this.setBankerNumLabel(poker);
                }
            }
            egret.Tween.get(image).to({scaleX : 0}, 800, egret.Ease.quadIn).call(callback, this).to({scaleX : 1}, 800, egret.Ease.quadOut);

            
        }
    }

    /**
     * 还原数据
     */
    public reset() {
        this.playerNum = 0;
        this.bankerNum = 0;
        this.hadShowPokers = [];
    }
}