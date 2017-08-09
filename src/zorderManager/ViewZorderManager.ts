/**
 * 界面层管理器
 */
class ViewZorderManager extends eui.Group {
    public static instance:ViewZorderManager;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ViewZorderManager();
        }
        return this.instance;
    }

    constructor() {
        super();

        this.width = GameConfig.width;
        this.height = GameConfig.height;
    }
}