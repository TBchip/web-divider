const httpProxy = require("http-proxy");

const config = {  
    "computerkoninguden.nl": "51303",
    "62.131.213.61": "51304"
}

let proxies = {};
for (const [host, port] of Object.entries(config)) {
    let proxy = httpProxy.createProxyServer({
        target: {
            host: "localhost",
            port: port
        }
    });

    proxies[host] = proxy;
}

module.exports = proxies;