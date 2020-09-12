var el = id=>document.getElementById(id);

el("body").select();

el("enable").onclick = ()=>{
	el("enable").style.display = "none";
	window.Notification.requestPermission(permission=>{
		if(permission != "granted") alert(permission);
		navigator.serviceWorker.register('service-worker.js').then(swRegistration=>{
			console.log(swRegistration, JSON.stringify(swRegistration));
			localStorage.setItem("swRegistration", JSON.stringify(swRegistration));
		});
	});
}

navigator.serviceWorker.ready.then((registration) => {
	if(!navigator.serviceWorker.controller){
		alert("Error! Refreshing your page.");
		location.reload();
	}else{
		el("enable").style.display = "none";
	}
});
el("sendYourself").onclick = ()=>{
	navigator.serviceWorker.controller.postMessage({
		body: el("body").value,
		time: 0
	});
}
el("sendFromNow").onclick = ()=>{
	var timeFromNow = el("timeFromNow").value.split(":");
	if(timeFromNow.length != 3 && timeFromNow.length != 2) return alert("Invalid time. Make sure to do hours:minutes:seconds with just numbers.");

	var hrs = parseInt(timeFromNow[0]);
	var mins = parseInt(timeFromNow[1]);
	var secs = parseInt(timeFromNow[2]);

	if(isNaN(mins) || isNaN(hrs) || isNaN(secs)) return alert("Invalid time. Make sure to do hours:minutes:seconds with just numbers.");

	console.log("It's gonna send in "+mins*60000 + hrs*3600000 + secs*1000+" milliseconds!");

	navigator.serviceWorker.controller.postMessage({
		body: el("body").value,
		time: mins*60000 + hrs*3600000 + secs*1000
	});
}