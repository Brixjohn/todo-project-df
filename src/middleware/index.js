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
	routes.post('/todo-add', (req, res) => {
		db.run("INSERT INTO todo(priority,subject,content,datestamp,userid) VALUES (?,?, ?, ?, 0)", [req.body.priority, req.body.subject, req.body.content, Date.now()], (err) => {
			if(err) throw err
			res.send("ADDED SUCCESSFULLY")
			console.log(req.body)
		})
	})

	//UPDATE TODO
	
	//DELETE TODO

	return routes;
}
