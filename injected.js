
pages = {
	listener: function(msg) {
		if(msg.name === 'translate_selected') {
			var text = pages.getSelectedText();
			if(text) {
				safari.self.tab.dispatchMessage('translate', text);
			}
		} else if(msg.name === 'show_translated')  {
			var translation = msg.message;
			log.debug("Showing translation");
			if(!msg.shown) {
				pages.showTranslated(translation);
				msg.shown = true;
			}
		}
	},
	
	getSelectedText: function() {
		var text = window.getSelection().toString();
		return text;
	},
	
	showTranslated: function(message) {
		var html = this.formatTranslation(message);
		var list = pl('ul#translateMe_popup_list').get();
		list.innerHTML = html;
		
		var popup = pl('div#translateMe_popup');
		popup.css('display', 'block');
		
		var pos = this.calculatePopupPosition();
		popup.css('top', pos.y);
		popup.css('left', pos.x);
	},
	
	calculatePopupPosition: function() {
		var s = window.getSelection();
		var rect = s.getRangeAt(0).getBoundingClientRect();

		var popupWidth  = pl('div#translateMe_popup').attr('offsetWidth');

		var x = (rect.left + rect.width / 2) - popupWidth / 2;
		var y = rect.bottom + 6;
		
		return {x: x, y: y};
	},
	
	formatTranslation: function(translation) {
		var html = ''
		var sentences = translation.sentences;
		for(var i in sentences) {			
			html += '<li class="translateMe_sentence">' + sentences[i].trans + '</li>';
		}
		return html;
	},
	
	appendPopup: function() {
		pl('body').append('<div id="translateMe_popup" class="translateMe_popup">' +
			'<div id="translateMe_popup_menu">' + 
			'<div><img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/listen.png"/></div>' +
			'<div><img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/translate_whole.png"/></div>' +
			'</div>' +
			'<div id="translateMe_popup_list"><ul id="translateMe_popup_list"></ul></div>' +
			'</div>').html();
	},
	
	registerKey: function() {
		pl('body').bind('keydown', function(e) {
			if(e.keyCode == config.key) {
				safari.self.tab.dispatchMessage('translate');
			}
		});
	}
	
}

safari.self.addEventListener('message', pages.listener, false);
pages.appendPopup();
pages.registerKey();