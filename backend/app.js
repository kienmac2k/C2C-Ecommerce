const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const compression = require("compression");
const { sequelize } = require("./models");
const api_routes = require("./routes/router");
const config = require("./config/config.json");
const AuthMiddleware = require("./middleware/auth.middleware");

require("dotenv").config();

const app = express();

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Compression
app.use(compression());

// CORS Enabled for all requesting sources
app.use(cors());

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

//logger
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Parse multi-part form data
app.use(multer().any());

// Middleware

// Api routes
app.use(process.env.API_BASE_URL || config.base, api_routes);

// App listening to requests
var port = process.env.PORT || 8090;

app.listen({ port }, async () => {
  console.log(`Server running on port ${port}`);
  console.log(`Dir ${__dirname}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
