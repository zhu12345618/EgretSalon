/**
 *
 * @author 
 *
 */
class ZlRoadScene extends eui.Component {
    private gridWidth : number = 0;
    private gridHeight : number = 0;
    public lineNum : number = 0;
    private columnNum : number = 0;

    private ratio : number = 2;

    public gridScene: GridScene;

    public roadView : eui.Group = new eui.Group();;
    public bigRoad: BigRoad = new BigRoad();
    public zlRoad: SmallRoad = new SmallRoad();

    public constructor(gridWidth : number, gridHeight : number, lineNum : number, columnNum : number = 6) {
        super();
        
        this.width = gridWidth*lineNum;
        this.height = gridHeight*columnNum;
        
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.lineNum = lineNum;
        this.columnNum = columnNum;

        this.createSubView();

        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }
    
    private onAddedToStage() {

    }

    private onRemovedFromStage() {

    }


    private createSubView() {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);

        this.addChild(this.roadView);

        var spMask = new egret.Rectangle(0, 0, this.gridWidth*this.lineNum, this.gridHeight*this.columnNum);
		this.mask = spMask;

        this.gridScene = new GridScene(this.gridWidth, this.gridHeight, this.lineNum, this.columnNum);
        this.gridScene.setDrawLine();
        this.addChild(this.gridScene);
    }
    //根据字符来决定
    public addWithString(aString: string) {
        for (var i = 0; i < aString.length; i++) {

            if (aString[i] == "q") {
                this.clear();
                break;
            } else {
                this.addWithOneCharacter(aString[i]);
            }
        }

        this.moveAll();
    }

    //设置图形和格子的比例
    public setRatio(ratio) {
        this.ratio = ratio;
    }

    public getNextCode(way : string) : string {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);

        var nextZlRoad = new SmallRoad();
        nextZlRoad = Global.deepCopy(this.zlRoad, nextZlRoad);
        if(nextZlRoad.addWithOne(nextBig.getZhanglangCode()) > 1) {
            if (nextZlRoad.lastWay >= "a" && nextZlRoad.lastWay <= "d") {
                return "a";
            } else if (nextZlRoad.lastWay >= "e" && nextZlRoad.lastWay <= "h") {
                return "e";
            }
        }
        
        return " ";
    }

    private addOneImage(road) {
        var oneMark: eui.Image = new eui.Image();
        oneMark.width = this.gridWidth/this.ratio;
        oneMark.height = this.gridHeight/this.ratio;
        oneMark.x = this.gridWidth/this.ratio * road.currentX;
        oneMark.y = this.gridHeight/this.ratio * road.currentY;
        var imageStr:string ;
        if (road.lastWay >= "a" && road.lastWay <= "d") {
            // 画庄  红
            imageStr = "Cockcroach_A_png";
        } else if (road.lastWay >= "e" && road.lastWay <= "h") {
            //画闲   蓝
            imageStr = "Cockcroach_E_png";
        }
        oneMark.texture = RES.getRes(imageStr);
        return oneMark;
    }

    public addNextString(way : string) {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);

        var nextZlRoad = new SmallRoad();
        nextZlRoad = Global.deepCopy(this.zlRoad, nextZlRoad);

        if (add > 1 && nextZlRoad.addWithOne(nextBig.getZhanglangCode()) > 1) {
            var oneMark = this.addOneImage(nextZlRoad);
            egret.Tween.get(oneMark, {loop : true}).to({alpha : 0}, 800, egret.Ease.quadInOut).to({alpha : 1}, 800, egret.Ease.quadInOut);
            egret.setTimeout(function() {
                this.roadView.removeChild(oneMark);
            }, this, 2400);
            this.roadView.addChild(oneMark);
        }
    }

    private addWithOneCharacter(way: string) {
        var add = this.bigRoad.add(way);
        

        if (add > 1) {

            if (this.zlRoad.addWithOne(this.bigRoad.getZhanglangCode()) > 1) {
                var oneMark: eui.Image = this.addOneImage(this.zlRoad);
                this.roadView.addChild(oneMark);
            }
            
        }
    }

    public clear() {
        this.bigRoad.clear();
        this.zlRoad.clear();
        this.roadView.removeChildren();
    }

    public moveAll() {
        this.roadView.x = this.zlRoad.currentX > this.lineNum*this.ratio - 2 ? 
        (-(this.zlRoad.currentX - this.lineNum*this.ratio + 2) * this.gridWidth/this.ratio) : 0;
    }

}
