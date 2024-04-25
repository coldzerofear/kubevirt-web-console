function WSSHClient() {
};

function str2ab(str) {
    const enc = new TextEncoder();
    return enc.encode(str);
}

function ab2str(ab) {
    const dec = new TextDecoder();
    return dec.decode(ab);
}

WSSHClient.prototype._generateEndpoint = function (options) {
    var protocol = 'ws://';
    if (window.location.protocol === 'https:') {
        protocol = 'wss://';
    }
    var endpoint = protocol + options.host + ":" + options.port + "/" + options.path
    return endpoint;
};

WSSHClient.prototype.connect = function (options, events) {
    var endpoint = this._generateEndpoint(options);

    if (window.WebSocket) {
        // if (!token) {
        //     events.onError('Unable to access without a token !');
        //     return;
        // }
        // let wsProtocols = [
        //     // The token needs to be base64 encoded
        //     "base64url.bearer.authorization.k8s.io." + btoa(token),
        //     "base64.binary.k8s.io"
        // ];
        // this._connection = new WebSocket(endpoint, wsProtocols);
        this._connection = new WebSocket(endpoint);
        this._connection.binaryType = "arraybuffer";
    } else {
        events.onError('WebSocket Not Supported');
        return;
    }

    this._connection.onopen = function () {
        events.onConnect();
    };

    this._connection.onmessage = function (evt) {
        events.onData(ab2str(evt.data));
    };

    this._connection.onclose = function (evt) {
        events.onClose();
    };
};

WSSHClient.prototype.send = function (data) {
    this._connection.send(data);
};

WSSHClient.prototype.sendClientData = function (data) {
    this._connection.send(str2ab(data))
}

var client = new WSSHClient();
