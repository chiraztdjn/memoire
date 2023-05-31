import { Order, Pharmacien, PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
import { json } from "stream/consumers";

let db = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await db.pharmacien.findMany({
      include: {
        orders: {
          include: { orderItems: { include: { medicine: true } }, user: true },
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong happend");
  }
};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { meds, id, userId } = req.body;
    const order = await db.order.create({
      data: {
        user: { connect: { id: userId } },
        Pharmacien: { connect: { id: id } },
      },
    });

    const medicines = JSON.parse(meds);
    // Create the order items for each medicine

    for (const item of medicines) {
      await db.orderItem.create({
        data: {
          quantity: item.quantity,
          order: { connect: { id: order.id } },
          medicine: { connect: { id: item.medicineId } },
        },
      });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, state } = req.body;

    await db.order.update({ data: { state }, where: { id: orderId } });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
