QUnit.test("logging in lower log levels does not append to log", function() {
	var logs = [];

	var log = TRANSLATE.utils.createLogger(
		function(msg) {
			logs.push(msg);
		});

	log.level = 1;
	log.debug("not in");
	ok(logs.length == 0);
	log.info("should be in");
	ok(logs.length == 1);

	log.level = 0;
	log.info("not in");
	ok(logs.length == 1);
});
