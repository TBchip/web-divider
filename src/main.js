const http = require("http");
const spdy = require("spdy");
const fs = require("fs");
const httpProxy = require("http-proxy");

const port = 50783;
const options = {  
    "computerkoninguden.nl": "http://192.168.2.1:6211",
    "https://computerkoninguden.nl": "http://192.168.2.1:6211",
    "62.131.213.61": "http://192.168.2.1:34699"
}


let proxy = httpProxy.createProxy();

http.createServer(function(req, res) {
    console.log(req.headers.host);
    proxy.web(req, res, { target: options[req.headers.host] });
}).listen(80);



const privateKey = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/chain.pem", "utf8");
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = spdy.createServer(credentials, function(req, res) {
    console.log(req.headers.host);
    proxy.web(req, res, { target: options[req.headers.host] });
});
httpsServer.listen(443);