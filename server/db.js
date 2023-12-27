const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	mongoose.connect(process.env.DB, connectionParams, (err) => {
		if (err) {
			console.log(err)
			console.log("Could not connect database!");
		}
		else {
			console.log("Logged in successfully!")
			console.log("Connected to database successfully");
		}
	})
};
