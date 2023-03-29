import mongoose, { model } from "mongoose";

interface Iuser {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  predict: any[];
}

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  predict: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "predicts",
  },
});

const UserModels = model<Iuser>("users", UserSchema);

export default UserModels;
