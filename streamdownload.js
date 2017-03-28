javascript: (function () {
	function log(string) {
		console.log("[Download.js]", string);
	}

	function download(url) {
		log("Downloading: " + url);
		var element = document.createElement("a");
		element.setAttribute("download", "");
		element.href = url;
		document.body.appendChild(element);
		element.click();
		element.remove();
	}

	var hostname = window.location.hostname;
	var streamcloud = hostname == "streamcloud.eu";
	var openload = hostname == "openload.co";

	if (streamcloud) {
		log("Streamcloud detected");
		download(jwplayer().config.file);
	} else if (openload) {
		log("Openload detected");

		/**
		 * At first you have to click on the video overlay, then openload puts the url to the video
		 * in the src attribute of the #olvideo_html5_api element 
		 */
		$("#videooverlay, .title, .logocontainer").click();

		var url = $("#olvideo_html5_api").attr("src");
		download(url);
	} else {
		log("No site matches :/");
	}
})();