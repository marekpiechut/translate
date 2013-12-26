
translate = {
	commandListener: function(e) {
		if(e.command === 'translate') {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('translate_selected');
		}
	},
	
	showTranslation: function(data) {
		log.debug("Received translation: " + data);
		safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('show_translated', data);
	},
	
	translationRequestListener: function(e) {
		if(e.name === 'translate') {
			var text = e.message;
			log.debug('Received message to translate: ' + text);
			translator.translate(text, config.target, config.source, translate.showTranslation);
		}
	}
}

safari.application.addEventListener("command", translate.commandListener, false);
safari.application.activeBrowserWindow.activeTab.addEventListener("message", translate.translationRequestListener, false);
