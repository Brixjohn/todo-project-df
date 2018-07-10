import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	//VIEW TODO BY ID
	routes.get('/todo/:id', (req, res) => {
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", req.params.id, (err, row) => {
			if(err) throw err
			res.send(row);
		})
	})

	//VIEW ALL TODO
	routes.get('/todo-all', (req, res) => {
		db.all("SELECT subject, content, priority FROM todo", (err, rows) => {
			if(err) throw err
			res.send(rows);
		})
	})

	//VIEW TODO RANKED BY PRIORITY
	routes.get('/todo-rank-priority', (req, res) => {
		db.all("SELECT subject, content, priority FROM todo ORDER BY priority", (err, rows) => {
			if(err) throw err
			res.send(rows);
		})
	})

	//VIEW TODO BY PRIORITY
	routes.get('/todo-priority/:priority', (req, res) => {
		db.all("SELECT subject, content, priority FROM todo WHERE priority = ?", req.params.priority, (err, rows) => {
			if(err) throw err
			res.send(rows);
		})
	})

	//ADD TODO
	routes.post('/todo-add', (req, res) => {
		db.run("INSERT INTO todo(priority,subject,content,datestamp) VALUES (?, ?, ?, ?)", [req.body.priority, req.body.subject, req.body.content, Date.now()], (err) => {
			if(err) throw err
			res.send("ADDED SUCCESSFULLY")
		})
	})

	//UPDATE TODO
	routes.post('/todo-update/:id', (req, res) => {
		db.run("UPDATE todo SET priority=?, subject=?, content=?, datestamp=? WHERE id=?", [req.body.priority, req.body.subject, req.body.content, Date.now(), req.params.id], (err) => {
			if(err) throw err
			res.send("UPDATED SUCCESSFULLY")
		})
	})

	//DELETE TODO BY ID
	routes.post('/todo-remove/:id', (req, res) => {
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", req.params.id, (err, row) => {
			if(err) throw err
			res.send(row)
		})
		db.run("DELETE FROM todo WHERE id=?", req.params.id, (err) => {
			if(err) throw err
		})
	})

	routes.post('/api/todoWebhook', (req, res) => {
		switch(req.body.queryResult.action) {
			case "todo-create":
				console.log("YEYEYEYE!")
				// todo_create()
				break
			case "todo-view":	// add todo-view-all, todo-view-priority, todo-rank-priority, todo-view-id
				console.log("LOLOLOLOL")
				// todo_view()
				break
			case "todo-update":
				console.log("JAJAJAJAJA")
				// todo_update()
				break
			case "todo-delete": // add delete-all, delete-priority, delete-id
				console.log("WWWWWWWW")
				// todo_delete()
				break
			default:
				console.log(req.body)


		}
	})

	return routes;
}
