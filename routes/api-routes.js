const db = require("../models");
module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    db.Todos.create({
      items: req.body.items,
      checked: false,
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.get("/api/getToDos", (req, res) => {
    db.Todos.findAll({
      where: {
        checked: false,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.get("/api/getDones", (req, res) => {
    db.Todos.findAll({
      where: {
        checked: true,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
};
