'use strict';

var TRANSLATE = TRANSLATE || {};

(function(App) {
	
	App.utils = {
		createLogger: function(out) {

			function isEnabled(logger, level) {
				return logger.level >= level;
			}

			function output(str) {
				out(str);
			}

			return {
				level: 9,

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
					if (isEnabled(this, level)) {
						output(msg);
					}
				},
			};
		},
	};
}(TRANSLATE));
