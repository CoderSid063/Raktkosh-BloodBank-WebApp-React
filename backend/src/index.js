require("dotenv").config();
const { connectDB } = require("./db/database.js");
const { app } = require("./app.js");

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw error;
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGOdb connection failed !!! ", error);
  });
