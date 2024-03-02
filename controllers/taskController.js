const Task = require("../models/index");
const CallCount = require("../models/callCount");

exports.add = async (req, res, next) => {
  const { description } = req.body;

  try {
    // Check if any description already exists
    const existingDescription = await Task.findOne();
    if (existingDescription) {
      // If description exists, delete all existing descriptions
      await Task.deleteMany();
    }

    // Create new description
    const newDescription = new Task({ description });
    await newDescription.save();
    res.status(201).json({
      data: newDescription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    // check if description is empty return error message if empty
    if (!description) {
      return res.status(404).json({ message: "Description cannot be empty" });
    }
    // initially if user clicks update or clicks update with wrong id then clear previous ones and create new entry
    if (id == 1) {
      const existingDescription = await Task.findOne();
      if (existingDescription) {
        await Task.deleteMany();
      }

      const newDescription = new Task({ description });
      await newDescription.save();
      return res.status(201).json({
        data: newDescription,
      });
    }

    // update previously added entry based upon _id
    const oldDescription = await Task.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    res.json({ data: oldDescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware for updating count everytime user hits add or update controllers.
exports.updateCallCount = async (req, res, next) => {
  try {
    let endpoint = "";
    if (req.path.includes("update"))
      endpoint = "update"; // add count to the respective end point
    else endpoint = "add";

    const callCount = await CallCount.findOne({ endpoint: endpoint });
    if (callCount) {
      callCount.count++;
      await callCount.save();
    } else {
      await CallCount.create({ endpoint: endpoint, count: 1 }); // creates count when called for the first time
    }

    // pass control to next middleware after updating count
    next();
  } catch (error) {
    console.error("Error updating call count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// return respective end point api hit count.
exports.getCount = async (req, res, next) => {
  try {
    const callCounts = await CallCount.find();
    res.json({ callCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
