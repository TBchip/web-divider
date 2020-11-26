function logConnection(req, res){
    console.log(`[${req.connection.remoteAddress}] connected to ${req.headers.host}`);
}

module.exports = logConnection;