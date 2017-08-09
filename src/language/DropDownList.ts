class DropDownList extends eui.Component {
	//展开、收回列表的按钮
	private btn: eui.Image;
	//滚动的列表
	private scroller: eui.Scroller;
	//列表是否展开了
	private isShow: boolean = false;
	//滚动区域消失位置的 y 坐标
	private posScrollerClose: number;
	constructor() {
		super();
		//创建滚动区域和列表
		var arr = ["ZH", "EN", "JA", "KR"];
		// for (var i = 0; i < 16; i++) {
		//     arr.push("项目：" + i);
		// }
		var list = new eui.List();
		list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
		//list.width = 140;
		list.dataProvider = new eui.ArrayCollection(arr);
		list.itemRenderer = OneLang;
		var scroller = new eui.Scroller();
		scroller.height = 400;
		scroller.viewport = list;
		this.addChild(scroller);

		var btn = new eui.Image();
		btn.width = 83;
		btn.height = 83;
		btn.texture = RES.getRes("lang_"+Lang.kind+"_png");
		this.addChild(btn);

		//列表上面的遮罩
		var spMask = new egret.Rectangle(0, 0, 170, 400);
		spMask.y = btn.height-40;
		scroller.mask = spMask;

		this.btn = btn;
		this.scroller = scroller;
	}

	private onSelect(evt: egret.Event) {
		var dataList: eui.List = evt.target;

		this.btn.texture = RES.getRes("lang_" + dataList.selectedItem + "_png");
		this.changeListType();
		Lang.changeLang(dataList.selectedItem);
	}
	protected createChildren() {
		super.createChildren();
		//设置消失点坐标
		this.posScrollerClose = this.scroller.y = -this.scroller.height;
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
	}
	private changeListType(): void {
		if (!this.isShow) {
			egret.Tween.get(this.scroller).to({ y: this.btn.height }, 300);
			this.isShow = true;
		} else {
			egret.Tween.get(this.scroller).to({ y: this.posScrollerClose }, 300);
			this.isShow = false;
		}
	}
}