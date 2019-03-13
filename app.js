const sys = require("sys");
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const serialport = require("serialport");
const port = 8081;

var sensorList = {
    'S1': ['0'],
    'S2': ['1'],
    'S3': ['2'],
    'S4': ['3'],
    'S5': ['4'],
    'S6': ['5']
}

app.use('/static', express.static(path.join(__dirname, 'static')));
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

app.get('/', function (req, res) {
   res.render('dashboard.html');
});

app.get('/s1', function(req, res) {
    let arr = sensorList['S1'];
    let value = arr[arr.length-1];
    sensorList['S1'] = [];
    res.send(value);
});

app.get('/s2', function(req, res) {
    let arr = sensorList['S2'];
    let value = arr[arr.length-1];
    sensorList['S2'] = [];
    res.send(value);
});

app.get('/s3', function(req, res) {
    let arr = sensorList['S3'];
    let value = arr[arr.length-1];
    sensorList['S3'] = [];
    res.send(value);
});

app.get('/s4', function(req, res) {
    let arr = sensorList['S4'];
    let value = arr[arr.length-1];
    sensorList['S4'] = [];
    res.send(value);
});

app.get('/s5', function(req, res) {
    let arr = sensorList['S5'];
    let value = arr[arr.length-1];
    sensorList['S5'] = [];
    res.send(value);
});

app.get('/s6', function(req, res) {
    let arr = sensorList['S6'];
    let value = arr[arr.length-1];
    sensorList['S6'] = [];
    res.send(value);
});


// serialport.list(function (err, ports) {
//     ports.forEach(function(port) {

//         console.log("pnpId: " + port.pnpId);
//         console.log("manufacturer: " + port.manufacturer);
//         console.log("comName: " + port.comName);
//         console.log("serialNumber: " + port.serialNumber);
//         console.log("vendorId: " + port.vendorId);
//         console.log("productId: " + port.productId);
//     });
// });

// var arduinoPort = new serialport("/dev/ttyACM0", { // replace ttyACM0 with the right port on your computer
//     baudRate: 9600,
//     //parser: serialport.parsers.readline("\r\n")
// });
// arduinoPort.on( "data", function( chunk ) {
//         sys.puts(chunk);
//     });


var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log(`http://localhost:${port}`);
})