import { Medicine, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
let db = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  try {
    const meds: Medicine[] | null = await db.medicine.findMany();
    res.json(meds).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

export const getType = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const meds: Medicine[] | null = await db.medicine.findMany({
      where: { type },
    });
    res.json(meds).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};
