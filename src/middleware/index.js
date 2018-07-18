import { Router } from 'express';
import todo_hook from './todo'

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	let id = 0
	let subject = ''
	let content = ''
	let priority = 0

	//WEBHOOK FOR DIALOGFLOW
	routes.post('/todoWebhook', (req, res) => {
		if(req.body.result.action === "todo-create") { // CREATE A TODO
			subject = req.body.result.parameters.subject
			content = req.body.result.parameters.content
			priority = req.body.result.parameters.priority
			todo_hook.todo_create(db, priority, subject, content, res)
		} else if(req.body.result.action === "todo-view-all") {
			todo_hook.todo_view_all(db, res)
		} else if(req.body.result.action === "todo-update") {
			id = req.body.result.parameters.id
			subject = req.body.result.parameters.subject
			content = req.body.result.parameters.content
			priority = req.body.result.parameters.priority
			todo_hook.todo_update(db, priority, subject, content, id, res)
		} else if(req.body.result.action === "todo-delete") {
			id = req.body.result.parameters.id
			todo_hook.todo_delete_id(db, id, res)
		} else if(req.body.result.action === "todo-delete-yes") {
			todo_hook.todo_delete_yes(db, id, res)
		} else {
			console.log(req.body)
		}
	})

	// PRIVACY POLICY FOR FACEBOOK INTEGRATION
	routes.get('/privacy-policy', (req, res) => {
		res.send("PRIVACY POLICY")
	})

	return routes;
}
