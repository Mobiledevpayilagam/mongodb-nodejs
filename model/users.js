import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
  userName: { type: String },
  userEmail: { type: String },
  userPhone: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
