const { User, Post, Comment } = require('../../models');
const router = require('express').Router();
//Home page all posts
router.get('/', async (req, res) => {
    try {
        const homepageData = await Post.findAll(
            {
                attributes: [
                    'id',
                    'title',
                    'content',
                    'createdAt'
                ],
                include: [{ model: User }]
            }
        )
        const posts = homepageData.map(post => post.get({ plain: true }));
        // console.log(posts);
        res.render('all-posts', {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err);
    }
});
//Home page return after logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//singup rendering
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Render post by id
router.get('/comment/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const { id } = req.params;
        const { logged_in } = req.session;
        const post = await Post.findByPk(id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                }
            ]
        });
        const renderPost = post.get({ plain: true });
        res.render('single-post', {
            renderPost,
            logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;