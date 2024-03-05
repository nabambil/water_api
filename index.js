const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger.js')



// create express app
const app = express();

app.use(express.static('public'));

app.use(cors({ origin: '*' }));

// Setup server port
const port = process.env.PORT || 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get('/', (req, res) => {
  res.send(new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kuala_Lumpur'
  }));
});

// Require employee routes
const lorryRoutes = require('./routes/lorry');
const deviceRoutes = require('./routes/device');
const driverRoutes = require('./routes/driver');
const wateringSessionRoutes = require('./routes/water_session');
const wateringRoutes = require('./routes/watering');
const authenticationRoutes = require('./routes/authentication');

// using as middleware
app.use('/api/v1/lorries', lorryRoutes);
app.use('/api/v1/devices', deviceRoutes);
app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/waterings', wateringRoutes);
app.use('/api/v1/sessions', wateringSessionRoutes);
app.use('/api/v1/authentication', authenticationRoutes);


// listen for requests
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`, port);
});