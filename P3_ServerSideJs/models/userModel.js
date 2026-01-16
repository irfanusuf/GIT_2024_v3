const mongoose = require("mongoose");

// data schema //

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  avatar : String, 
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = { User };
