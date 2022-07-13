const router = require("express").Router();
const { User } = require("../../models");
const authenticated = require('../../utils/authentication');

router.post("/create", async (req, res) => {
    try {
        const user = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.status(200).json(userData)
        });

    } catch (err) {
        res.status(400).json(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginUser = await User.findOne(
            {
                where: { username: username }
            }
        )
        if (!loginUser) {
            res.status(400).json({ message: "Please try again, incorrect username or" });
        }

        const validPassword = await loginUser.checkPassword(password);

        if (!validPassword) {
            res.status(400).json({ message: "Please try again, incorrect username or" });
        }

        req.session.save(() => {
            req.session.user_id = loginUser.id;
            req.session.logged_in = true;
            res.status(200).json({ message: `Welcome ${username} now you are logged in` });
        });

    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/logout", authenticated, async (req, res) => {
    req.session.logged_in
    ? req.session.destroy(() => { res.status(204).end() })
    : res.status(404).end;
});

module.exports = router;


