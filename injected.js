var translateMe = {};

translateMe.pages = function() {
	var listeners = {
		translate_selected: function(msg) {
			var text = translateMe.pages.getSelectedText();
			var url = window.location.href;
			var response = {text: text, url: url};
			safari.self.tab.dispatchMessage('translate_text', response);
		},
		
		show_translated: function(msg) {
			if(!msg.shown) {
				var translation = msg.message;
				log.debug("Showing translation: " + JSON.stringify(translation));			
				translateMe.ui.showTranslated(translation);
				msg.shown = true;
			}
		},
	}
	
	return {
		listener: function(msg) {
			if (window.top === window) {
				var fn = listeners[msg.name] || function(msg) {log.error("no page listener for name: " + msg.name)};
				fn(msg);
			} 
			
			if(msg.name === "config") {
				log.debug('Updating config: ' + JSON.stringify(msg.message));
				config.update(msg.message.key, msg.message.val);
			}
		},
	
		getSelectedText: function() {
			var text = window.getSelection().toString();
			return text;
		}
	}
}();

safari.self.addEventListener('message', translateMe.pages.listener, false);
