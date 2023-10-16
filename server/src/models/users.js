import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }], //faz referencia a tabela recipes e tipe obj
});

export const UserModel = mongoose.model("users", UserSchema);
