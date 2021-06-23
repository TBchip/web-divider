const httpProxy = require("http-proxy");

const credentials = require("./sslCert.js");

const config = {  
    "thijsbischoff.nl": "51308"
}

let proxies = {};
for (const [host, port] of Object.entries(config)) {
    let proxy = {
        "port": port
    };
    proxy["httpProxy"] = httpProxy.createProxyServer({
        target: "http://localhost:"+proxy["port"],
    });
    proxy["httpsProxy"] = httpProxy.createProxyServer({
        target: "https://localhost:"+proxy["port"],
        ssl: credentials,
        secure: true
    });

    proxies[host] = proxy;
}

module.exports = proxies;