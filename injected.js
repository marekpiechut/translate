
pages = {
	listener: function(msg) {
		if(msg.name === 'translate_selected') {
			var text = pages.getSelectedText();
			var url = window.location.href;
			var response = {text: text, url: url};
			safari.self.tab.dispatchMessage('translate_text', response);
		} else if(msg.name === 'show_translated' && !msg.shown)  {
			var translation = msg.message;
			log.debug("Showing translation: " + JSON.stringify(translation));
			
			pages.showTranslated(translation);
			msg.shown = true;
		}
	},
	
	getSelectedText: function() {
		var text = window.getSelection().toString();
		return text;
	},
	
	showTranslated: function(message) {
		var html = this.formatTranslation(message);
		var list = pl('div#translateMe_popup_list_main').get();
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
		var html = '<div id="translateMe_popup_list_translations"><ul class="translateMe_clean translateMe_popup_list">';
		var sentences = translation.sentences;
		for(var i in sentences) {			
			html += '<li class="translateMe_clean translateMe_sentence translateMe_popup_list">' + sentences[i].trans + '</li>';
		}
		
		html += '</ul></div>';
		if(translation.dict) {
			var dict = this.formatDict(translation.dict)
			html += dict;
		}
		return html;
	},
	
	formatDict: function(dict) {
		var html = '<div class="translateMe_clean translateMe_popup_dict_list">';
		pl.each(dict, function(k, v) {
			html += '<div class="translateMe_clean translateMe_popup_dict_elem"><div class="translateMe_clean translateMe_popup_dict_elem_type">';
			html += capitalize(v.pos);
			html += '</div><div class="translateMe_clean translateMe_popup_dict_elem_terms">'
			pl.each(this.terms, function(k, v) {
				html += v + ', ';
			})
			html = html.slice(0, -2) //remove last ,
			html += '</div>';
		})
		
		html += '</div>'
		return html;
	},
	
	appendPopup: function() {
		pl('body').append('<div id="translateMe_popup" class="translateMe_clean  translateMe_popup">' +
			'<div id="translateMe_popup_menu" class="translateMe_clean">' + 
			'<div class="translateMe_clean"><img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/listen.png"/></div>' +
			'<div class="translateMe_clean"><img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/translate_whole.png"/></div>' +
			'</div>' +
			'<div id="translateMe_popup_list" class="translateMe_clean"><div id="translateMe_popup_list_main" class="translateMe_clean"></div></div>' +
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