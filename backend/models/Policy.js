const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  name: String,
  rules: [
    {
      condition: String,
      action: String,
    },
  ],
});

module.exports = mongoose.model("Policy", policySchema);
