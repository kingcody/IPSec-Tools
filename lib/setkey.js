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


/*
 * Add an SAD entry.
 * note - add can fail with multiple reasons, including when the
 *        key length does not match the specified algorithm.
 */
setkeyUtils.prototype.add = function(options) {
	this.raw('add ' + options);
};


/*
 * Show an SAD entry.
 */
setkeyUtils.prototype.get = function(options) {
	this.raw('get ' + options);
};


/*
 * Remove an SAD entry.
 */
setkeyUtils.prototype.delete = function(options) {
	this.raw('delete ' + options);
};


/*
 * Remove all SAD entries that match the specification.
 */
setkeyUtils.prototype.deleteall = function(options) {
	this.raw('deleteall ' + options);
};


/*
 * Clear all SAD entries matched by the options.
 */
setkeyUtils.prototype.flush = function(options) {
	this.raw('flush ' + options);
};


/*
 * Dumps all SAD entries matched by the options.
 */
setkeyUtils.prototype.dump = function(options) {
	this.raw('dump ' + options);
};


/*
 * Add an SPD entry.
 */
setkeyUtils.prototype.spdadd = function(options) {
	this.raw('spdadd ' + options);
};


/*
 * Delete an SPD entry.
 */
setkeyUtils.prototype.spddelete = function(options) {
	this.raw('spddelete ' + options);
};


/*
 * Clear all SPD entries.
 */
setkeyUtils.prototype.spdflush = function() {
	this.raw('spdflush');
};


/*
 * Dumps all SPD entries.
 */
setkeyUtils.prototype.spddump = function() {
	this.raw('spddump');
};



// Expose setkeyUtils as a module
module.exports = new setkeyUtils(setkey);
