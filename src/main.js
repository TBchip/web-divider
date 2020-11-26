var http = require("http");
var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxy();
var options = {  
    "computerkoninguden.nl": "http://62.131.213.61:6211",
    "62.131.213.61": "http://62.131.213.61:34699"
}

http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(80);