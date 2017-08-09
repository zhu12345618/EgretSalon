class OneLang extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName = "resource/loginScene/OneLangSkin.exml";
		this.customView();
	}

	private Image:eui.Image = new eui.Image();
	protected dataChanged(): void {
		this.Image.texture = RES.getRes("lang_"+this.data+"_png");
	}
	private customView(){
		
		this.height = 83;
		this.width = 83;
		
		
		this.addChild(this.Image);
		
	}

}