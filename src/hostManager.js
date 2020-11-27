function parseHost(host){
    if(typeof(host) === "string"){
        let host = host.replace("www.", "");
        return host;
    }else{
        return "undefined";
    }
}

module.exports = parseHost;