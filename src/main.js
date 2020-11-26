const http = require("http");
const spdy = require("spdy");
const fs = require("fs");
const httpProxy = require("http-proxy");

const httpPort = 51301;
const httpsPort = 51302;
let proxy = httpProxy.createProxy();

const serverPorts = {  
    "computerkoninguden.nl": "51303",
    "62.131.213.61": "51304"
}
const HttpsRedirect = ["computerkoninguden.nl"];

/* https credentials, all certificates should be in one */
const privateKey = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/computerkoninguden.nl/chain.pem", "utf8");
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


/* set up http server */
http.createServer(function(req, res) {
    if(HttpsRedirect.includes(req.headers.host)){
        res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
        res.end();
    }
    else{
        proxy.web(req, res, { target: "http://192.168.2.1:" + serverPorts[req.headers.host] });
    }
}).listen(httpPort);

/* set up https server */
const httpsServer = spdy.createServer(credentials, function(req, res) {
    let parsedHost = req.headers.host.replace("www.", "");
    proxy.web(req, res, { target: "http://192.168.2.1:" + serverPorts[parsedHost] });
}).listen(httpsPort);