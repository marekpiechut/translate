(function(self) {
	function _commandListener(e) {
		if (e.command === 'translate') {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'translate_selected');
		}
	}

	function _showTranslation(data) {
		TRANSLATE.log.debug("Received translation: " + JSON.stringify(data));
		safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
			'show_translated', data);
	}

	function _translationRequestListener(e) {
		if (e.name === 'translate_text') {
			var msg = e.message;
			msg.from = TRANSLATE.config.source;
			msg.to = TRANSLATE.config.target;
			TRANSLATE.log.debug('Received message to translate: ' + msg.text);
			TRANSLATE.translator.translate(msg, _showTranslation);
		} else if (e.name === 'translate') {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'translate_selected');
		}
	}

	function _configChangeListener(e) {
		TRANSLATE.log.debug('Config changed');
		translateMe.config.update(e.key, e.newValue);
		fireEventToTabs('config', {
			key: e.key,
			val: e.newValue
		});
	}

	self.init = function() {
		safari.application.addEventListener(
			"command", _commandListener, false);
		safari.application.activeBrowserWindow.activeTab.addEventListener(
			"message", _translationRequestListener, false);
		safari.extension.settings.addEventListener(
			"change", _configChangeListener, false);
	};

	return self;
}(TRANSLATE || {}));

TRANSLATE.init();
