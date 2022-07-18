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
router.post("/add", authenticated, async (req, res) => {
     try {
        const { content, id } = req.body;
        const user_id = req.session.user_id;
        // Ternary operator to validate that the user is introducing the needed data to create 
        // a comment.
        await Comment.create({
            post_id: id,
            content,
            user_id,
        });
        res.redirect(`/comment/${id}`);
    } catch (err) {
        res.status(500).json(err);
    }
});


// // Deleting a comment.
// router.delete('/:id', authenticated, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const commentDeleted = await Comment.destroy({
//             where: {
//                 id: id
//             }
//         });
//         return !commentDeleted
//             ? res.status(404).json({ message: `Couldnt find comment with the id ${id}` })
//             : res.json({ message: `Comment ${commentDeleted} deleted ` });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


module.exports = router;