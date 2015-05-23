'use strict';

var TRANSLATE = TRANSLATE || {};

TRANSLATE.popupCaptcha = (function () {
	return {
		setLinkUrl: function (url) {
			pl('a#captcha-link').attr('href', url);
		},
		showCaptcha: function(url) {
			safari.application.activeBrowserWindow.openTab().url = url;
		}
	};
})();