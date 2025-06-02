import express from "express";

import multer from "multer";
import {
  food_list,
  foodItems,
  foodList_remove,
} from "../controllers/Foodcontroller.js";

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), foodItems);
foodRouter.get("/list", food_list);
foodRouter.post("/delete", foodList_remove);

export default foodRouter;
