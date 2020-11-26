function logConnection(req, res){
    console.log(`[${req.connection.remoteAddress}] connected`);
}

module.exports = logConnection;