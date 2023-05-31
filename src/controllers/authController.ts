import { Pharmacien, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
let db = new PrismaClient();

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for a matching user or pharmacien
    const result: Array<any> | null = await db.$queryRaw`
      SELECT 'user' AS entity, id FROM "User" WHERE email = ${email} AND password = ${password}
      UNION ALL
      SELECT 'pharmacien' AS entity, id FROM "Pharmacien" WHERE email = ${email} AND password = ${password}
      LIMIT 1
    `;

    if (!result || result.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { entity, id } = result[0];

    // Handle the authenticated user or pharmacien
    if (entity === "user") {
      // User authentication logic
      const user = await db.user.findUnique({
        where: { id },
        include: { Order: { include: { orderItems: true } } },
      });
      res.status(200).json({ entity, user });
    } else if (entity === "pharmacien") {
      // Pharmacien authentication logic
      const pharmacien = await db.pharmacien.findUnique({
        where: { id },

        include: {
          orders: {
            include: {
              orderItems: { include: { medicine: true } },
              user: true,
            },
          },
        },
      });
      res.status(200).json({ entity, pharmacien });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

export const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, age, gender, adress, phone, name, last_name } =
      req.body;

    const user: User | null = await db.user.create({
      data: {
        name,
        last_name,
        email,
        password,
        phone,
        age,
        gender,
        adress,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const SignUpPharmacy = async (req: Request, res: Response) => {
  try {
    const { email, password, adress, name } = req.body;

    const user: Pharmacien | null = await db.pharmacien.create({
      data: {
        name,
        email,
        password,
        adress,
      },
      include: {
        orders: {
          include: { orderItems: { include: { medicine: true } }, user: true },
        },
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
