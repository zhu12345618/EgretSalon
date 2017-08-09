/**
 * 问路界面
 */

class BaccaratAskRoadLayer extends eui.Component {
    public bankerGroup : eui.Group;
    public playerGroup : eui.Group;

    private bankerJy : eui.Image;
    private playerJy : eui.Image;

    private bankerSmall : eui.Image;
    private playerSmall : eui.Image;

    private bankerZl : eui.Image;
    private playerZl : eui.Image;

    private bankerLabel : eui.Label;
    private playerLabel : eui.Label;
    
    public constructor() {
        super();
        this.init();
    }

    private init() {
        function initGroup(result : string) {
            var group : eui.Group = new eui.Group();
            var bg :  eui.Image = new eui.Image();
            group.addChild(bg);
            var text = "";
            if(result == "a") {
                bg.texture = RES.getRes("askRoadBankerBg_png");
                text = "TEXT_BANKER_ICON";
            } else {
                bg.texture = RES.getRes("askRoadPlayerBg_png");
                text = "TEXT_PLAYER_ICON";
            }
            var label : eui.Label = new eui.Label(Lang.getStr(text));
            label.name = "label";
            label.size = 20;
            label.x = 9;
            label.y = 5;
            group.addChild(label);
            
            var jyImage : eui.Image = new eui.Image();
            jyImage.name = "jy";
            jyImage.x = 7;
            jyImage.y = 30;
            group.addChild(jyImage);

            var smallImage : eui.Image = new eui.Image();
            smallImage.name = "small";
            smallImage.x = 7;
            smallImage.y = 60;
            group.addChild(smallImage);

            var zlImage : eui.Image = new eui.Image();
            zlImage.name = "zl";
            zlImage.x = 7;
            zlImage.y = 90;
            group.addChild(zlImage);


            return group;
        }
        this.bankerGroup = initGroup("a");
        this.bankerLabel = <eui.Label>this.bankerGroup.getChildByName("label");
        this.bankerJy = <eui.Image>this.bankerGroup.getChildByName("jy");
        this.bankerSmall = <eui.Image>this.bankerGroup.getChildByName("small");
        this.bankerZl = <eui.Image>this.bankerGroup.getChildByName("zl");
        this.addChild(this.bankerGroup);

        this.playerGroup = initGroup("e");
        this.playerGroup.y = 121;

        this.playerLabel = <eui.Label>this.playerGroup.getChildByName("label");
        this.playerJy = <eui.Image>this.playerGroup.getChildByName("jy");
        this.playerSmall = <eui.Image>this.playerGroup.getChildByName("small");
        this.playerZl = <eui.Image>this.playerGroup.getChildByName("zl");
        this.addChild(this.playerGroup);
    }

    public setResult(result : string) {
        var jy = result[0];
        var small = result[1];
        var zl = result[2];
        console.info(jy, small, zl);
        switch(jy) {
            case "a":
                this.bankerJy.texture = RES.getRes("BigRoad_A_png");
                this.playerJy.texture = RES.getRes("BigRoad_E_png");
                break;
            case "e":
                this.bankerJy.texture = RES.getRes("BigRoad_E_png");
                this.playerJy.texture = RES.getRes("BigRoad_A_png");
                break;
        }

        switch(small) {
            case "a":
                this.bankerSmall.texture = RES.getRes("Bead_A_png");
                this.playerSmall.texture = RES.getRes("Bead_E_png");
                break;
            case "e":
                this.bankerSmall.texture = RES.getRes("Bead_E_png");
                this.playerSmall.texture = RES.getRes("Bead_A_png");
                break;
        }

        switch(zl) {
            case "a":
                this.bankerZl.texture = RES.getRes("Cockcroach_A_png");
                this.playerZl.texture = RES.getRes("Cockcroach_E_png");
                break;
            case "e":
                this.bankerZl.texture = RES.getRes("Cockcroach_E_png");
                this.playerZl.texture = RES.getRes("Cockcroach_A_png");
                break;
        }
    }
}