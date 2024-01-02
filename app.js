const express = require("express");
const app = express();
const cors = require("cors");
const personal = require("./routes/personal");
const business = require("./routes/business");
const port = process.env.PORT || 5000;

// Enabling CORS for some specific origins only.
let corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
// Routes
app.use("/api/v1/personal/home", personal);
app.use("/api/v1/business/home", business);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
