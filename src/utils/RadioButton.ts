
class RadioButton extends Button {
    public index;
    public groupName;
    public selected : boolean = false;

    protected addPressedImage : eui.Image;
    protected addPressedTexture : string = "";
    protected addPressedWidth : number = 0;
    protected addPressedHeight : number = 0;

    private callback;

    constructor() {
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSelf, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
	}

    public init() {
        this.addPressedImage = new eui.Image();
        this.addChild(this.addPressedImage);
        super.init();
    }

    public setIndex(index) {
        this.index = index;
    }

    public getIndex() {
        return this.index;
    }

    public setGroupName(groupName) {
        this.groupName = groupName;
    }

    public getGroupName() {
        return this.groupName;
    }

	public onAddtoStage(): void {
		EventDispatcher.getInstance().addEventListener(Events.CHANGE_RADIOBTN_STATE, this.getUnSelectedEvent, this);
	}

	public onRemoveFromStage(): void {
		EventDispatcher.getInstance().removeEventListener(Events.CHANGE_RADIOBTN_STATE, this.getUnSelectedEvent, this);
	}

	private getUnSelectedEvent(event) {
		if(this != event.data) {
            this.setSelected(false);
            if(this.pressedTexture) {

            } else {
                this.removeAddPressedTexture()
            }
        }
	}

    private onClickSelf() {
        if(!this.isSelected()) {
            this.setSelected(true);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_RADIOBTN_STATE, this);
            if(this.pressedTexture) {

            } else {
                this.setAddPressedImage()
            }
            if(this.callback) {
                this.callback();
            }
        }
        
    }

    private setSelected(selected : boolean) {
        this.selected = selected;
    }

    private isSelected() {
        return this.selected;
    }

    private setCallback() {

    }

    public setAddPressedTexture(texture, width, height) {
        this.addPressedTexture = texture;
        this.addPressedWidth = width;
        this.addPressedHeight = height;
    }

    public setAddPressedImage() {
        this.addPressedImage.texture = RES.getRes(this.addPressedTexture);
        this.addPressedImage.anchorOffsetX = this.addPressedWidth*0.5;
        this.addPressedImage.anchorOffsetY = this.addPressedWidth*0.5;
        this.addPressedImage.x = this.width*0.5;
        this.addPressedImage.y = this.height*0.5;
        this.addPressedImage.visible = true;
    }

    public removeAddPressedTexture() {
        if(this.addPressedImage && this.addPressedImage.parent) {
            // this.addPressedImage.parent.removeChild(this.addPressedImage);
            this.addPressedImage.visible = false;
        }
    }

    public setPressedTextureSize(width, height) {
        this.addPressedImage.width = width;
        this.addPressedImage.height = height;
    }

    public setOnClickCallback(callback) {
        this.callback = callback;
    }
}