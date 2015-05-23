'use strict';

(function (self) {
	var listeners = {
		translate: function (e) {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'translate_selected');
		},

		translate_text: function (msg) {
			msg.from = TRANSLATE.config.source;
			msg.to = TRANSLATE.config.target;
			TRANSLATE.log.debug('Received message to translate: ' + msg.text);
			TRANSLATE.translator.translate(msg, _showTranslation, _handleError);
		},

		get_config: function (msg) {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'config', TRANSLATE.config.serialize());
		}
	};

	function _commandListener(e) {
		listeners[e.command](e.message);
	}

	function _messageListener(e) {
		listeners[e.name](e.message);
	}

	function _showTranslation(data) {
		TRANSLATE.log.debug('Received translation: ' + JSON.stringify(data));
		safari.extension.popovers.translation.contentWindow.TRANSLATE.popup.dataChanged(data);
		safari.extension.toolbarItems[0].popover = safari.extension.popovers.translation;
		safari.extension.toolbarItems[0].showPopover();
	}

	function _handleError(error) {
		TRANSLATE.log.debug('Translation failed: ' + JSON.stringify(error));
		if (error.type === 'CAPTCHA') {
			safari.extension.popovers.captcha.contentWindow.TRANSLATE.popupCaptcha.setLinkUrl(error.url);
			safari.extension.toolbarItems[0].popover = safari.extension.popovers.captcha;
			safari.extension.toolbarItems[0].showPopover();
		}
	}

	function _configChangeListener(e) {
		TRANSLATE.log.debug('Config changed');
		TRANSLATE.config.update(e.key, e.newValue);
		TRANSLATE.utils.safari.fireEventToTabs('config', TRANSLATE.config.serialize());
	}

	self.init = function () {
		safari.application.addEventListener(
			'command', _commandListener, false);
		safari.application.addEventListener(
			'message', _messageListener, false);
		safari.extension.settings.addEventListener(
			'change', _configChangeListener, false);
	};

	return self;
}(TRANSLATE || {}));

TRANSLATE.init();