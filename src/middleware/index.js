import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	//VIEW TODO BY ID
	routes.get('/todo/:id', (req, res) => {
		console.log("one")
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", parseInt(req.params.id), (err, row) => {
			if(err) throw err
			res.send(row);
		})
	})

	//VIEW ALL TODO
	//ADD TODO
	routes.post('/add', (req, res) => {
		console.log("check")
		db.run("INSERT INTO todo(priority,subject,content,datestamp,userid) VALUES (?,'yeyyey', 'yey', '2018-03-21 09:03:14.233', 0)", parseInt(req.query.priority), (err) => {
			if(err) {
				throw err
				console.log(err)
			}
			console.log("here")
			res.send("ADDED")
			res.end()
			console.log(this.lastID)
		})
	})

	//UPDATE TODO
	//DELETE TODO

	return routes;
}
