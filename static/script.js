$(document).ready(function() {
	$("#dashboard-wrap").hide();
	$("#intro").hide();


	const sensor_title = [
		'Ultrasonic Sensor Left',
		'Ultrasonic Sensor Right',
		'Heart Rate',
		'Temperature: Battery',
		'Temperature: Motor'
	];
	const sensor_unit = [
		'ft',
		'ft',
		'bpm',
		'°C',
		'°C'		
	];
	let theta = 1;
	
	let alarm_status = false;
	const sensorCount = 5;

	const setSensorTitle = function(id, title, unit) {
		document.getElementsByClassName("sensor-title-value")[id].innerHTML = title;
		document.getElementsByClassName("unit")[id].innerHTML = unit;
	}

	const setSensorValue = function(id, value) {
		if(value)
			document.getElementsByClassName("sensor-value")[id].innerHTML = value;
	};

	const getSensorValue = function(id, callback) {
		$.get(`/${id}`, function(data, status){
			callback(data);
		});
	};

	

	for(let i=0;i<sensorCount;i++) {
		setSensorTitle(i, sensor_title[i], sensor_unit[i]);
	}

	const reset_alarm = function() {
		$(".sensor:nth-child(5)").removeClass('triggered');
		$(".sensor:nth-child(5)").addClass('not-triggered');
	};
	const set_alarm = function() {
		$(".sensor:nth-child(5)").removeClass('not-triggered');
		$(".sensor:nth-child(5)").addClass('triggered');
	}
	

	setInterval(function(){ 
		
	for(let i=0; i<sensorCount;i++) {
		let sensorID = `s${(i+1)}`;
		let domID = i;
		getSensorValue(sensorID, function(data){
			if(data && data!='undefined')
				setSensorValue(domID, data);
			//if(i==2) console.log(data);
		});
	}
	
	/*
	getSensorValue('s1', function(data) {
		console.log(data);
	});*/
	
	let ultrasonic_val_left = Number((document.getElementsByClassName("sensor-value")[0].innerHTML).trim());
	let ultrasonic_val_right = Number((document.getElementsByClassName("sensor-value")[1].innerHTML).trim());
	let status = ultrasonic_val_left <= theta || ultrasonic_val_right <= theta;
	if(status && !alarm_status) {
		alarm_status = true;
		set_alarm();
	} else if(!status && alarm_status) {
		alarm_status = false;
		reset_alarm();
	}
	}, 100);

	$("#intro").fadeIn(1200, "linear", function(){
		$("#intro").delay(600).fadeOut(1200, "linear", function(){
			$("#dashboard-wrap").fadeIn(600, "linear");
		});
		
	});

	
});
