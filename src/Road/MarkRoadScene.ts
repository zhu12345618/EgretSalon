/**
 *
 * @author 
 *
 */
class MarkRoadScene extends eui.Component {
    private gridWidth : number = 0;
    private gridHeight : number = 0;
    private lineNum : number = 0;
    private columnNum : number = 0;

    public gridScene: GridScene;
    public markRoad: MarkRoad = new MarkRoad();
    public roadView : eui.Group = new eui.Group();;

    private labelArr = [];
    private gameType;
    
    public constructor(gridWidth : number, gridHeight : number, lineNum : number, columnNum : number) {
        super();
        this.width = gridWidth*lineNum;
        this.height = gridHeight*columnNum;
        
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.lineNum = lineNum;
        this.columnNum = columnNum;

        this.initScene();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
	}

	public onAddtoStage(): void {
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
	}

	public onRemoveFromStage(): void {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
	}


    private initScene() {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);

        this.addChild(this.roadView);

        var spMask = new egret.Rectangle(0, 0, this.gridWidth*this.lineNum, this.gridHeight*this.columnNum);
		this.mask = spMask;

        this.gridScene = new GridScene(this.gridWidth, this.gridHeight, this.lineNum, this.columnNum);;
        this.gridScene.setDrawLine();
        this.addChild(this.gridScene);
    }

    /**
	 * 设置游戏类型
	 */
	public setGameType(gameType) {
		this.gameType = gameType;
	}

	public getGameType() {
		return this.gameType;
	}

    //根据字符来决定
    public addWithString(aString: string) {
        for (var i = 0; i < aString.length; i++) {
            if (aString[i] == "q") {
                this.clear();
                break;
            } else {
                this.addOneMark(aString[i]);;
            }
        }
        this.moveAll();
    }

    public addOneMark(markResult: string) {
        this.markRoad.addOne()
        this.addWithOneCharacter(markResult, this.getCurrentRoadX(), this.getCurrentRoadY());
    }

    public addNextString(way : string) {
        var next = new MarkRoad();
        next = Global.deepCopy(this.markRoad, next);
        next.addOne()
        var oneMark = this.addWithOneCharacter(way, next.currentX, next.currentY);
        egret.Tween.get(oneMark, {loop : true}).to({alpha : 0}, 800, egret.Ease.quadInOut).to({alpha : 1}, 800, egret.Ease.quadInOut);
        egret.setTimeout(function() {
            this.roadView.removeChild(oneMark);
        }, this, 2400);
        this.roadView.addChild(oneMark);
    }

    public addWithOneCharacter(aCharacter: string, currentX, currentY) {
        var group = new eui.Group();
        group.x = currentX*this.gridWidth;
        group.y = currentY*this.gridHeight;
        var oneMark: eui.Image = new eui.Image();
        var result = String.fromCharCode(aCharacter.charCodeAt(0) - 32);
        oneMark.texture = RES.getRes("Bead_"+ result + "_png");
        oneMark.width = this.gridWidth*9/10;
        oneMark.height = this.gridHeight*9/10;
        oneMark.anchorOffsetX = oneMark.width/2;
        oneMark.anchorOffsetY = oneMark.height/2;
        oneMark.x = this.gridWidth/2;
        oneMark.y = this.gridHeight/2;
        group.addChild(oneMark);
        
        var label = new eui.Label(Lang.getStr(this.getTextByResult(result)));
        label.size = this.gridWidth*7/10;
        label.width = this.gridWidth;
        label.height = this.gridHeight;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        group.addChild(label);

        this.labelArr.push({result : result, label : label});
        
        this.roadView.addChild(group);
        return group;
    }

    //更新所有路单的语言
    private updateLanguage() {
        for(var i = 0; i < this.labelArr.length; i++) {
            var element = this.labelArr[i]
            element.label.text = Lang.getStr(this.getTextByResult(element.result));
        }
    }

    private getTextByResult(result:string) {
        var num = result.charCodeAt(0) - 65;
        function baccarat() {
            if(num <= 3) {
                return "TEXT_BANKER_ICON";
            } else if(num > 3 && num <= 7) {
                return "TEXT_PLAYER_ICON";
            } else {
                return "TEXT_TIE_ICON";
            }
        }

        function longhu() {
            if(num <= 3) {
                return "TEXT_TIGER_ICON";
            } else if(num > 3 && num <= 7) {
                return "TEXT_DRAGON_ICON";
            } else {
                return "TEXT_TIE_ICON";
            }
        }
        switch(this.getGameType()) {
            case ProtobufManager.GameType.Baccarat:
                return baccarat();
            case ProtobufManager.GameType.LongHu: 
                return longhu();
        }
        
    }

    /**
     * 用于问路
     */


    public getCurrentRoadX(): number {
        return this.markRoad.currentX;
    }

    public getCurrentRoadY(): number {
        return this.markRoad.currentY;
    }


    public clear() {
        this.roadView.removeChildren();
        this.markRoad.clear();
    }

    public moveAll() {
        this.roadView.x = this.markRoad.currentX > this.lineNum - 2 ? (-(this.markRoad.currentX - (this.lineNum - 2)) * this.gridWidth) : 0;
    }
}
