import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        image: {
          select: {
            url: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            description: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        ratings: {
          select: {
            id: true,
            numStars: true,
            userId: true,
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.team.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            description: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        image: {
          select: {
            url: true,
          },
        },
        ratings: {
          select: {
            id: true,
            numStars: true,
            userId: true,
          },
        },
      },
    });
    if (!data) res.status(404).json({ error: "Team not found" });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch team" });
  }
};
