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

	function _registerKey() {
		document.body.addEventListener('keydown', function(e) {
			if (e.keyCode == getConfig().key && _notInInput()) {
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
