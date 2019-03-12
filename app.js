var sys = require("sys");
var express = require('express');
var app = express();
var serialport = require("serialport");

app.get('/', function (req, res) {
   res.send('Hello World');
})



serialport.list(function (err, ports) {
    ports.forEach(function(port) {

        console.log("pnpId: " + port.pnpId);
        console.log("manufacturer: " + port.manufacturer);
        console.log("comName: " + port.comName);
        console.log("serialNumber: " + port.serialNumber);
        console.log("vendorId: " + port.vendorId);
        console.log("productId: " + port.productId);
    });
});

var myPort = new serialport("/dev/ttyACM0", { // replace ttyACM0 with the right port on your computer
    baudRate: 9600,
    //parser: serialport.parsers.readline("\r\n")
});
myPort.on( "data", function( chunk ) {
        sys.puts(chunk);
    });


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log('localhost:8081');
})