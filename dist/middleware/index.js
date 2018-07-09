'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var routes = (0, _express.Router)();

	// add middleware here

	//VIEW TODO BY ID
	routes.get('/todo/:id', function (req, res) {
		console.log("one");
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", parseInt(req.params.id), function (err, row) {
			if (err) throw err;
			res.send(row);
		});
	});

	//VIEW ALL TODO
	//ADD TODO
	routes.post('/add', function (req, res) {
		console.log("check");
		db.run("INSERT INTO todo(priority,subject,content,datestamp,userid) VALUES (?,'yeyyey', 'yey', '2018-03-21 09:03:14.233', 0)", parseInt(req.query.priority), function (err) {
			if (err) {
				throw err;
				console.log(err);
			}
			console.log("here");
			res.send("ADDED");
			res.end();
			console.log(undefined.lastID);
		});
	});

	//UPDATE TODO
	//DELETE TODO

	return routes;
};
//# sourceMappingURL=index.js.map