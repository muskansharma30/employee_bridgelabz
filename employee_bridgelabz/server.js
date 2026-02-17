const express = require('express');
const fileHandler = require('./modules/fileHandler');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Log data when server starts (Step 1 goal)
fileHandler.read().then(data => {
  console.log("Employee Data:", data);
});

// Dashboard Route
app.get('/', async (req, res) => {
  const employees = await fileHandler.read();
  res.render('index', { employees });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});