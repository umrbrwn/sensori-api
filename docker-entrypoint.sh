#!/bin/sh

echo "Creating database"
npx sequelize-cli db:create

echo "Applying database migrations"
npx sequelize-cli db:migrate

echo "Starting app..."
npm run start:prod
