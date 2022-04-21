'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Loans',
      [
        {
          id: 1,
          isApproved: true,
          amountRequired: 100000,
          repaymentAmount: 100,
          repaymentFrequency: 7,
          ownerUserId: 1,
          approverUserId: 3,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          isApproved: false,
          amountRequired: 100000,
          repaymentAmount: 100,
          repaymentFrequency: 7,
          ownerUserId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Loans', null, {}),
};
