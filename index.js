const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/products.js"));

app.listen(port, () => {
  console.log(`ISTE task-3 server running on port ${5000}`);
});
