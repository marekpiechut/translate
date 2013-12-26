translateMe = {}

translateMe.pages = {
	listener: function(msg) {
		if (window.top === window) {
			if(msg.name === 'translate_selected') {
				var text = translateMe.pages.getSelectedText();
				var url = window.location.href;
				var response = {text: text, url: url};
				safari.self.tab.dispatchMessage('translate_text', response);
			} else if(msg.name === 'show_translated' && !msg.shown)  {
				var translation = msg.message;
				log.debug("Showing translation: " + JSON.stringify(translation));			
				translateMe.ui.showTranslated(translation);
				msg.shown = true;
			}
		}
	},
	
	getSelectedText: function() {
		var text = window.getSelection().toString();
		return text;
	}
}

safari.self.addEventListener('message', translateMe.pages.listener, false);
