/**
 *
 * @author 
 *
 */
class RoadScene  extends GridScene{
    // public constructor() {

    //     super()
    //     this.initScene();
    //     this.smallRoad.setInterface(this);
    // }

    private theScene: eui.Group = new eui.Group();

    private smallRoad: SmallRoad = new SmallRoad();


    private initScene() {
        this.addChild(this.theScene);
    }
    
    onClear():void{
        this.theScene.removeChildren();
    }
 

    public clear() {
        this.smallRoad.clear();
        this.theScene.removeChildren();
    }
    
    //视图滚动
    private moveAll(){
        this.theScene.x = this.smallRoad.currentX>8? (-(this.smallRoad.currentX-8)*this.gridWidth):0;
    }
    
    
    
    //根据字符来决定
    public addWithString(aString: string) {
        for(var i = 0;i < aString.length;i++) {
            
            if(aString[i]=="q"){
                this.clear();
                break;
            }else{
                this.addWithOneCharacter(aString[i]);
            }
        }
        
        this.moveAll();
    }
    

    
    public addWithOneCharacter(aCharacter: string){
        var add = this.smallRoad.addWithOne(aCharacter);
        if(add>0){
            
            if(this.smallRoad.ties>0&&this.theScene.numChildren>0){
                
                
                this.theScene.removeChildAt(this.theScene.numChildren-1);
            }
            
            var circleview: CircleView = new CircleView();
            console.log(this.smallRoad.currentX + " :" + this.smallRoad.currentY );
            circleview.customView(this.smallRoad.lastWay,this.smallRoad.ties,this.gridWidth-3,this.gridWidth-3);
            circleview.x = this.gridWidth * this.smallRoad.currentX;
            circleview.y = this.gridWidth * this.smallRoad.currentY;
            
            this.theScene.addChild(circleview);
        }
    }
}





