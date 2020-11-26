const http = require("http");
const httpProxy = require("http-proxy");

const port = 92783;
const options = {  
    "computerkoninguden.nl": "http://62.131.213.61:6211",
    "62.131.213.61": "http://62.131.213.61:34699"
}

let proxy = httpProxy.createProxy();

http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(port);