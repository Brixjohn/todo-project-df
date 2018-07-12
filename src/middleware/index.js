import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	// CREATING A TODO ENTRY
	function todo_create(priority, subject, content) {
		db.run("INSERT INTO todo(priority,subject,content,datestamp) VALUES (?, ?, ?, ?)", [priority, subject, content, Date.now()], (err) => {
			if(err) throw err
			// res.send("ADDED SUCCESSFULLY")
		})
	}

	// VIEWING TODO ENTRIES
	function todo_view_all() {
		db.all("SELECT subject, content, priority FROM todo", (err, rows) => {
			if(err) throw err
			// res.send(rows);
			return rows
		})
	}

	function todo_view_priority(priority) {
		db.all("SELECT subject, content, priority FROM todo WHERE priority = ?", priority, (err, rows) => {
			if(err) throw err
			// res.send(rows);
			return rows
		})
	}

	function todo_rank_priority() {
		db.all("SELECT subject, content, priority FROM todo ORDER BY priority", (err, rows) => {
			if(err) throw err
			// res.send(rows);
			return rows
		})
	}

	function todo_view_id(id) {
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", id, (err, row) => {
			if(err) throw err
			// res.send(row);
			return row
		})
	}


	// UPDATE A TODO ENTRY
	function todo_update(priority, subject, content, id) {
		db.run("UPDATE todo SET priority=?, subject=?, content=?, datestamp=? WHERE id=?", [priority, subject, content, Date.now(), id], (err) => {
			if(err) throw err
			db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", id, (err, row) => {
				if(err) throw err
				// res.send(row);
				return row
			})
		})
	}

	// DELETE TODO ENTRIES
	function todo_delete_all() {
		db.all("SELECT id, subject, content, priority FROM todo", (err, rows) => {
			if(err) throw err
			db.run("DELETE FROM todo", (err) => {
				if(err) throw err
			})
			// res.send(rows)
			return rows
		})
	}
	function todo_delete_id(id) {
		db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", id, (err, row) => {
			if(err) throw err
			db.run("DELETE FROM todo WHERE id=?", req.params.id, (err) => {
				if(err) throw err
			})
			// res.send(row)
			return rows
		})
	}

	//VIEW TODO BY ID
	routes.get('/todo/:id', (req, res) => {
		db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", req.params.id, (err, row) => {
			if(err) throw err
			res.send(row);
		})
	})

	//VIEW ALL TODO
	routes.get('/todo-all', (req, res) => {
		db.all("SELECT id, subject, content, priority FROM todo", (err, rows) => {
			if(err) throw err
			res.send(rows);
		})
	})

	//VIEW TODO RANKED BY PRIORITY
	routes.get('/todo-rank-priority', (req, res) => {
		db.all("SELECT id, subject, content, priority FROM todo ORDER BY priority", (err, rows) => {
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
	routes.put('/todo-update/:id', (req, res) => {
		db.run("UPDATE todo SET priority=?, subject=?, content=?, datestamp=? WHERE id=?", [req.body.priority, req.body.subject, req.body.content, Date.now(), req.params.id], (err) => {
			if(err) throw err
			db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", req.params.id, (err, row) => {
				if(err) throw err
				res.send(row);
			})
		})
	})

	//DELETE ALL TODO
	routes.delete('/todo-remove-all', (req, res) => {
		db.all("SELECT subject, content, priority FROM todo", (err, rows) => {
			if(err) throw err
			db.run("DELETE FROM todo", (err) => {
				if(err) throw err
			})
			res.send(rows)
		})
	})

	//DELETE TODO BY ID
	routes.delete('/todo-remove/:id', (req, res) => {
		db.get("SELECT subject, content, priority FROM todo WHERE id = ?", req.params.id, (err, row) => {
			if(err) throw err
			db.run("DELETE FROM todo WHERE id=?", req.params.id, (err) => {
				if(err) throw err
			})
			res.send(row)
		})
	})

	//API WEBHOOK FOR DIALOGFLOW
	routes.post('/api/todoWebhook', (req, res) => {
		let id = 0
		let subject = ''
		let content = ''
		let priority = 0
		switch(req.body.queryResult.action) {
			case "todo-create-subject":
				subject = req.body.queryResult.parameters.subject
				console.log("Subject: " + subject)
				break
			case "todo-create-content":
				subject = req.body.queryResult.parameters.content
				console.log("Content: " + content)
				break
			case "todo-create-end":
				priority = req.body.queryResult.parameters.priority
				console.log("Priority: " + priority)
				req.send(todo_create(subject, content, priority))
				break
			case "todo-view":	// add todo-view-all, todo-view-priority, todo-rank-priority, todo-view-id
				console.log("LOLOLOLOL")
				todo_view_all()
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
