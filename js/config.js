TRANSLATE.config = {
	serviceUrl: "http://translate.google.com/translate_a/t?text={text}&sl={from}&tl={to}&client=x",
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
