import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  joinedon: { type: Date, default: Date.now }
});

// ✅ Named export fix:
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
