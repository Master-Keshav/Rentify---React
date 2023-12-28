const mongoose = require("mongoose");

module.exports = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		// console.log("env - ", process.env.DB)
		await mongoose.connect("mongodb+srv://admin:admin@rentify.lrdfcag.mongodb.net/rentify?retryWrites=true&w=majority", connectionParams);

		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		throw error; // Rethrow the error to stop the application if the connection fails
	}
};
