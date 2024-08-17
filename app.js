const express = require("express");
const app = express();
const cors = require("cors");
const personal = require("./routes/personal");
const business = require("./routes/business");
const login = require("./routes/sign-in");
const port = process.env.PORT || 5000;
const path = require("path");
const cookieSession = require("cookie-session");
const dir = path.join(__dirname, "public");
const cookieParser = require("cookie-parser");

// Enabling CORS for some specific origins only.
let corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(dir));

app.use(
  cookieSession({
    name: "tester-session",
    keys: ["COOKIE_SECRET"], //@TODO: use as secret environment variable
    httpOnly: true,
  })
);
app.use(cookieParser());
// Routes
app.use("/api/v1/personal/home", personal);
app.use("/api/v1/business/home", business);
app.use("/api/v1/sign-in", login);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
