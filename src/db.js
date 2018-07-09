const sqlite3 = require('sqlite3').verbose()

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	const db = new sqlite3.Database('./todo.db', (err) => {
		if (err) throw err
	})
	callback(db);
}
