const db = require("../db/db"); 
const fs = require("fs");
const path = require("path");


fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    noteObj = JSON.parse(data);
    return noteObj
})


module.exports = function (app) {

    //Save a note
    app.post("/api/notes", (req, res) => {
        //Get the text from the html
        console.log(req.body)
        let newNote = {};
        newNote.id = getId();
        newNote.title = req.body.title;
        newNote.text = req.body.text;

        console.log(newNote)
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            noteObj = JSON.parse(data);
            noteObj.push(newNote);
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err) => {
                if (err) {
                    throw err
                }
            })
            db.push(noteObj)
        })
    })

    // Delete a note
    app.delete("/api/notes/:id", (req, res) => {
        let id = JSON.parse(req.params.id);
            console.log(noteObj[0].id)
            console.log(id)
            for (i = 0; i <= noteObj.length; i++) {
                if (noteObj[i].id === id) {
                    noteObj.splice(i, 1);
                    console.log(noteObj)
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err) => {
                if (err) {
                    throw err
                }
                console.log("this is post noteObj " + noteObj)
                db =[];
                db.push(noteObj)
            })
                }
            }


    })

    app.get("/api/notes",  (req, res) => {
        // return res.json(db)
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data))
        })
    });
}

//Create a unique id# for every note entry
 getId = () => {
    let id = (Math.floor(Math.random() * 100000));

    return id
};
