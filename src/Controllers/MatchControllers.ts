import { NextFunction, Response, Request } from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import MatchModels from "../Models/MatchModels";

// CREATE MATCH:
export const CreateMatch = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      teamA,
      teamB,
      oddsA,
      oddsB,
      startPlay,
      stopPlay,
      scoreEntry,
      dateTime,
    } = req.body;

    const match = await MatchModels.create({
      teamA,
      teamB,
      oddsA,
      oddsB,
      startPlay,
      stopPlay,
      scoreEntry,
      dateTime,
    });
  }
);
