import { Router } from "express";
import {
  getRecords,
  createRecord,
  deleteRecord,
} from "../controllers/bookingController";
import { Authorize } from "../middleware/authMiddleware";

const routes = Router();
routes.get("/", Authorize, getRecords);
routes.post("/", Authorize, createRecord);
routes.delete("/:id", Authorize, deleteRecord);

export const bookingRoutes = routes;
