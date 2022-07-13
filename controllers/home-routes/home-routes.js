const {User, Post, Comment} = require("../../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try{
        const homepageData = await Post.findAll(
            {
                attributes: ["id", "title", "createdAt"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ).catch((err) => {
            res.json(err);
        })
        
        const posts = homepageData.map(post => post.get({plain: true}));
        res.render("homepage", {
            posts, 
            logged_in: req.session.logged_in
        })

    }catch(err){
        res.status(500).json(err);
    }
})