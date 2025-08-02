const express = require ('express')
const postModel = require('../models/postModel.js')
const userModel = require('../models/userModel.js')
const { authMiddleware } = require('../middleware/authMiddleware.js');
const router = express.Router();


//create post
router.post('/',authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    if(!title){
        return res.status(400).json({message:"title is missing"});
    }
    try{
        const newPost = new postModel({
            user: req.userId, 
            title,
            content,
        });
        await newPost.save();
        res.status(201).json({ message: 'post created', post: newPost });
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"server issue"})
    }
});

//update post
router.put('/:id',authMiddleware,async(req,res)=>{
    const postId = req.params.id;
    const {title,content,published} = req.body;
    try{
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        if (title !== undefined) post.title = title;
        if (content !== undefined) post.content = content;
        if (published !== undefined) post.published = published;
        
        await post.save();
        res.status(200).json({ message: 'post updated successfully', post });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"error occurred while editing a post"});
    }
})

//delete post
router.delete('/:id',authMiddleware,async(req,res)=>{
    const postId= req.params.id;
    try{
        const post = await postModel.findById(postId);

        if(!post)
        {
            return res.status(404).json({ message: 'post not found' });
        }

        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await post.deleteOne(); // or todoModel.findByIdAndDelete(todoId)
        res.status(200).json({ message: 'post deleted successfully' });

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'error occurred while deleting a post' });
    }
    
})


//get users post only
router.get('/my-blog', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch only required fields using Mongoose `.select()`
    const post = await postModel.find({ user: userId }).select('_id title content published ');

    res.json(post); // will only include title, description, completed
  } catch (error) {
    console.error("Failed to fetch post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.get('/bulk', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await postModel.countDocuments({ published: true });

    const blogs = await postModel
      .find({ published: true })
      .sort({ _id: -1 }) // latest first
      .skip(skip)
      .limit(limit)
      .populate("user", "username");

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    // Populate the author field with name/email
    const post = await postModel.findById(blogId).lean();

    if (!post) {
      return res.status(404).json({ message: 'Blog not found' });
    }
 
    const userId =post.user;
    const user = await userModel.findById(userId);

    post.username = user?.username || "Unknown";
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/publish', authMiddleware, async (req, res) => {
  try {
    console.log("⛳ ID:", req.params.id);

    const blog = await postModel.findById(req.params.id);
    console.log("📄 Blog found:", blog);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Optional: ensure 'published' is boolean before toggling
    if (typeof blog.published !== 'boolean') {
      blog.published = false;
    }

    console.log("✅ Blog before toggle:", blog.published);
    blog.published = !blog.published;
    console.log("🔁 Blog after toggle:", blog.published);

    const updatedBlog = await blog.save();
    console.log("💾 Saved blog:", updatedBlog);

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('🔥 Error toggling publish:', error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
