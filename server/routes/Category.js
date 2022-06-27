const express = require('express');
const router = express.Router();
const { InvntCategory } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
    const items = await InvntCategory.findAll({
        where: { InvntUserId: req.user.id }
    });
    res.json(items);
});

router.post("/create", validateToken, async (req, res) => {
    const { name, description } = req.body;
    const userID = req.user.id;
    const category = await InvntCategory.create({
        CatName: name,
        description: description,
        InvntUserId: userID,
    });
    res.json(category);
});

module.exports = router;