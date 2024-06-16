import { Router } from "express";
import { createCharity, deleteCharity, showCharities, showCharity, updateCharity } from "../controller/charity.Controller";

const  charityRouter = Router();

charityRouter.post("/create", createCharity);

charityRouter.get("/show-all", showCharities);

charityRouter.get("/showBy/:id", showCharity);

charityRouter.put("/update/:id",  updateCharity);

charityRouter.delete("/delete/:id", deleteCharity);

export { charityRouter };
