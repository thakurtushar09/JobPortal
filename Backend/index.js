const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db"); // Assuming you have a database connection setup

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Routes
const userRoute = require("./routes/userRoute"); // Adjust paths as necessary
const companyRoute = require("./routes/companyRoute");
const jobRoute = require("./routes/jobRoute");
const applicationRoute = require("./routes/applicationRoute");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
