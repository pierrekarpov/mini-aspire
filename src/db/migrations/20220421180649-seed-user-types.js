'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'UserTypes',
      [
        {
          id: 1,
          role: 'admin',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          role: 'customer',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserTypes', null, {}),
};
