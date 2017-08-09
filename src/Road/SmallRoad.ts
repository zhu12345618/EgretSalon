/**
 *
 * @author 
 *
 */
class SmallRoad{
    public constructor() {
    }


    public currentX: number = 0;
    public currentY: number = 0;
    public lastType: number = 0;   //上个庄或闲


    private wayList: number[][] = [[0,0,0,0,0,0]];

    public ties: number = 0;

    public lastWay: string = "";

    public listX: number = 0; //表行
    public listY: number = 0; //表列

    private playerTurn: number = 0;
    private bankerTurn: number = 0;

    private turnLeftSum: number = 0;

    private turnLeft = 0;
    public isFirstTie: boolean = false;

    //private leftList: number[];

    public clear() {
        
        this.currentX = 0;
        this.currentY = 0;

        this.listX = 0;
        this.listY = 0;
        this.ties = 0;

        this.lastType = 0;
        this.bankerTurn = 0;
        this.playerTurn = 0;

        this.turnLeft = -1;

        this.isFirstTie = false;
        this.wayList = [[0,0,0,0,0,0]];

        
        this.lastWay = "";
//        this.turnLeftSum = 0;
//        this.leftList = [];
        
        //console.log("smallRoad clear0");
    }
    
    
//    public add(way: string): number {
//
//        var lastAdd: number = 0;
//        if(way >= "a" && way <= "d") {
//            this.doBanker();
//            this.lastType = BJLConstants.BANKER;
//            lastAdd = BJLConstants.BANKER;
//            //    	    if(!this.isFirstTie){
//            //    	        this.ties =0;
//            //    	    }
//            //    	    this.isFirstTie = false;
//            if(this.currentX >= this.wayList.length) {
//                this.wayList.push([0,0,0,0,0,0]);
//            }
//            this.wayList[this.currentX][this.currentY] = BJLConstants.BANKER;
//
//            this.lastWay = way;
//
//
//        } else if(way >= "e" && way <= "h") {
//            this.doPlayer();
//            this.lastType = BJLConstants.PLAYER;
//            lastAdd = BJLConstants.PLAYER;
//            //    	    if(!this.isFirstTie){
//            //    	        this.ties =0;
//            //    	    }
//            //    	    this.isFirstTie = false;
//            if(this.currentX >= this.wayList.length) {
//                this.wayList.push([0,0,0,0,0,0]);
//            }
//            this.wayList[this.currentX][this.currentY] = BJLConstants.PLAYER;
//
//            this.lastWay = way;
//
//
//        }
//
//        return lastAdd;
//    }
//
//
//
//    private doBanker() {
//        if(this.lastType == 0) {
//            this.listX = 0;
//            this.listY = 0;
//            this.currentX = 0;
//            this.currentY = 0;
//        } else if(this.lastType == BJLConstants.BANKER) {
//
//            this.listY += 1;
//            if(this.isHaveWay(this.currentX,this.currentY + 1) == false) {
//                if(this.bankerTurn != 0) {
//                    this.currentX += 1;
//
//                    if(this.currentX > BJLConstants.COLUMNS - 1) {
//                        this.clear();
//                    }
//                } else {
//                    this.currentY += 1
//                    if(this.currentY > 5) {
//                        this.currentY = 5;
//                        this.currentX += 1;
//
//                        if(this.currentX > BJLConstants.COLUMNS - 1) {
//                            this.clear();
//                        }
//                    }
//                }
//
//
//            } else {
//                this.currentX += 1;
//                if(this.currentX > BJLConstants.COLUMNS - 1) {
//                    this.clear();
//                } else {
//                    this.bankerTurn = this.currentX - 1;
//                }
//            }
//
//        } else if(this.lastType == BJLConstants.PLAYER) {
//
//            this.turnLeft = -1;
//            this.listX += 1;
//            this.listY = 0;
//            this.bankerTurn = 0;
//
//            var temp = this.getEmptyColumn();
//            if(temp == -1) {
//                this.clear();
//            } else {
//                this.currentX = temp;
//                this.currentY = 0;
//            }
//
//        }
//
//    }
//
//    private doPlayer() {
//        if(this.lastType == 0) {
//            this.listX = 0;
//            this.listY = 0;
//            this.currentX = 0;
//            this.currentY = 0;
//        } else if(this.lastType == BJLConstants.PLAYER) {
//
//
//            this.listY += 1;
//            if(this.isHaveWay(this.currentX,this.currentY + 1) == false) {
//                if(this.playerTurn != 0) {
//                    this.currentX += 1;
//
//                    if(this.currentX > BJLConstants.COLUMNS - 1) {
//                        this.clear();
//                    }
//                } else {
//                    this.currentY += 1
//                    if(this.currentY > 5) {
//                        this.currentY = 5;
//                        this.currentX += 1;
//
//                        if(this.currentX > BJLConstants.COLUMNS - 1) {
//                            this.clear();
//                        }
//                    }
//                }
//
//
//            } else {
//                this.currentX += 1;
//                if(this.currentX > BJLConstants.COLUMNS - 1) {
//                    this.clear();
//                } else {
//                    this.bankerTurn = this.currentX - 1;
//                }
//            }
//
//
//
//
//        } else if(this.lastType == BJLConstants.BANKER) {
//
//            this.turnLeft = -1;
//            this.listX += 1;
//            this.listY = 0
//            this.playerTurn = 0;
//
//            var temp = this.getEmptyColumn();
//            if(temp == -1) {
//                this.clear();
//            } else {
//                this.currentX = temp;
//                this.currentY = 0;
//            }
//        }
//
//
//    }
//
//    //下方是否能画路
//    private isHaveWay(x: number,y: number): boolean {
//        if(y > 5) {
//            return false;
//        }
//
//        if(x >= BJLConstants.COLUMNS || x < 0) {
//            return false;
//        }
//
//        if(x >= this.wayList.length) {
//            return false;
//        }
//
//        if(this.wayList[x][y] == 0) {
//            return false;
//        }
//
//
//        return true;
//    }

    //取空列
    private getEmptyColumn(): number {

        for(var i = 0;i < this.wayList.length;i++) {
            if(this.wayList[i][0] == 0)
                return i;
        }
        return this.wayList.length;
    }

    

    
    
    public addWithOne(aCharacter: string): number {
        var  lastAdd:number = 0;
        
//        if(this.currentX + 1 >= this.wayList.length) {
//            this.wayList.push([0,0,0,0,0,0]);
//        }


        if(aCharacter >= "a" && aCharacter <= "d") {
            
            this.addOneBanker();
            lastAdd = 3;
            
            if(!this.isFirstTie){
                this.ties = 0;
            }
            this.isFirstTie = false;
            
            if(this.currentX>=this.wayList.length){
                this.wayList.push([0,0,0,0,0,0]);
            }
            this.wayList[this.currentX][this.currentY] = 3;
            this.lastWay = aCharacter;

        } else if(aCharacter >= "e" && aCharacter <= "h") {
           
            this.addOnePlayer();
            lastAdd = 2;
            if(!this.isFirstTie) {
                this.ties = 0;
            }
            this.isFirstTie = false;
            if(this.currentX >= this.wayList.length) {
                this.wayList.push([0,0,0,0,0,0]);
            }
            this.wayList[this.currentX][this.currentY] = 2;
            this.lastWay = aCharacter;
            
        } else if(aCharacter >= "i" && aCharacter <= "l") {
            this.ties++;
            lastAdd = 1;
            if(this.lastWay == ""){
                this.isFirstTie = true;
                return lastAdd;
            }
        }
        
        return lastAdd;

    }
    



    private addOneBanker():number{

        //console.log(" currentX is "+this.currentX + "  currentY is" + this.currentY+"  lastType"+this.lastType );
        if(this.lastType == 0) {
            this.listX = 0;
            this.listY = 0;
            this.currentX = 0;
            this.currentY = 0;
        } else if(3 == this.lastType) {
            
            this.listY++;
            if(this.isThereWay(this.currentX,this.currentY + 1) == false) {
                if(this.bankerTurn!=0){
                    this.currentX++;
                    if(this.currentX > 999) {
                        this.clear();
                       return 0;
                    }
                }else{
                    this.currentY++;
                    if(this.currentY>5){
                        this.currentY=5;
                        this.currentX++;
                        
                        if(this.currentX > 999) {
                            this.clear();
                            return 0;
                        }
                    }
                }
                
            }else{
                
                
                this.currentX++;
                if(this.currentX > 999) {
                    this.clear();
                    return 0;
                }else{
                    this.bankerTurn = this.currentX - 1;
                }
                
                
            }
            
            
        } else if(2 == this.lastType) {
        
            this.turnLeft = -1;
            this.listX += 1;
            this.listY = 0;
            this.bankerTurn = 0;


            
            
            var temp = this.getEmptyColumn();
            if(temp > 999) {
                this.clear();
                return 0;
            }
            
            if(temp == -1) {
                this.clear();
                return 0;
            } else {
                this.currentX = temp;
                this.currentY = 0;
            }
        }
        //this.wayList[this.currentX][this.currentY] = BJLConstants.BANKER;
        this.lastType = 3;

        return 1;
    }

    private addOnePlayer() :number{
        
        
        if(0==this.lastType) {
            this.listX = 0;
            this.listY = 0;
            this.currentX = 0;
            this.currentY = 0;
        } else if(2==this.lastType) {
            this.listY++;
            if(this.isThereWay(this.currentX,this.currentY + 1) == false) {
                if(this.playerTurn != 0) {
                    this.currentX++;
                    if(this.currentX > 999) {
                        this.clear();
                        return 0;
                    }
                    
                } else {
                    this.currentY++;
                    if(this.currentY > 5) {
                        this.currentY = 5;
                        this.currentX++;
                        if(this.currentX > 999) {
                            this.clear();
                            return 0;
                        }
                    }
                }
            } else {
                this.currentX++;
                
                if(this.currentX > 999) {
                    this.clear();
                    return 0;
                }else{
                    this.playerTurn = this.currentX - 1;
                }
                
            }

        } else if(3 == this.lastType) {

            this.turnLeft = -1;
            this.listX += 1;
            this.listY = 0;
            this.playerTurn = 0;


            
            var temp = this.getEmptyColumn();
            
            if(temp > 999) {
                this.clear();
                return 0;
            }

            if(temp == -1) {
                this.clear();
                return 0;
            } else {
                this.currentX = temp;
                this.currentY = 0;
            }
        }

        //this.wayList[this.currentX][this.currentY] = BJLConstants.PLAYER;
        this.lastType = 2;
        return 1;
    }
    
    private isThereWay(x:number,y:number):boolean{
        
        if(y>5){
            return false;
        }
        
        if(x >=1000 || x < 0) {
            return false;
        }
//        if(x >= this.wayList.length) {
//            return false;
//        }
//
        if(this.wayList[x][y] == 0) {
            return false;
        }
        
        return true;
    }
}
