/**
 *
 * @author 
 *
 */
class MarkRoad {
	public constructor() {

	}
	
	public  currentX:number = 0;
	public  currentY:number = 0;
	private lastType:number = 0;
	
	public addOne(){
		if(this.lastType == 0) {
			this.currentX = 0;
			this.currentY = 0;
			this.lastType = 1;
		} else if(this.currentY == 5) {
            this.currentX += 1;
            this.currentY = 0;
        } else {
            this.currentY += 1;
        }
	}
	
	public clear(){
	    this.currentX = 0;
	    this.currentY = 0;
		this.lastType = 0;
	}
}
