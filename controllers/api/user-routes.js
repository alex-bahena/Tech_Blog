const router = require("express").Router();
const { User } = require("../../models");
const authenticated = require('../../utils/authentication');

router.post("/", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.create({
            username: username,
            email: email,
            password: password
        });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username
            req.session.logged_in = true;
            res.status(200).json({ message: `Welcome ${username} you account was created.` });
        });
    } catch (err) {
        console.log('aquiUserCatchError');
        res.status(500).json(err);
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginUser = await User.findOne(
            {
                where: { username: username }
            }
        )
        console.log(loginUser.username);
        console.log(loginUser.password);

        if (!loginUser) {
            res.status(400).json({ message: "Please try again, incorrect username or password" });
        return;
        }

        const validPassword = loginUser.validatePassword(password);
        console.log(validPassword);
        if (!validPassword) {
            res.status(400).json({ message: "Please try again, incorrect username or password" });
        return;
        }

        req.session.save(() => {
            req.session.user_id = loginUser.id;
            req.session.username = username;
            req.session.logged_in = true;
            res.status(200).json({ message: `Welcome ${username} now you are logged in` });
        });

    } catch (err) {
        console.log('badrequest')
        res.status(500).json({success: false, message: err.message});
    }
})

router.post("/logout", authenticated, async (req, res) => {
    req.session.logged_in
        ? req.session.destroy(() => { res.status(204).end() })
        : res.status(404).end;
});

module.exports = router;


