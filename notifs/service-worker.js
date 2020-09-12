self.addEventListener('message', event=>{
	console.log(event);
	self.registration.showNotification(event.data.title, {
		body: event.data.body,
		badge: "icon.png",
		icon: "icon.png"
	});
});

self.addEventListener('activate', () => {
	console.log("I have been activated!");
});