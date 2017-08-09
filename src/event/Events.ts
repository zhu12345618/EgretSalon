// TypeScript file
class Events {
    public static GET_LOGIN_CODE = "GET_LOGIN_CODE";

    public static CLOSE_HALL = "CLOSE_HALL";            // 关闭大厅

    public static CHANGE_USER_CHIP = "CHANGE_USER_CHIP";
    public static CHANGE_CURRENT_CHIPS = "CHANGE_CURRENT_CHIPS";
    public static CHANGE_CURRENT_CHIP = "CHANGE_CURRENT_CHIP";

    public static MOUSE_OVER_BET_BTN = "MOUSE_OVER_BET_BTN";
    public static MOUSE_OUT_BET_BTN = "MOUSE_OUT_BET_BTN";
    public static REMOVE_ALL_MASK = "REMOVE_ALL_MASK";
    public static SET_BET_BTN_CAN_CLICK = "SET_BET_BTN_CAN_CLICK";
    public static CONFIRM_CHIP = "CONFIRM_CHIP";
    public static REMOVE_UNCONFIRM_CHIP = "REMOVE_UNCONFIRM_CHIP";
    public static RESULT_BET_BTN_ADD_MASK = "RESULT_BET_BTN_ADD_MASK";

    public static CLICK_OTHER_HOURSETRACK_BTN = "CLICK_OTHER_HOURSETRACK_BTN";
    public static MOUSE_OVER_HOURSETRACK_BTN = "MOUSE_OVER_HOURSETRACK_BTN";
    public static MOUSE_OUT_HOURSETRACK_BTN = "MOUSE_OUT_HOURSETRACK_BTN";
    public static MOUSE_OVER_OTHER_HOURSETRACK_BTN = "MOUSE_OVER_OTHER_HOURSETRACK_BTN";
    public static MOUSE_OUT_OTHER_HOURSETRACK_BTN = "MOUSE_OUT_OTHER_HOURSETRACK_BTN";

    public static GET_HALL_USER_INFO = "GET_HALL_USER_INFO";          //获取用户信息
    public static GET_ONLINE_INFO = "GET_INLINE_INFO";         //获取在线人数信息

    public static GET_USER_GAME_INFO = "GET_USER_GAME_INFO";

    public static ADD_BETAREA_AND_BETAMOUNT = "ADD_BETAREA_AND_BETAMOUNT";
    public static REMOVE_BETAREA_AND_BETAMOUT = "REMOVE_BETAREA_AND_BETAMOUT";
    public static RESET_BET_INFO = "RESET_BET_INFO";            //重置赌注

    public static GET_GAME_STAGE = "GET_GAME_STAGE";            //获取游戏场数
    public static GET_GAME_ROUND = "GET_GAME_ROUND";          //获取游戏次数

    public static GET_GAME_STATE = "GET_GAME_STATE";            //获取游戏状态
    public static GET_GAME_RESULT = "GET_GAME_RESULT";          //获取游戏结果
    public static GAME_STATE_START = "GAME_STATE_START";            //游戏开始状态
    public static GAME_STATE_TOP = "GAME_STATE_TOP";            //游戏停止状态

    public static BET = "BET";          //下注
    public static ADD_BETCHIP = "ADD_BETCHIP";          //增加筹码

    public static LOADED_LIVEVIDEO = "LOADED_LIVEVIDEO";            //直播加载完毕
    public static LOAD_LIVEVIDEO_ERROR = "LOAD_LIVEVIDEO_ERROR";            //直播加载失败
    public static ENLARGE_LIVEVIDEO = "ENLARGE_LIVEVIDEO";          //放大直播
    public static SHRINK_LIVEVIDEO = "SHRINK_LIVEVIDEO";          //缩小直播
    public static UPDATE_LIVEVIDEO = "UPDATE_LIVEVIDEO";            //更新直播

    public static UPDATE_GAME_WAYBILL = "UPDATE_GAME_WAYBILL";          //更新游戏中的路单
    public static UPDATE_ROULETTE_WAYBILL = "UPDATE_ROULETTE_WAYBILL";            //更新轮盘路单数据
    public static UPDATE_SICBO_WAYBILL = "UPDATE_SICBO_WAYBILL";            //更新骰宝路单数据

    public static ADD_HALL_BACCARAT_WAY = "ADD_HALL_BACCARAT_WAY";            //添加大厅百家乐路单
    public static UPDATE_HALL_BACCARAT_WAY = "UPDATE_HALL_BACCARAT_WAY";            //更新大厅百家乐路单

    public static BACK_TO_HALL = "BACK_TO_HALL";          //退出到大厅
    public static HALL_BACK = "HALL_BACK";          //从大厅中后退

    public static ADD_HOURSETRACK = "ADD_HOURSETRACK";          //增加路径图

    public static OPEN_LIVEVIDEO = "OPEN_LIVEVIDEO";            //打开直播
    public static OPEN_WAYBILL = "OPEN_WAYBILL";            //打开路单
    public static CLOSE_LIVEVIDEO = "CLOSE_LIVEVIDEO";            //关闭直播
    public static CLOSE_WAYBILL = "CLOSE_WAYBILL";            //关闭路单

    public static CHANGE_LANGE = "CHANGE_LANGE";            //改变语言

    public static SET_SLIDER_STATE = "SET_SLIDER_STATE";            //设置滑块状态
    public static ASK_SLIDER_STATE = "ASK_SLIDER_STATE";            //请求滑块状态
    public static GET_SLIDER_STATE = "GET_SLIDER_STATE";            //获取滑块状态

    
    public static ONE_WAY_UPDATE_LH:string = "ONE_WAY_UPDATE_LH";     //路单更新（龙虎）
    public static HALL_WAY_UPDATE_LH:string = "HALL_WAY_UPDATE_LH";   //单桌全部路单信息（龙虎）

    public static ONE_WAY_UPDATE_BJL:string = "ONE_WAY_UPDATE_BJL";     //路单更新(百家乐)
    public static HALL_WAY_UPDATE_BJL:string = "HALL_WAY_UPDATE_BJL";   //单桌全部路单信息(百家乐)

    public static ONCLICK_TOP_INFO_BTN = "ONCLICK_TOP_INFO_BTN";            //发送顶部信息按钮事件
    public static ONCLICK_TOP_ROOM_BTN = "ONCLICK_TOP_ROOM_BTN";            //发送顶部换桌按钮事件
    public static ONCLICK_TOP_SET_BTN = "ONCLICK_TOP_SET_BTN";            //发送顶部换桌按钮事件
    public static ONCLICK_TOP_EXIT_BTN = "ONCLICK_TOP_EXIT_BTN";            //发送退出按钮事件

    public static SHOW_BET_BTN = "SHOW_BET_BTN";            //显示下注界面

    public static GET_HALL_STATE_INFO = "GET_HALL_STATE_INFO";           //获取大厅状态数据
    public static ADD_PRESS_TEXTURE = "ADD_PRESS_TEXTURE";              //增加按下的纹理

    public static CHANGE_RADIOBTN_STATE = "CHANGE_RADIOBTN_STATE";          //改变单选按钮状态

    public static CHANGE_TOP_INFO_TEXTURE = "CHANGE_TOP_INFO_TEXTURE";          //改变Top info按钮纹理
    public static CHANGE_TOP_SET_TEXTURE = "CHANGE_TOP_SET_TEXTURE";          //改变Top info按钮纹理

    public static UPDATE_VIRTUAL_TABLE = "UPDATE_VIRTUAL_TABLE";            //更新虚拟桌信息
    public static GET_CURRENT_BET_CHIP_NUM = "GET_CURRENT_BET_CHIP_NUM";            //更新虚拟桌信息

    public static SHOW_POKER = "SHOW_POKER";            //显示牌
}