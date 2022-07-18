const router = require('express').Router();
const { Post, User} = require('../../models');
const authenticated = require('../../utils/authentication');


// Get all Posts.
router.get('/', authenticated, async (req, res) => {
    try {
        const { user_id, logged_in } = req.session;
        const dashboardData = await Post.findAll(
            {
                where: {
                    user_id
                },
                include: [{ model: User }]
            });
        const posts = dashboardData.map(post => post.get({ plain: true }));
        // console.log(posts);
        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
            logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//New post
router.get('/newpost', authenticated, (req, res) => {
    try {
        const { logged_in } = req.session;
        res.render('new-post', {
            layout: 'dashboard',
            logged_in
        });
    } catch (err) {
        res.status(404).json(err)
    }
});

//update Post
router.get('/:id', authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { logged_in } = req.session;
        const post = await Post.findByPk(id, {
            attributes: ['title', 'content']
        });
        const postData = {
            id,
            title: post.title,
            content: post.content
        }
        res.render('edit-post', {
            layout: 'dashboard',
            postData,
            logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;