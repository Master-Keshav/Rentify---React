const router = require("express").Router();
const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send({ 'message': 'Access denied. No token provided.' });

	try {
		const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
		const user = await User.findById(decoded._id);
		if (!user) return res.status(404).send({ 'message': 'User not found.' });
		const userDetails = {
			'_id': user.id,
			'avatar': user.avatar,
			'firstName': user.firstName,
			'lastName': user.lastName,
			'email': user.email,
			'role': user.role,
		}
		res.send(userDetails);
	} catch (ex) {
		res.status(400).send({ 'message': 'Invalid token.' });
	}
});

module.exports = router;
