import mongoose, { model } from "mongoose";

interface Imatch {
  startPlay: boolean;
  stopPlay: boolean;

  teamA: string;
  teamB: string;

  teamAScore: number;
  teamBScore: number;

  dateTime: string;
  scoreEntry: string;
  odds: string;
  predict: any[];
}

const MatchSchema = new mongoose.Schema({
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
  odds: {
    type: String,
  },
  predict: {},
});

const UserModels = model<Imatch>("matches", MatchSchema);

export default UserModels;
