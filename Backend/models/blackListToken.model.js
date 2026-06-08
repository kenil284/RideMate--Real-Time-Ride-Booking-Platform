import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 60,
  },
});

const blackListTokenModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema
);

export default blackListTokenModel;