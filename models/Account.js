const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  type: { type: String, default: "Website" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("account", AccountSchema);
