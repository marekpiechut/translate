translateMe.ui = {
	showTranslated: function(message) {
		var html = translateMe.ui.formatTranslation(message);
		var list = pl('div#translateMe_popup_list_main').get();
		list.innerHTML = html;
	
		pl('audio#translateMe_popup_menu_listen_audio').attr('src', message.listenUrl);
		pl('a#translateMe_popup_menu_translate_page').attr('href', message.translatePageUrl);
		
		var popup = pl('div#translateMe_popup');
		popup.css('display', 'block');
	
		var pos = translateMe.ui.calculatePopupPosition();
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
			var dict = translateMe.ui.formatDict(translation.dict)
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
			'<div class="translateMe_clean"><a href="" id="translateMe_popup_menu_listen" class="translateMe_clean" ' +
			'onclick="' + 
			'var audio = document.getElementById(\'translateMe_popup_menu_listen_audio\');' +
			' audio.pause(); audio.currentTime=0; audio.play(); return false;' +
			'">' +
			'<img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/listen.png"/>' +
			'</a><audio src="" id="translateMe_popup_menu_listen_audio" style="display: none; visibility: hidden;"></audio></div>' +
			'<div class="translateMe_clean"><a href="" id="translateMe_popup_menu_translate_page" class="translateMe_clean">' +
			'<img width="22px" height="22px" src="' + safari.extension.baseURI + 'res/translate_whole.png"/>' +
			'</a></div>' +
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

translateMe.ui.appendPopup();
translateMe.ui.registerKey();