translateMe.log = (function (self) {
  var _loglevel = 9;

  self.debug = function (msg) {
    this.log(2, msg);
  };

  self.info = function (msg) {
    this.log(1, msg);
  };

  self.error = function (msg) {
    this.log(0, msg);
  };

  self.log = function (level, msg) {
    if (_isEnabled(level)) {
      _output(msg);
    }
  };

  function _isEnabled(level) {
    var loglevel = _loglevel || 1;
    return level <= loglevel;
  }

  function _output(str) {
    console.log(str);
  }

  return self;
}(translateMe.log || {}));

translateMe.util = (function (self) {
  self.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  self.fireEventToTabs = function (eventName, message) {
    var windows = safari.application.browserWindows;
    for (i = 0; i < windows.length; i++) {
      var tabs = windows[i].tabs;
      for (j = 0; j < tabs.length; j++) {
        var tab = tabs[j];
        tab.page.dispatchMessage(eventName, message);
      }
    }
  };

  return self;
}(translateMe.util || {}));
