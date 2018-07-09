'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var sqlite3 = require('sqlite3').verbose();

exports.default = function (callback) {
	// connect to a database if needed, then pass it to `callback`:
	var db = new sqlite3.Database('./todo.db', function (err) {
		if (err) throw err;
	});
	callback(db);
};
//# sourceMappingURL=db.js.map