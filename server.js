const express = require('express');
const app = express();
const port = 5000;

// Dummy data
const locationData = {
  current: { lat: 17.385044, lng: 78.486671 },
  route: [
    { lat: 17.385044, lng: 78.486671 },
    { lat: 17.385045, lng: 78.486672 },
    
  ]
};

app.get('/api/location', (req, res) => {
  res.json(locationData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
