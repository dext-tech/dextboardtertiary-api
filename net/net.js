'use strict';

const myIp = () => {

    const { networkInterfaces } = require('os');

    const nets = networkInterfaces();
    const results = Object.create(null)

    for (const name of Object.keys(nets)){
        for(const net of nets[name]){
            // skip over non-ipv4 and internal (ie. 127.0.0.1) addresses
            if(net.family === "IPv4" && !net.internal){
                if(!results[name]){
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results["Wi-Fi"]
}

module.exports = myIp()
