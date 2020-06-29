const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  const file = publicPath + "/index.html";
  res.sendFile(file);
});

app.listen(file, () => {
  console.log("Serve is up on " + file);
});
