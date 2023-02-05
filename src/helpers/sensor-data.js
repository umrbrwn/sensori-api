const TempUnits = ['K', 'C', 'F'];
const HumidityUnits = ['g.m^-3', 'g.kg^-1'];
const PressureUnits = ['psi', 'pa', 'atm'];
const CO2Units = ['ppm'];

const random = (start = 1, end = 20) => Math.floor(Math.random() * end) + start;

const randomUnit = (units) =>
  units.length === 1 ? units[0] : units[random(0, units.length - 1)];

const generateSensorData = (
  timestamp = random(Date.now(), 3600000),
  sensor_id = random(),
) => ({
  sensor_id,
  timestamp,
  data: JSON.stringify({
    temperature: {
      value: random(),
      unit: randomUnit(TempUnits),
    },
    humidity: {
      value: random(),
      unit: randomUnit(HumidityUnits),
    },
    pressure: {
      value: random(),
      unit: randomUnit(PressureUnits),
    },
    co2: {
      value: random(),
      unit: randomUnit(CO2Units),
    },
  }),
});

module.exports = { random, generateSensorData };
