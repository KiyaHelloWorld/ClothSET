const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const clothingRoutes = require("./routes/clothing");

const app = express();

//Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB
mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Can not connect to database"));
db.once("open", () => console.log("Connected to the database"));

//Routes
app.use("/users", userRoutes);
app.use("/clothing", clothingRoutes);

//Server
if(require.main == module){
	app.listen(process.env.PORT || 4000, () => {
		console.log(`We are running at ${ process.env.PORT || 4000 }`);
	});
}

module.exports = { app, mongoose }