TRANSLATE.translator = (function (self) {
	var log = TRANSLATE.log;

  function _prepareUrl(text, to, from) {
    var url = TRANSLATE.config.serviceUrl;
    url = url.replace('{text}', text);
    url = url.replace('{from}', from);
    url = url.replace('{to}', to);
    return url;
  }

  function _getTranslatePageUrl(pageUrl, to, from) {
    from = from || 'auto';
    var url =
      "http://translate.google.com/translate?sl={from}&tl={to}&u={url}&act=url";
    url = url.replace('{url}', encodeURIComponent(pageUrl));
    url = url.replace('{from}', from);
    url = url.replace('{to}', to);
    return url;
  }

  function _getListenUrl(text, lang) {
    var url =
      "http://translate.google.com/translate_tts?ie=UTF-8&q={text}&tl={lang}&total={wc}&idx=0&len={len}";
    url = url.replace('{text}', text);
    url = url.replace('{lang}', lang);
    url = url.replace('{wc}', text.split(/\s+/).length);
    url = url.replace('{len}', text.length);
    return url;
  }

  self.translate = function (data, callback) {
    var result;
    var from = data.from || 'auto';
    var text = encodeURIComponent(data.text);
    var to = data.to;

    var url = _prepareUrl(text, to, from);
    TRANSLATE.log.debug("Calling URL: " + url);
    pl.ajax({
      async: false,
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      success: function (json) {
        var translation = JSON.parse(json);
        translation.text = text;
        translation.listenUrl = _getListenUrl(text, translation.src);
        translation.translatePageUrl = _getTranslatePageUrl(data.url, to,
          from);
        callback(translation);
      }
    });
  };

  return self;
}(TRANSLATE.translator || {}));
