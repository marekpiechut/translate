TRANSLATE.config = {
	serviceUrl: "https://translate.googleapis.com/translate_a/single?client=gtx&sl={from}&tl={to}&hl={from}&dt=t&dt=bd&dj=1&source=input&q={text}",
	target: safari.extension.settings.target,
	source: 'auto',
	key: safari.extension.settings.key,
	
	update: function(key, value) {
		this[key] = value;
	},
	
	serialize: function() {
		return {
			target: TRANSLATE.config.target,
			source: TRANSLATE.config.source,
			key: TRANSLATE.config.key
		}
	}
};
