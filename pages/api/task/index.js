/* eslint-disable import/no-anonymous-default-export */
import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    // create
    if (method === "POST") {
        try {
            console.log("body:", req.body)
            const newTask = await new Task(req.body).save();
            console.log("new task:",newTask)
            res.status(201).json(newTask)
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error post: ${error}` });
            console.log(error);
        } 
    }

    // getAll
    if (method === "GET") {
        try {
            const TaskData = await Task.find();
            res.status(200).json(TaskData)
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error get: ${error}` });
            console.log(error);
        } 
    }

}