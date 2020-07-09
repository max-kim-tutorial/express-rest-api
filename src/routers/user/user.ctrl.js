// 실제 api의 로직
const db = require("../../models");
const UserServicesClass = require("../../services/userServices");

const userServices = new UserServicesClass(db.User);

const index = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  userServices.getUserById(id).then((user) => {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user);
  });
};

const create = function (req, res) {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  userServices
    .createOneUser(name)
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
  userServices.getAllUser(limit).then((users) => {
    res.json(users);
  });
};

const destroy = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  userServices.deleteUserById(id).then(() => {
    res.status(204).end();
  });
};

const update = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  userServices.getUserById(id).then((user) => {
    if (!user) return res.status(404).end();
    user.name = name;
    user
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(409).end();
        }
        res.status(500).end();
      });
  });
};
module.exports = {
  index,
  create,
  show,
  destroy,
  update,
};
