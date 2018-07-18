// CREATING A TODO ENTRY
function todo_create(db, priority, subject, content, res) {
    db.run("INSERT INTO todo(priority,subject,content,datestamp) VALUES (?, ?, ?, ?)", [priority, subject, content, Date.now()], (err) => {
        if(err) throw err
        let message = "Okay. Successfully added your \"" + subject + "\" task!"
        res.json({
            "speech": message,
            "displayText": message
        })
    })
}

// VIEWING TODO ENTRIES
function todo_view_all(db, res) {
    db.all("SELECT id, subject, content FROM todo ORDER BY priority", (err, rows) => {
        if(err) throw err
        let messages = []
        let count = 0
        for(let row of rows) {
            if (count >= 10) break
            let deltext = "Delete task " + row.id
            let updtext = "Update task " + row.id
            messages.push({
                "buttons": [
                {
                    "postback": updtext,
                    "text": "UPDATE"

                }, {
                    "postback": deltext,
                    "text": "DELETE"
                }],
                "imageUrl": undefined,
                "platform": "facebook",
                "subtitle": row.content,
                "title": row.subject,
                "type": 1
                })
            count++
        }
        res.json({
            "messages": messages
        })
    })
}


// UPDATE A TODO ENTRY
function todo_update(db, priority, subject, content, id, res) {
    db.run("UPDATE todo SET priority=?, subject=?, content=?, datestamp=? WHERE id=?", [priority, subject, content, Date.now(), id], (err) => {
        if(err) throw err
        db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", id, (err, row) => {
            if(err) throw err
            let message = "Okay. Successfully updated your \"" + subject + "\" task!"
            res.json({
                "speech": message,
                "displayText": message,
            })
        })
    })
}

// DELETE SPECIFIC TODO BY ID
function todo_delete_id(db, id, res) {
    db.get("SELECT id, subject, content, priority FROM todo WHERE id = ?", id, (err, row) => {
        if(err) throw err
        res.json({
            "messages": [{
                "buttons": [
                    {
                        "postback": "yes",
                        "text": "YES"
                    }, {
                        "postback": "no",
                        "text": "NO"
                    }],
                    "imageUrl": undefined,
                    "platform": "facebook",
                    "subtitle": row.subject,
                    "title": "Are you sure?",
                    "type": 1
            }]
        })
    })
}

// FOLLOW-UP FOR DELETE
function todo_delete_yes(db, id, res) {
    db.run("DELETE FROM todo WHERE id=?", id, (err) => {
        if(err) throw err
        let message = "Okay. Successfully deleted the task!"
        res.json({
            "speech": message,
            "displayText": message
        })
    })
}

module.exports = {
    todo_create,
    todo_view_all,
    todo_update,
    todo_delete_id,
    todo_delete_yes
}
