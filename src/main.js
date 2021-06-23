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
    
    res.end("test");
    // let host = getDomain(req.headers.host);

    // //check for https redirect
    // if(HttpsRedirect.includes(host)){
    //     res.writeHead(302, {'Location': 'https://' + req.headers.host + req.url});
    //     res.end();
    // } else {
    //     if(proxyConfig[host] === undefined){
    //         res.writeHead(404);
    //         res.end();
    //     } else{
    //         targetProxy = proxyConfig[host];

    //         targetProxy["httpProxy"].web(req, res, { target: "http://localhost:"+targetProxy["port"] });
    //         targetProxy["httpProxy"].on("error", function(err, req, res) {
    //             if (err) console.log(err);

    //             res.writeHead(500);
    //             res.end("Sorry, an internal error occurred.");
    //         });
    //     }
    // }
}).listen(httpPort);

/* set up https server */
// spdy.createServer(credentials, function(req, res) {
//     logConnection(req, res);
    
//     let host = parseHost(req.headers.host);
//     // let targetPort = portConfig[host];

//     //send to right webserver
//     // if(targetPort === undefined){
//     //     res.writeHead(404);
//     //     res.end()
//     // } else{
//     //     proxy.web(req, res, { target: "http://192.168.2.1:" + targetPort });
//     // }
//     let targetProxy = proxyConfig[host];
//     if(targetProxy === undefined){
//         res.writeHead(404);
//         res.end()
//     } else{
//         targetProxy.proxyRequest(req, res);
//         targetProxy.on("error", function(err, req, res) {
//             if (err) console.log(err);

//             res.writeHead(500);
//             res.end('Sorry, an internal error occurred.');
//         });
//     }
// }).listen(httpsPort);