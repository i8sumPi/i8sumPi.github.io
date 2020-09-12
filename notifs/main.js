var el = id=>document.getElementById(id);
var swRegistration;

el("enable").onclick = async ()=>{
	el("enable").style.display = "none";
	swRegistration = await navigator.serviceWorker.register('service-worker.js');
	const permission = await window.Notification.requestPermission();
}

navigator.serviceWorker.ready.then((registration) => {
	if(!navigator.serviceWorker.controller){
		alert("Error! Refreshing your page.");
		location.reload();
	}
	el("sendYourself").onclick = async ()=>{
		navigator.serviceWorker.controller.postMessage({
			type: 'MESSAGE_IDENTIFIER',
		});
	}
});