const mongoose = require('mongoose');

const callCountSchema = new mongoose.Schema({
    endpoint: String,
    count: { type: Number, default: 0 },
  });
  
  const CallCount = mongoose.model('CallCount', callCountSchema);
  
module.exports = CallCount;
