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

router.get("/agents", async (req, res) => {
	try {
		const agents = await User.find({ role: 'agent' })
			.select('_id avatar firstName lastName email properties role');

		const agentsFormatted = agents.map(agent => ({
			_id: agent._id,
			avatar: agent.avatar,
			name: `${agent.firstName} ${agent.lastName}`,
			email: agent.email,
			properties: agent.properties.length,
			role: agent.role,
		}));

		res.json({ agents: agentsFormatted });
	} catch (error) {
		console.error('Error fetching agents:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId)
			.select('_id avatar email firstName lastName role')
			.populate({
				path: 'properties',
				select: '_id description facilities imageURL location name price phone',
			})
			.exec();

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({
			agent: {
				_id: user._id,
				avatar: user.avatar,
				email: user.email,
				name: `${user.firstName} ${user.lastName}`,
				role: user.role[0].toUpperCase() + user.role.substring(1),
				properties: user.properties,
			},
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;
