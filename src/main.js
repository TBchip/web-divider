const http = require("http");
const spdy = require("spdy");
const fs = require("fs");
const httpProxy = require("http-proxy");
const logConnection = require("./logger.js");
const parseHost = require("./hostManager.js");

const httpPort = 51301;
const httpsPort = 51302;
let proxy = httpProxy.createProxy();

const portConfig = {  
    "computerkoninguden.nl": "51303",
    "62.131.213.61": "51304",
    "undefined": "undefined"
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
    logConnection(req, res);
    
    let host = parseHost(req.headers.host);
    let targetPort = portConfig[host];
    console.log(host, targetPort);

    //check for https redirect
    if(HttpsRedirect.includes(host)){
        res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
        res.end();
    } else {
        //send to right webserver
        if(targetPort === "undefined"){
            res.writeHead(404);
            res.end();
        } else{
            proxy.web(req, res, { target: "http://192.168.2.1:" + targetPort });
        }
    }
}).listen(httpPort);

/* set up https server */
const httpsServer = spdy.createServer(credentials, function(req, res) {
    logConnection(req, res);
    
    let host = parseHost(req.headers.host);
    let targetPort = portConfig[host];
    console.log(host, targetPort);

    //send to right webserver
    if(targetPort === "undefined"){
        res.writeHead(404);
        res.end()
    } else{
        proxy.web(req, res, { target: "http://192.168.2.1:" + targetPort });
    }
}).listen(httpsPort);