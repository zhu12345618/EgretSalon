declare module cmkj {
    class LiveVideo extends egret.EventDispatcher {
        constructor(url : string, x : number, y : number, width : number, height : number);
        updateLiveVideo() : void;
        closeLiveVideo() : void;
        getIframeId() : string;
    }
}