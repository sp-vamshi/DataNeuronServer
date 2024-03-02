const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true, "Description is required"]
    },  
})

const Task = new mongoose.model("DataNeuron", taskSchema);

module.exports = Task;