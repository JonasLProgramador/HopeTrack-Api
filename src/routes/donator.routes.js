import { Router } from "express";
import { createDonator, showDonators ,showDonator, updateDonator, deleteDonator} from "../controller/donator.Controller.js";
const donatorRouter = Router();

donatorRouter.post("/create", createDonator);

donatorRouter.get("/show-all", showDonators);

donatorRouter.get("/showBy/:id", showDonator);

donatorRouter.put("/update/:id", updateDonator);

donatorRouter.delete("/delete/:id", deleteDonator);

export { donatorRouter };
