import mongoose, { model } from "mongoose";

interface Ipredict {
  startPlay: boolean;
  stopPlay: boolean;

  teamA: string;
  teamB: string;

  teamAScore: number;
  teamBScore: number;

  dateTime: string;
  scoreEntry: string;
  predict: any[];
}

const PredictSchema = new mongoose.Schema({
  startPlay: {
    type: Boolean,
  },
  stopPlay: {
    type: String,
  },
  teamA: {
    type: String,
  },
  teamB: {
    type: String,
  },
  teamAScore: {
    type: Number,
  },
  teamBScore: {
    type: Number,
  },
  dateTime: {
    type: String,
  },
  scoreEntry: {
    type: String,
  },
  predict: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "predicts",
  },
});

const UserModels = model<Ipredict>("predicts", PredictSchema);

export default UserModels;
