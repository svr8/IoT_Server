const sys = require("sys");
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const serialport = require("serialport");
const port = 8081;

var sensorList = {
    'S1': [],
    'S2': [],
    'S3': [],
    'S4': [],
    'S5': [],
    'S6': []
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

var arduinoPort = new serialport("/dev/ttyACM0", { // replace ttyACM0 with the right port on your computer
    baudRate: 9600,
    //parser: serialport.parsers.readline("\r\n")
});

var flag = 0;
var buff = "";
arduinoPort.open(function(){
	arduinoPort.on('data', function(data){
		let str = data.toString('utf8');
		console.log(str);
		// buff = buff + str;
		// flag++;
		// if(flag == 3) {
		// 	let start = buff.indexOf("S");
		// 	let end = buff.indexOf("#");
		// 	let data = buff.substring(start,end);
		// 	let sensor_prefix = buff.substring(start, start+2);
		// 	let sensor_value = buff.substring(start+3, end);
		// 	sensorList[sensor_prefix].push(sensor_value);	
		// 	buff = buff.substring(end+1);
		// 	flag = 0;
		// }
	});
});



var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log(`http://localhost:${port}`);
});

function isNumeric(num){
  return !isNaN(num)
}