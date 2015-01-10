(function(self) {
	var listeners = {
		translate: function(e) {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'translate_selected');
		},
		
		translate_text: function(msg) {
			msg.from = TRANSLATE.config.source;
			msg.to = TRANSLATE.config.target;
			TRANSLATE.log.debug('Received message to translate: ' + msg.text);
			TRANSLATE.translator.translate(msg, _showTranslation);
		},
		
		get_config: function(msg) {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
				'config', TRANSLATE.config.serialize());
		}
	};
	
	function _commandListener(e) {
		listeners[e.command].call(this, e.message);
	}
	
	function _messageListener(e) {
		listeners[e.name].call(this, e.message);
	}
	
	function _showTranslation(data) {
		TRANSLATE.log.debug("Received translation: " + JSON.stringify(data));
		safari.extension.popovers[0].contentWindow.TRANSLATE.popup.dataChanged(data);
		safari.extension.toolbarItems[0].showPopover();
	}

	function _configChangeListener(e) {
		TRANSLATE.log.debug('Config changed');
		TRANSLATE.config.update(e.key, e.newValue);
		TRANSLATE.utils.safari.fireEventToTabs('config', TRANSLATE.config.serialize());
	}

	self.init = function() {
		safari.application.addEventListener(
			"command", _commandListener, false);
		safari.application.addEventListener(
			"message", _messageListener, false);
		safari.extension.settings.addEventListener(
			"change", _configChangeListener, false);
	};

	return self;
}(TRANSLATE || {}));

TRANSLATE.init();
