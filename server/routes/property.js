const express = require("express");
const router = express.Router();
const { Property, validateProperty } = require("../models/property");
const { User } = require('../models/user');

router.get("/", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json({ properties });
    } catch (error) {
        console.error('Error fetching all properties:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { error } = validateProperty(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { user, name, description, type, price, location, imageURL, phone, facilities } = req.body;
        const property = new Property({ user, name, description, type, price, location, imageURL, phone, facilities });
        await property.save();

        await User.findByIdAndUpdate(user, {
            $push: { properties: property._id },
            $set: { role: 'agent' },
        });

        res.status(201).json({ message: "Property added successfully" });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId).populate('user').exec()
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ property });
    } catch (error) {
        console.error('Error fetching user properties:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;