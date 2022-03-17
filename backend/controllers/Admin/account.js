const { Users, sequelize, Roles } = require("../../models");
const AppResponseDto = require("../../dtos/responses/app_response.dto");

exports.getAll = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  Promise.all([
    Users.findAll({
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * pageSize || 0,
      limit: pageSize || 5,
      include: [{ model: Roles, as: "roles", through: { attributes: [] } }],
    }),
    Users.findAndCountAll({ attributes: ["id"] }),
  ])
    .then((results) => {
      const users = results[0];
      const count = results[1].count;
      return res.status(200).json({ users, count });
    })
    .catch((err) => {
      return res.status(400).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

exports.deleteUser = (req, res) => {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const { userId } = req.params;
  Users.findOne({ where: { id: userId } })
    .then((user) => {
      user
        .destroy()
        .then(() => {
          return res
            .status(200)
            .json(
              AppResponseDto.buildSuccessWithMessages("Delete successfully")
            );
        })
        .catch((err) => {
          return res
            .status(400)
            .json(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      console.error("User is not found");
      return res.status(400).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
exports.setRoleForUser = (req, res) => {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  const promises = [];
  const { userId } = req.params;
  const { roles } = req.body || [];
  let transact;
  sequelize
    .transaction({ autocommit: false })
    .then(async function (transaction) {
      const userRoles = [];
      transact = transaction;
      roles.forEach(async (name) => {
        const role = await Roles.findOne({ where: { displayName: name } });
        userRoles.push(role);
      });
      Users.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Roles,
            as: "roles",
          },
        ],
      })
        .then((user) => {
          user.setRoles(userRoles).then(() => {
            transaction.commit();
            return res
              .status(200)
              .json(
                AppResponseDto.buildSuccessWithMessages(
                  "Updated roles successfully"
                )
              );
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(error));
        });
    })
    .catch((err) => {
      transact.rollback();
      console.log("Transaction is rolled back");
      return res.status(500).json({ err });
    });
};
