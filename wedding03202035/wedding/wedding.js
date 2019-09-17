setInterval(function() {
	var endtime = 'July 20 2019 16:00:00 GMT+0100';
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );

	document.querySelector('#my-seconds').textContent = seconds;
	document.querySelector('#my-minutes').textContent = minutes;
	document.querySelector('#my-hours').textContent = hours;
	document.querySelector('#my-day').textContent = days;
}, 1000);


