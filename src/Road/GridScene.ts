/**
 *
 * @author 
 *
 */
class GridScene extends eui.Group {
    public gridWidth: number = 0;
    public gridHeight: number = 0;
    public lineNum: number = 0;
    public columnNum: number = 0;

    public color ;

    public constructor(gridWidth : number, gridHeight : number, lineNum : number, columnNum : number = 6) {
        super();
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.lineNum = lineNum;
        this.columnNum = columnNum;

        this.color = 0xaaaaaa;
    }

    public setDrawLine() {

        //画横线
        for (var i = 0; i <= this.columnNum; i++) {
            var shp: egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(1, this.color);
            shp.graphics.moveTo(0, this.gridHeight * i);
            shp.graphics.lineTo(this.gridWidth * this.lineNum, this.gridHeight * i);
            shp.graphics.endFill();
            this.addChild(shp);
        }

        //画竖线
        for (var i = 0; i <= this.lineNum; i++) {
            var shp: egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(1, this.color);
            shp.graphics.moveTo(this.gridWidth * i, 0);
            shp.graphics.lineTo(this.gridWidth * i, this.gridHeight * this.columnNum);
            shp.graphics.endFill();
            this.addChild(shp);
        }
    }

}
