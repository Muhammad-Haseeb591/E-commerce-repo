require("dotenv").config();
const { authRouter } = require("./routes/authRoute"); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { adminRoute } = require("./routes/adminRoute");  // ← productRouter import hatao
const favouriteRoutes = require("./routes/FavouriteRoute");  // ← yeh add karo

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/admin", adminRoute);  
app.use("/favourites", favouriteRoutes);  

app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Product API</h1>");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();