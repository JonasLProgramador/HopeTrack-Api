import { Router } from "express";
import { createDonation, deleteDonation, showDonation, showDonations } from "../controller/donation.Controller.js";
const donationRouter = Router();

donationRouter.post("/create", createDonation);

donationRouter.get("/show-all", showDonations);

donationRouter.get("/showBy/:id", showDonation);

donationRouter.put("/update/:id", updateDonator);

donationRouter.delete("/delete/:id", deleteDonation);

export { donationRouter };
