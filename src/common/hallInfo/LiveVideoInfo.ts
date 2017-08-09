/**
 * 直播信息类
 */
class LiveVideoInfo {
    
    public static instance:LiveVideoInfo;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new LiveVideoInfo();
        }
        return this.instance;
    }
    private urlTable:string[] = [];

    public constructor() {

    }

    /**
     * 设置url数组
     */
    public setUrlTable(url :string) {
        this.urlTable = url.split("*");
    }

    /**
     * 获取url数组
     */
    public getUrlTable() {
        return this.urlTable;
    }

    //获取视频
    public getUrl(video : number, table : number = 1, isHigh : number = 2) {
        return this.urlTable[video] + "game" + table + "table" + isHigh;
    }
}

enum IsHighDefinition {
    Yes = 1,
    No = 2
}