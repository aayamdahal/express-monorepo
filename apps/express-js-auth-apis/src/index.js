const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/:id", (req, res) => {
  res.send("Hello, World!");
});

app.put("/:id", (req, res) => {
  res.send("Hello, World!");
});

app.delete("/:id", (req, res) => {
  res.send("Hello, World!");
});

// users
app.get("/users", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users/:id", (req, res) => {
  res.send("Hello, World!");
});

app.put("/users/:id", (req, res) => {
  res.send("Hello, World!");
});

app.delete("/users/:id", (req, res) => {
  res.send("Hello, World!");
});

// users courses
app.get("/users/:id/courses", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users/:id/courses/:id", (req, res) => {
  res.send("Hello, World!");
});

app.put("/users/:id/courses/:id", (req, res) => {
  res.send("Hello, World!");
});

app.delete("/users/:id/courses/:id", (req, res) => {
  res.send("Hello, World!");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
