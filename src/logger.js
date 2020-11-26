function logConnection(req, res){
    console.log(`[${getDateTime()}][${req.connection.remoteAddress}] connected to ${req.headers.host}`);
}

function getDateTime(){
    let date = new Date();
    let dateStr = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    let timeStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return dateStr + " " + timeStr;
}

module.exports = logConnection;