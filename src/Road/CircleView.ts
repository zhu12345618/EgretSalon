/**
 *
 * @author 
 *
 */
class CircleView extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }

    private topLeftCorner: boolean = false;
    private bottomRightCorner: boolean = false;

    private ties: number;
    private _radius: number;


    get radius(): number {
        return Math.min(this.height, this.width) * 0.45;
    }

    public label: eui.Label;
    //画圆环
    public addCircle(x: number, y: number, color: number): void {

        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(2, color);
        if (this.ties == -1) {
            shp.graphics.beginFill(color, 2);
        } else {
            shp.graphics.beginFill(0, 0);
        }

        shp.graphics.drawCircle(x, y, this.radius);
        shp.graphics.endFill();
        this.addChild(shp);
    }


    //画斜线
    public addObliqueLine(color: number) {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(1, color);
        shp.graphics.moveTo(0, this.width);
        shp.graphics.lineTo(this.width, 0);
        shp.graphics.endFill();
        this.addChild(shp);
    }


    public addTieLabel(text: string) {
        var label: eui.Label = new eui.Label();
        label.text = text;
        
        
        label.size = this.width*8/10;

        label.anchorOffsetX = this.width/2;
        label.anchorOffsetY = label.size/2;
        label.x = this.width/2;
        label.y = this.height/2;

        label.width = this.width;
        label.height = label.size;
        
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalCenter = egret.VerticalAlign.MIDDLE;
        label.textColor = ColorType.color_green;
        this.addChild(label);
    }
    public customView(way: string, ties: number, width: number, height: number){

        this.ties = ties;
        this.width = width;
        this.height = height;

        var oneMark: eui.Image = new eui.Image();
        
        

        var result: string = String.fromCharCode(way.charCodeAt(0) - 32);
        oneMark.texture = RES.getRes("BigRoad_" + result + "_png");
        oneMark.width = width;
        oneMark.height = height;
        this.addChild(oneMark);

        if (ties > 0) {
            this.addTieLabel(ties > 5 ? "5+" : ties.toString());

        }
    }
    public customViewOld(way: string, ties: number, width: number, height: number) {

        this.ties = ties;
        this.width = width;
        this.height = height;

        if (way >= "a" && way <= "d") {
            // 画庄  红
            this.addCircle(width / 2, width / 2, ColorType.color_red);
        } else if (way >= "e" && way <= "h") {
            //画闲   蓝
            this.addCircle(width / 2, width / 2, ColorType.color_blue);
        } //else if(way >= "i" && way <= "l") {
        //画和    数字
        if (ties > 0) {
            this.addTieLabel(ties > 5 ? "5+" : ties.toString());

        }

        var num = (way.charCodeAt(0) - 97) % 4;
        if (1 == num || 3 == num) {
            this.bottomRightCorner = true;
        }

        if (num > 1) {
            this.topLeftCorner = true;
        }


        if (this.topLeftCorner) {
            this.creatCircle(Math.PI / 4 * 5, ColorType.color_red);
        }

        if (this.bottomRightCorner) {
            this.creatCircle(Math.PI / 4, ColorType.color_blue);
        }
    }

    public customLineView(way: string, ties: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        if (way >= "a" && way <= "d") {
            // 画庄  红
            this.addObliqueLine(ColorType.color_red);
        } else if (way >= "e" && way <= "h") {
            //画闲   蓝
            this.addObliqueLine(ColorType.color_blue);
        }
    }



    //画对子
    public creatCircle(angle: number, color: number) {
        var radius2 = this.height * 0.25;

        var x = this.width / 2 * (Math.cos(angle) + 1);
        var y = this.width / 2 * (Math.sin(angle) + 1);

        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(1, 0xffffff);
        shp.graphics.beginFill(color, 5);
        shp.graphics.drawCircle(x, y, radius2);
        shp.graphics.endFill();
        this.addChild(shp);
    }
}

enum ColorType {
    color_green = 0x27c85f,
    color_red = 0xef3612,
    color_blue = 0x2f95f9,
    color_white = 0xffffff
}