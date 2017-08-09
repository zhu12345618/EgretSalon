
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/socket/socket.js",
	"libs/mouse/mouse.min.js",
	"libs/md5/md5.min.js",
	"libs/liveVideo/liveVideo.js",
	"libs/log/log.js",
	"libs/protobuf/protobuf.js",
	"libs/protobuf/proto.js",
	"libs/global/global.js",
	"libs/global/cookies.js",
	"bin-debug/common/game/Game.js",
	"bin-debug/utils/Button.js",
	"bin-debug/baccarat/BaccaratBet.js",
	"bin-debug/baccarat/BaccaratGame.js",
	"bin-debug/Road/GridScene.js",
	"bin-debug/Road/SmallRoad.js",
	"bin-debug/utils/RadioButton.js",
	"bin-debug/language/OneLang.js",
	"bin-debug/baccarat/BaccaratRoad.js",
	"bin-debug/baccarat/BaccaratRooms.js",
	"bin-debug/baccarat/BaccaratTableList.js",
	"bin-debug/baccarat/ChipButton.js",
	"bin-debug/baccarat/PokerLayer.js",
	"bin-debug/baccarat/union/UnionBaccarat.js",
	"bin-debug/baccarat/union/UnionBaccaratList.js",
	"bin-debug/common/game/CountDownTimer.js",
	"bin-debug/alertView/AlertView.js",
	"bin-debug/common/game/Top.js",
	"bin-debug/common/GameStateInfo.js",
	"bin-debug/common/hallInfo/HallTableInfo.js",
	"bin-debug/common/hallInfo/HallUserInfo.js",
	"bin-debug/common/hallInfo/LiveVideoInfo.js",
	"bin-debug/common/hallInfo/OnlineInfo.js",
	"bin-debug/common/hallInfo/UserInfo.js",
	"bin-debug/common/UIManager.js",
	"bin-debug/common/UserGameInfo.js",
	"bin-debug/config/GameConfig.js",
	"bin-debug/event/EventDispatcher.js",
	"bin-debug/event/Events.js",
	"bin-debug/gameDataManager/GameServerManager.js",
	"bin-debug/gameDataManager/HallTableInfoManager.js",
	"bin-debug/hallScene/HallScene.js",
	"bin-debug/hallScene/selectGame/SelectGameScene.js",
	"bin-debug/language/DropDownList.js",
	"bin-debug/language/Lang.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/login/LoginData.js",
	"bin-debug/login/LoginScene.js",
	"bin-debug/longHu/LongHuBet.js",
	"bin-debug/longHu/LongHuGame.js",
	"bin-debug/Main.js",
	"bin-debug/model/GameTableHistory.js",
	"bin-debug/protobuf/ProtobufData.js",
	"bin-debug/protobuf/ProtobufManager.js",
	"bin-debug/Road/BigRoad.js",
	"bin-debug/Road/BigRoadScene.js",
	"bin-debug/Road/CircleView.js",
	"bin-debug/baccarat/BaccaratBetBtn.js",
	"bin-debug/Road/JyRoadScene.js",
	"bin-debug/Road/MarkRoad.js",
	"bin-debug/Road/MarkRoadScene.js",
	"bin-debug/Road/OneRoadMap.js",
	"bin-debug/Road/RoadScene.js",
	"bin-debug/baccarat/BaccaratBottom.js",
	"bin-debug/Road/SmallRoadScene.js",
	"bin-debug/Road/ZlRoadScene.js",
	"bin-debug/set/SetButton.js",
	"bin-debug/set/SetScene.js",
	"bin-debug/socket/Socket.js",
	"bin-debug/socket/SocketInterface.js",
	"bin-debug/socket/SocketUtils.js",
	"bin-debug/sound/SoundEffectMgr.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/baccarat/BaccaratAskRoadLayer.js",
	"bin-debug/utils/Enum.js",
	"bin-debug/baccarat/BaccaratLimitInfoLayer.js",
	"bin-debug/utils/Utils.js",
	"bin-debug/zorderManager/AlertZorderManager.js",
	"bin-debug/zorderManager/ViewZorderManager.js",
	"bin-debug/zorderManager/WaitingDataZorderManager.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1136,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};