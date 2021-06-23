const httpProxy = require("http-proxy");

const credentials = require("./sslCert.js");

const config = {  
    "thijsbischoff.nl": "51308,51309",
    "computerkoninguden.nl": "51303,51305"
}

let proxies = {};
for (const [host, port] of Object.entries(config)) {
    let proxy = {
        "httpPort": port.split(",")[0],
        "httpsPort": port.split(",")[1]
    };
    proxy["httpProxy"] = httpProxy.createProxyServer({
        target: "http://localhost:"+proxy["httpPort"],
    });
    proxy["httpsProxy"] = httpProxy.createProxyServer({
        target: "https://localhost:"+proxy["httpsPort"],
        ssl: credentials,
        secure: true
    });

    proxies[host] = proxy;
}

module.exports = proxies;