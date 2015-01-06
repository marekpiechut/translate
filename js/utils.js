(function(App) {
	"use strict";

	App.utils = {
		createLogger: function(out) {
			var out1 = out;

			function isEnabled(logger, level) {
				return logger.level >= level;
			}

			function output(str) {
				out1(str);
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

	App.utils.safari = {
		fireEventToTabs: function(eventName, message) {
			var windows = safari.application.browserWindows,
				i;
			for (i = 0; i < windows.length; i++) {
				var tabs = windows[i].tabs;
				for (j = 0; j < tabs.length; j++) {
					var tab = tabs[j];
					tab.page.dispatchMessage(eventName, message);
				}
			}
		}
	}
}(TRANSLATE));
