var TRANSLATE = TRANSLATE || {};

TRANSLATE.pages = (function (self) {

  var listeners = {
    translate_selected: function (msg) {
      var text = _getSelectedText();
      var url = window.location.href;
      var response = {
        text: text,
        url: url
      };
      safari.self.tab.dispatchMessage('translate_text', response);
    },

    show_translated: function (msg) {
      if (!msg.shown) {
        var translation = msg.message;
        TRANSLATE.log.debug("Showing translation: " + JSON.stringify(translation));
        TRANSLATE.ui.showTranslated(translation);
        msg.shown = true;
      }
    },
  };

  function _listener(msg) {
    if (window.top === window) {
      var fn = listeners[msg.name] || function (msg) {
          TRANSLATE.log.error("no page listener for name: " + msg.name);
        };
      fn(msg);
    }

    if (msg.name === "config") {
      TRANSLATE.log.debug('Updating config: ' + JSON.stringify(msg.message));
      TRANSLATE.config.update(msg.message.key, msg.message.val);
    }
  }

  function _getSelectedText() {
    var text = window.getSelection().toString();
    return text;
  }

  return {
    init: function () {
      safari.self.addEventListener('message', _listener, false);
    }
  };
}(TRANSLATE.pages || {}));

TRANSLATE.pages.init();
