"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Orders, { foreignKey: "userId" });

      // http://docs.sequelizejs.com/class/lib/associations/belongs-to-many.js~BelongsToMany.html#instance-method-get
      // user.addRoles, user.countRoles, user.createRole, user.getRoles, user.getRoles, user.removeRole, user.removeRoles, user.setRoles
      this.belongsToMany(models.Roles, {
        through: "User_Roles",
        foreignKey: "userId",
        otherKey: "roleId",
        as: "roles",
      });
      this.hasMany(models.Comments, { foreignKey: "userId" });
      this.hasMany(models.Addresses, { foreignKey: "userId" }); //{as: 'Addresses'});
      this.hasMany(models.Shops, { foreignKey: "userId", as: "shops" });
    }

    isAdminSync() {
      return (
        this.Roles != null &&
        this.Roles.some((role) => role.displayName === "admin")
      );
    }

    // async isAdminAsync() {
    //   let isAdmin = false;
    //   await this.getRoles()
    //     .then((roles) => {
    //       isAdmin = roles.some((r) => r.name === "ROLE_ADMIN");
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       // foreignKey: 'userId', otherKey: 'roleId'
    //     });

    //   return isAdmin;
    // }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
    isValidPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    generateJwt() {
      return jwt.sign(
        {
          userId: this.id,
          name: this.get("name"),
          roles: this.roles.map((role) => role.displayName),
        },
        process.env.JWT_SECRET || "JWT_SUPER_SECRET",
        { expiresIn: process.env.EXPIRE_TIME || 360000 }
      );
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
      setting: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      hasTrigger: true,
      hooks: {
        beforeBulkCreate: function (user, options) {
          const hashed_password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10)
          );
          user.password = hashed_password;
        },
        beforeBulkUpdate: (user) => {
          user.attributes.updateTime = new Date();
        },
      },
    }
  );

  return Users;
};
