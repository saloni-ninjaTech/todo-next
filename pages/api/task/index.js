/* eslint-disable import/no-anonymous-default-export */
import Task from "../../../models/Task";
import dbConnect from "@/utils/dbConnect";

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    // create
    if (method === "POST") {
        try {
            const newTask = await new Task(req.body).save();
            res.status(201).json({data: newTask, message:"Task added successfully"})
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error: ${error}` });
            console.log(error);
        } 
    }

    // getAll
    if (method === "GET") {
        try {
            const Task = await Task.find();
            res.status(200).json({data: Task})
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error: ${error}` });
            console.log(error);
        } 
    }

}