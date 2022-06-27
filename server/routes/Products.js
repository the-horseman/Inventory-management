const express = require('express');
const router = express.Router();
const { InvntItem } = require('../models');
const { InvntCategory } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
    const items = await InvntItem.findAll({
        where: { InvntUserId: req.user.id }
    });
    res.json(items);
});

router.post("/create", validateToken, async (req, res) => {
    const { name, description, price, category } = req.body;
    const userID = req.user.id;
    const ctID = await InvntCategory.findOne({
        where: {
            CatName: category
        }
    });
    if (ctID != null) {
        const item = await InvntItem.create({
            ItemName: name,
            description: description,
            price: price,
            InvntUserId: userID,
            InvntCategoryId: ctID.id
        });
        res.json(item);
    } else {
        res.json({ error: "Category not found" });
    }
});

router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await InvntItem.destroy({
        where: {
            id: id
        }
    });
    return res.json({ message: "Item deleted" });
});

router.post("/edit", validateToken, async (req, res) => {
    const { tochange, val, id } = req.body;
    if (tochange == "Name") {
        await InvntItem.update({ ItemName: val }, { where: { id: id } });
        res.json({ val: "ItemName" });
    } else if (tochange == "Description") {
        await InvntItem.update({ description: val }, { where: { id: id } });
        res.json({ val: "Description" });
    } else {
        await InvntItem.update({ price: val }, { where: { id: id } });
        res.json({ val: "Price" });
    }
});

module.exports = router;