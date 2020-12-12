var path = require("path");

module.exports = function(app) {

  app.use('*.js', (req, res, next) => {
    res.set('Content-Type', 'text/javascript')
    next();
  })

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
