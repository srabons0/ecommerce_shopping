import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: { type: String, minlength: 6, required: true },
    number: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String, default: "" },
    address: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    userStatus: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    orders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
