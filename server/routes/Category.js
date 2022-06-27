const express = require('express');
const router = express.Router();
const { InvntCategory } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await InvntCategory.findOne({
        where: {
            id: id
        }
    });
    res.json(category.CatName);
})

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

router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await InvntCategory.destroy({
        where: {
            id: id
        }
    });
    return res.json({ message: "Category deleted" });
});

router.post("/edit", validateToken, async (req, res) => {
    const { tochange, val, id } = req.body;
    if (tochange == "Name") {
        await InvntCategory.update({ CatName: val }, { where: { id: id } });
        res.json({ val: "CategoryName" });
    } else {
        await InvntCategory.update({ description: val }, { where: { id: id } });
        res.json({ val: "Description" });
    }
});

module.exports = router;