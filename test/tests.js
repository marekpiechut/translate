
test("test logging", function() {
	var logs = []
	log = logger.create("test");
	log.output = function(msg) {
		logs.push(msg);
	}
	
	log.level=1
	log.debug("not in")
	ok(logs.length == 0)
	log.info("should be in")
	ok(logs.length == 1)
	
	log.level=0
	log.info("not in")
	ok(logs.length == 1)
})