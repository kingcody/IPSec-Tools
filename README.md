IPSec-Tools
===========

NodeJS tools/bindings for managing IPSec VPNs


Install
-------

    npm install git://github.com/kingcody/IPSec-Tools.git



Documentation
=============

As always, the best doc are in the source; but here we go.

IP Tools
--------

**ipsecTools.ip.getExt(callback[, family])** - Get internal network IP addresses.  
  *family* -- optional arg, defaults to `IPv4`, but also accepts `IPv6`  
  *callback(interfaces)* -- *interfaces* is an object with interface names as keys and ip addresses as values

**ipsecTools.ip.getInt(callback)** - Get external (wan) IP address.  
  *callback(ip)* -- *ip* is a simple string IP address; recieved from an internet request.

**ipsecTools.ip.resolve(domain, calback)** - Resolve a domain to an IP address.  
  *domain* -- the domain hostname to be resolved ex. https://www.google.com  
  *callback(ip)* -- *ip* is a simple string IP address

**ipsecTools.ip.reverse(ip, callback)** - Reverse lookup an IP address to a domain hostname  
  *ip* -- the IP address to be reverse lookup'ed, ex. 8.8.8.8  
  *callback(hostname)* -- *hostname* is the reversable domain hostname for the requested IP address

Setkey Tools
------------
**ipsecTools.setkey** -- This is an instance of node.js EventEmitter and has a `stdout` event.  
  
  
**ipsecTools.setkey.raw(command)** - Send a raw command to Setkey.  
  *command* -- this is a standard setkey command with out a trailing semicolon, return, or new line  
  ex. `spdadd 10.0.0.11 10.0.0.216 any -P out ipsec esp/transport/66.77.88.99-11.22.33.44/require`
