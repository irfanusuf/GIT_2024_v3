const { Blog } = require("../models/blogModel");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const createBlog = async (req, res) => {
  try {
    const userId = req.userId; // this userid is coming from middle wares

    let user = await User.findById(userId); // db se user ko dondo

    if (user !== null) {
      const { blogTitle, blogDescription, category, shortDesc, blogPicture } = req.body;

      if (
        blogTitle === "" ||
        blogDescription === "" ||
        category === "" ||
        shortDesc === "" ||
        blogPicture === ""
      ) {
        return res.json({
          success: false,
          message: "All feilds are required!",
        });
      }

      const newBlog = await Blog.create({
        blogTitle,
        blogDescription,
        category,
        shortDesc,
        blogPicture,
        author: userId,
      });

      if (newBlog) {
        user.blogs.push(newBlog._id);
        await user.save();
        return res
          .status(200)
          .json({ success: true, message: "Blog Saved Succesfully" }); // tesing purpose
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getallBlogs = async (req, res) => {
  try {
    const getBlogs = await Blog.find({ isArchived: false }).lean(); /// reading all the blogs from db // lean is comptabile with hbs

    if (getBlogs) {
      // return res.json({getBlogs})

      return res.render("blogs", { title: "Blogs", blogs: getBlogs });
    } else {
      return res.render("error", {
        error: "Some Error , try again after sometime",
      });
    }
  } catch (error) {
    res.render("error", { error: error.message });
    console.log(error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const findBlog = await Blog.findById(blogId);

    if (findBlog) {
      return res.render("blog", {
        title: findBlog.blogTitle,
        desc: findBlog.blogDescription,
        url: findBlog.blogPicture,
      });
    } else {
      return res.render("error", { title: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const listBlogs = async (req, res) => {
  const userId = req.userId;
  const blogs = await Blog.find({ author: userId }).lean();

  res.render("listBlogs", { blogsARR: blogs });
};

const getEditBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (blog) {
      return res.render("editBlog", {
        title: "Edit Blog",
        blogTitle: blog.blogTitle,
        blogDescription: blog.blogDescription,
        shortDesc: blog.shortDesc,
        blogPicture: blog.blogPicture,
        category: blog.category,
      });
    } else {
      return res.render("error", { title: "Error", Error: "No Blog Found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { blogTitle, blogDescription, category, shortDesc, blogPicture } = req.body;

    if (
      blogTitle === "" ||
      blogDescription === "" ||
      category === "" ||
      shortDesc === "" ||
      blogPicture === ""
    ) {
      return res.json({
        success: false,
        message: "All feilds are required!",
      });
    }

    let blog = await Blog.findById(blogId);

    if (blog) {
      blog.blogTitle = blogTitle
      blog.blogDescription = blogDescription
      blog.category = category
      blog.shortDesc = shortDesc
      blog.blogPicture = blogPicture

      await  blog.save()

      res.status(200).json({success :true , message : "Blog Updated SuccesFully!"})

    }
    else{
      res.status(500).json({success :false , message : "Something Went Wrong!"})
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBlog,
  getallBlogs,
  getBlogById,
  listBlogs,
  getEditBlog,
  editBlog,
};  
