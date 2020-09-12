self.addEventListener('message', event=>{
	setTimeout(()=>	self.registration.showNotification("REMEMBER:", {
		body: event.data.body,
		badge: "exclaim.png",
		icon: "icon.png"
	}), event.data.time);
});

self.addEventListener('activate', () => {
	console.log("I have been activated!");
});