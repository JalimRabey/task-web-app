const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const routes = require("./routes");
const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res) => {
  return res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ error: "Internal error" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
