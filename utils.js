var log = {
	loglevel: 9,
	
	debug: function(msg) {
		this.log(2, msg);
	},
	
	info: function(msg) {
		this.log(1, msg);
	},
	
	error: function(msg) {
		this.log(0, msg);
	},
	
	log: function(level, msg) {
		if(this.isEnabled(level)) {
			this.output(msg);
		}
	},
	
	isEnabled: function(level) {
		var loglevel = this.loglevel || 1;
		return level <= loglevel;
	},
	
	output: function(str) {
		console.log(str);
	}
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function fireEventToTabs(eventName, message) {
	var windows = safari.application.browserWindows;
	for(i = 0; i < windows.length; i++){
	    var tabs = windows[i].tabs;
	    for(j = 0; j<tabs.length; j++){
	         var tab = tabs[j];
	         tab.page.dispatchMessage(eventName, message);
	    }
	}
}
