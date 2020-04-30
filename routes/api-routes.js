const db = require("../models");
module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    console.log("we are on the back end");
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
  app.put("/api/check:id", (req, res) => {
    console.log("we are checking");
    db.Todos.update(
      {
        checked: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((dbData) => {
      res.json(dbData);
    });
  });
  app.put("/api/uncheck:id", (req, res) => {
    db.Todos.update(
      {
        checked: false,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((dbData) => {
      res.json(dbData);
    });
  });
  app.delete("/api/delete:id", (req, res) => {
    db.Todos.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
};
