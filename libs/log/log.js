var Log = (function () {
    function Log() {
        return this;
    }
    Log.isLog = true;
    Log.log = function(log) {
        if(Log.isLog) {
            console.log(log);
        }
    }
    return Log;
}());