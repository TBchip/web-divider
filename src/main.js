const http = require("http");
const spdy = require("spdy");
const fs = require("fs");
const httpProxy = require("http-proxy");

const httpPort = 51301;
const httpsPort = 51302;
let proxy = httpProxy.createProxy();

const options = {  
    "computerkoninguden.nl": "http://192.168.2.1:51303",
    "62.131.213.61": "http://192.168.2.1:51304"
}
const HttpsRedirectUrls = ["computerkoninguden.nl"];


http.createServer(function(req, res) {
    if(HttpsRedirectUrls.includes(req.headers.host))
        res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
    else	
        proxy.web(req, res, { target: options[req.headers.host] });
}).listen(httpPort);


const privateKey = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/chain.pem", "utf8");
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = spdy.createServer(credentials, function(req, res) {
    proxy.web(req, res, { target: options[req.headers.host] });
}).listen(httpsPort);