$(document).ready(function() {

	const setSensorValue = function(id, value) {
		document.getElementsByClassName("sensor-value")[id].innerHTML = value;
	};

	const getSensorValue = function(id, callback) {
		$.get(`/${id}`, function(data, status){
			callback(data);
		});
	};

	for(let i=0; i<6;i++) {
		let sensorID = `S${(i+1)}`;
		let domID = i;
		getSensorValue(sensorID, function(data){
			setSensorValue(domID, data);
		});
	}
});