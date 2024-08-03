const Post = require("../models/post");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createPost = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts", // Optional: specify a folder in Cloudinary
    });

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: result.secure_url, // Use the Cloudinary URL
      creator: req.userData.userId,
    });

    const createdPost = await post.save();
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Creating a post failed!",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts", // Optional: specify a folder in Cloudinary
      });
      imagePath = result.secure_url; // Use the Cloudinary URL
    } catch (error) {
      return res.status(500).json({
        message: "Updating image failed!",
      });
    }
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });

  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update post!",
      });
    });
};

exports.getPosts = async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  try {
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    fetchedPosts = await postQuery.exec();
    const count = await Post.countDocuments();
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts: count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching posts failed!",
    });
  }
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed!",
      });
    });
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id, creator: req.userData.userId });
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Deleting post failed!",
    });
  }
};
