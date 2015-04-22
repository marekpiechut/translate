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
		if (text != null && !pl.empty(text)) {
			var url =
				"http://translate.google.com/translate_tts?ie=UTF-8&q={text}&tl={lang}&total={wc}&idx=0&len={len}";
			url = url.replace('{text}', text);
			url = url.replace('{lang}', lang);
			url = url.replace('{wc}', text.split(/\s+/).length);
			url = url.replace('{len}', text.length);
			return url;
		} else {
			return "";
		}
	}

	function _translateServiceErrors(url, code, data) {
		switch (code) {
		case (503):
			return {
				type: 'CAPTCHA',
				message: "You've been translating like crazy! Google thinks you're a robot.",
				details: data,
				url: url
			}
		default:
				return {
					type: 'UNKNOWN',
					message: 'Fatal error during translation service call',
					details: data,
					url: url
				}
		}
	}

	function _toModel(response) {
		var model = {
			src: response.src,
			trans: [],
			dict: []
		}

		if (!pl.empty(response.sentences)) {
			pl.each(response.sentences, function () {
				model.trans.push(this.trans);
			})
		}
		if (!pl.empty(response.dict)) {
			pl.each(response.dict, function () {
				var terms = [];
				pl.each(this.terms, function () {
					terms.push(this)
				});

				model.dict.push({
					form: this.pos,
					terms: terms
				});
			});
		}

		return model;
	}

	self.translate = function (data, callback, onError) {
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
				var response = JSON.parse(json);
				var translation = _toModel(response);
				translation.text = data.text;
				translation.listenUrl = _getListenUrl(text, translation.src);
				translation.translatePageUrl = _getTranslatePageUrl(data.url, to,
					from);
				callback(translation);
			},
			error: function (code, data) {
				var error = _translateServiceErrors(url, code, data);
				onError(error);
			}
		});
	};

	return self;
}(TRANSLATE.translator || {}));