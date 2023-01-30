/* eslint-disable import/no-anonymous-default-export */
import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";

export default async (req, res) => {
    const { method } = req;

    await dbConnect();
    const { id } = req.query;
    // put
    if (method === "PUT") {
        try {
            const result = await Task.findByIdAndUpdate(id, { $set: req.body },{new: true});
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error put: ${error}` });
            console.log(error);
        } 
    }

    // delete
    if (method === "DELETE") {
        try {
            await Task.findByIdAndDelete(id);
            res.status(200).json({message: "Successfully Deleted!"})
        } catch (error) {
            res.status(500).json({ message: ` Internal Server Error delete: ${error}` });
            console.log(error);
        } 
    }

}