import { Router } from 'express';
import todo_hook from './todo';
import fetch from 'node-fetch';
import { request } from 'https';

export default ({ config, db }) => {
	let routes = Router();

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
			console.log("USER ID: " + req.body.originalRequest.data.sender.id)
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

	// SENDS MESSAGE THROUGH FACEBOOK MESSENGER'S SEND API
	routes.post('/postStatus', (req, res) => {
		fetch('https://graph.facebook.com/v3.0/me/messages?access_token=EAAC37iwg6CkBANy77fq5dtHqGwor27gSQda2wigVZAKCYXsbhzRfMA4sNnZCZCwXiY4nPzUlY3oLgmWTJQZAwfz78yz49eKZBXxMO3TcOxTnFmdNwZAK7ytWuNn19TKycaOaAeuFZAMOB95nZBZBnulVuMBHUY6GgnZAXa4DPmXzua1vGFZBkpOGrh0cdtQ5wClZCgYZD', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"recipient": {
					"id": req.query.id
				},
				"message": {
					"text": "Hi! How about adding some tasks?"
				}
			})
		})
			.then(res => {
				console.log("SUCCESSFULLY SENT A MESSAGE")
				return res.json({})
			}).catch(err => {
				console.error(`Something went wrong`, err)
				return res.json({})
			})
	})

	// PRIVACY POLICY FOR FACEBOOK INTEGRATION
	routes.get('/privacy-policy', (req, res) => {
		res.send("PRIVACY POLICY")
	})

	return routes;
}
