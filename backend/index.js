const app = require("./app");
const connectDatabase = require("./config/db");

require("dotenv").config();

//Port to Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running at Port ${PORT}`);
});
