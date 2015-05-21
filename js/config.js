TRANSLATE.config = {
	serviceUrl: "https://translate.googleapis.com/translate_a/single?client=gtx&sl={from}&tl={to}&hl={from}&dt=t&dt=bd&dj=1&source=input&q={text}",
	target: safari.extension.settings.target,
	source: 'auto',
	key: safari.extension.settings.key,
	key_modifier: safari.extension.settings.key_modifier,
	
	update: function(key, value) {
		this[key] = value;
	},
	
	serialize: function() {
		return {
			target: TRANSLATE.config.target,
			source: TRANSLATE.config.source,
			key: TRANSLATE.config.key,
			key_modifier: TRANSLATE.config.key_modifier
		}
	}
};
