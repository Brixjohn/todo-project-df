import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/todo/:id', (req, res) => {
		db.get("SELECT * FROM todo WHERE id = ?", id, (err, row) => {
			if(err) {
				throw err
				console.log(err)
			};
			res.send(200);
		})
	})

	return api;
}
