/*
 * IP-Tools; Adds internal and external ip management.
 */

/*
 * Various Module requires.
 */
var os = require('os'),
	dns = require('dns');

/* 
 * Supplies callback() with obj containing internal ip addresses (defaultly IPv4)
 * - Optional arg: family - defaults to IPv4, also accepts IPv6
 * 
 * callback(interfaces) -- interfaces is an object with interface names as keys and
 * ip addresses as values
 */
var getIntIp = function(callback, family) {
	if (typeof callback === 'function') {
		var	ifs = {};
		var interfaces = os.networkInterfaces();

		if (family !== 'IPv6') {
			family = 'IPv4';
		}

		for (var i in interfaces) {
			for (var a in interfaces[i]) {
				if (interfaces[i][a].family === family) {
					ifs[i] = interfaces[i][a].address;
				}
			}
		}

		callback(ifs);
	}
};


/*
 * Supplies the callback() an external ip address provided by http://ifconfig.me
 * 
 * callback(err, ip)
 * 
 * Note: If there is an error the first arg in the callback with be null and a 
 * second arg will be passed as the error.
 */
var getExtIp = function(callback) {
	if (typeof callback === 'function') {
		var request = require('request');
		request({uri: 'http://ifconfig.me/all.json',
			json: true}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				callback(null, body.ip_addr);
			}
			else {
				callback(error, null);
			}
		});
	}
};

/*
 * Resolve a domain, returns an ip address to supplied callback.
 * callback(err,ip)
 */
var resolve = function (domain, callback) {
	dns.resolve(domain,callback);
};

/*
 * Reverse lookup an ip address to a hostname supplied to callback.
 * callback(err,hostname)
 */
var reverse = function (ip, callback) {
	dns.reverse(ip,callback);
};


// Contructor for IPTools
var IPTools = function IPTools() {
	
};

// Prototypically declaring IPTools' methods
IPTools.prototype = {
	getInt: getIntIp,
	getExt: getExtIp,
	resolve: resolve,
	reverse: reverse
};

// Exporting IPTools
module.exports = new IPTools();
