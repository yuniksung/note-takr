const noteData = require("../db/db.json");

module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
    let received = req.body;
    received.id = noteData.length.toString();
    noteData.push(received);
    res.json(received);
  })

  app.delete("/api/notes/:id", function(req,res) {
    let deleteID = req.params.id;
    for (let i = 0; i < noteData.length; i++) {
      if (noteData[i].id == deleteID) {
        noteData.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < noteData.length; i++) {
      noteData[i].id = i.toString();
    }
    return res.json(true);
  })
};

