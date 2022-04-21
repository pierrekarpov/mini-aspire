'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: 'pkarpov',
          email: 'p@k.com',
          password: 'password',
          userTypeId: 2,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          username: 'jdoe',
          email: 'j@d.com',
          password: 'password',
          userTypeId: 2,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 3,
          username: 'bburr',
          email: 'b@b.com',
          password: 'password',
          userTypeId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
