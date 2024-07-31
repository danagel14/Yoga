require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./lib/connect");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const { showSignIn } = require('./controllers/user');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Log all requests
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

// Set view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Define routes
app.use("/", routes);
app.get("/", showSignIn);

// Route to provide the Google Maps API key
app.get('/api/google-maps-api-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`The server is running on port: ${PORT}....`);
});
