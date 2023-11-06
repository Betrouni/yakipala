const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("CRUD Application");
});

let items = [
  "User",
  "Ready Player One",
  "Zboubati",
  "minimum 13 chiffres si j'viens",
]; // Ceci va agir comme une base de données en mémoire

// Create (POST)
app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.send(`Item with the name ${item.name} added to the database!`);
});

// Read (GET)
app.get("/items", (req, res) => {
  res.json(items);
});

// Update (PUT)
app.put("/items/:name", (req, res) => {
  const name = req.params.name;
  const item = req.body;
  items = items.map((i) => {
    if (i.name === name) {
      return item;
    }
    return i;
  });
  res.send(`Item with the name ${name} updated in the database!`);
});

// Delete (DELETE)
app.delete("/items/:name", (req, res) => {
  const name = req.params.name;
  items = items.filter((i) => i.name !== name);
  res.send(`Item with the name ${name} removed from the database!`);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
