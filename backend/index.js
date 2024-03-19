const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// defult router
app.get("/", (req, res) => {
    res.send("server is working perfectly")
});

////import router
const allRouters = require("./router/allRouters");
app.use("/blood_bank", allRouters)

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})