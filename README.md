# sensori-api 🛰
Sensor activity data collection in time series database using Nest.js, Fastify, TimescaleDB.

## Development
For development Node.js v18 is required along with Docker for containerization to setup database.
1. `npm install` to install dependencies in the repo
2. Refer to the _Database Wiki_ section to connect to database
3. `npm start` to launch the API

### Running tests
1. Set environment variable in your terminal `SET NODE_ENV=test` on Windows, or `EXPORT NODE_ENV=test` on Linux
2. Run `npm run test` in same terminal window

## Database Wiki
Go to docker api service shell using `docker compose exec api sh`, and run the following as needed
- Create database: `npx sequelize-cli db:create`
- Run migrations: `npx sequelize-cli db:migrate`
- Seed data: `npx sequelize-cli db:seed:all`

## Launch using container
Run `docker-compose up -d` to setup everything, it will setup TimescaleDB on port 5433 and HTTP api on port 3000.

## DEMO
To put sensor activity data, just provide a test URL and send a POST request
```
curl --location --request POST 'http://localhost:3000/api/sensor-activity' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sensorId": 12345,
    "timestamp": 1675625100663,
    "temperature": {
        "value": 1,
        "unit": "T"
    },
    "humidity": {
        "value": 2,
        "unit": "H"
    },
    "pressure": {
        "value": 3,
        "unit": "P"
    },
    "co2": {
        "value": 4,
        "unit": "C"
    }
}'
```

To get the recent data
```
curl --location --request GET 'http://localhost:3000/api/sensor-activity/12345'
```
