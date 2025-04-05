import express, { Request, Response } from "express";
import studentController from "../controllers/studentController";

const router = express.Router();

router
  .route("/student")
  .post(studentController.createStudent)
  .get(studentController.getAllStudent);

  
router
  .route("/student/:id")
  .get(studentController.getStudent)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);

export default router;