const coap = require('coap');

let currentIp = '192.168.0.8';
let applicationName = '/Rpi/';


let handleResponse = (res) => {

    res.pipe(process.stdout);



    res.on('end', () => {
        console.log('Received Response.');
    });

};


var requestData = (dataName) => {

    let currentRequest = coap.request( { hostname: currentIp, pathname: applicationName + dataName,  observe: true } );

    currentRequest.on('response', handleResponse);
    currentRequest.end();

};

exports.requestData = requestData;
