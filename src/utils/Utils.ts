/**
 * 工具类
 */
class Utils {

	/**
	 * 弹出一直存在的对话框
	 */
	public static alertView(text:string) {
		var alertView = new AlertView();
		alertView.addBg(500, 200);
		alertView.addText(text, 0, 90);
		alertView.setRemoveTimer(2000);
		AlertZorderManager.getInstance().addChildToManager(alertView);
	}
}