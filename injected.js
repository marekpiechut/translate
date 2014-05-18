var translateMe = translateMe || {};

translateMe.pages = (function (self) {
  var log = translateMe.log;

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
        log.debug("Showing translation: " + JSON.stringify(translation));
        translateMe.ui.showTranslated(translation);
        msg.shown = true;
      }
    },
  };

  function _listener(msg) {
    if (window.top === window) {
      var fn = listeners[msg.name] || function (msg) {
          log.error("no page listener for name: " + msg.name);
        };
      fn(msg);
    }

    if (msg.name === "config") {
      log.debug('Updating config: ' + JSON.stringify(msg.message));
      translateMe.config.update(msg.message.key, msg.message.val);
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
}(translateMe.pages || {}));

translateMe.pages.init();
