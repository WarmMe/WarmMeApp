// Get temperature
function getTemp() {
	$.get( "api/sensors/getThSensorValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1];
		$("label[for='int']").html(int);
		$("label[for='dec']").html(dec);
		//alert(data);
	});
	setTimeout(getTemp,5000);
};