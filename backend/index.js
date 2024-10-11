require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require("swagger-ui-express");
const swaggerdocs = require("./swagger-output.json");

// import routes
const userRoutes = require("./routes/user.route");
const serviceRoutes = require("./routes/service.route");
const hostingRoutes = require("./routes/hosting.route");
const websiteRoutes = require("./routes/website.route");
const invoiceRoutes = require("./routes/invoice.route");
const mailerRoutes = require("./routes/mailer.route");
const checkoutRoutes = require("./routes/checkout.route");
const passwordResetRoutes = require("./routes/passwordreset.route");

const app = express();

// middleware
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
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

// User routes
app.use("/", userRoutes);
app.use("/", serviceRoutes);
app.use("/", hostingRoutes);
app.use("/", websiteRoutes);
app.use("/", invoiceRoutes);
app.use("/", mailerRoutes);
app.use("/", checkoutRoutes);
app.use("/", passwordResetRoutes);

// Swagger setup
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

// error route
app.all("*", (req, res) => {
  res.status(404).send("Sorry, the route you are going to does not exist");
});

// connect the server
const port = process.env.PORT;
app.listen(port, async () => {
  console.log("Server is running on port: ", port);
});
