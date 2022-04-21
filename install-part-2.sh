env-cmd -f ./.env npx sequelize db:migrate
env-cmd -f ./.env npx sequelize db:seed:all
env-cmd -f ./.env npm run dev