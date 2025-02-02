const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./data/777.json'); // Load your JSON data

app.use(cors());

// Endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Endpoint to search by category
app.get('/api/data/:category', (req, res) => {
  const category = req.params.category;
  console.log(category);
  if (category === 'All') {
    const d = {"name": "All", "entries": data.categories.flatMap((cat) => cat.entries)};
    console.log(d);
    return res.json(d);
  }
  const filteredData = data.categories.find((cat) => cat.name === category);
  console.log(filteredData);
  res.json(filteredData || { error: 'Category not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});