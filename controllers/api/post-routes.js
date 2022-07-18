const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authenticated = require('../../utils/authentication');

// New Post.
router.post('/add', authenticated, async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const { title, content } = req.body;
        await Post.create({
            title,
            content,
            user_id
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update Post
router.post('/:id', async (req, res) => {
    const { title, content } = req.body;
    console.log(title);
    console.log(content);
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        await Post.update(
            {
                title,
                content,
            },
            {
                where: {
                    id: id
                }
            });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(404).json(err);
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
        return (postObj)
            ? res.json({ message: `Post id ${id} titled ${title} deleted` })
            : res.status(404).json({ message: `Post id ${id} coulnd't be deleted, please try again` })
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
