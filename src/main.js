const http = require("http");
const httpProxy = require("http-proxy");

const port = 50783;
const options = {  
    "computerkoninguden.nl": "http://192.168.2.1:6211",
    "62.131.213.61": "http://192.168.2.1:34699"
}

let proxy = httpProxy.createProxy();

http.createServer(function(req, res) {
    console.log(req.headers.host);
    proxy.web(req, res, { target: options[req.headers.host] });
}).listen(port);