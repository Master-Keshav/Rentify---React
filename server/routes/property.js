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

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const properties = await Property.find({ user: userId });
        res.json({ properties });
    } catch (error) {
        console.error('Error fetching user properties:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { error } = validateProperty(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            user,
            name,
            description,
            type,
            price,
            location,
            imageURL,
            phone,
            facilities,
        } = req.body;

        const property = new Property({
            user,
            name,
            description,
            type,
            price,
            location,
            imageURL,
            phone,
            facilities,
        });

        await property.save();

        res.status(201).json({ message: "Property added successfully" });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
