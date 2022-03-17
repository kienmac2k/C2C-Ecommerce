"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Admin",
        displayName: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vendor",
        displayName: "vendor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        displayName: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Users", [
      {
        name: "kienneik",
        email: "mactrungkien2000@gmail.com",
        password: bcrypt.hashSync("maychila1", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("User_Roles", [
      {
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
