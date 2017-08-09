/**
 * 在线人数信息类
 */
class OnlineInfo {

    public static instance:OnlineInfo;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new OnlineInfo();
        }
        return this.instance;
    }

    private inlineNum:number = 0;

    public setOnlineNum(inlineNum:number) {
        this.inlineNum = inlineNum;
    }

    public getOnlineNum() {
        return this.inlineNum;
    }
}