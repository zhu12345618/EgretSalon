/**
 *
 * @author 
 *
 */
class BigRoadScene extends eui.Component {
    private gridWidth : number = 0;
    private gridHeight : number = 0;
    private lineNum : number = 0;
    private columnNum : number = 0;


    public gridScene: GridScene;

    public roadView : eui.Group = new eui.Group();;
    public bigRoad: BigRoad = new BigRoad();

    public constructor(gridWidth : number, gridHeight : number, lineNum : number, columnNum : number = 6) {
        super();
        this.width = gridWidth*lineNum;
        this.height = gridHeight*columnNum;

        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.lineNum = lineNum;
        this.columnNum = columnNum;

        this.createSubView();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
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

    private addCircleView(road) {
        if (road.ties > 0 && this.roadView.numChildren > 0) {
            this.roadView.removeChildAt(this.roadView.numChildren - 1);
        }
        var circleView: CircleView = new CircleView();

        circleView.x = this.gridWidth * road.currentX;
        circleView.y = this.gridHeight * road.currentY;

        circleView.width = this.gridWidth;
        circleView.height = this.gridHeight;
        circleView.customView(road.lastWay, road.ties, this.gridWidth, this.gridHeight);
        return circleView;
    }

    public addNextString(way : string) {
        var next = new BigRoad();
        next = Global.deepCopy(this.bigRoad, next);
        var add = next.add(way);
        
        if(add > 0) {
            var circleView = this.addCircleView(next);
            egret.Tween.get(circleView, {loop : true}).to({alpha : 0}, 800, egret.Ease.quadInOut).to({alpha : 1}, 800, egret.Ease.quadInOut);
            egret.setTimeout(function() {
                this.roadView.removeChild(circleView);
            }, this, 2400);
            this.roadView.addChild(circleView);
        }
    }

    private addWithOneCharacter(way: string) {
        var add = this.bigRoad.add(way);
        if (add > 0) {
            var circleView: CircleView = this.addCircleView(this.bigRoad);
            this.roadView.addChild(circleView);
        }
    }

    public clear() {
        this.roadView.removeChildren();
        this.bigRoad.clear();
    }

    private moveAll() {
        this.roadView.x = this.bigRoad.currentX > this.lineNum - 2 ? (-(this.bigRoad.currentX - (this.lineNum - 2)) * this.gridWidth) : 0;
    }

}
