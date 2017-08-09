class Lang {
	public static ZH: string = "ZH";
	public static EN: string = "EN";
	public static JA: string = "JA";
	public static KO: string = "KR";

	//当前语言类型
	public static kind: string = "ZH";

	private static obj: Object = new Object();

	public static setkind(kind) {
		Lang.kind = kind;
		setCookie("lANGUAGE", this.kind, 1);
	}

	public static init(kind: string): void {
		// Lang.obj[kind] = RES.getRes(kind);
		this.obj = RES.getRes('Lang_json');
		this.setkind(kind);
	}
	//切换语言
	public static switchKind(kind: string): void {
		// if (!Lang.obj[kind]) {
		// 	RES.getResAsync(kind, function (data, key) {
		// 		Lang.obj[kind] = data;
		// 		Lang.kind = kind;
		// 		EventPoster.getDispatcher().dispatchEventWith(MyEvent.LANG_CHANGE);
		// 		egret.log(Lang.getStr('login'));
		// 	}, this);
		// } else {
		// 	if (Lang.kind != kind) {
		// 		EventPoster.getDispatcher().dispatchEventWith(MyEvent.LANG_CHANGE);
		// 	}
		// }

	}

	public static changeLang(kind: string) {
		if (Lang.kind != kind) {
			this.setkind(kind);

			EventDispatcher.getInstance().dispatchEventWith(Events.CHANGE_LANGE);
		}
	}

	public static getStr(key): string {
		//return Lang.Const[this.kind + key];
		return this.obj[this.kind][key];
	}

}