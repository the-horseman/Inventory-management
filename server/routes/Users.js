const express = require('express');
const router = express.Router();
const { InvntUser } = require('../models');
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { validateToken } = require('../middlewares/AuthMiddleware');

// Register Request starts
router.post("/register", async (req, res) => {
    const { username, password, phoneNo, email } = req.body;
    const alreadyPresent = await InvntUser.findOne({
        where: {
            username: username
        }
    });
    if (alreadyPresent) {
        res.json({ error: "Username already present" });
    } else {
        const hash = await bcrypt.hash(password, 10);
        const user = await InvntUser.create({
            username: username,
            password: hash,
            phoneNo: phoneNo,
            email: email
        });
        res.json({ user: user });
    }
});
// Register Request ends



// Login Request starts
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await InvntUser.findOne({
        where: {
            username: username
        }
    });
    if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const accessToken = sign({
                username: user.username,
                id: user.id,
                email: user.email,
                phoneNo: user.phoneNo
            }, "sectretKey");
            res.json({
                accessToken: accessToken,
                user: {
                    username: user.username,
                    id: user.id,
                    email: user.email,
                    phoneNo: user.phoneNo
                }
            });
        } else {
            res.json({ error: "Password is incorrect" });
        }
    } else {
        res.json({ error: "Username not found" });
    }
});
// Login Request ends


// Check logged in on page refresh
router.get("/check", validateToken, async (req, res) => {
    res.json(req.user);
});

router.post("/edit", async (req, res) => {
    const { tochange, val, id } = req.body;
    if (tochange == "Name") {
        await InvntUser.update({ username: val }, { where: { id: id } });
    } else if (tochange == "Password") {
        const hash = await bcrypt.hash(val, 10);
        await InvntUser.update({ password: hash }, { where: { id: id } });
    } else if (tochange == "Phone No") {
        if (/^[0-9]{10}$/.test(val) == true) {
            await InvntUser.update({ phoneNo: val }, { where: { id: id } });
        } else {
            res.json({ error: "Phone No is not valid" });
        }
    } else {
        await InvntUser.update({ email: val }, { where: { id: id } });
    }
    res.json({ success: "Updated successfully" });
});

module.exports = router;