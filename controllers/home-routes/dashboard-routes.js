const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authenticated = require('../../utils/authentication');


// Get all Posts.
router.get('/', authenticated, async (req, res) => {
    try {
        const { user_id, logged_in } = req.session;
        const dashboardData = await Post.findAll(
            {
                where: {
                    user_id: user_id
                },
                attributes: [
                    'id',
                    'user_id',
                    'title',
                    'content'],
                include: [
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'content',
                            'user_id',
                            'post_id',
                            'created_at'],
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            });
        const posts = dashboardData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Post Update.
router.get('/post/:id', authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { logged_in } = req.session;
        const post = await Post.findByPk(id, {
            attributes: ['title', 'content']
        });
        const postData = post.get({ plain: true });
        console.log(postData);

        res.render('postUpdated', {
            postData,
            logged_in: logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//New post

router.get('/', (req, res) => {
    try {
        const { logged_in } = req.session;
        res.render('postCreated', { logged_in: logged_in });
    } catch (err) {
        res.status(404).json(err)
    }
});
