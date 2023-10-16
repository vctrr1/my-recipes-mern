import mongoose from "mongoose";

const recipesSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }], //mongoDB e mongoose identifica que sao um array de ingredientes
  instruction: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipeModel = mongoose.model("recipes", recipesSchema);
