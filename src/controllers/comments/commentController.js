// controllers/commentController.js
const commentService = require('../../services/comments/commentService');

// Controller for creating a comment
const createComment = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, text } = req.body;

  try {
    const comment = await commentService.createComment(userId, reviewId, text);
    res.status(201).json(comment); // Respond with the created comment
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting comments for a review
const getCommentsByReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const comments = await commentService.getCommentsByReview(reviewId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting comments by a user
const getCommentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const comments = await commentService.getCommentsByUser(userId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for updating a comment
const updateComment = async (req, res) => {
  console.log('**********');
  
  const { commentId } = req.params;
  console.log('comment control commnetId', commentId);
  const { text } = req.body;

  try {
    const updatedComment = await commentService.updateComment(commentId, text);
    console.log('updatedComment', updatedComment);
    
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Control: delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await commentService.deleteComment(commentId);
    // res.status(200).json(deletedComment);
    res.status(200).json({
      message: "Comment deleted successfuly.",
      deletedComment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller: get my comments..
const getMyComments = async (req, res) => {
  const userId = req.user.userId;  // Getting the userId from the request object (set by the protect middleware)

  try {
    const comments = await commentService.getCommentsByUser(userId);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error retrieving comments.' });
  }
};


module.exports = {
  createComment,
  getCommentsByReview,
  getCommentsByUser,
  updateComment,
  deleteComment,
  getMyComments,
};
