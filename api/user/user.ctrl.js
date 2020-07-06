// 실제 api의 로직

const models = require("../../models");

const index = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  models.User.findOne({ where: { id: id } }).then((user) => {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user);
  });
};

const create = function (req, res) {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  models.User.create({ name })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      // 에러별로 핸들링!
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(409).end();
      }
      res.status(500).end();
    });
};

const show = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  models.User.findAll({ limit: limit }).then((users) => {
    res.json(users);
  });
};

const destroy = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.User.destroy({
    where: { id },
  }).then(() => {
    res.status(204).end();
  });
};

const update = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();

  user.name = name;
  res.json(user);
};
module.exports = {
  index,
  create,
  show,
  destroy,
  update,
};
