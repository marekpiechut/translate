var TRANSLATE = TRANSLATE || {};

TRANSLATE.pages = (function(self) {

	var config = {};

	var listeners = {
		translate_selected: function(msg) {
			_translateSelected();
		},

		config: function(msg) {
			TRANSLATE.log.debug('Updating config: ' + JSON.stringify(msg.message));
			config = msg.message;
		}
	};

	function getConfig() {
		return config;
	}

	function _listener(msg) {
		var fn = listeners[msg.name] || function(msg) {
				TRANSLATE.log.error("no page listener for name: " + msg.name);
			};
		fn(msg);
	}

	function _reloadConfig() {
		safari.self.tab.dispatchMessage('get_config');
	}
	
	function _notInInput() {
		var tagName = document.activeElement.tagName.toLowerCase();
		return tagName != "input" && tagName != "textarea";
	}
    
	function _somethingSelected() {
			var selected = _getSelectedText();
			return selected && !/^\s*$/.test(selected);
	}
	
	function _translateKeyPressed(e) {
		var translateKeyPressed = e.keyCode == getConfig().key
		var modifierPressed =
			(e.ctrlKey === false && e.altKey === false &&
				(getConfig().key_modifier === "none" || getConfig().key_modifier === undefined)) ||
			(e.ctrlKey === true && e.altKey === false && getConfig().key_modifier === "ctrl") ||
			(e.ctrlKey === false && e.altKey === true && getConfig().key_modifier === "alt")
		
		return translateKeyPressed && modifierPressed;
}

	function _registerKey() {
		document.body.addEventListener('keydown', function(e) {
			if (_translateKeyPressed(e) && _notInInput() && _somethingSelected()) {
				_translateSelected();
			}
		});
	}

	function _translateSelected() {
		var text = _getSelectedText();
		var url = window.location.href;
		var response = {
			text: text,
			url: url
		};
		safari.self.tab.dispatchMessage('translate_text', response);
	}

	function _getSelectedText() {
		var text = window.getSelection().toString();
		return text;
	}


	return {
		init: function() {
			TRANSLATE.log = TRANSLATE.utils.createLogger(function(msg) {
				console.log(msg)
			});
			safari.self.addEventListener('message', _listener, false);
			_reloadConfig();
			_registerKey();
		}
	};
}(TRANSLATE.pages || {}));

TRANSLATE.pages.init();
