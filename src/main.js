const http = require("http");
const spdy = require("spdy");

const logConnection = require("./logger.js");
const getDomain = require("./getDomain.js");

const proxyConfig = require("./proxyConfig.js");
const credentials = require("./sslCert.js");

const httpPort = 51301;
const httpsPort = 51302;

const HttpsRedirect = ["computerkoninguden.nl"];


/* set up http server */
http.createServer(function(req, res) {
    logConnection(req, res);
    
    let host = getDomain(req.headers.host);

    //check for https redirect
    if(HttpsRedirect.includes(host)){
        res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
        res.end();
    } else {
        let targetProxy = proxyConfig[host];
        if(targetProxy === undefined){
            res.writeHead(404);
            res.end();
        } else{
            targetProxy["httpProxy"].web(req, res, { target: "http://localhost:"+targetProxy["httpPort"] });
            targetProxy["httpProxy"].on("error", function(err, req, res) {
                if (err) console.log(err);

                res.writeHead(500);
                res.end("Sorry, an internal error occurred.");
            });
        }
    }
}).listen(httpPort);

/* set up https server */
spdy.createServer(credentials, function(req, res) {
    logConnection(req, res);
    
    let host = getDomain(req.headers.host);

    let targetProxy = proxyConfig[host];
    if(targetProxy === undefined){
        res.writeHead(404);
        res.end();
    } else{
        targetProxy["httpsProxy"].web(req, res, { target: "https://localhost:"+targetProxy["httpsPort"] });
        targetProxy["httpsProxy"].on("error", function(err, req, res) {
            if (err) console.log(err);

            res.writeHead(500);
            res.end('Sorry, an internal error occurred.');
        });
    }
}).listen(httpsPort);