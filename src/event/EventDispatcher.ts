/**
 * 事件分发器
 */
class EventDispatcher extends egret.EventDispatcher{

    private static dispatcher: EventDispatcher;
	public static getInstance():EventDispatcher{
		if(!this.dispatcher){
			this.dispatcher = new EventDispatcher();
		}
		return this.dispatcher;
	}

	/**
	 * 发送普通事件
	 */
	public sendNormalEvent(eventType:string) {
		var event = egret.Event.create(egret.Event, eventType);
		this.dispatchEvent(event)
	}

	/**
	 * 发送带数据事件
	 */
	public sendDataEvent(eventType:string, data) {
		var event = egret.Event.create(egret.Event, eventType);
		event.data = data;
		this.dispatchEvent(event)
	}
}