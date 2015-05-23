'use strict';

var TRANSLATE = TRANSLATE || {};

TRANSLATE.popup = (function() {
	function setOriginalText(text) {
		var displayText = decodeURI(text);
		if (nullOrEmpty(text)) {
			pl('div.original').text('Nothing selected.');
		} else {
			if(displayText.length > 35) {
				displayText = displayText.substring(0, 34) + '...';
			}
			
			pl('div.original').text(displayText);
		}
	}

	function setTranslations(trans) {
		pl('ul.translations li').remove();
		var translationsList = pl('ul.translations');
		pl.each(trans, function() {
			translationsList.append('<li class="translation">' + this + '</li>');
		});
	}

	function setDictionaryWords(dict) {
		var div = pl('div.dictionary');
		div.html('');
		pl.each(dict, function() {
			var type = capitalize(this.form) + ':';
			var terms = join(this.terms, ', ');
			div.append('<div class="dictionary_word"><div class="word_type">' + type +
				'</div><div class="dictionary_words">' + terms + '</div></div>');
		});
	}

	function setupButtons(data) {
		pl('a#listen').attr('href', data.listenUrl);
		pl('a#translate_whole').attr('href', data.translatePageUrl);
	}

	function join(arr, separator) {
		var word, i;
		var arrLen = arr.length;
		var lastIdx = arrLen - 1;
		var joined = '';
		for (i = 0; i < arrLen; i++) {
			word = arr[i];
			joined += word;
			if (i < lastIdx) {
				joined += separator;
			}
		}

		return joined;
	}

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function nullOrEmpty(string) {
		return !string || pl.empty(pl.trim(string));
	}

	return {
		dataChanged: function(data) {
			setOriginalText(data.text);
			setTranslations(data.trans);
			setDictionaryWords(data.dict);
			setupButtons(data);
		},

		gotoHref: function(href) {
			if (!nullOrEmpty(href)) {
				safari.application.activeBrowserWindow.activeTab.url = href;
			}
		},

		playAudio: function(href) {
			this.audio = this.audio || new Audio();
			this.audio.pause();
			this.audio.currentTime=0;
			if(this.audio.src !== href) {
				this.audio.src = href;
				this.audio.load();
			}
			this.audio.play();
		}
	};
})();
