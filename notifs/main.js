var el = id=>document.getElementById(id);

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
el("sendYourself").onclick = async ()=>{
	navigator.serviceWorker.controller.postMessage({
		title: el("title").value,
		body: el("body").value
	});
}
el("sendYourselfLater").onclick = ()=>{
	setTimeout(()=>navigator.serviceWorker.controller.postMessage({
		title: el("title").value,
		body: el("body").value
	}), 1000);
}

el("update").onclick = ()=>{
	var swRegistration = JSON.parse(localStorage.getItem("swRegistration"));
	console.log(swRegistration);
}