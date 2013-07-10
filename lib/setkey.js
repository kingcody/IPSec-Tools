/*
 * Module for setkey bindings in nodejs
 */

	// Require Modules
var util = require('util'),
	events = require('events'),
	spawn = require('child_process').spawn;
	
	// Initialize setkey process
var setkey = spawn('setkey', ['-c']),

	// setkeyUtils constructor; calls eventemitter constructor on init.
	setkeyUtils = function setkeyUtils(setSpawn) {
		var that = this;
		events.EventEmitter.call(this);
		setSpawn.stderr.on('data', function(data) {
			that.emit('stderr', data);
		});
		setSpawn.stdout.on('data', function(data) {
			var _data = data.toString().replace(/^[ \t\r\n\]+|[ \t\r\n]+$|\u001b\[\?1034h/g, '');
			if (_data !== '') {
				that.emit('stdout', _data);
			}
		});
	};

// setkeyUtils inherits from events.EventEmitter
util.inherits(setkeyUtils, events.EventEmitter);


/*
 * Send raw commands to setkey process.
 *   cmd - argument can be either a string command or an array of commands.
 */
setkeyUtils.prototype.raw = function(cmd) {
	
	// Function to send _cmd to setkey process
	var stdWrite = function(_cmd) {
			// write cmd to stdin stream
			setkey.stdin.write(_cmd+';\n');
	};
	
	// Check if cmd is an array
	if (util.isArray(cmd)) {
		// loop until cmd array is empty
		while (cmd.length > 0) {
			// send current cmd to stdWrite
			stdWrite(cmd.shift());
		}
	}
	
	// Check if cmd is a string
	else if (typeof cmd === 'string') {
		// send cmd to stdWrite
		stdWrite(cmd);
	}
};


// Expose setkeyUtils as a module
module.exports = new setkeyUtils(setkey);
