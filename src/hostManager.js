function parseHost(host){
    if(typeof(host) === "string"){
        if(host.includes("http"))
            host = host.split("//")[1];
        if(host.includes("www."))
            host = host.replace("www.", "");
        if(host.includes(":"))
            host = host.split(":")[0];
    }else{
        return "undefined";
    }
}

module.exports = parseHost;