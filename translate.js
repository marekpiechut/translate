
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
		if(e.name === 'translate_text') {
			var msg = e.message;
			msg.source = config.source;
			msg.target = config.target;
			log.debug('Received message to translate: ' + msg.text);
			translator.translate(msg, translate.showTranslation);
		} else if(e.name === 'translate') {
			safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('translate_selected');
		}
	}
}

safari.application.addEventListener("command", translate.commandListener, false);
safari.application.activeBrowserWindow.activeTab.addEventListener("message", translate.translationRequestListener, false);
