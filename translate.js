var translateMe = (function (self) {
  var log = translateMe.log;

  function _commandListener(e) {
    if (e.command === 'translate') {
      safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
        'translate_selected');
    }
  }

  function _showTranslation(data) {
    log.debug("Received translation: " + JSON.stringify(data));
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
      'show_translated', data);
  }

  function _translationRequestListener(e) {
    if (e.name === 'translate_text') {
      var msg = e.message;
      msg.from = translateMe.config.source;
      msg.to = translateMe.config.target;
      log.debug('Received message to translate: ' + msg.text);
      self.translator.translate(msg, _showTranslation);
    } else if (e.name === 'translate') {
      safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
        'translate_selected');
    }
  }

  function _configChangeListener(e) {
    log.debug('Config changed');
    translateMe.config.update(e.key, e.newValue);
    fireEventToTabs('config', {
      key: e.key,
      val: e.newValue
    });
  }

  self.init = function () {
    safari.application.addEventListener(
      "command", _commandListener, false);
    safari.application.activeBrowserWindow.activeTab.addEventListener(
      "message", _translationRequestListener, false);
    safari.extension.settings.addEventListener(
      "change", _configChangeListener, false);
  };

  return self;
}(translateMe || {}));

translateMe.init();
