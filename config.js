var translateMe = translateMe || {};

translateMe.config = {
	serviceUrl: "http://translate.google.com/translate_a/t?text={text}&sl={from}&tl={to}&client=x",
	target: 'pl',
	source: 'auto',
	key: 84,
	update: function(key, value) {
		config[key] = value;
	},
};
