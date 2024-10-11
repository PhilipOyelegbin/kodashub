require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerdocs = require("./swagger-output.json");

// import routes
const userRoutes = require("./routes/user.route");

const app = express();

// middleware
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://kodashub.com.ng",
    "https://kodashub.netlify.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerdocs)); // Swagger setup

// User routes
app.use("/", userRoutes);

// error route
app.all("*", (req, res) => {
  res.status(404).send("Sorry, the route you are going to does not exist");
});

// connect the server
const port = process.env.PORT;
app.listen(port, async () => {
  console.log("Server is running on port: ", port);
});
