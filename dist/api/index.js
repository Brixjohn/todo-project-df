'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	api.get('/todo/:id', function (req, res) {
		db.get("SELECT * FROM todo WHERE id = ?", id, function (err, row) {
			if (err) {
				throw err;
				console.log(err);
			};
			res.send(200);
		});
	});

	return api;
};
//# sourceMappingURL=index.js.map
