/**
 * ProtobufManager类
 */

class ProtobufManager {
    public static Root = null;
    public static Command = null;
    public static GameType = null;
    public static Subtype = null;
    public static heartCount = 0;
    public static JoinType;

    public static loadProtobuf() {
        function callback(err, root) {
            ProtobufManager.Root = root;
            ProtobufManager.Command = root.lookup("proto.Command").values;
            ProtobufManager.GameType = root.lookup("proto.GameType").values;
            ProtobufManager.Subtype = root.lookup("proto.Game.Subtype").values;
            ProtobufManager.JoinType = root.lookup("proto.UserRequest.JoinType").values;
            GameServerManager.getInstance().connectServer();
        }
        Proto.load(callback);
    }

    //发送AutoID数据
    public static sendAutoID() {
        var autoID = {id : this.heartCount+1};
        this.serialize("proto.AutoID", autoID, this.Command.client_heart_beat);
    }

    //发送LobbyLogin数据
    public static sendLobbyLogin(name: string, pwd: string) {
        var login = {name : name, passwd : pwd, way : "-1", ip : "", platform : 1}
        this.serialize("proto.UserRequest.LobbyLogin", login, this.Command.user_lobby_login);
    }

    //发送NilBody数据
    public static sendNilBody() {
        var nilBody = {};
        this.serialize("proto.UserRequest.NilBody", nilBody, this.Command.user_lobby_logout);
    }

    //发送GameLogin数据
    public static sendGameLogin(gameID : number, tableID : number, type) {
        var gameLogin = {gameID : gameID, tableID : tableID, type : type};
        this.serialize("proto.UserRequest.GameLogin", gameLogin, this.Command.user_game_login);
    }

    //发送JoinTable数据
    public static sendJoinTable(tableID : number, type : number) {
        var joinTable = {tableID : tableID, type : type};
        this.serialize("proto.Game.JoinTable", joinTable, this.Command.game_join_table);
    }

    //发送GameExit数据
    public static sendGameExit(gameID : number) {
        var gameExit = {gameID : gameID};
        this.serialize("proto.UserRequest.GameExit", gameExit, this.Command.user_game_exit);
    }

    //发送Bet数据
    public static sendBet(tableID : number, subtype : number, detail) {
        var bet = {tableID : tableID, subtype : subtype, detail : detail};
        this.serialize("proto.Game.Bet", bet, this.Command.game_bet);
    }




    //获取AutoID数据
	public static getAutoID(buffer) {
        return this.decode("proto.AutoID", buffer);
	}

    //获取Str数据
	public static getStr(buffer) {
        return this.decode("proto.String", buffer);
	}

    //获取CommanReply数据
    public static getCommonReply(buffer) {
        return this.decode("proto.CommonReply", buffer);
    }

    //获取Lobby.UserSnapshot数据
    public static getLobbyUserSnapshot(buffer) {
        return this.decode("proto.Lobby.UserSnapshot", buffer);
    }

    //获取Lobby.TableSnapshot数据
	public static getTableSnapshot(buffer) { 
        return this.decode("proto.Lobby.TableSnapshot", buffer);
	}

    //获取Game.TableStatus数据
    public static getGameTableStatus(buffer) {
        return this.decode("proto.Game.TableStatus", buffer);
    }

    //获取Game.TableConfig数据
    public static getGameTableConfig(buffer) {
        return this.decode("proto.Game.TableConfig", buffer);
    }

    //获取Game.TableHistory数据
    public static getGameTableHistory(buffer) {
        return this.decode("proto.Game.TableHistory", buffer);
    }

    //获取Game.UserSnapshot数据
    public static getGameUserSnapshot(buffer) {
        return this.decode("proto.Game.UserSnapshot", buffer);
    }

    //获取VirtualTable.Table数据
    public static getVirtualTable(buffer) {
        return this.decode("proto.Game.VirtualTable.Table", buffer);
    }




    //序列化
    public static serialize(proto, object, command) {
        var ProtobufObject = this.Root.lookupType(proto);
        this.serializeProtobuf(ProtobufObject, object, command);
    }

    //序列化
    public static serializeProtobuf(ProtobufObject, object, command) {
        var message = this.checkMessage(ProtobufObject, object);
		var buffer = this.serializeMessage(ProtobufObject, message);
        this.packProtobuf(command, buffer);
    }

    //检测数据，并将由pbRoot获取到的proto对象和自己组成的对象转化成消息
	public static checkMessage(protoObject:any, object:any) {
		var errMsg = protoObject.verify(object);
		if(errMsg) {
			throw Error(errMsg);
		}
		var message = protoObject.fromObject(object);
		return message;
	}

	//将消息序列化
	public static serializeMessage(protoObject:any, message:any) : Int8Array {
		var buffer = protoObject.encode(message).finish();
		var array = new Uint8Array(buffer);
		return array;
	}

    //解码(反序列化)
    public static decode(proto, buffer) {
        var ProtobufObject = this.Root.lookupType(proto);
		return this.decodeProtobuf(ProtobufObject, buffer);
    }

    //解码(反序列化)
    public static decodeProtobuf(ProtobufObject, buffer) {
        return ProtobufObject.decode(buffer);
    } 

    /**
	 * 读数据
	 */
	public static packProtobuf(command: any,  data: any) {
		var len = data.length;
		this.heartCount++;
		var byte = new egret.ByteArray();
		byte.writeInt(len + 6);
		byte.writeInt(this.heartCount);
		byte.writeShort(command);
		byte.writeBytes(data);
        GameServerManager.getInstance().getGameSocket().send(byte);
	}
}