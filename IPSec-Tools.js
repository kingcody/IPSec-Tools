/*
 * Node.JS Module for managing IPSec VPN's 
 */

// Module Imports
var ipTools    = require('./lib/ip-tools.js'),
    setkey     = require('./lib/setkey.js');

// Contructor for IPSecTools
var IPSecTools = function IPSecTools() {

};

// Prototypically declaring IPSecTools' methods
IPSecTools.prototype = {
  ip: ipTools,
  setkey: setkey
};

module.exports = new IPSecTools();
