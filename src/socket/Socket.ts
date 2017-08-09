/**
 * 连接服务器
 */

class Socket {
    private socketInterface:SocketInterface;

    private webSocket:egret.WebSocket;

    private ip:string;
    private port:number;

    private state = SocketState.closeError;

    public constructor(ip:string, port:number) {
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
    public connectServer(): void {
        console.log("start to connect to " + this.ip + " : " + this.port);
        this.webSocket.connect(this.ip, this.port);
    }

    /**
     * 关闭服务器
     */
    public close() {
        console.log("关闭服务器");
        this.state = SocketState.closeBySelf;
        this.webSocket.close();
    }

    public setInterface(socketInterface:SocketInterface) {
        this.socketInterface = socketInterface;
    }

    /**
     * 连接服务器成功
     */
    private onSocketOpen(e:egret.Event) {
        console.log("连接服务器成功!", this.socketInterface);
        if (this.socketInterface) {
            this.socketInterface.onSocketOpen();
        }
    }

    /**
     * 接收服务器返回的数据
     */
    private onReceiveMessage(e:egret.Event) {
        //创建 ByteArray 对象
        var byte:egret.ByteArray = new egret.ByteArray();
        //读取数据
        this.webSocket.readBytes(byte);
        //信息交给接口去处理
        if (this.socketInterface) {
            this.socketInterface.onReceiveMessage(byte);
        }
    }

    /**
     * 发送数据
     */
    public send(msg:egret.ByteArray) {
        console.log("发送数据 " + msg.toString());
        if (this.webSocket && this.webSocket.connected) {
            try {
                this.webSocket.writeBytes(msg);
                this.webSocket.flush();
            } catch (error) {
                this.alertView("服务器连接错误");
            }
            
        }
    }

    /**
     * 关闭服务器
     */
    private onClose(e:egret.Event) {
        this.alertView("服务器连接断开");
        console.info("socket close");
        if (this.socketInterface) {
            this.socketInterface.onClose();
            if(this.state == SocketState.closeBySelf) {
                this.socketInterface.onCloseBySelf();
            } else if(this.state == SocketState.closeError) {
                this.socketInterface.onErrorClose();
            }
            
        }
    }

    /**
     * 连接错误
     */
    private onError(e:egret.Event) {
        console.log("连接服务器错误");
        this.state = SocketState.error;
        this.alertView("连接服务器错误");
    }

    private alertView(text : string) {
        var alertView = new AlertView();
		alertView.addBg(500, 200);
		alertView.addText(text, 0, 90);
		AlertZorderManager.getInstance().addChildToManager(alertView);
    }
}