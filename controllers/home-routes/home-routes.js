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
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        )
        const posts = homepageData.map(post => post.get({ plain: true }));
        res.render('homepage', {
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
router.get('/', (req, res) => {
    res.render('signup');
});

// Render post by id
router.get('/post/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { logged_in } = req.session;
        const postData = Post.findOne({
            where: {
                id: id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));
        // pass data to template
        res.render('single-post', { posts, logged_in: logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
