const router = require('express').Router();
const { Comment } = require('../../models');
const authenticated = require('../../utils/authentication');

// //All Comments
// router.get('/', (req, res) => {
//     Comment.findAll({})
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err); 
//             res.status(500).json(err); 
//         })
// });

// Creating a comment. 
router.post("/", authenticated, async (req, res) => {
    try {
        const { content, post_id } = req.body;
        const enoughData = post_id && content;
        // Ternary operator to validate that the user is introducing the needed data to create 
        // a comment.
        let commentCreate =
            (!enoughData)
                ? res.json({ message: 'Pleace introduce the required data' })
                : commentCreate = await Comment.create({
                    content,
                    post_id,
                    user_id
                });
        res.status(200).json(`New comment created ${commentCreate.content}`);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Deleting a comment.
router.delete('/:id', authenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const commentDeleted = await Comment.destroy({
            where: {
                id: id
            }
        });
        return !commentDeleted
            ? res.status(404).json({ message: `Couldnt find comment with the id ${id}` })
            : res.json({ message: `Comment ${commentDeleted} deleted ` });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;