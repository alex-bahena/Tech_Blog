const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authenticated = require('../../utils/authentication');


// GET all posts.
router.get("/", async (req, res) => {
    try {
        const { user_id } = req.session;
        const postData = await Post.findAll(
            {
                where: {
                    user_id: user_id
                },
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at'
                ],
                order: [['created_at', 'DESC']],
                include: [
                    { model: Comment, include: User, attributes: ['username'] },
                    { model: User, attributes: ['username'] }
                ]
            });
        const posts = postData.map(post => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET post by id.
router.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const postData = await Post.findByPk(id, {
            attributes: [
                'id',
                'title',
                'content'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const postObj = postData.get({ plain: true });
        return (!postObj)
            ? res.status(404).json({ message: `No post found with the following id ${id}` })
            : res.json({ message: `Post created ${postData}` });
    } catch (err) {
        res.status(500).json(err);
    }
});


// New Post.
router.post('/', authenticated, async (req, res) => {
    try {
        const { user_id } = req.session;
        const { title, content } = req.body;

        const postData = await Post.create({
            title: title,
            content: content,
            user_id: user_id
        });
        const postObj = res.status(200).json(postData);
        return (!postObj)
            ? res.status(404).json({ message: `Couldn't create the post ${title}` })
            : res.json({ message: `New post ${title}` });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Updating post 
router.put('/:id', authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const postData = await Post.update({
            title: title,
            content: content
        },
            {
                where: {
                    id: id
                }
            });
        const postObj = res.status(200).json(postData);
        return (!postObj)
            ? res.status(404).json({ message: `Post id ${id} coulnd't be updated, please try again` })
            : res.json({ message: `Post id ${id} updated` });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deleting post
router.delete('/:id', authenticated, (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const postData = Post.destroy({
            where: {
                id: id
            }
        })
        const postObj = res.status(200).json(postData);
        return (!postObj)
            ? res.status(404).json({ message: `Post id ${id} coulnd't be deleted, please try again` })
            : res.json({ message: `Post id ${id} titled ${title} deleted` });
    } catch (err) {
        res.status(500).json(err);
    }
    });


module.exports = router;
