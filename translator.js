translator = {
	translate: function(data, callback) {
		var result;
		var from = data.from || 'auto';
		var text = encodeURIComponent(data.text);
		var to = data.to;
		
		var url = this.prepareUrl(text, to, from);
		log.debug("Calling URL: " + url);
		pl.ajax({
			async: false,
			url: url,
			type: 'GET',
			dataType: 'jsonp',
			// data: {
			// 	text: text,
			// 	sl: from,
			// 	tl: to,
			// 	client: 'x'
			// },
			success: function(json) {
				var translation = JSON.parse(json);
				callback(translation);
			}
		})
		// callback(JSON.parse('{"sentences":[{"trans":"potężny jak koza","orig":"powerful","translit":"","src_translit":""}, {"trans":"potężny jak brzoza a moze we etorek po poludniu An elegant css cross-browser solution: This works in both MSIE 6 (Quirks and Standards), Mozilla, Opera and even Netscape 4.x without setting any explicit widths: An elegant css cross-browser solution: This works in both MSIE 6 (Quirks and Standards), Mozilla, Opera and even Netscape 4.x without setting any explicit widths:","orig":"powerful","translit":"","src_translit":""}],"dict":[{"pos":"adjective","terms":["potężny","silny","mocny","skuteczny","ogromny","możny"],"entry":[{"word":"potężny","reverse_translation":["powerful","mighty","huge","strong","potent","formidable"],"score":0.10215643},{"word":"silny","reverse_translation":["strong","powerful","severe","potent","smart","high"],"score":0.034756977},{"word":"mocny","reverse_translation":["strong","powerful","fast","firm","hefty","tough"],"score":0.029268308},{"word":"skuteczny","reverse_translation":["effective","efficient","powerful","efficacious","effectual","potent"],"score":0.0033880526},{"word":"ogromny","reverse_translation":["huge","enormous","tremendous","immense","vast","powerful"],"score":0.00036272159},{"word":"możny","reverse_translation":["mighty","powerful"],"score":7.6030577e-05}],"base_form":"powerful","pos_enum":3}],"src":"en","server_time":21}'));
		// var dummy = JSON.parse('{"sentences":[{"trans":"koza","orig":"powerful","translit":"","src_translit":""}],"dict":[{"pos":"adjective","terms":["potężny","silny","mocny","skuteczny","ogromny","możny"],"entry":[{"word":"potężny","reverse_translation":["powerful","mighty","huge","strong","potent","formidable"],"score":0.10215643},{"word":"silny","reverse_translation":["strong","powerful","severe","potent","smart","high"],"score":0.034756977},{"word":"mocny","reverse_translation":["strong","powerful","fast","firm","hefty","tough"],"score":0.029268308},{"word":"skuteczny","reverse_translation":["effective","efficient","powerful","efficacious","effectual","potent"],"score":0.0033880526},{"word":"ogromny","reverse_translation":["huge","enormous","tremendous","immense","vast","powerful"],"score":0.00036272159},{"word":"możny","reverse_translation":["mighty","powerful"],"score":7.6030577e-05}],"base_form":"powerful","pos_enum":3}],"src":"en","server_time":21}');
		// dummy.listenUrl = this.getListenUrl(text, dummy.src);
		// dummy.translatePageUrl = this.getTranslatePageUrl();
		// callback(dummy);
		
	}, 
	
	prepareUrl: function(text, to, from) {
		var url = config.serviceUrl;
		url = url.replace('{text}', text);
		url = url.replace('{from}', from);
		url = url.replace('{to}', to);
		return url;
	},
	
	getListenUrl: function(text, lang) {
		var url = "http://translate.google.com/translate_tts?ie=UTF-8&q={text}&tl={lang}&total={wc}&idx=0&len={len}";
		url = url.replace('{text}', text);
		url = url.replace('{lang}', lang);
		url = url.replace('{wc}', text.split(/\s+/).length);
		url = url.replace('{len}', text.length);

		return url;
	},
	
	getTranslatePageUrl: function(pageUrl, to, from) {
		from = from || 'auto';
		var url = "http://translate.google.com/translate?sl={from}&tl={to}&u={url}&act=url"
		url = url.replace('{url}', encodeURIComponent(pageUrl));
		url = url.replace('{from}', from);
		url = url.replace('{to}', to);
		
		return url;
	}
}