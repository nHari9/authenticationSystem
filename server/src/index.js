const express = require("express");

require("dotenv").config();
const connect = require("./configs/db");

const PORT = 3693;

const usercontroller = require("./controllers/usercontroller");
const productcontroller= require("./controllers/productcontroller")
const {register, login}=require("./controllers/autcontroller")

const app = express();

app.use(express.json());

app.post("/register",register)
app.post("/login",login)

app.use("/users", usercontroller);
app.use("/products", productcontroller);



app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Connected to db at ${PORT}`);
    } catch (e) {
        console.log("error", e);
    }
});
