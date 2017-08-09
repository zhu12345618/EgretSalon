var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大厅服务器的控制器
 */
var GameServerManager = (function () {
    function GameServerManager() {
        this.heartTimer = new egret.Timer(1000, 0);
    }
    GameServerManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new GameServerManager();
            this.instance.setGameSocket();
        }
        return this.instance;
    };
    /**
     * 设置服务器
     */
    GameServerManager.prototype.setGameSocket = function () {
        var serverInfo = RES.getRes('serverInfo_json');
        this.gameSocket = new Socket(serverInfo.ip, serverInfo.port);
        this.initInterface();
    };
    /**
     * 游戏服务器
     */
    GameServerManager.prototype.getGameSocket = function () {
        return this.gameSocket;
    };
    /**
     *  初始化socket的接口
     */
    GameServerManager.prototype.initInterface = function () {
        this.getGameSocket().setInterface(this);
    };
    /**
     * 连接服务器
     */
    GameServerManager.prototype.connectServer = function () {
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
        this.getGameSocket().connectServer();
    };
    //实现SocketInterface接口的方法
    GameServerManager.prototype.onSocketOpen = function () {
        WaitingDataZorderManager.getInstance().removeWaitingDataLayer();
        console.info("onSocketOpen");
        this.sendHertTimer();
    };
    //实现SocketInterface接口的方法
    GameServerManager.prototype.onReceiveMessage = function (data) {
        WaitingDataZorderManager.getInstance().removeWaitingDataLayer();
        var length = data.readInt();
        var id = data.readInt();
        var command = data.readShort();
        console.log(id, command, "id command");
        var buffer = new Uint8Array(length - 6);
        for (var i = 0; i < length - 6; i++) {
            buffer[i] = data.readByte();
        }
        switch (command) {
            case ProtobufManager.Command.client_heart_beat_ack:
                this.receiveHeart(buffer);
                break;
            case ProtobufManager.Command.user_lobby_login_ack:
                this.receiveLogin(buffer);
                break;
            case ProtobufManager.Command.user_lobby_logout_ack:
                this.receiveLogout(buffer);
                break;
            case ProtobufManager.Command.lobby_player_push:
                this.receiveUserInfo(buffer);
                break;
            case ProtobufManager.Command.lobby_videourl_push:
                this.receiveLiveVideoUrl(buffer);
                break;
            case ProtobufManager.Command.lobby_status_push:
                this.receiveLobbyTableInfo(buffer);
                break;
            case ProtobufManager.Command.lobby_playercount_push:
                this.receiveOnlineNum(buffer);
                break;
            case ProtobufManager.Command.user_game_login_ack:
                this.receiveGameLogin(buffer);
                break;
            case ProtobufManager.Command.user_game_exit_ack:
                this.receiveGameExit(buffer);
                break;
            case ProtobufManager.Command.game_join_table_ack:
                this.receiveJoinTableLogin(buffer);
                break;
            case ProtobufManager.Command.game_table_status_push:
                this.receiveGameTableStatus(buffer);
                break;
            case ProtobufManager.Command.game_table_config_push:
                this.receiveGameTableConfig(buffer);
                break;
            case ProtobufManager.Command.game_table_history_push:
                this.receiveGameTableHistory(buffer);
                break;
            case ProtobufManager.Command.game_player_push:
                this.receiveGameUserSnapshot(buffer);
                break;
            case ProtobufManager.Command.game_bet_ack:
                this.receiveBetInfo(buffer);
                break;
            case ProtobufManager.Command.game_virtual_table_push:
                this.receiveVirtualTable(buffer);
                break;
            default:
                break;
        }
    };
    //实现SocketInterface接口的方法
    GameServerManager.prototype.onClose = function () {
        WaitingDataZorderManager.getInstance().removeWaitingDataLayer();
        this.heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.heart, this);
    };
    //实现SocketInterface接口的方法
    GameServerManager.prototype.onErrorClose = function () {
        WaitingDataZorderManager.getInstance().removeWaitingDataLayer();
    };
    //实现SocketInterface接口的方法
    GameServerManager.prototype.onCloseBySelf = function () {
        WaitingDataZorderManager.getInstance().removeWaitingDataLayer();
    };
    /**
     * 发送心跳包
     */
    GameServerManager.prototype.sendHertTimer = function () {
        this.heartTimer.start();
        this.heartTimer.addEventListener(egret.TimerEvent.TIMER, this.heart, this);
    };
    GameServerManager.prototype.heart = function (event) {
        ProtobufManager.sendAutoID();
    };
    /**
     * 登录
     */
    GameServerManager.prototype.login = function (userNameText, passWordText) {
        ProtobufManager.sendLobbyLogin(userNameText, passWordText);
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 登录
     */
    GameServerManager.prototype.gameLogin = function (gameID, tableID, type) {
        if (type === void 0) { type = ProtobufManager.JoinType.VipTable; }
        ProtobufManager.sendGameLogin(gameID, tableID, type);
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 进桌
     */
    GameServerManager.prototype.joinTable = function (tableID, type) {
        if (type === void 0) { type = 0; }
        ProtobufManager.sendJoinTable(tableID, type);
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 登出
     */
    GameServerManager.prototype.lobbyLogout = function () {
        ProtobufManager.sendNilBody();
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 退出游戏
     */
    GameServerManager.prototype.gameExit = function (gameID) {
        ProtobufManager.sendGameExit(gameID);
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 下注
     */
    GameServerManager.prototype.bet = function (tableID, subtype, detail) {
        ProtobufManager.sendBet(tableID, subtype, detail);
        WaitingDataZorderManager.getInstance().addWaitingDataLayer();
    };
    /**
     * 接收心跳数据
     */
    GameServerManager.prototype.receiveHeart = function (buffer) {
        var autoID = ProtobufManager.getAutoID(buffer);
        console.log(autoID, "autoID");
    };
    /**
     * 接收登录数据
     */
    GameServerManager.prototype.receiveLogin = function (buffer) {
        var login = ProtobufManager.getCommonReply(buffer);
        console.info(login, "login");
        this.sendLoginCode(login.code);
    };
    /**
     * 接收登出数据
     */
    GameServerManager.prototype.receiveLogout = function (buffer) {
        var logout = ProtobufManager.getCommonReply(buffer);
        console.log(logout, "logout");
        HallTableInfoManager.getInstance().clearHallStateInfo();
        ViewZorderManager.getInstance().removeChildren();
        ViewZorderManager.getInstance().addChild(new LoginScene());
    };
    /**
     * 检查用户名是否合法
     */
    GameServerManager.prototype.sendLoginCode = function (code) {
        var event = new egret.Event(Events.GET_LOGIN_CODE);
        event.data = code;
        EventDispatcher.getInstance().dispatchEvent(event);
    };
    /**
     * 接收大厅玩家信息数据
     */
    GameServerManager.prototype.receiveUserInfo = function (buffer) {
        var userInfo = ProtobufManager.getLobbyUserSnapshot(buffer);
        console.log(userInfo, "lobbyUserInfo");
        HallUserInfo.getInstance().setInfoByObject(userInfo);
        var event = new egret.Event(Events.GET_HALL_USER_INFO);
        event.data = HallUserInfo.getInstance();
        EventDispatcher.getInstance().dispatchEvent(event);
    };
    /**
     * 接收直播地址数据
     */
    GameServerManager.prototype.receiveLiveVideoUrl = function (buffer) {
        var liveVideoUrl = ProtobufManager.getStr(buffer);
        console.log(liveVideoUrl, "liveVideoUrl");
        LiveVideoInfo.getInstance().setUrlTable(liveVideoUrl.str);
    };
    /**
     * 接收大厅桌面数据
     */
    GameServerManager.prototype.receiveLobbyTableInfo = function (buffer) {
        var lobbyTableInfo = ProtobufManager.getTableSnapshot(buffer);
        var gameType = lobbyTableInfo.gameType;
        HallTableInfoManager.getInstance().setHallStateInfo(lobbyTableInfo);
    };
    /**
     * 接收玩家在线数据
     */
    GameServerManager.prototype.receiveOnlineNum = function (buffer) {
        var onlineNum = ProtobufManager.getAutoID(buffer);
        console.log(onlineNum, "onlineNum");
        OnlineInfo.getInstance().setOnlineNum(onlineNum.id);
        var event = new egret.Event(Events.GET_ONLINE_INFO);
        EventDispatcher.getInstance().dispatchEvent(event);
    };
    /**
     * 接收游戏登录信息
     */
    GameServerManager.prototype.receiveGameLogin = function (buffer) {
        var gameLogin = ProtobufManager.getCommonReply(buffer);
        console.log(gameLogin, "GameLogin");
        switch (BaccaratGame.baccaratType) {
            case ProtobufManager.JoinType.Chain:
                ViewZorderManager.getInstance().removeChildren();
                ViewZorderManager.getInstance().addChild(new UnionBaccaratList());
                break;
            default:
                break;
        }
    };
    /**
     * 接收退出游戏信息
     */
    GameServerManager.prototype.receiveGameExit = function (buffer) {
        var gameExit = ProtobufManager.getCommonReply(buffer);
        console.log(gameExit, "gameExit");
    };
    /**
     * 接收进入桌面信息
     */
    GameServerManager.prototype.receiveJoinTableLogin = function (buffer) {
        var joinTable = ProtobufManager.getCommonReply(buffer);
        console.log(joinTable, "joinTable");
        switch (Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                switch (BaccaratGame.baccaratType) {
                    case ProtobufManager.JoinType.Common:
                    case ProtobufManager.JoinType.VipTable:
                        ViewZorderManager.getInstance().removeChildren();
                        ViewZorderManager.getInstance().addChild(new BaccaratGame());
                        break;
                    default:
                        break;
                }
                break;
            case ProtobufManager.GameType.LongHu:
                ViewZorderManager.getInstance().removeChildren();
                ViewZorderManager.getInstance().addChild(new LongHuGame());
                break;
        }
    };
    /**
     * 接收游戏桌面状态信息
     */
    GameServerManager.prototype.receiveGameTableStatus = function (buffer) {
        var gameTableStatus = ProtobufManager.getGameTableStatus(buffer);
        console.log(gameTableStatus, "GameTableStatus");
        var gameStateInfo = new GameStateInfo();
        gameStateInfo.setGameStateInfo(gameTableStatus);
        var event = egret.Event.create(egret.Event, Events.GET_GAME_STATE);
        event.data = gameStateInfo;
        EventDispatcher.getInstance().dispatchEvent(event);
    };
    /**
     * 接收游戏桌面配置信息
     */
    GameServerManager.prototype.receiveGameTableConfig = function (buffer) {
        var gameTableConfig = ProtobufManager.getGameTableConfig(buffer);
        console.log(gameTableConfig, "GameTableConfig");
    };
    /**
     * 接收游戏桌面历史信息
     */
    GameServerManager.prototype.receiveGameTableHistory = function (buffer) {
        var tableHistory = ProtobufManager.getGameTableHistory(buffer);
        console.log(tableHistory, "GameTableHistory");
        var gameTableHistory = new GameTableHistory();
        gameTableHistory.setInfo(tableHistory);
        EventDispatcher.getInstance().sendDataEvent(Events.UPDATE_GAME_WAYBILL, gameTableHistory);
    };
    /**
     * 接收游戏桌面用户信息
     */
    GameServerManager.prototype.receiveGameUserSnapshot = function (buffer) {
        var userSnapshot = ProtobufManager.getGameUserSnapshot(buffer);
        console.log(userSnapshot, "GameUserSnapshot");
        UserGameInfo.getInstance().setUserGameInfo(userSnapshot);
        var event = egret.Event.create(egret.Event, Events.GET_USER_GAME_INFO);
        event.data = UserGameInfo.getInstance();
        EventDispatcher.getInstance().dispatchEvent(event);
    };
    /**
     * 接收下注信息
     */
    GameServerManager.prototype.receiveBetInfo = function (buffer) {
        var betInfo = ProtobufManager.getCommonReply(buffer);
        console.info("GameBetInfo", betInfo);
    };
    /**
     * 接收包间信息
     */
    GameServerManager.prototype.receiveVirtualTable = function (buffer) {
        var virtualTable = ProtobufManager.getVirtualTable(buffer);
        console.info(virtualTable, "virtualTable");
        EventDispatcher.getInstance().sendDataEvent(Events.UPDATE_VIRTUAL_TABLE, virtualTable);
    };
    return GameServerManager;
}());
__reflect(GameServerManager.prototype, "GameServerManager", ["SocketInterface"]);
//# sourceMappingURL=GameServerManager.js.map