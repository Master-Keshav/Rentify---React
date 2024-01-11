const express = require("express");
const router = express.Router();
const { Property, validateProperty } = require("../models/property");

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
            isPetFriendly,
            isFurnished,
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
            isPetFriendly,
            isFurnished,
            facilities,
        });
        console.log(property)
        await property.save();

        res.status(201).json({ message: "Property added successfully" });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
