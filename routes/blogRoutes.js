const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// Home Page - Show All Blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render("index", { blogs });
    } catch (error) {
        console.log(error);
        res.send("Error loading blogs");
    }
});

// Show Create Blog Form
router.get("/create", (req, res) => {
    res.render("create");
});

// Save Blog
router.post("/create", async (req, res) => {
    try {
        const { title, author, content } = req.body;

        await Blog.create({
            title,
            author,
            content
        });

        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Error creating blog");
    }
});


// Show Edit Form
router.get("/edit/:id", async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    res.render("edit", { blog });

});

// Update Blog
router.put("/edit/:id", async (req, res) => {

    const { title, author, content } = req.body;

    await Blog.findByIdAndUpdate(req.params.id, {
        title,
        author,
        content
    });

    res.redirect("/");

});

// Delete Blog
router.delete("/delete/:id", async (req, res) => {

    await Blog.findByIdAndDelete(req.params.id);

    res.redirect("/");

});

module.exports = router;