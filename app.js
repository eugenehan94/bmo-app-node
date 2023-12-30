const express = require("express");
const app = express();
const personal = require("./routes/personal");
const business = require("./routes/business");
const port = process.env.PORT || 5000;

app.use("/api/personal/home", personal);
app.use("/api/business/home", business);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
