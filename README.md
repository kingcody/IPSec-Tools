IPSec-Tools
===========

NodeJS tools/bindings for managing IPSec VPNs


Install
-------

    npm install git://github.com/kingcody/IPSec-Tools.git

Use
---

    var ipsecTools = require('IPSec-Tools');


Documentation
=============

As always, the best docs are in the source; but here we go.

IP Tools
--------

**ipsecTools.ip.getInt(callback[, family])** - Get internal network IP addresses.  
&nbsp;&nbsp;*family* -- optional arg, defaults to `IPv4`, but also accepts `IPv6`  
&nbsp;&nbsp;*callback(interfaces)* -- *interfaces* is an object with interface names as keys and ip addresses as values

**ipsecTools.ip.getExt(callback)** - Get external (wan) IP address.  
&nbsp;&nbsp;*callback(ip)* -- *ip* is a simple string IP address; recieved from an internet request.

**ipsecTools.ip.resolve(domain, calback)** - Resolve a domain to an IP address.  
&nbsp;&nbsp;*domain* -- the domain hostname to be resolved, ex. `https://www.google.com`  
&nbsp;&nbsp;*callback(ip)* -- *ip* is a simple string IP address

**ipsecTools.ip.reverse(ip, callback)** - Reverse lookup an IP address to a domain hostname  
&nbsp;&nbsp;*ip* -- the IP address to be reverse lookup'ed, ex. `8.8.8.8`  
&nbsp;&nbsp;*callback(hostname)* -- *hostname* is the reversable domain hostname for the requested IP address

Setkey Tools
------------
**ipsecTools.setkey** -- This is an instance of node.js EventEmitter and has `stdout` and `stderr` events.  
  
  
**ipsecTools.setkey.raw(command)** - Send a raw command to Setkey.  
&nbsp;&nbsp;*command* -- this is a standard setkey command with out a trailing semicolon, return, or new line  
&nbsp;&nbsp;ex. `spdadd 10.0.0.11 10.0.0.216 any -P out ipsec esp/transport/66.77.88.99-11.22.33.44/require`  
&nbsp;&nbsp;Optional - *command* may be an array of commands, following the same guidelines as the string version  
&nbsp;&nbsp;ex. `['spddump','spdflush']`
