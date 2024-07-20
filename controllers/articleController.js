import Article from "../models/articleModel.js";

const createArticle = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    const { title, content } = req.body;
    const newArticle = await Article.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json({
      article: newArticle,
      message: "Article created successfully",
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(400).json({
      message: "Creation of article failed",
      error: error,
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name");
    res.status(200).json({
      articles,
      message: "All articles fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "You are not authorized to update this article",
      });
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      article: updatedArticle,
      message: "Article updated successfully",
    });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(400).json({
      message: "Update of article failed",
      error: error,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not the author of this article",
      });
    }

    await article.deleteOne();
    res.status(200).json({
      message: "Article deleted successfully",
      article,
    });
  } catch (error) {
    console.error("Error deleting article", error);
  }
};

export { createArticle, deleteArticle, getAllArticles, updateArticle };
