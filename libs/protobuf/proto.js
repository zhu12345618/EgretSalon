var Proto;
(function () {
    function load(callback) {
        console.log("Proto!!!");
        protobuf.load("resource/proto/client.proto", callback);
    }
    Proto.load = load;
})(Proto || (Proto = {}));