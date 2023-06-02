import { Request, Response } from "express";
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("ok").status(200);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Auth routes
const auth = require("./routes/auth");
app.use("/api/auth", auth);

// Meds routes
const meds = require("./routes/meds");
app.use("/api/meds", meds);

// Pharmacy routes
const pharmacy = require("./routes/pharmacy");
app.use("/api/pharmacy", pharmacy);
