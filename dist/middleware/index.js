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
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", req.params.id, function (err, row) {
			if (err) throw err;
			res.send(row);
		});
	});

	//VIEW ALL TODO
	routes.get('/todo-all', function (req, res) {
		db.all("SELECT subject, content, priority FROM todo", function (err, rows) {
			if (err) throw err;
			res.send(rows);
		});
	});

	//ADD TODO
	routes.post('/todo-add', function (req, res) {
		db.run("INSERT INTO todo(priority,subject,content,datestamp,userid) VALUES (?, ?, ?, ?, 0)", [req.body.priority, req.body.subject, req.body.content, Date.now()], function (err) {
			if (err) throw err;
			res.send("ADDED SUCCESSFULLY");
		});
	});

	//UPDATE TODO
	routes.post('/todo-update/:id', function (req, res) {
		db.run("UPDATE todo SET priority=?, subject=?, content=?, datestamp=? WHERE id=?", [req.body.priority, req.body.subject, req.body.content, Date.now(), req.params.id], function (err) {
			if (err) throw err;
			res.send("UPDATED SUCCESSFULLY");
		});
	});

	//DELETE TODO

	return routes;
};
//# sourceMappingURL=index.js.map