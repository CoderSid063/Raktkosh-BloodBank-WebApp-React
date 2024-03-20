const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//midelwire add for body parshing
app.use(express.json());

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

const DBconnect = require("./config/database");
DBconnect();