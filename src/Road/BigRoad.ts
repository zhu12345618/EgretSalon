/**
 *
 * @author 
 *
 */
class BigRoad extends SmallRoad {
    public constructor() {
        super();
    }
    private visualist: number[] = [];

    public clear() {
        super.clear();
        this.listClear();
        
    }

    
    private listClear(){
         var count  = this.visualist.length;
        for(var i = 0; i < count; i++) {
            this.visualist.pop();
        }
    }
    
    //画个单路
    public add(way: string): number {
        
        var lastAdd = super.addWithOne(way);
        if(lastAdd > 1 && this.listY < 100) {
            if(this.visualist.length <= this.listX) {
                this.visualist.push(this.listY + 1);
            } else {
                this.visualist[this.listX] = this.listY + 1;
            }
        }
        return lastAdd;
    }

    //遍历visuallist
    public printVisuallist(){
        
        for(var i = 0; i < this.visualist.length; i++) {
            
            egret.log("visulaist["+i+"] :"+this.visualist[i]);
        }
    }
    
    
    
    /**
     * 取鸡眼路代码
     * 圈, a红,e蓝
     * @return
     */
    
    public getJiyanCode():string{
        
        
        if(this.listX >= 1){
            
            if(this.listX > 1 && this.listY == 0){
                if(this.isSnap(2)){
                    return "a";
                }else{
                    return "e";
                }
            }
            
            return this.subCode(1);
        }
        
        return "";
    }
    
    
    /**
     * 取小圆路代码
     * 点, a红,e蓝
     * @return
     */
    
    
    public getSmallCode():string{
        
        if(this.listX >= 2){
            if(this.listX > 2 && this.listY == 0){
                if(this.isSnap(3)){
                    return "a";
                }else{
                    return "e";
                }
            }
            return this.subCode(2);
        }
        
        return " ";
    }
    
    
    /**
     * 取蟑螂路代码
     * 杠, a红,e蓝
     * @return
     */
    
    public getZhanglangCode():string{
        if(this.listX >= 3){
            if(this.listX >3 &&this.listY == 0){
                if(this.isSnap(4)){
                    return "a";
                }else{
                    return "e";
                }
            }
            
            return this.subCode(3);
        }
        
        return " ";
    }


    private subCode(columOff: number): string {

        if(this.listY > 0 &&this.listY < 100){
            if(this.visualist[this.listX-columOff] >= this.listY+1){
                
                return "a";
            }
            else{
                if(this.visualist[this.listX-columOff] < this.listY-1+1){
                    return "a";
                }
                else{
                    return "e";
                }
            }
        }

        return " ";
    }



    //对比相隔的两列是否对齐,相隔数:鸡眼2,小路3,甲由4
    private isSnap(columnOff: number): boolean {
        return this.visualist[this.listX - 1] == this.visualist[this.listX - columnOff];
    }

}
