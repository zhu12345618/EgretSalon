/**
 * ProtobufManager类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtobufManager = (function () {
    function ProtobufManager() {
    }
    ProtobufManager.loadProtobuf = function () {
        function callback(err, root) {
            ProtobufManager.Root = root;
            ProtobufManager.Command = root.lookup("proto.Command").values;
            ProtobufManager.GameType = root.lookup("proto.GameType").values;
            ProtobufManager.Subtype = root.lookup("proto.Game.Subtype").values;
            ProtobufManager.JoinType = root.lookup("proto.UserRequest.JoinType").values;
            GameServerManager.getInstance().connectServer();
        }
        Proto.load(callback);
    };
    //发送AutoID数据
    ProtobufManager.sendAutoID = function () {
        var autoID = { id: this.heartCount + 1 };
        this.serialize("proto.AutoID", autoID, this.Command.client_heart_beat);
    };
    //发送LobbyLogin数据
    ProtobufManager.sendLobbyLogin = function (name, pwd) {
        var login = { name: name, passwd: pwd, way: "-1", ip: "", platform: 1 };
        this.serialize("proto.UserRequest.LobbyLogin", login, this.Command.user_lobby_login);
    };
    //发送NilBody数据
    ProtobufManager.sendNilBody = function () {
        var nilBody = {};
        this.serialize("proto.UserRequest.NilBody", nilBody, this.Command.user_lobby_logout);
    };
    //发送GameLogin数据
    ProtobufManager.sendGameLogin = function (gameID, tableID, type) {
        var gameLogin = { gameID: gameID, tableID: tableID, type: type };
        this.serialize("proto.UserRequest.GameLogin", gameLogin, this.Command.user_game_login);
    };
    //发送JoinTable数据
    ProtobufManager.sendJoinTable = function (tableID, type) {
        var joinTable = { tableID: tableID, type: type };
        this.serialize("proto.Game.JoinTable", joinTable, this.Command.game_join_table);
    };
    //发送GameExit数据
    ProtobufManager.sendGameExit = function (gameID) {
        var gameExit = { gameID: gameID };
        this.serialize("proto.UserRequest.GameExit", gameExit, this.Command.user_game_exit);
    };
    //发送Bet数据
    ProtobufManager.sendBet = function (tableID, subtype, detail) {
        var bet = { tableID: tableID, subtype: subtype, detail: detail };
        this.serialize("proto.Game.Bet", bet, this.Command.game_bet);
    };
    //获取AutoID数据
    ProtobufManager.getAutoID = function (buffer) {
        return this.decode("proto.AutoID", buffer);
    };
    //获取Str数据
    ProtobufManager.getStr = function (buffer) {
        return this.decode("proto.String", buffer);
    };
    //获取CommanReply数据
    ProtobufManager.getCommonReply = function (buffer) {
        return this.decode("proto.CommonReply", buffer);
    };
    //获取Lobby.UserSnapshot数据
    ProtobufManager.getLobbyUserSnapshot = function (buffer) {
        return this.decode("proto.Lobby.UserSnapshot", buffer);
    };
    //获取Lobby.TableSnapshot数据
    ProtobufManager.getTableSnapshot = function (buffer) {
        return this.decode("proto.Lobby.TableSnapshot", buffer);
    };
    //获取Game.TableStatus数据
    ProtobufManager.getGameTableStatus = function (buffer) {
        return this.decode("proto.Game.TableStatus", buffer);
    };
    //获取Game.TableConfig数据
    ProtobufManager.getGameTableConfig = function (buffer) {
        return this.decode("proto.Game.TableConfig", buffer);
    };
    //获取Game.TableHistory数据
    ProtobufManager.getGameTableHistory = function (buffer) {
        return this.decode("proto.Game.TableHistory", buffer);
    };
    //获取Game.UserSnapshot数据
    ProtobufManager.getGameUserSnapshot = function (buffer) {
        return this.decode("proto.Game.UserSnapshot", buffer);
    };
    //获取VirtualTable.Table数据
    ProtobufManager.getVirtualTable = function (buffer) {
        return this.decode("proto.Game.VirtualTable.Table", buffer);
    };
    //序列化
    ProtobufManager.serialize = function (proto, object, command) {
        var ProtobufObject = this.Root.lookupType(proto);
        this.serializeProtobuf(ProtobufObject, object, command);
    };
    //序列化
    ProtobufManager.serializeProtobuf = function (ProtobufObject, object, command) {
        var message = this.checkMessage(ProtobufObject, object);
        var buffer = this.serializeMessage(ProtobufObject, message);
        this.packProtobuf(command, buffer);
    };
    //检测数据，并将由pbRoot获取到的proto对象和自己组成的对象转化成消息
    ProtobufManager.checkMessage = function (protoObject, object) {
        var errMsg = protoObject.verify(object);
        if (errMsg) {
            throw Error(errMsg);
        }
        var message = protoObject.fromObject(object);
        return message;
    };
    //将消息序列化
    ProtobufManager.serializeMessage = function (protoObject, message) {
        var buffer = protoObject.encode(message).finish();
        var array = new Uint8Array(buffer);
        return array;
    };
    //解码(反序列化)
    ProtobufManager.decode = function (proto, buffer) {
        var ProtobufObject = this.Root.lookupType(proto);
        return this.decodeProtobuf(ProtobufObject, buffer);
    };
    //解码(反序列化)
    ProtobufManager.decodeProtobuf = function (ProtobufObject, buffer) {
        return ProtobufObject.decode(buffer);
    };
    /**
     * 读数据
     */
    ProtobufManager.packProtobuf = function (command, data) {
        var len = data.length;
        this.heartCount++;
        var byte = new egret.ByteArray();
        byte.writeInt(len + 6);
        byte.writeInt(this.heartCount);
        byte.writeShort(command);
        byte.writeBytes(data);
        GameServerManager.getInstance().getGameSocket().send(byte);
    };
    return ProtobufManager;
}());
ProtobufManager.Root = null;
ProtobufManager.Command = null;
ProtobufManager.GameType = null;
ProtobufManager.Subtype = null;
ProtobufManager.heartCount = 0;
__reflect(ProtobufManager.prototype, "ProtobufManager");
//# sourceMappingURL=ProtobufManager.js.map