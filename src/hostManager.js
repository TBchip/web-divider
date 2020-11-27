function parseHost(host){
    if(typeof(host) === "string"){
        console.log("parsing");
        if(host.includes("http"))
            host = host.split("//")[1];
        if(host.includes("www."))
            host = host.replace("www.", "");
        if(host.includes(":"))
            host = host.split(":")[0];
    }else{
        console.log("not parsing");
        return "undefined";
    }
}

module.exports = parseHost;