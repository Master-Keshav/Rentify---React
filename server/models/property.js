const mongoose = require("mongoose");
const Joi = require("joi");

const propertySchema = new mongoose.Schema({
    description: { type: String, required: true },
    facilities: { type: [String], default: [] },
    imageURL: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: "Please enter a valid 10-digit phone number",
        },
    },
    type: {
        type: String,
        required: true,
        enum: ["apartment", "house"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const Property = mongoose.model("property", propertySchema);

const validateProperty = (property) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().valid("apartment", "house").required(),
        price: Joi.number().required(),
        location: Joi.string().required(),
        imageURL: Joi.string().required(),
        phone: Joi.string().pattern(new RegExp(/\d{10}/)).required(),
        facilities: Joi.array().items(Joi.string()),
        user: Joi.string().required(),
    });

    return schema.validate(property);
};

module.exports = { Property, validateProperty };
