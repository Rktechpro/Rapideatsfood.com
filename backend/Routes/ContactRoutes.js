import express from "express";
import { ContactFrom } from "../controllers/ContactController.js";

const ContactRouter = express.Router();

ContactRouter.post("/contact", ContactFrom);

export default ContactRouter;
