'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Invoices',
      [
        {
          id: 1,
          paymentDate: Sequelize.fn('NOW'),
          loanId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          paymentDate: Sequelize.fn('NOW'),
          loanId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 3,
          loanId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Invoices', null, {}),
};
