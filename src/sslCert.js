const fs = require("fs");

/* https credentials, all certificates should be in one */
const privateKey = fs.readFileSync("/etc/letsencrypt/live/thijsbischoff.nl/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/thijsbischoff.nl/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/thijsbischoff.nl/chain.pem", "utf8");
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

module.exports = credentials;