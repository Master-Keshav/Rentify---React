const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	avatar: { type: String },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'property' }],
	role: { type: String, enum: ['admin', 'agent', 'user'], default: 'user' },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			avatar: this.avatar,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			role: this.role,
		},
		process.env.JWTPRIVATEKEY,
		{
			expiresIn: "7d",
		}
	);
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		avatar: Joi.string().required().label("First Name"),
		email: Joi.string().email().required().label("Email"),
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		password: passwordComplexity().required().label("Password"),
		role: Joi.string().valid('user', 'admin').default('user'),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
