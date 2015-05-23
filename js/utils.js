'use strict';

(function(App) {

	App.utils.safari = {
		fireEventToTabs: function(eventName, message) {
			var windows = safari.application.browserWindows,
				i,
				j;
			for (i = 0; i < windows.length; i++) {
				var tabs = windows[i].tabs;
				for (j = 0; j < tabs.length; j++) {
					var tab = tabs[j];
					tab.page.dispatchMessage(eventName, message);
				}
			}
		}
	};
})(TRANSLATE);
