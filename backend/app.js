//dotenv is using to take some links private
 require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

// Cors is using for Cross links
app.use(cors({
  origin: "http://localhost:5173"
}));
//read json file extension
app.use(express.json());

const connectDB = require("./config/db");
const { productRouter } = require("./routes/ProductRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", productRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Product API</h1>");
});

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URL || "mongodb://localhost:27017/products";

const startServer = async () => {
  try {
    await connectDB(dbURI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
