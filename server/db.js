const mongoose = require("mongoose");

module.exports = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		await mongoose.connect(process.env.DB, connectionParams);

		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		throw error;
	}
};
