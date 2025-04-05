import { Request, Response } from "express";
import { studentModel } from "../models/studentModel";

class StudentController {
  getAllStudent = async (req: Request, res: Response) => {
    try {
      const students = await studentModel.find();
       res.status(200).json({ data: students });
       
    } catch (error) {
       res.status(500).json({ message: "Error fetching students" });
    }
  };

  getStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await studentModel.findById(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
      return;  
    }
      
       res.status(200).json({ data: student });
      
    } catch (error) {
       res.status(500).json({ message: "Error fetching student" });
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, department } = req.body;
      const student = new studentModel({ name, email, phone, department });
      await student.save();
      res.redirect("/");

    } catch (error) {
       res.status(500).json({ message: "Error creating student" });
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, phone, department } = req.body;
      const student = await studentModel.findById(id);

      if (!student) {
       res.status(404).json({ message: "Student not found" });
       return;
      }

      student.name = name;
      student.email = email;
      student.phone = phone;
      student.department = department;

      await student.save();
      res.redirect('/');
    } catch (error) {
     res.status(500).json({ message: "Error updating student" });
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student = await studentModel.findByIdAndDelete(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
     res.redirect('/');
    } catch (error) {
       res.status(500).json({ message: "Error deleting student" });
    }
  };
}

export default new StudentController();
