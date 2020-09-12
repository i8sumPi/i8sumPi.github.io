function sendNotif(title, content){
	self.registration.showNotification(title, {
		body: content,
	});
}

self.addEventListener('message', event=>{
	sendNotif("it is happening", "yeeee");
});

self.addEventListener('activate', () => {
	console.log("I have been activated!");


	//setTimeout(sendNotif, 5000, "Test Notification", "This is a test this is a test.");
})