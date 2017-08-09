/**
 * socket接口
 */
interface SocketInterface {
    onSocketOpen();
    onReceiveMessage(data : egret.ByteArray):void;
    onClose();
    onErrorClose();
    onCloseBySelf();
}