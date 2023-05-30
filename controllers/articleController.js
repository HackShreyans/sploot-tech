const articleModel = require('../models/articleModel');
const { Types } = require('mongoose');


exports.createArticle = async (req, res) => {
  try {
    const { author, title, description } = req.body;

    if (!author || !title || !description) {
      return res.status(400).json({ "Error": "Please provide author, title, and description" });
    }

    const article = new articleModel({
      author, 
      title,
      description
    });

    const savedArticle = await article.save();

    res.status(201).json({ "Success": "Article created successfully", "articleData": savedArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Error": "Internal Server Error" });
  }
};

exports.getArticles = async (req, res) => {
    try {
      // Retrieve the user ID from the authenticated token
      const { userId } = req;
      console.log("userId",userId);
  
      // Check if userId is undefined
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
      }
  
      // Perform the pipeline aggregation to fetch articles with user data
      const articles = await articleModel.aggregate([
        {
          $match: { author: userId }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'userData'
          }
        },
        {
          $unwind: {
            path: '$userData',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            'userData._id': 1,
            'userData.email': 1,
            'userData.name': 1,
            'userData.age': 1
          }
        }
      ]);
  
      res.status(200).json({ articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  