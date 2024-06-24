const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category must have a name"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(uniqueValidator, {
  message: "Category already exists, please try again",
});

module.exports = mongoose.model("Category", CategorySchema);
