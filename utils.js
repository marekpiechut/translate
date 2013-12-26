
log = {
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
