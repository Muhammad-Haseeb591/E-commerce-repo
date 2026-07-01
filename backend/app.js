require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const { authRouter } = require("./routes/authRoute");
const { adminRoute } = require("./routes/adminRoute");
const favouriteRoutes = require("./routes/FavouriteRoute");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/admin", adminRoute);
app.use("/favourites", favouriteRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server error:", err);
  }
};

startServer();