/**
 * 连接服务器
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket(ip, port) {
        this.state = SocketState.closeError;
        console.log("websocket初始化...");
        this.webSocket = new egret.WebSocket();
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.ip = ip;
        this.port = port;
        console.log("websocket初始化完成");
    }
    /**
     * 连接服务器
     */
    Socket.prototype.connectServer = function () {
        console.log("start to connect to " + this.ip + " : " + this.port);
        this.webSocket.connect(this.ip, this.port);
    };
    /**
     * 关闭服务器
     */
    Socket.prototype.close = function () {
        console.log("关闭服务器");
        this.state = SocketState.closeBySelf;
        this.webSocket.close();
    };
    Socket.prototype.setInterface = function (socketInterface) {
        this.socketInterface = socketInterface;
    };
    /**
     * 连接服务器成功
     */
    Socket.prototype.onSocketOpen = function (e) {
        console.log("连接服务器成功!", this.socketInterface);
        if (this.socketInterface) {
            this.socketInterface.onSocketOpen();
        }
    };
    /**
     * 接收服务器返回的数据
     */
    Socket.prototype.onReceiveMessage = function (e) {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        //读取数据
        this.webSocket.readBytes(byte);
        //信息交给接口去处理
        if (this.socketInterface) {
            this.socketInterface.onReceiveMessage(byte);
        }
    };
    /**
     * 发送数据
     */
    Socket.prototype.send = function (msg) {
        console.log("发送数据 " + msg.toString());
        if (this.webSocket && this.webSocket.connected) {
            try {
                this.webSocket.writeBytes(msg);
                this.webSocket.flush();
            }
            catch (error) {
                this.alertView("服务器连接错误");
            }
        }
    };
    /**
     * 关闭服务器
     */
    Socket.prototype.onClose = function (e) {
        this.alertView("服务器连接断开");
        console.info("socket close");
        if (this.socketInterface) {
            this.socketInterface.onClose();
            if (this.state == SocketState.closeBySelf) {
                this.socketInterface.onCloseBySelf();
            }
            else if (this.state == SocketState.closeError) {
                this.socketInterface.onErrorClose();
            }
        }
    };
    /**
     * 连接错误
     */
    Socket.prototype.onError = function (e) {
        console.log("连接服务器错误");
        this.state = SocketState.error;
        this.alertView("连接服务器错误");
    };
    Socket.prototype.alertView = function (text) {
        var alertView = new AlertView();
        alertView.addBg(500, 200);
        alertView.addText(text, 0, 90);
        AlertZorderManager.getInstance().addChildToManager(alertView);
    };
    return Socket;
}());
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map